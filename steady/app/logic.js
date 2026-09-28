// Pure logic: routing, XmR rules, activity suggestion, safety checks.
// No DOM, no storage. Everything here is unit tested in tests/logic.test.js.

export const DEFAULT_THRESHOLDS = {
  flatEnergy: 4,          // energy at or below this is Flat
  flatHour: 14,           // nothing started by this hour is Flat
  spiralAnxiety: 7,       // anxiety at or above this is Spiral
  thoughtRecordEnergy: 5, // thought record offered in Spiral only at or above this
  pushEnergy: 8,          // energy at or above this can be Push
  workHoursLimit: 8,
};

export const STATES = ['flat', 'spiral', 'push', 'steady'];

// Section 3. Flat is checked first so a low-energy day never gets thinking work,
// even when anxiety or an imposter thought would otherwise make it Spiral.
export function routeState(c, now = new Date(), t = DEFAULT_THRESHOLDS) {
  const notStartedLate = !c.started && now.getHours() >= t.flatHour;
  if (c.energy <= t.flatEnergy || notStartedLate) return 'flat';
  if (c.anxiety >= t.spiralAnxiety || c.imposter || c.worry) return 'spiral';
  const overHours = (c.workHours ?? 0) > t.workHoursLimit;
  if (c.energy >= t.pushEnergy && (overHours || c.intoSomething)) return 'push';
  return 'steady';
}

// The ordered steps for a state. The home screen shows only the current step.
export function routePlan(state, c, t = DEFAULT_THRESHOLDS) {
  switch (state) {
    case 'flat':
      return {
        steps: [{ kind: 'activity', twoMinuteOnly: true }],
        thoughtRecord: false,
        reading: false,
      };
    case 'spiral': {
      const steps = [];
      if (c.imposter) steps.push({ kind: 'evidence', count: 3, claim: c.claim ?? 1 });
      if (c.worry) steps.push({ kind: 'name-worries' });
      steps.push({ kind: 'defusion', seconds: 90, variant: c.worry && !c.imposter ? 'worry' : 'thought' });
      steps.push({ kind: 'activity' });
      return { steps, thoughtRecord: c.energy >= t.thoughtRecordEnergy, reading: false };
    }
    case 'push':
      return {
        steps: [
          { kind: 'stop-time' },
          { kind: 'first-task' },
          { kind: 'activity', excludeCategories: ['work-adjacent'] },
          { kind: 'warning-check' },
        ],
        thoughtRecord: false,
        reading: false,
      };
    default:
      return {
        steps: [{ kind: 'activity' }, { kind: 'values', optional: true }],
        thoughtRecord: false,
        reading: true,
      };
  }
}

export function allowsThinkingWork(state) {
  return state !== 'flat';
}

// ---------- XmR (Making Data Count conventions) ----------

export const BASELINE_POINTS = 15;

export function xmrLimits(values) {
  if (values.length < 2) return null;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  let mrSum = 0;
  for (let i = 1; i < values.length; i++) mrSum += Math.abs(values[i] - values[i - 1]);
  const mrBar = mrSum / (values.length - 1);
  const sigma = mrBar / 1.128;
  return { mean, mrBar, sigma, ucl: mean + 2.66 * mrBar, lcl: mean - 2.66 * mrBar };
}

// Limits are fixed from the first 15 points and only change when you recalculate.
export function baselineFrom(values) {
  if (values.length < BASELINE_POINTS) return null;
  return xmrLimits(values.slice(0, BASELINE_POINTS));
}

// Each rule returns the indexes of points it flags, with a side ('high' or 'low').
export const RULES = {
  outsideLimits: {
    label: 'Point outside the process limits',
    check(values, b) {
      const hits = [];
      values.forEach((v, i) => {
        if (v > b.ucl) hits.push({ i, side: 'high' });
        else if (v < b.lcl) hits.push({ i, side: 'low' });
      });
      return hits;
    },
  },
  shift: {
    label: 'Seven or more points in a row on one side of the mean',
    check(values, b, n = 7) {
      const hits = [];
      let run = 0, side = null;
      values.forEach((v, i) => {
        const s = v > b.mean ? 'high' : v < b.mean ? 'low' : null;
        if (s && s === side) run++;
        else { run = s ? 1 : 0; side = s; }
        if (run >= n) {
          for (let k = i - run + 1; k <= i; k++) if (!hits.some(h => h.i === k)) hits.push({ i: k, side });
        }
      });
      return hits;
    },
  },
  trend: {
    label: 'Six or more points in a row rising or falling',
    check(values, _b, n = 6) {
      const hits = [];
      let run = 1, dir = 0;
      for (let i = 1; i < values.length; i++) {
        const d = Math.sign(values[i] - values[i - 1]);
        if (d !== 0 && d === dir) run++;
        else { run = d === 0 ? 1 : 2; dir = d; }
        if (run >= n) {
          const side = dir > 0 ? 'high' : 'low';
          for (let k = i - run + 1; k <= i; k++) if (!hits.some(h => h.i === k)) hits.push({ i: k, side });
        }
      }
      return hits;
    },
  },
  nearLimit: {
    label: 'Two out of three points close to a limit',
    check(values, b) {
      const hits = [];
      const hiBand = b.mean + 2 * b.sigma, loBand = b.mean - 2 * b.sigma;
      for (let i = 2; i < values.length; i++) {
        const w = values.slice(i - 2, i + 1);
        for (const [side, test] of [['high', v => v > hiBand], ['low', v => v < loBand]]) {
          if (w.filter(test).length >= 2) {
            for (let k = i - 2; k <= i; k++) {
              if (test(values[k]) && !hits.some(h => h.i === k)) hits.push({ i: k, side });
            }
          }
        }
      }
      return hits;
    },
  },
};

