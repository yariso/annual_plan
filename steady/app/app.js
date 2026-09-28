import {
  DEFAULT_THRESHOLDS, STATES, routeState, routePlan, baselineFrom, xmrLimits, detectSignals,
  latestSignals, protocolForSignal, suggestActivity, activityStats, hasRiskLanguage, lowMoodRun,
  localDate, dailySeries, pickEvidence, BASELINE_POINTS, RULES,
} from './logic.js';
import * as store from './store.js';

const db = store.load();
const $ = sel => document.querySelector(sel);
const main = () => $('#main');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const thresholds = () => ({ ...DEFAULT_THRESHOLDS, ...(db.settings.thresholds ?? {}) });

const STATE_LABEL = { flat: 'Flat', spiral: 'Spiral', push: 'Push', steady: 'Steady' };
const METRICS = [
  ['energy', 'Energy'], ['mood', 'Mood'], ['anxiety', 'Anxiety'], ['sleep_hours', 'Sleep'], ['drinks', 'Drinks'],
];
const CLAIMS = { 1: 'Quality of my work', 2: 'Leadership and team building', 3: 'Other' };

let timer = null;
function clearTimer() { if (timer) { clearInterval(timer); timer = null; } }

function today() {
  const t = db.today;
  return t && t.date === localDate() ? t : null;
}

// ---------- Router ----------

const routes = { home, checkin, evidence, charts, more, safety };

function render() {
  clearTimer();
  const name = (location.hash.slice(1) || 'home').split('?')[0];
  (routes[name] ?? home)();
  document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === `#${name}`));
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', render);

// ---------- Small UI pieces ----------

function chips(name, values, selected, cls = '') {
  return `<div class="chips ${cls}" data-name="${name}">${values.map(v => {
    const [val, label] = Array.isArray(v) ? v : [v, v];
    return `<button type="button" class="chip${String(selected) === String(val) ? ' on' : ''}" data-val="${esc(val)}">${esc(label)}</button>`;
  }).join('')}</div>`;
}

function bindChips(root, onPick) {
  root.querySelectorAll('.chips').forEach(group => {
    group.addEventListener('click', e => {
      const b = e.target.closest('.chip');
      if (!b) return;
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
      b.classList.add('on');
      onPick(group.dataset.name, b.dataset.val);
    });
  });
}

