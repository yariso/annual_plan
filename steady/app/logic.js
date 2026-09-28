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

// The path, in the order a friend suggested: EMDR skills, then gestalt, then DBT.
// Which exercise each state gets lives with the exercises.
import { pickExercise } from './exercises.js';
export const STAGES = [1, 2, 3];
export const stageExercise = pickExercise;

// The ordered steps for a state. The home screen shows only the current step.
export function routePlan(state, c, t = DEFAULT_THRESHOLDS, stage = 1) {
  switch (state) {
    case 'flat':
      // Low energy never gets thinking work, whatever the stage.
      return {
        steps: [{ kind: 'activity', twoMinuteOnly: true, opposite: stage === 3 }],
        thoughtRecord: false,
        reading: false,
      };
    case 'spiral': {
      const steps = [];
      if (c.imposter) steps.push({ kind: 'evidence', count: 3, claim: c.claim ?? 1 });
      if (c.worry) steps.push({ kind: 'name-worries' });
      steps.push({ kind: 'exercise', id: stageExercise(stage, 'spiral', c) });
      steps.push({ kind: 'activity' });
      return { steps, thoughtRecord: c.energy >= t.thoughtRecordEnergy, reading: false };
    }
    case 'push': {
      const steps = [{ kind: 'stop-time' }, { kind: 'first-task' }];
      if (stage === 3) steps.unshift({ kind: 'exercise', id: 'stop' });
      steps.push({ kind: 'activity', excludeCategories: ['work-adjacent'] }, { kind: 'warning-check' });
      return { steps, thoughtRecord: false, reading: false };
    }
    default:
      return {
        steps: [{ kind: 'activity' }, { kind: 'exercise', id: stageExercise(stage, 'steady', c), optional: true }],
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

// ---------- Weekly review ----------

const DAY = 86400000;
const round1 = n => Math.round(n * 10) / 10;
export const mean = xs => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

export function inWindow(iso, start, end) {
  const t = new Date(iso).getTime();
  return t > start.getTime() && t <= end.getTime();
}

export function reviewDue(reviews, checkins, now = new Date()) {
  const last = reviews.length ? new Date(reviews.at(-1).created_at) : null;
  if (last) return now - last >= 7 * DAY;
  const first = checkins.length ? new Date([...checkins].map(c => c.created_at).sort()[0]) : null;
  return !!first && now - first >= 7 * DAY;
}

// Facts about the last seven days. No praise, no counting what did not happen.
export function weeklySummary({ checkins, activity_log, activities, exercise_log }, end = new Date(), focus = '') {
  const start = new Date(end.getTime() - 7 * DAY);
  const prevStart = new Date(end.getTime() - 14 * DAY);
  const week = checkins.filter(c => inWindow(c.created_at, start, end));
  const prev = checkins.filter(c => inWindow(c.created_at, prevStart, start));
  const m = (rows, k) => { const v = mean(rows.map(r => r[k]).filter(x => x != null)); return v == null ? null : round1(v); };
  const s = {
    mood: m(week, 'mood'), energy: m(week, 'energy'), anxiety: m(week, 'anxiety'), prevMood: m(prev, 'mood'),
  };
  const acts = activity_log.filter(r => inWindow(r.created_at, start, end));
  s.activitiesDone = acts.filter(r => r.outcome !== 'not').length;
  const rated = acts.filter(r => r.actual != null && r.predicted != null && r.actual > r.predicted)
    .sort((a, b) => (b.actual - b.predicted) - (a.actual - a.predicted));
  s.surprises = rated.map(r => ({ name: activities.find(a => a.id === r.activity_id)?.name ?? 'Something',
    predicted: r.predicted, actual: r.actual }));
  const ex = exercise_log.filter(r => inWindow(r.created_at, start, end));
  const done = ex.filter(r => r.completed);
  s.exercisesDone = done.length;
  const drops = done.filter(r => r.before != null && r.after != null).map(r => r.before - r.after);
  s.avgDrop = drops.length ? round1(mean(drops)) : null;
  s.skipped = [...new Set(ex.filter(r => !r.completed).map(r => r.exercise_name))];

  const lines = [];
  lines.push(s.mood == null ? 'No check-ins this week.'
    : `Mood averaged ${s.mood} out of 10${s.prevMood != null ? ` (${s.prevMood} the week before)` : ''}. Energy ${s.energy}, anxiety ${s.anxiety}.`);
  const best = s.surprises[0];
  lines.push(s.activitiesDone
    ? `Started ${s.activitiesDone} small thing${s.activitiesDone === 1 ? '' : 's'}.${best ? ` ${best.name} went better than expected: guessed ${best.predicted}, felt ${best.actual}.` : ''}`
    : 'No small activities logged this week.');
  lines.push(focus ? `Next week: ${focus}` : `Did ${s.exercisesDone} exercise${s.exercisesDone === 1 ? '' : 's'}${s.avgDrop != null ? `, upset level down ${s.avgDrop} on average` : ''}.`);
  return { ...s, lines };
}

// ---------- Adaptation ----------

export function quantile(values, q) {
  const v = [...values].sort((a, b) => a - b);
  if (!v.length) return null;
  const pos = (v.length - 1) * q;
  const lo = Math.floor(pos), hi = Math.ceil(pos);
  return v[lo] + (v[hi] - v[lo]) * (pos - lo);
}

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

// After three weeks of check-ins, suggest thresholds from your own data.
export function suggestThresholds(checkins, current = DEFAULT_THRESHOLDS, minDays = 21) {
  const days = new Set(checkins.map(c => localDate(new Date(c.created_at))));
  if (days.size < minDays) return null;
  const energy = checkins.map(c => c.energy).filter(x => x != null);
  const anxiety = checkins.map(c => c.anxiety).filter(x => x != null);
  return {
    ...current,
    flatEnergy: clamp(Math.floor(quantile(energy, 0.25)), 2, 6),
    spiralAnxiety: clamp(Math.ceil(quantile(anxiety, 0.75)), 5, 9),
    pushEnergy: clamp(Math.ceil(quantile(energy, 0.75)), 6, 9),
  };
}

// Consecutive skips, most recent first.
export function skipStreak(log, id) {
  const rows = log.filter(r => r.exercise_name === id).sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  let n = 0;
  for (const r of rows) { if (r.completed) break; n++; }
  return { n, last: rows[0]?.created_at ?? null };
}

// Skipped twice: shortened. Three times: retired for a month.
export function exerciseStatus(log, id, now = new Date()) {
  const { n, last } = skipStreak(log, id);
  if (n >= 3) return now - new Date(last) < 30 * DAY ? 'retired' : 'normal';
  return n === 2 ? 'short' : 'normal';
}

export function resolveExercise(id, alternatives, log, now = new Date()) {
  if (exerciseStatus(log, id, now) !== 'retired') return id;
  return alternatives.find(a => a !== id && exerciseStatus(log, a, now) !== 'retired') ?? null;
}

// ---------- New thing landed ----------

export function eventFollowUps(events, now = new Date()) {
  const out = [];
  for (const e of events) {
    const age = now - new Date(e.created_at);
    if (e.feeling_24h == null && age >= DAY && age < 3 * DAY) out.push({ id: e.id, which: 'feeling_24h' });
    else if (e.feeling_72h == null && age >= 3 * DAY && age < 10 * DAY) out.push({ id: e.id, which: 'feeling_72h' });
  }
  return out;
}

// ---------- Reading ----------

export function readingLeft(readingLog, cap, now = new Date()) {
  const today = localDate(now);
  const used = readingLog.filter(r => localDate(new Date(r.created_at)) === today).reduce((a, r) => a + r.minutes, 0);
  return Math.max(0, cap - used);
}

// The cap only ever goes down.
export function lowerCap(current, requested) {
  return Math.min(current, Math.max(1, Math.round(requested)));
}

// ---------- Thought records ----------

export const normaliseThought = t => t.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();

// How strongly each recurring thought is believed, before and after, over time.
export function thoughtTrajectories(records) {
  const groups = new Map();
  for (const r of [...records].sort((a, b) => (a.created_at < b.created_at ? -1 : 1))) {
    const key = normaliseThought(r.thought);
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, { thought: r.thought, points: [] });
    groups.get(key).points.push({ date: localDate(new Date(r.created_at)), before: r.belief_before, after: r.belief_after });
  }
  return [...groups.values()].sort((a, b) => b.points.length - a.points.length);
}