export const DEFAULT_RULESET = ['outsideLimits', 'shift', 'trend', 'nearLimit'];

// Which direction is a concern for each metric. Anything else is an improvement.
export const CONCERN_SIDE = { energy: 'low', mood: 'low', anxiety: 'high', sleep: null, drinks: 'high' };

export function detectSignals(values, baseline, ruleset = DEFAULT_RULESET) {
  if (!baseline) return [];
  const out = [];
  for (const name of ruleset) {
    for (const h of RULES[name].check(values, baseline)) out.push({ ...h, rule: name });
  }
  return out;
}

// Only signals on the latest point raise a flag; older ones are history.
export function latestSignals(metric, values, baseline, ruleset = DEFAULT_RULESET) {
  const last = values.length - 1;
  const concern = CONCERN_SIDE[metric];
  const seen = new Set();
  return detectSignals(values, baseline, ruleset)
    .filter(s => s.i === last)
    .filter(s => (seen.has(s.rule) ? false : seen.add(s.rule)))
    .map(s => ({
      metric,
      rule: s.rule,
      side: s.side,
      kind: concern == null ? 'change' : s.side === concern ? 'concern' : 'improvement',
    }));
}

export function protocolForSignal(sig) {
  if (sig.kind !== 'concern') return null;
  if (sig.metric === 'anxiety') return 'spiral';
  if (sig.metric === 'energy' || sig.metric === 'mood') return 'flat';
  return null;
}

// ---------- Activity suggestion ----------

export function activityStats(activityId, log) {
  const rows = log.filter(r => r.activity_id === activityId);
  const rated = rows.filter(r => r.actual != null && r.predicted != null);
  const gap = rated.length ? rated.reduce((a, r) => a + (r.actual - r.predicted), 0) / rated.length : 0;
  const done = rows.filter(r => r.outcome === 'done').length + 0.5 * rows.filter(r => r.outcome === 'partial').length;
  const completion = rows.length ? done / rows.length : 0.5;
  const last = rows.length ? rows.map(r => r.created_at).sort().at(-1) : null;
  return { count: rows.length, gap, completion, last };
}

export function scoreActivity(a, log, now = new Date(), lastCategory = null) {
  const s = activityStats(a.id, log);
  const daysSince = s.last ? (now - new Date(s.last)) / 86400000 : 7;
  let score = 1 + 0.5 * s.gap + s.completion + 0.1 * Math.min(daysSince, 7) + (a.boost ?? 0);
  if (lastCategory && a.category === lastCategory) score -= 2;
  return score;
}

export function suggestActivity(activities, log, opts = {}) {
  const { twoMinuteOnly = false, excludeCategories = [], exclude = [], now = new Date() } = opts;
  const lastRow = [...log].sort((x, y) => (x.created_at < y.created_at ? -1 : 1)).at(-1);
  const lastCategory = lastRow ? activities.find(a => a.id === lastRow.activity_id)?.category : null;
  const pool = activities.filter(a =>
    a.active !== false &&
    !exclude.includes(a.id) &&
    !excludeCategories.includes(a.category) &&
    (!twoMinuteOnly || (a.two_minute_start ?? '').trim() !== ''));
  if (!pool.length) return null;
  return pool
    .map(a => ({ a, s: scoreActivity(a, log, now, lastCategory) }))
    .sort((x, y) => y.s - x.s || x.a.name.localeCompare(y.a.name))[0].a;
}

// ---------- Safety ----------

export const RISK_PHRASES = [
  'kill myself', 'killing myself', 'suicide', 'suicidal', 'end my life', 'end it all',
  'want to die', 'wish i was dead', 'better off without me', 'better off dead',
  'no reason to live', 'no point living', 'not be here', 'hurt myself', 'self harm', 'self-harm',
  'overdose', 'take my own life',
];

export function hasRiskLanguage(text) {
  if (!text) return false;
  const t = text.toLowerCase().replace(/\s+/g, ' ');
  return RISK_PHRASES.some(p => t.includes(p));
}

// dailyMoods: [{date:'YYYY-MM-DD', mood}] sorted by date, one per day.
export function lowMoodRun(dailyMoods, days = 3, max = 2) {
  if (dailyMoods.length < days) return false;
  const tail = dailyMoods.slice(-days);
  for (let i = 1; i < tail.length; i++) {
    const gap = (new Date(tail[i].date) - new Date(tail[i - 1].date)) / 86400000;
    if (gap !== 1) return false;
  }
  return tail.every(d => d.mood <= max);
}

// ---------- Helpers ----------

export function localDate(d = new Date()) {
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// One value per day: the latest check-in of that day.
export function dailySeries(checkins, metric) {
  const byDay = new Map();
  for (const c of [...checkins].sort((a, b) => (a.created_at < b.created_at ? -1 : 1))) {
    if (c[metric] != null) byDay.set(localDate(new Date(c.created_at)), c[metric]);
  }
  return [...byDay.entries()].map(([date, value]) => ({ date, value }));
}

export function pickEvidence(entries, claim, n = 3, rand = Math.random) {
  const shuffle = arr => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  // Entries tagged to the claim come first; others only fill the gap.
  const tagged = shuffle(entries.filter(e => e.claim === claim));
  const others = shuffle(entries.filter(e => e.claim !== claim));
  return [...tagged, ...others].slice(0, n);
}