function countdown(el, seconds, onDone) {
  clearTimer();
  let left = seconds;
  const show = () => { el.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`; };
  show();
  timer = setInterval(() => {
    left -= 1;
    show();
    if (left <= 0) { clearTimer(); onDone(); }
  }, 1000);
}

function download(name, text, type) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- Home ----------

function home() {
  const t = today();
  const m = main();
  if (!t) {
    m.innerHTML = `
      ${signalBanner()}
      <section class="card one">
        <p class="kicker">Next</p>
        <h2>Check in</h2>
        <p class="muted">Under a minute. Then one small thing.</p>
        <a class="btn primary" href="#checkin">Check in</a>
      </section>`;
    bindSignalBanner(m);
    return;
  }
  m.innerHTML = `
    <div class="state-row">
      ${STATES.map(s => `<button class="state ${s}${t.state === s ? ' on' : ''}" data-state="${s}">${STATE_LABEL[s]}</button>`).join('')}
    </div>
    ${signalBanner()}
    <div id="step"></div>`;
  m.querySelectorAll('.state').forEach(b => b.addEventListener('click', () => setState(b.dataset.state, true)));
  bindSignalBanner(m);
  renderStep($('#step'));
}

function setState(state, overridden) {
  const t = today();
  const c = db.checkins.find(x => x.id === t.checkin_id) ?? {};
  t.state = state;
  t.overridden = overridden;
  t.plan = routePlan(state, planInput(c, t), thresholds());
  t.step = 0;
  if (overridden) store.update('checkins', c.id, { state, state_overridden: true });
  store.save();
  render();
}

function planInput(c) {
  return {
    energy: c.energy, mood: c.mood, anxiety: c.anxiety, started: c.started, imposter: c.imposter_thought,
    worry: c.worry, intoSomething: c.into_something, claim: c.claim,
  };
}

function signalBanner() {
  const open = db.signals.filter(s => !s.acknowledged);
  if (!open.length) return '';
  const label = s => `${METRICS.find(m => m[0] === s.metric)?.[1] ?? s.metric}: ${RULES[s.rule]?.label.toLowerCase() ?? s.rule}`;
  return `<section class="flag">${open.map(s => `
    <div class="flag-row ${s.kind}">
      <div><strong>${s.kind === 'concern' ? 'Signal' : 'Change'}</strong> ${esc(label(s))} (${s.side})</div>
      <div class="row">
        ${protocolForSignal(s) && today() ? `<button class="btn small" data-proto="${protocolForSignal(s)}" data-sig="${s.id}">Use ${STATE_LABEL[protocolForSignal(s)]} route</button>` : ''}
        <button class="btn small ghost" data-ack="${s.id}">Noted</button>
      </div>
    </div>`).join('')}</section>`;
}

function bindSignalBanner(root) {
  root.querySelectorAll('[data-ack]').forEach(b => b.addEventListener('click', () => {
    store.update('signals', Number(b.dataset.ack), { acknowledged: true });
    render();
  }));
  root.querySelectorAll('[data-proto]').forEach(b => b.addEventListener('click', () => {
    store.update('signals', Number(b.dataset.sig), { acknowledged: true });
    setState(b.dataset.proto, true);
  }));
}

// ---------- Steps ----------

function nextStep() {
  const t = today();
  t.step += 1;
  store.save();
  render();
}

function renderStep(el) {
  const t = today();
  const step = t.plan.steps[t.step];
  if (!step) {
    el.innerHTML = `<section class="card one"><p class="kicker">Done</p><h2>That's today's one thing.</h2>
      <p class="muted">Put the phone down. Check in again whenever you like.</p>
      <a class="btn ghost" href="#checkin">Check in again</a></section>`;
    return;
  }
  const fn = { activity: stepActivity, evidence: stepEvidence, 'name-worries': stepWorries, defusion: stepDefusion,
    values: stepValues, 'stop-time': stepStopTime, 'first-task': stepFirstTask, 'warning-check': stepWarnings }[step.kind];
  fn(el, step, t);
}

function stepActivity(el, step, t) {
  const extras = (t.extras ??= {});
  const skipped = extras.skipped ?? [];
  const a = suggestActivity(db.activities, db.activity_log, {
    twoMinuteOnly: !!step.twoMinuteOnly, excludeCategories: step.excludeCategories ?? [], exclude: skipped,
  }) ?? suggestActivity(db.activities, db.activity_log, { twoMinuteOnly: !!step.twoMinuteOnly, excludeCategories: step.excludeCategories ?? [] });
  if (!a) { el.innerHTML = `<section class="card one"><h2>No activities yet</h2><a class="btn" href="#more">Add one</a></section>`; return; }
  let predicted = null, actual = null, outcome = null;

  const pick = () => {
    el.innerHTML = `<section class="card one">
      <p class="kicker">${esc(a.category)}</p>
      <h2>${esc(a.name)}</h2>
      <p class="start">${esc(a.two_minute_start)}</p>
      <p class="label">How much will you enjoy it? (0 to 10)</p>
      ${chips('predicted', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], predicted, 'eleven')}
      <button class="btn primary" id="go" ${predicted == null ? 'disabled' : ''}>Start two minutes</button>
      <button class="btn ghost" id="other">Something else</button>
    </section>`;
    bindChips(el, (_n, v) => { predicted = Number(v); $('#go').disabled = false; });
    $('#go').addEventListener('click', run);
    $('#other').addEventListener('click', () => { extras.skipped = [...skipped, a.id]; store.save(); render(); });
  };

  const run = () => {
    el.innerHTML = `<section class="card one center">
      <p class="kicker">${esc(a.name)}</p>
      <p class="start">${esc(a.two_minute_start)}</p>
      <div class="clock" id="clock"></div>
      <p class="muted">Carry on past the timer if you want to. Stopping at two minutes counts.</p>
      <button class="btn" id="stop">Stop</button>
    </section>`;
    countdown($('#clock'), 120, rate);
    $('#stop').addEventListener('click', () => { clearTimer(); rate(); });
  };

  const rate = () => {
    el.innerHTML = `<section class="card one">
      <p class="kicker">${esc(a.name)}</p>
      <p class="label">How much did you enjoy it? (0 to 10)</p>
      ${chips('actual', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], actual, 'eleven')}
      <p class="label">Did it happen?</p>
      ${chips('outcome', [['done', 'Done'], ['partial', 'Partly'], ['not', 'Not this time']], outcome)}
      <input id="note" placeholder="Note (optional)" maxlength="140">
      <button class="btn primary" id="save" disabled>Save</button>
    </section>`;
    const ready = () => { $('#save').disabled = actual == null || outcome == null; };
    bindChips(el, (n, v) => { if (n === 'actual') actual = Number(v); else outcome = v; ready(); });
    $('#save').addEventListener('click', () => {
      store.insert('activity_log', { activity_id: a.id, predicted, actual, outcome, note: $('#note').value.trim() });
      if (outcome !== 'not') markStarted();
      extras.skipped = [];
      extras.lastGap = { name: a.name, predicted, actual };
      nextStep();
    });
  };
  pick();
}

function markStarted() {
  const c = db.checkins.find(x => x.id === today().checkin_id);
  if (c && !c.started) store.update('checkins', c.id, { started: true });
}

function stepEvidence(el, step, t) {
  const extras = (t.extras ??= {});
  if (!extras.evidenceIds) {
    extras.evidenceIds = pickEvidence(db.evidence, step.claim, step.count).map(e => e.id);
    for (const id of extras.evidenceIds) {
      const e = db.evidence.find(x => x.id === id);
      store.update('evidence', id, { read_count: (e.read_count ?? 0) + 1 });
    }
  }
  const items = extras.evidenceIds.map(id => db.evidence.find(x => x.id === id)).filter(Boolean);
  el.innerHTML = `<section class="card one">
    <p class="kicker">Evidence on: ${esc(CLAIMS[step.claim])}</p>
    <h2>Read these slowly</h2>
    ${items.map(e => `<article class="ev">
      <p>${esc(e.what_happened)}</p>
      <p class="muted">${esc(e.date)} · ${esc(e.source)} · strength ${e.strength}/5</p>
      ${e.yes_but ? `<p class="muted">The yes-but: ${esc(e.yes_but)}</p>` : ''}
    </article>`).join('')}
    ${items.length < step.count ? `<p class="muted">Only ${items.length} so far. Add more in Evidence when something happens.</p>` : ''}
    <button class="btn primary" id="next">Next</button>
  </section>`;
  $('#next').addEventListener('click', nextStep);
}

function stepWorries(el, _step, t) {
  const extras = (t.extras ??= {});
  el.innerHTML = `<section class="card one">
    <p class="kicker">Worry</p>
    <h2>Name them</h2>
    <p class="muted">A word or two each, commas between. No need to solve anything.</p>
    <input id="w" placeholder="the cat, A levels, ..." value="${esc((extras.worries ?? []).join(', '))}">
    <button class="btn primary" id="next">Next</button>
  </section>`;
  $('#next').addEventListener('click', () => {
    extras.worries = $('#w').value.split(',').map(s => s.trim()).filter(Boolean);
    nextStep();
  });
}

function stepDefusion(el, step, t) {
  const worries = t.extras?.worries ?? [];
  const lines = step.variant === 'worry'
    ? (worries.length ? worries : ['this']).map(w => `I'm noticing worry about ${w}.`)
    : ['Say the thought to yourself, word for word.', 'Now say: "I\'m having the thought that..." and the thought.',
       'Now: "I notice I\'m having the thought that..." and the thought.'];
  el.innerHTML = `<section class="card one">
    <p class="kicker">Defusion, 90 seconds</p>
    <h2>${step.variant === 'worry' ? 'Say each one, slowly' : 'Step back from the thought'}</h2>
    <ul class="script">${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
    <p class="muted">Then notice where you are: five things you can see.</p>
    <div class="clock" id="clock"></div>
    <button class="btn primary" id="next">Next</button>
  </section>`;
  const start = Date.now();
  const finish = completed => {
    store.insert('exercise_log', { exercise_name: `defusion-${step.variant}`, module: 'spiral',
      duration_seconds: Math.round((Date.now() - start) / 1000), completed });
    nextStep();
  };
  countdown($('#clock'), step.seconds, () => { $('#clock').textContent = 'Done'; });
  $('#next').addEventListener('click', () => finish(Date.now() - start >= step.seconds * 1000 - 1500));
}

