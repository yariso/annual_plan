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

const STATE_LABEL = { flat: 'Low', spiral: 'Worried', push: 'Overdoing', steady: 'Steady' };
const STATE_HELP = {
  flat: 'Low energy today. The only aim is to start one small thing. You don\'t need to feel like it first: with low mood, doing comes before feeling.',
  spiral: 'Worry or "I\'m not good enough" thoughts are running. A few short steps to step back from them, then one small action.',
  push: 'High energy and deep into something. This is the point where you tend to work for hours and then crash, so these steps put an end on today.',
  steady: 'An ordinary day. One activity to keep things moving, and an optional short exercise.',
};
const why = text => `<p class="why"><strong>Why:</strong> ${text}</p>`;
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

const routes = { home, checkin, evidence, charts, more, safety, how };

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

// On claude.ai the frame blocks plain download links, so use the downloads capability there.
async function download(name, text, type) {
  const dl = window.claude?.use ? await window.claude.use('downloads').catch(() => null) : null;
  if (dl) {
    try { await dl.save({ filename: name, data: text }); }
    catch (e) { if (e?.code !== 'declined') showMsg('Saving files is not available here.'); }
    return;
  }
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function showMsg(text) {
  const el = $('#msg');
  if (el) { el.textContent = text; el.hidden = false; }
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
        <p class="muted">Tap a few numbers about how you are today. It takes under a minute. Then the app picks one small thing for you to do.</p>
        <a class="btn primary" href="#checkin">Check in</a>
        <a class="btn ghost" href="#how">How this works</a>
      </section>`;
    bindSignalBanner(m);
    return;
  }
  m.innerHTML = `
    <p class="label">Today's mode <span class="muted small">(set by your check-in; tap to change)</span></p>
    <div class="state-row">
      ${STATES.map(s => `<button class="state ${s}${t.state === s ? ' on' : ''}" data-state="${s}">${STATE_LABEL[s]}</button>`).join('')}
    </div>
    <p class="muted small">${STATE_HELP[t.state]}</p>
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
  const label = s => {
    const m = METRICS.find(x => x[0] === s.metric)?.[1] ?? s.metric;
    const dir = s.side === 'low' ? 'lower' : 'higher';
    return {
      outsideLimits: `${m} today is ${dir} than your usual range.`,
      shift: `${m} has been ${dir} than your average for 7 days in a row.`,
      trend: `${m} has gone ${s.side === 'low' ? 'down' : 'up'} 6 days in a row.`,
      nearLimit: `${m} has been close to the edge of your usual range.`,
    }[s.rule] ?? m;
  };
  return `<section class="flag">${open.map(s => `
    <div class="flag-row ${s.kind}">
      <div><strong>${s.kind === 'concern' ? 'Worth noticing:' : 'Change:'}</strong> ${esc(label(s))} This is more than normal day-to-day up and down.</div>
      <div class="row">
        ${protocolForSignal(s) && today() ? `<button class="btn small" data-proto="${protocolForSignal(s)}" data-sig="${s.id}">Show the ${STATE_LABEL[protocolForSignal(s)].toLowerCase()} steps</button>` : ''}
        <button class="btn small ghost" data-ack="${s.id}">OK</button>
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
      <p class="muted small">Just this. Two minutes. You can stop after that and it still counts.</p>
      <p class="label">First, guess: how much will you enjoy it? (0 = not at all, 10 = loads)</p>
      ${chips('predicted', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], predicted, 'eleven')}
      <button class="btn primary" id="go" ${predicted == null ? 'disabled' : ''}>Start two minutes</button>
      <button class="btn ghost" id="other">Something else</button>
      ${why('This is behavioural activation, a main part of CBT for low mood. Low mood tells you nothing will be enjoyable, so you wait to feel motivated, and the feeling never comes. Starting small breaks that loop. You guess the enjoyment first and rate it after, because low mood makes the guess too gloomy. Over time the app shows you the difference.')}
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
    <p class="kicker">Facts about: ${esc(CLAIMS[step.claim])}</p>
    <h2>Read these slowly</h2>
    ${why('From CBT for imposter feelings. The "I\'m not good enough" thought feels like a fact, but it is a guess. These are real things that happened, written down at the time. Reading them lets you check the guess against the facts.')}
    ${items.map(e => `<article class="ev">
      <p>${esc(e.what_happened)}</p>
      <p class="muted">${esc(e.date)} · ${esc(e.source)} · strength ${e.strength}/5</p>
      ${e.yes_but ? `<p class="muted">What your mind said to dismiss it: ${esc(e.yes_but)}</p>` : ''}
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
    <h2>What are you worrying about?</h2>
    <p class="muted">A word or two for each, with commas between. For example: the cat, A levels, money. You don't need to solve anything.</p>
    ${why('When worry is about everything at once it feels like one huge weight. Naming each worry separately makes it a list of specific things, which is easier to hold.')}
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
    <p class="kicker">Step back, 90 seconds</p>
    <h2>${step.variant === 'worry' ? 'Say each one, slowly' : 'Step back from the thought'}</h2>
    <ul class="script">${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
    <p class="muted">Then look around and name five things you can see.</p>
    ${why('This comes from ACT, a type of CBT. You don\'t argue with the thought or try to push it away, which tends to make it louder. Saying "I\'m noticing..." in front of it reminds you it is a thought, not a fact, and it loosens its grip. Naming things you can see brings you back to the room.')}
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
    <h2>What matters to you</h2>
    <p class="muted small">These are the values you chose.</p>
    <p class="label">Pick one</p>
    ${chips('value', vals, null)}
    <p class="label">One thing in the next ten minutes that moves towards it</p>
    <input id="act" maxlength="120">
    <button class="btn primary" id="save">Commit</button>
    <button class="btn ghost" id="skip">Skip</button>
    ${why('From ACT. When mood is low, doing things for how they will feel doesn\'t work, because nothing feels like much. Doing one small thing because it matters to you works whatever your mood.')}
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
    ${why('You told me your pattern: you get excited, work for hours, then crash. Deciding a stop time now, while you feel good, protects tomorrow.')}
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
    <p class="muted">Write it now. Then you don't have to keep it in your head, and today can end.</p>
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
    <p class="muted small">These are the signs you told me come before a crash. Tick any that are true.</p>
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
    <p class="muted small">Tap one number for each. 1 is lowest, 10 is highest.</p>
    <p class="label">Energy</p>${chips('energy', scale, null, 'ten')}
    <p class="label">Mood</p>${chips('mood', scale, null, 'ten')}
    <p class="label">Anxiety</p>${chips('anxiety', scale, null, 'ten')}
    <p class="label">Hours slept</p>${chips('sleep_hours', [[4, '4-'], 5, 6, 7, 8, 9, 10, 11, 12, [13, '13+']], null, 'ten')}
    ${db.settings.show_drinks ? `<p class="label">Drinks yesterday</p>${chips('drinks', [0, 1, 2, 3, 4, 5, [6, '6+']], null)}` : ''}
    ${yn('started', 'Started anything yet today?')}
    ${yn('imposter_thought', 'Thinking "I\'m not good enough"?')}
    <div id="claim" hidden><p class="label">About what?</p>${chips('claim', Object.entries(CLAIMS), 1)}</div>
    ${yn('worry', 'Worrying about lots of things?')}
    ${yn('into_something', 'Deep into a task for hours?')}
    <input id="note" placeholder="Anything else? One line (optional)" maxlength="200">
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
    <p class="muted">When the "I'm not good enough" voice starts, it is a guess, not a fact. This is where you keep the facts: real things that happened, like good feedback or a job done well. Write what happened, not how you felt about it. The app shows you some of these on hard days.</p>
    <details><summary class="btn">Add an entry</summary>
      <form id="ef">
        <input name="date" type="date" value="${localDate()}">
        <input name="source" placeholder="Source (who, where)" required>
        <textarea name="what_happened" placeholder="What happened" required></textarea>
        <p class="label">What it's evidence of</p>${chips('claim', Object.entries(CLAIMS), 1)}
        <p class="label">Strength</p>${chips('strength', [1, 2, 3, 4, 5], 3)}
        <input name="yes_but" placeholder="What does your mind say to dismiss it? e.g. 'they were just being polite' (optional)">
        <button class="btn primary" type="submit">Save</button>
      </form>
    </details>
    ${[...db.evidence].reverse().map(e => `<article class="ev">
      <p>${esc(e.what_happened)}</p>
      <p class="muted">${esc(e.date)} · ${esc(e.source)} · ${esc(CLAIMS[e.claim])} · ${e.strength}/5 · read ${e.read_count ?? 0}</p>
      ${e.yes_but ? `<p class="muted">What your mind said to dismiss it: ${esc(e.yes_but)}</p>` : ''}
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
    <p class="muted small">${b ? `Usual range worked out from the ${b.from} days, on ${b.set_at}.` : `Your usual range shows after ${BASELINE_POINTS} days (${Math.max(0, BASELINE_POINTS - vals.length)} to go).`}</p>
    ${vals.length >= BASELINE_POINTS ? `<button class="btn small ghost" data-recalc="${metric}">Reset usual range to the last ${BASELINE_POINTS} days</button>` : ''}
  </section>`;
}

function charts() {
  const shown = METRICS.filter(([m]) => m !== 'drinks' || db.settings.show_drinks);
  const rows = db.activities.map(a => ({ a, s: activityStats(a.id, db.activity_log) })).filter(r => r.s.count);
  main().innerHTML = `
    <section class="card">
      <h2>Your charts</h2>
      <p class="muted small">Each dot is one day. The solid line is your average. After 15 days, dashed lines show your usual range: how far you normally go up and down. An orange dot means something has changed by more than normal ups and downs, in a worse direction. Blue means better. This is how you spot a crash coming early, from the numbers rather than from how you feel.</p>
    </section>
    ${shown.map(([m, l]) => xmrChart(m, l)).join('')}
    <section class="card">
      <h3>Guessed and actual enjoyment</h3>
      <p class="muted small">How much you enjoyed each activity compared with what you guessed beforehand. A plus number means it went better than you expected.</p>
      ${rows.length ? `<table><tr><th>Activity</th><th>Times</th><th>Better than guessed by</th></tr>
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
  return `It went better than you guessed ${beat} of ${rated.length} times.`;
}

// ---------- More: settings, profile, export ----------

let pendingRestore = null;

function more() {
  const s = db.settings;
  const th = thresholds();
  main().innerHTML = `
    <p id="msg" class="flag-row concern" hidden></p>
    ${pendingRestore ? `<section class="card">
      <h3>Replace everything on this device with this backup?</h3>
      <p class="muted small">Export first if you want to keep what is here now.</p>
      <div class="row"><button class="btn small danger" id="rjyes">Replace</button><button class="btn small ghost" id="rjno">Cancel</button></div>
    </section>` : ''}
    <section class="card">
      <h2>More</h2>
      <a class="btn" href="#how">How this works</a>
      <a class="btn" href="#safety">If things get very bad</a>
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
    try { fn(JSON.parse(await file.text())); render(); }
    catch { showMsg('That file could not be read. Pick a .json file exported from Steady, or profile.json.'); }
  });
  readFile($('#pf'), p => store.importProfile(p));
  readFile($('#rj'), d => { pendingRestore = d; });
  $('#rjyes')?.addEventListener('click', () => { store.replaceAll(pendingRestore); pendingRestore = null; location.reload(); });
  $('#rjno')?.addEventListener('click', () => { pendingRestore = null; render(); });
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

// ---------- How this works ----------

function how() {
  main().innerHTML = `<section class="card how">
    <h2>How this works</h2>
    <h3>What it's based on</h3>
    <p>Steady uses CBT (cognitive behavioural therapy). CBT is what the NHS recommends for low mood and anxiety. It doesn't use gestalt therapy.</p>
    <p>It uses three parts of CBT:</p>
    <ul>
      <li><strong>Behavioural activation.</strong> When you're low, you wait to feel motivated before doing things, and the motivation doesn't come. So you do less, and feel worse. Behavioural activation turns that round: do one small thing first, and the feeling follows later. This is the main part of the app.</li>
      <li><strong>Checking thoughts against facts.</strong> Thoughts like "I'm not good enough" feel true, but they are guesses. The evidence log keeps real facts to check them against.</li>
      <li><strong>ACT</strong> (acceptance and commitment therapy, a newer type of CBT). Instead of arguing with worries, you learn to notice them as thoughts and step back from them, then do something that matters to you anyway.</li>
    </ul>
    <h3>What to do each day</h3>
    <ol>
      <li>Check in: tap a few numbers about how you are. Under a minute.</li>
      <li>The app picks a mode for today from your answers, and shows one small thing to do.</li>
      <li>Do it for two minutes. Rate it afterwards. That's it for the day.</li>
    </ol>
    <h3>The four modes</h3>
    <ul>
      <li><strong>Low:</strong> ${STATE_HELP.flat}</li>
      <li><strong>Worried:</strong> ${STATE_HELP.spiral}</li>
      <li><strong>Overdoing:</strong> ${STATE_HELP.push}</li>
      <li><strong>Steady:</strong> ${STATE_HELP.steady}</li>
    </ul>
    <h3>What it isn't</h3>
    <p>It isn't therapy and can't replace a person. If you'd like CBT with a therapist, NHS Talking Therapies is free and you can refer yourself, without going through your GP. Search "NHS Talking Therapies Derbyshire", or ask your GP.</p>
    <a class="btn primary" href="#home">Back to today</a>
  </section>`;
}

// ---------- Safety card ----------

function safety() {
  const gp = db.settings.gp_phone;
  main().innerHTML = `<section class="card safety">
    <h2>This tool isn't for this bit.</h2>
    <p>Call your GP today, or NHS 111 and choose the mental health option, or Samaritans on 116 123, free, any time. If you are in immediate danger, call 999.</p>
    <div class="stack">
      ${gp ? `<a class="btn" href="tel:${esc(gp)}">GP <span class="num">${esc(gp)}</span></a>` : ''}
      <a class="btn" href="tel:111">NHS 111 <span class="num">111</span></a>
      <a class="btn" href="tel:116123">Samaritans <span class="num">116 123</span></a>
      <a class="btn danger" href="tel:999">Emergency <span class="num">999</span></a>
    </div>
    <p class="muted small">If tapping does not start a call, dial the number shown.</p>
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