function stepValues(el) {
  const vals = db.values.length ? db.values : ['family', 'health', 'calm'];
  let chosen = null;
  el.innerHTML = `<section class="card one">
    <p class="kicker">Optional</p>
    <h2>Values check</h2>
    <p class="label">Pick one</p>
    ${chips('value', vals, null)}
    <p class="label">One thing in the next ten minutes that moves towards it</p>
    <input id="act" maxlength="120">
    <button class="btn primary" id="save">Commit</button>
    <button class="btn ghost" id="skip">Skip</button>
  </section>`;
  bindChips(el, (_n, v) => { chosen = v; });
  $('#save').addEventListener('click', () => {
    store.insert('exercise_log', { exercise_name: 'values-check', module: 'steady', duration_seconds: 0, completed: true,
      note: `${chosen ?? ''}: ${$('#act').value.trim()}` });
    nextStep();
  });
  $('#skip').addEventListener('click', () => {
    store.insert('exercise_log', { exercise_name: 'values-check', module: 'steady', duration_seconds: 0, completed: false });
    nextStep();
  });
}

function stepStopTime(el, _s, t) {
  const extras = (t.extras ??= {});
  el.innerHTML = `<section class="card one">
    <p class="kicker">Push</p>
    <h2>What time do you stop today?</h2>
    ${db.settings.work_rules.length ? `<ul class="rules">${db.settings.work_rules.map(r => `<li>${esc(r)}</li>`).join('')}</ul>` : ''}
    <input id="stop" type="time" value="${esc(extras.stopTime ?? '18:00')}">
    <button class="btn primary" id="next">Set it</button>
  </section>`;
  $('#next').addEventListener('click', () => { extras.stopTime = $('#stop').value; nextStep(); });
}

function stepFirstTask(el, _s, t) {
  const extras = (t.extras ??= {});
  el.innerHTML = `<section class="card one">
    <p class="kicker">Push</p>
    <h2>Tomorrow's first task</h2>
    <p class="muted">Write it now, so today can end.</p>
    <input id="task" maxlength="140" value="${esc(extras.firstTask ?? '')}">
    <button class="btn primary" id="next">Written</button>
  </section>`;
  $('#next').addEventListener('click', () => { extras.firstTask = $('#task').value.trim(); nextStep(); });
}

function stepWarnings(el, _s, t) {
  const list = db.early_warnings.length ? db.early_warnings
    : ['Working for hours on one thing', 'Sleeping a lot', 'Drinking more', 'Pulling away from people', 'Feeling overwhelmed'];
  el.innerHTML = `<section class="card one">
    <p class="kicker">Early warning</p>
    <h2>Any of these this week?</h2>
    <div class="checks">${list.map((w, i) => `<label><input type="checkbox" data-i="${i}"> ${esc(w)}</label>`).join('')}</div>
    <div id="tip"></div>
    <button class="btn primary" id="next">Done</button>
  </section>`;
  const upd = () => {
    const n = el.querySelectorAll('input:checked').length;
    $('#tip').innerHTML = n >= 3 ? `<div class="flag-row concern"><strong>Three or more.</strong> ${db.settings.tip_protocol
      ? esc(db.settings.tip_protocol) : 'Time for your tip protocol. Write it in More, while things are calm.'}</div>` : '';
  };
  el.querySelectorAll('input').forEach(i => i.addEventListener('change', upd));
  $('#next').addEventListener('click', () => {
    (t.extras ??= {}).warnings = [...el.querySelectorAll('input:checked')].map(i => list[i.dataset.i]);
    nextStep();
  });
}

// ---------- Check-in ----------

function checkin() {
  const f = { energy: null, mood: null, anxiety: null, sleep_hours: null, drinks: null, started: false,
    imposter_thought: false, worry: false, into_something: false, claim: 1 };
  const yn = (name, label) => `<div class="yn"><span>${label}</span>${chips(name, [['0', 'No'], ['1', 'Yes']], '0', 'two')}</div>`;
  const scale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  main().innerHTML = `<form class="card" id="f">
    <p class="label">Energy</p>${chips('energy', scale, null, 'ten')}
    <p class="label">Mood</p>${chips('mood', scale, null, 'ten')}
    <p class="label">Anxiety</p>${chips('anxiety', scale, null, 'ten')}
    <p class="label">Hours slept</p>${chips('sleep_hours', [[4, '4-'], 5, 6, 7, 8, 9, 10, 11, 12, [13, '13+']], null, 'ten')}
    ${db.settings.show_drinks ? `<p class="label">Drinks yesterday</p>${chips('drinks', [0, 1, 2, 3, 4, 5, [6, '6+']], null)}` : ''}
    ${yn('started', 'Started anything yet today?')}
    ${yn('imposter_thought', 'Imposter thought?')}
    <div id="claim" hidden><p class="label">About</p>${chips('claim', Object.entries(CLAIMS), 1)}</div>
    ${yn('worry', 'Worry running?')}
    ${yn('into_something', 'Into something?')}
    <input id="note" placeholder="One line (optional)" maxlength="200">
    <button class="btn primary" id="save" type="submit" disabled>Done</button>
  </form>`;
  const form = $('#f');
  bindChips(form, (n, v) => {
    if (['started', 'imposter_thought', 'worry', 'into_something'].includes(n)) f[n] = v === '1';
    else f[n] = Number(v);
    $('#claim').hidden = !f.imposter_thought;
    $('#save').disabled = f.energy == null || f.mood == null || f.anxiety == null || f.sleep_hours == null;
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const note = $('#note').value.trim();
    const input = { energy: f.energy, mood: f.mood, anxiety: f.anxiety, started: f.started,
      imposter: f.imposter_thought, worry: f.worry, intoSomething: f.into_something, claim: f.claim };
    const state = routeState(input, new Date(), thresholds());
    const c = store.insert('checkins', { ...f, note, state, state_overridden: false });
    db.today = { date: localDate(), checkin_id: c.id, state, overridden: false,
      plan: routePlan(state, input, thresholds()), step: 0, extras: {} };
    store.save();
    flagSignals();
    const moods = dailySeries(db.checkins, 'mood').map(d => ({ date: d.date, mood: d.value }));
    location.hash = hasRiskLanguage(note) || lowMoodRun(moods) ? 'safety' : 'home';
  });
}

function flagSignals() {
  const date = localDate();
  for (const [metric] of METRICS) {
    const series = dailySeries(db.checkins, metric).map(d => d.value);
    const b = ensureBaseline(metric, series);
    for (const s of latestSignals(metric === 'sleep_hours' ? 'sleep' : metric, series, b)) {
      if (db.signals.some(x => x.metric === metric && x.rule === s.rule && x.date_flagged === date)) continue;
      store.insert('signals', { ...s, metric, date_flagged: date, acknowledged: false });
    }
  }
}

function ensureBaseline(metric, series) {
  if (!db.baselines[metric] && series.length >= BASELINE_POINTS) {
    db.baselines[metric] = { ...baselineFrom(series), set_at: localDate(), from: 'first 15' };
    store.save();
  }
  return db.baselines[metric] ?? null;
}

// ---------- Evidence ----------

function evidence() {
  main().innerHTML = `<section class="card">
    <h2>Evidence log</h2>
    <p class="muted">What happened, in your words. Not how you felt about it.</p>
    <details><summary class="btn">Add an entry</summary>
      <form id="ef">
        <input name="date" type="date" value="${localDate()}">
        <input name="source" placeholder="Source (who, where)" required>
        <textarea name="what_happened" placeholder="What happened" required></textarea>
        <p class="label">Bears on</p>${chips('claim', Object.entries(CLAIMS), 1)}
        <p class="label">Strength</p>${chips('strength', [1, 2, 3, 4, 5], 3)}
        <input name="yes_but" placeholder="The yes-but your mind offers (optional)">
        <button class="btn primary" type="submit">Save</button>
      </form>
    </details>
    ${[...db.evidence].reverse().map(e => `<article class="ev">
      <p>${esc(e.what_happened)}</p>
      <p class="muted">${esc(e.date)} · ${esc(e.source)} · ${esc(CLAIMS[e.claim])} · ${e.strength}/5 · read ${e.read_count ?? 0}</p>
      ${e.yes_but ? `<p class="muted">Yes-but: ${esc(e.yes_but)}</p>` : ''}
    </article>`).join('')}
  </section>`;
  const pick = { claim: 1, strength: 3 };
  const form = $('#ef');
  bindChips(form, (n, v) => { pick[n] = Number(v); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    store.insert('evidence', { ...d, ...pick, read_count: 0 });
    render();
  });
}

// ---------- Charts ----------

function xmrChart(metric, label) {
  const series = dailySeries(db.checkins, metric);
  const vals = series.map(d => d.value);
  const b = ensureBaseline(metric, vals);
  const W = 320, H = 150, P = 22;
  const all = [...vals, ...(b ? [b.ucl, b.lcl] : [])];
  const lo = Math.min(0, ...all), hi = Math.max(metric === 'drinks' ? 6 : 10, ...all);
  const x = i => P + (vals.length < 2 ? 0 : (i * (W - 2 * P)) / (vals.length - 1));
  const y = v => H - P - ((v - lo) * (H - 2 * P)) / (hi - lo || 1);
  const concern = { energy: 'low', mood: 'low', anxiety: 'high', drinks: 'high' }[metric];
  const flagged = new Map();
  for (const s of detectSignals(vals, b)) if (!flagged.has(s.i)) flagged.set(s.i, s.side === concern ? 'concern' : 'improve');
  const hl = (v, cls, txt) => `<line x1="${P}" x2="${W - P}" y1="${y(v)}" y2="${y(v)}" class="${cls}"/>
    <text x="${W - P + 2}" y="${y(v) + 3}" class="axis">${txt}</text>`;
  const mean = b ? b.mean : vals.length ? xmrLimits(vals)?.mean ?? vals[0] : null;
  return `<section class="card chart">
    <div class="row between"><h3>${label}</h3><span class="muted">${vals.length} day${vals.length === 1 ? '' : 's'}</span></div>
    ${vals.length ? `<svg viewBox="0 0 ${W + 16} ${H}" role="img" aria-label="${label} XmR chart">
      ${b ? hl(b.ucl, 'limit', b.ucl.toFixed(1)) + hl(b.lcl, 'limit', b.lcl.toFixed(1)) : ''}
      ${mean != null ? hl(mean, 'mean', mean.toFixed(1)) : ''}
      <polyline class="line" points="${vals.map((v, i) => `${x(i)},${y(v)}`).join(' ')}"/>
      ${vals.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" class="pt ${flagged.get(i) ?? ''}"><title>${series[i].date}: ${v}</title></circle>`).join('')}
    </svg>` : '<p class="muted">No data yet.</p>'}
    <p class="muted small">${b ? `Limits from ${b.from}, set ${b.set_at}.` : `Limits appear after ${BASELINE_POINTS} days (${Math.max(0, BASELINE_POINTS - vals.length)} to go).`}</p>
    ${vals.length >= BASELINE_POINTS ? `<button class="btn small ghost" data-recalc="${metric}">Recalculate from last ${BASELINE_POINTS}</button>` : ''}
  </section>`;
}

function charts() {
  const shown = METRICS.filter(([m]) => m !== 'drinks' || db.settings.show_drinks);
  const rows = db.activities.map(a => ({ a, s: activityStats(a.id, db.activity_log) })).filter(r => r.s.count);
  main().innerHTML = `
    ${shown.map(([m, l]) => xmrChart(m, l)).join('')}
    <section class="card">
      <h3>Predicted and actual enjoyment</h3>
      ${rows.length ? `<table><tr><th>Activity</th><th>Times</th><th>Actual minus predicted</th></tr>
        ${rows.sort((p, q) => q.s.gap - p.s.gap).map(r => `<tr><td>${esc(r.a.name)}</td><td>${r.s.count}</td>
        <td class="${r.s.gap > 0 ? 'up' : r.s.gap < 0 ? 'down' : ''}">${r.s.gap > 0 ? '+' : ''}${r.s.gap.toFixed(1)}</td></tr>`).join('')}</table>
        <p class="muted small">${gapSummary()}</p>` : '<p class="muted">Shows up after your first activity.</p>'}
    </section>`;
  main().querySelectorAll('[data-recalc]').forEach(btn => btn.addEventListener('click', () => {
    const m = btn.dataset.recalc;
    const vals = dailySeries(db.checkins, m).map(d => d.value);
    db.baselines[m] = { ...xmrLimits(vals.slice(-BASELINE_POINTS)), set_at: localDate(), from: `last ${BASELINE_POINTS}` };
    store.save();
    render();
  }));
}

function gapSummary() {
  const rated = db.activity_log.filter(r => r.actual != null && r.predicted != null);
  const beat = rated.filter(r => r.actual > r.predicted).length;
  return `Actual beat predicted ${beat} of ${rated.length} times.`;
}

// ---------- More: settings, profile, export ----------

function more() {
  const s = db.settings;
  const th = thresholds();
  main().innerHTML = `
    <section class="card">
      <h2>More</h2>
      <a class="btn" href="#safety">Safety card</a>
    </section>
    <section class="card">
      <h3>Profile</h3>
      <p class="muted small">${db.profile ? `Loaded from the interview (${esc(db.profile.interview_date ?? '')}).` : 'Not loaded. Pick data/profile.json to seed your menu, warnings and values.'}</p>
      <label class="btn">Load profile.json<input type="file" id="pf" accept="application/json" hidden></label>
    </section>
    <section class="card">
      <h3>Activity menu</h3>
      <ul class="list">${db.activities.map(a => `<li class="${a.active === false ? 'off' : ''}">
        <span><strong>${esc(a.name)}</strong> <span class="muted small">${esc(a.category)}</span><br><span class="small">${esc(a.two_minute_start)}</span></span>
        <button class="btn small ghost" data-toggle="${a.id}">${a.active === false ? 'Use' : 'Hide'}</button></li>`).join('')}</ul>
      <form id="af" class="stack">
        <input name="name" placeholder="Activity" required>
        <input name="two_minute_start" placeholder="Two-minute start" required>
        <select name="category">${['physical', 'craft', 'social', 'outdoors', 'work-adjacent', 'rest'].map(c => `<option>${c}</option>`).join('')}</select>
        <button class="btn" type="submit">Add</button>
      </form>
    </section>
    <section class="card">
      <h3>Notes for GP</h3>
      <ul class="list">${db.gp_notes.map((n, i) => `<li><span>${esc(n)}</span><button class="btn small ghost" data-gpdel="${i}">Remove</button></li>`).join('')}</ul>
      <form id="gf" class="row"><input name="n" placeholder="Add a note"><button class="btn small" type="submit">Add</button></form>
    </section>
    <section class="card">
      <h3>Weekly person</h3>
      <input id="friend" value="${esc(s.friend_name)}" placeholder="Name">
      ${s.friend_questions.length ? `<ul class="rules">${s.friend_questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul>` : ''}
    </section>
    <section class="card">
      <h3>Tip protocol</h3>
      <p class="muted small">Write it now, while things are calm. Shown when three or more early warnings are ticked.</p>
      <textarea id="tipp" placeholder="e.g. tell my wife, drop one commitment, no new work for 48 hours, book two recovery activities">${esc(s.tip_protocol)}</textarea>
    </section>
    <section class="card">
      <h3>Settings</h3>
      <label class="check"><input type="checkbox" id="drinks" ${s.show_drinks ? 'checked' : ''}> Ask about drinks in the check-in</label>
      <p class="muted small">Flat: energy ${th.flatEnergy} or below, or nothing started by ${th.flatHour}:00. Spiral: anxiety ${th.spiralAnxiety} or above, an imposter thought, or worry. Push: energy ${th.pushEnergy} or above and into something. Retune after three weeks of data.</p>
    </section>
    <section class="card">
      <h3>Your data</h3>
      <p class="muted small">Stored on this device only. Nothing is sent anywhere.</p>
      <div class="row wrap">
        <button class="btn small" id="xj">Export JSON</button>
        ${store.TABLES.map(t => `<button class="btn small ghost" data-csv="${t}">${t}.csv</button>`).join('')}
      </div>
      <label class="btn small ghost">Restore from JSON<input type="file" id="rj" accept="application/json" hidden></label>
    </section>`;

  const readFile = (input, fn) => input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    try { fn(JSON.parse(await file.text())); render(); } catch { alert('That file could not be read.'); }
  });
  readFile($('#pf'), p => store.importProfile(p));
  readFile($('#rj'), d => { if (confirm('Replace everything on this device with this backup?')) { store.replaceAll(d); location.reload(); } });
  main().querySelectorAll('[data-toggle]').forEach(b => b.addEventListener('click', () => {
    const a = db.activities.find(x => x.id === Number(b.dataset.toggle));
    store.update('activities', a.id, { active: a.active === false });
    render();
  }));
  $('#af').addEventListener('submit', e => {
    e.preventDefault();
    store.insert('activities', { ...Object.fromEntries(new FormData(e.target)), active: true });
    render();
  });
  $('#gf').addEventListener('submit', e => {
    e.preventDefault();
    const n = new FormData(e.target).get('n').trim();
    if (n) { db.gp_notes.push(n); store.save(); }
    render();
  });
  main().querySelectorAll('[data-gpdel]').forEach(b => b.addEventListener('click', () => {
    db.gp_notes.splice(Number(b.dataset.gpdel), 1);
    store.save();
    render();
  }));
  $('#friend').addEventListener('change', e => { s.friend_name = e.target.value.trim(); store.save(); });
  $('#tipp').addEventListener('change', e => { s.tip_protocol = e.target.value.trim(); store.save(); });
  $('#drinks').addEventListener('change', e => { s.show_drinks = e.target.checked; store.save(); });
  $('#xj').addEventListener('click', () => download(`steady-${localDate()}.json`, store.exportJSON(), 'application/json'));
  main().querySelectorAll('[data-csv]').forEach(b => b.addEventListener('click', () =>
    download(`steady-${b.dataset.csv}-${localDate()}.csv`, store.exportCSV(b.dataset.csv), 'text/csv')));
}

// ---------- Safety card ----------

function safety() {
  const gp = db.settings.gp_phone;
  main().innerHTML = `<section class="card safety">
    <h2>This tool isn't for this bit.</h2>
    <p>Call your GP today, or NHS 111 and choose the mental health option, or Samaritans on 116 123, free, any time. If you are in immediate danger, call 999.</p>
    <div class="stack">
      ${gp ? `<a class="btn" href="tel:${esc(gp)}">Call GP</a>` : ''}
      <a class="btn" href="tel:111">Call NHS 111</a>
      <a class="btn" href="tel:116123">Call Samaritans, 116 123</a>
      <a class="btn danger" href="tel:999">Call 999</a>
    </div>
    ${gp ? '' : `<form id="gpf" class="row"><input name="p" type="tel" placeholder="Add your GP's number"><button class="btn small" type="submit">Save</button></form>`}
    <a class="btn ghost" href="#home">Back</a>
  </section>`;
  $('#gpf')?.addEventListener('submit', e => {
    e.preventDefault();
    db.settings.gp_phone = new FormData(e.target).get('p').trim();
    store.save();
    render();
  });
}

// ---------- Start ----------

async function autoProfile() {
  if (db.profile) return;
  try {
    const r = await fetch('../data/profile.json', { cache: 'no-store' });
    if (r.ok) { store.importProfile(await r.json()); render(); }
  } catch { /* not served: load it from More instead */ }
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
render();
autoProfile();
