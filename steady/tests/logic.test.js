import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  routeState, routePlan, allowsThinkingWork, xmrLimits, baselineFrom, RULES, detectSignals,
  latestSignals, protocolForSignal, suggestActivity, hasRiskLanguage, lowMoodRun, pickEvidence,
  dailySeries,
} from '../app/logic.js';

const at = h => new Date(2026, 8, 28, h, 0);
const base = { energy: 6, mood: 6, anxiety: 3, started: true, imposter: false, worry: false };

// ---------- Routing ----------

test('energy 4 or below is Flat', () => {
  assert.equal(routeState({ ...base, energy: 4 }, at(9)), 'flat');
  assert.equal(routeState({ ...base, energy: 5 }, at(9)), 'steady');
});

test('nothing started by 2pm is Flat, but not before', () => {
  assert.equal(routeState({ ...base, started: false }, at(13)), 'steady');
  assert.equal(routeState({ ...base, started: false }, at(14)), 'flat');
});

test('anxiety 7+, imposter thought or worry is Spiral', () => {
  assert.equal(routeState({ ...base, anxiety: 7 }, at(9)), 'spiral');
  assert.equal(routeState({ ...base, anxiety: 6 }, at(9)), 'steady');
  assert.equal(routeState({ ...base, imposter: true }, at(9)), 'spiral');
  assert.equal(routeState({ ...base, worry: true }, at(9)), 'spiral');
});

test('Flat wins over Spiral: low energy never gets thinking work', () => {
  const c = { ...base, energy: 3, anxiety: 9, imposter: true };
  assert.equal(routeState(c, at(9)), 'flat');
});

test('Push needs energy 8+ and either over hours or into something', () => {
  assert.equal(routeState({ ...base, energy: 8, intoSomething: true }, at(9)), 'push');
  assert.equal(routeState({ ...base, energy: 8, workHours: 10 }, at(9)), 'push');
  assert.equal(routeState({ ...base, energy: 8, workHours: 6 }, at(9)), 'steady');
  assert.equal(routeState({ ...base, energy: 7, intoSomething: true }, at(9)), 'steady');
});

test('Flat plan is one two-minute activity and nothing else', () => {
  const p = routePlan('flat', { ...base, energy: 2 });
  assert.deepEqual(p.steps, [{ kind: 'activity', twoMinuteOnly: true, opposite: false }]);
  assert.equal(p.thoughtRecord, false);
  assert.equal(p.reading, false);
  assert.equal(allowsThinkingWork('flat'), false);
});

test('Spiral plan: imposter gets three evidence entries, a stage exercise, then one action', () => {
  const p = routePlan('spiral', { ...base, imposter: true });
  assert.deepEqual(p.steps.map(s => s.kind), ['evidence', 'exercise', 'activity']);
  assert.equal(p.steps[0].count, 3);
  assert.equal(p.steps[1].id, 'belief');
});

test('imposter thoughts get the belief work of each stage', () => {
  const c = { ...base, imposter: true };
  assert.equal(routePlan('spiral', c, undefined, 2).steps[1].id, 'two-voices');
  assert.equal(routePlan('spiral', c, undefined, 3).steps[1].id, 'check-facts');
});

test('every exercise a route can pick exists, and none digs into past memories', async () => {
  const { EXERCISES, STAGE_INFO } = await import('../app/exercises.js');
  for (const st of [1, 2, 3]) {
    for (const state of ['spiral', 'push', 'steady']) {
      for (const c of [base, { ...base, worry: true }, { ...base, imposter: true }, { ...base, anxiety: 9 }]) {
        for (const step of routePlan(state, c, undefined, st).steps) {
          if (step.kind === 'exercise') assert.ok(EXERCISES[step.id], `${step.id} exists`);
        }
      }
    }
    for (const id of STAGE_INFO[st].exercises) assert.equal(EXERCISES[id].stage, st, id);
  }
});

test('Spiral plan: worry gets naming, then the container in stage 1', () => {
  const p = routePlan('spiral', { ...base, worry: true });
  assert.deepEqual(p.steps.map(s => s.kind), ['name-worries', 'exercise', 'activity']);
  assert.equal(p.steps[1].id, 'container');
});

test('each therapy stage brings its own exercise', () => {
  const c = { ...base, anxiety: 7 };
  assert.equal(routePlan('spiral', c, undefined, 1).steps[0].id, 'calm-place');
  assert.equal(routePlan('spiral', c, undefined, 2).steps[0].id, 'awareness');
  assert.equal(routePlan('spiral', c, undefined, 3).steps[0].id, 'stop');
  assert.equal(routePlan('spiral', { ...c, anxiety: 9 }, undefined, 3).steps[0].id, 'tipp');
  assert.equal(routePlan('steady', base, undefined, 2).steps[1].id, 'awareness');
  assert.equal(routePlan('push', base, undefined, 3).steps[0].id, 'stop');
});

test('Low days stay one activity at every stage; stage 3 frames it as opposite action', () => {
  for (const st of [1, 2, 3]) {
    const p = routePlan('flat', { ...base, energy: 2 }, undefined, st);
    assert.equal(p.steps.length, 1);
    assert.equal(p.steps[0].kind, 'activity');
    assert.equal(p.steps[0].opposite, st === 3);
  }
});

test('Spiral offers a thought record only at energy 5+', () => {
  assert.equal(routePlan('spiral', { ...base, anxiety: 8, energy: 5 }).thoughtRecord, true);
  assert.equal(routePlan('spiral', { ...base, anxiety: 8, energy: 4 }).thoughtRecord, false);
});

test('Push plan: stop time, first task, non-work activity, warning check', () => {
  const p = routePlan('push', base);
  assert.deepEqual(p.steps.map(s => s.kind), ['stop-time', 'first-task', 'activity', 'warning-check']);
  assert.deepEqual(p.steps[2].excludeCategories, ['work-adjacent']);
});

test('every plan ends in an action, not reading', () => {
  for (const s of ['flat', 'spiral', 'push', 'steady']) {
    const p = routePlan(s, { ...base, imposter: true });
    assert.ok(p.steps.some(x => x.kind === 'activity'), s);
  }
});

// ---------- XmR ----------

test('xmr limits: mean plus and minus 2.66 times mean moving range', () => {
  const l = xmrLimits([5, 7, 5, 7, 5]);
  assert.equal(l.mean, 5.8);
  assert.equal(l.mrBar, 2);
  assert.ok(Math.abs(l.ucl - (5.8 + 5.32)) < 1e-9);
  assert.ok(Math.abs(l.lcl - (5.8 - 5.32)) < 1e-9);
});

test('no baseline before 15 points; baseline uses only the first 15', () => {
  const v = Array.from({ length: 14 }, (_, i) => 5 + (i % 2));
  assert.equal(baselineFrom(v), null);
  const b1 = baselineFrom([...v, 5]);
  const b2 = baselineFrom([...v, 5, 10, 10, 10]);
  assert.deepEqual(b1, b2);
});

const flatBaseline = { mean: 5, mrBar: 1, sigma: 1 / 1.128, ucl: 7.66, lcl: 2.34 };

test('rule: point outside limits', () => {
  const h = RULES.outsideLimits.check([5, 5, 8, 2], flatBaseline);
  assert.deepEqual(h, [{ i: 2, side: 'high' }, { i: 3, side: 'low' }]);
});

test('rule: shift needs seven in a row on one side', () => {
  assert.equal(RULES.shift.check([4, 4, 4, 4, 4, 4], flatBaseline).length, 0);
  const h = RULES.shift.check([6, 4, 4, 4, 4, 4, 4, 4], flatBaseline);
  assert.equal(h.length, 7);
  assert.ok(h.every(x => x.side === 'low'));
});

test('rule: a point on the mean breaks a shift', () => {
  assert.equal(RULES.shift.check([4, 4, 4, 5, 4, 4, 4, 4], flatBaseline).length, 0);
});

test('rule: trend needs six rising or falling', () => {
  assert.equal(RULES.trend.check([1, 2, 3, 4, 5], flatBaseline).length, 0);
  const h = RULES.trend.check([1, 2, 3, 4, 5, 6], flatBaseline);
  assert.equal(h.length, 6);
  assert.equal(h[0].side, 'high');
  assert.equal(RULES.trend.check([9, 8, 7, 6, 5, 4], flatBaseline)[0].side, 'low');
});

test('rule: two of three close to a limit', () => {
  // 2 sigma above mean is about 6.77
  assert.equal(RULES.nearLimit.check([5, 7, 5, 5], flatBaseline).length, 0);
  const h = RULES.nearLimit.check([5, 7, 5, 7.2], flatBaseline);
  assert.deepEqual(h.map(x => x.i), [1, 3]);
});

test('detectSignals is empty without a baseline', () => {
  assert.deepEqual(detectSignals([1, 9, 1, 9], null), []);
});

test('latest signals flag only the last point, with concern direction per metric', () => {
  const v = [5, 5, 5, 2];
  const e = latestSignals('energy', v, flatBaseline);
  assert.deepEqual(e.map(s => [s.rule, s.kind]), [['outsideLimits', 'concern']]);
  const a = latestSignals('anxiety', v, flatBaseline);
  assert.equal(a[0].kind, 'improvement');
  assert.deepEqual(latestSignals('energy', [2, 5, 5, 5], flatBaseline), []);
});

test('ruleset is pluggable', () => {
  const v = [5, 5, 5, 2];
  assert.deepEqual(latestSignals('energy', v, flatBaseline, ['shift']), []);
});

test('concern signals map to protocols', () => {
  assert.equal(protocolForSignal({ metric: 'energy', kind: 'concern' }), 'flat');
  assert.equal(protocolForSignal({ metric: 'anxiety', kind: 'concern' }), 'spiral');
  assert.equal(protocolForSignal({ metric: 'mood', kind: 'improvement' }), null);
});

test('daily series keeps the latest check-in of each day', () => {
  const s = dailySeries([
    { created_at: '2026-09-28T08:00:00', energy: 3 },
    { created_at: '2026-09-28T18:00:00', energy: 6 },
    { created_at: '2026-09-29T09:00:00', energy: 4 },
  ], 'energy');
  assert.deepEqual(s.map(x => x.value), [6, 4]);
});

// ---------- Suggestions ----------

const acts = [
  { id: 1, name: 'Bread', category: 'craft', two_minute_start: 'Weigh flour' },
  { id: 2, name: 'Walk', category: 'outdoors', two_minute_start: 'Shoes on' },
  { id: 3, name: 'Garden', category: 'work-adjacent', two_minute_start: 'List three jobs' },
  { id: 4, name: 'Big project', category: 'craft', two_minute_start: '' },
];

test('flat suggestions only include activities with a two-minute start', () => {
  for (let k = 0; k < 5; k++) {
    const a = suggestActivity(acts, [], { twoMinuteOnly: true, exclude: [1, 2, 3].slice(0, k) });
    if (a) assert.notEqual(a.id, 4);
  }
  assert.equal(suggestActivity(acts, [], { twoMinuteOnly: true, exclude: [1, 2, 3] }), null);
});

test('prefers activities where actual beat predicted', () => {
  const log = [
    { activity_id: 2, predicted: 2, actual: 7, outcome: 'done', created_at: '2026-09-20T10:00:00' },
    { activity_id: 1, predicted: 6, actual: 3, outcome: 'done', created_at: '2026-09-19T10:00:00' },
  ];
  const a = suggestActivity(acts, log, { excludeCategories: ['work-adjacent'], now: new Date('2026-09-28T10:00:00') });
  assert.equal(a.id, 2);
});

test('rotates away from the last category', () => {
  const log = [{ activity_id: 2, predicted: 5, actual: 5, outcome: 'done', created_at: '2026-09-27T10:00:00' }];
  const a = suggestActivity(acts.slice(0, 2), log, { now: new Date('2026-09-28T10:00:00') });
  assert.equal(a.id, 1);
});

test('push excludes work-adjacent; boost lifts an activity', () => {
  const boosted = acts.map(a => (a.id === 3 ? { ...a, boost: 5 } : a));
  assert.equal(suggestActivity(boosted, []).id, 3);
  assert.notEqual(suggestActivity(boosted, [], { excludeCategories: ['work-adjacent'] }).id, 3);
});

// ---------- Safety and evidence ----------

test('risk language is detected, ordinary text is not', () => {
  assert.equal(hasRiskLanguage('Some days I want to die'), true);
  assert.equal(hasRiskLanguage('Thinking about SUICIDE again'), true);
  assert.equal(hasRiskLanguage('tired, stayed on the sofa'), false);
  assert.equal(hasRiskLanguage(''), false);
});

test('mood 2 or below for three consecutive days triggers the safety card', () => {
  const d = (date, mood) => ({ date, mood });
  assert.equal(lowMoodRun([d('2026-09-26', 2), d('2026-09-27', 1), d('2026-09-28', 2)]), true);
  assert.equal(lowMoodRun([d('2026-09-26', 2), d('2026-09-27', 3), d('2026-09-28', 2)]), false);
  assert.equal(lowMoodRun([d('2026-09-24', 2), d('2026-09-27', 1), d('2026-09-28', 2)]), false);
  assert.equal(lowMoodRun([d('2026-09-27', 1), d('2026-09-28', 2)]), false);
});

test('evidence picks entries tagged to the claim first', () => {
  const ev = [{ id: 1, claim: 1 }, { id: 2, claim: 2 }, { id: 3, claim: 1 }, { id: 4, claim: 3 }];
  const got = pickEvidence(ev, 1, 3);
  assert.equal(got.length, 3);
  assert.deepEqual(got.slice(0, 2).map(e => e.id).sort(), [1, 3]);
});

// ---------- Weekly review, adaptation, events, reading ----------

import {
  weeklySummary, reviewDue, quantile, suggestThresholds, exerciseStatus, resolveExercise,
  eventFollowUps, readingLeft, lowerCap,
} from '../app/logic.js';

const now = new Date('2026-10-05T12:00:00');
const daysAgo = (d, h = 10) => { const x = new Date(now); x.setDate(x.getDate() - d); x.setHours(h); return x.toISOString(); };

test('weekly summary: three factual lines, compares mood with the week before', () => {
  const s = weeklySummary({
    checkins: [
      { created_at: daysAgo(1), mood: 4, energy: 3, anxiety: 6 },
      { created_at: daysAgo(3), mood: 6, energy: 5, anxiety: 4 },
      { created_at: daysAgo(9), mood: 3, energy: 3, anxiety: 7 },
    ],
    activities: [{ id: 1, name: 'Walk' }],
    activity_log: [
      { created_at: daysAgo(2), activity_id: 1, predicted: 2, actual: 6, outcome: 'done' },
      { created_at: daysAgo(2), activity_id: 1, predicted: 5, actual: 5, outcome: 'not' },
    ],
    exercise_log: [
      { created_at: daysAgo(2), exercise_name: 'stop', completed: true, before: 7, after: 4 },
      { created_at: daysAgo(1), exercise_name: 'tipp', completed: false },
    ],
  }, now);
  assert.equal(s.lines.length, 3);
  assert.equal(s.mood, 5);
  assert.equal(s.prevMood, 3);
  assert.match(s.lines[0], /Mood averaged 5 out of 10 \(3 the week before\)/);
  assert.match(s.lines[1], /Started 1 small thing\. Walk went better than expected: guessed 2, felt 6\./);
  assert.match(s.lines[2], /upset level down 3/);
  assert.deepEqual(s.skipped, ['tipp']);
  const f = weeklySummary({ checkins: [], activities: [], activity_log: [], exercise_log: [] }, now, 'say yes to one walk');
  assert.equal(f.lines[2], 'Next week: say yes to one walk');
  for (const l of [...s.lines, ...f.lines]) assert.ok(!/missed|great job|well done|streak/i.test(l), l);
});

test('weekly review is due a week after the first check-in, then weekly', () => {
  assert.equal(reviewDue([], [{ created_at: daysAgo(3) }], now), false);
  assert.equal(reviewDue([], [{ created_at: daysAgo(7, 9) }], now), true);
  assert.equal(reviewDue([{ created_at: daysAgo(2) }], [{ created_at: daysAgo(30) }], now), false);
  assert.equal(reviewDue([{ created_at: daysAgo(8) }], [], now), true);
});

test('thresholds retune only after 21 days, within safe bounds', () => {
  const mk = n => Array.from({ length: n }, (_, i) => ({ created_at: daysAgo(i), energy: 2 + (i % 5), anxiety: 4 + (i % 5) }));
  assert.equal(suggestThresholds(mk(20)), null);
  const t = suggestThresholds(mk(25));
  assert.equal(t.flatEnergy, Math.max(2, Math.floor(quantile(mk(25).map(c => c.energy), 0.25))));
  assert.ok(t.flatEnergy >= 2 && t.flatEnergy <= 6);
  assert.ok(t.spiralAnxiety >= 5 && t.spiralAnxiety <= 9);
  assert.ok(t.pushEnergy >= 6 && t.pushEnergy <= 9);
});

test('exercise skipped twice is shortened, three times retired for a month', () => {
  const skip = d => ({ exercise_name: 'tipp', completed: false, created_at: daysAgo(d) });
  assert.equal(exerciseStatus([skip(1)], 'tipp', now), 'normal');
  assert.equal(exerciseStatus([skip(1), skip(2)], 'tipp', now), 'short');
  assert.equal(exerciseStatus([skip(1), skip(2), skip(3)], 'tipp', now), 'retired');
  assert.equal(exerciseStatus([skip(31), skip(32), skip(33)], 'tipp', now), 'normal');
  const done = { exercise_name: 'tipp', completed: true, created_at: daysAgo(0, 9) };
  assert.equal(exerciseStatus([skip(1), skip(2), skip(3), done], 'tipp', now), 'normal');
  const log = [skip(1), skip(2), skip(3)];
  assert.equal(resolveExercise('tipp', ['stop', 'tipp'], log, now), 'stop');
  assert.equal(resolveExercise('stop', ['stop', 'tipp'], log, now), 'stop');
});

test('new thing landed asks how it feels at 24 and 72 hours', () => {
  const e = (d, extra = {}) => ({ id: d, created_at: daysAgo(d, 12), feeling_24h: null, feeling_72h: null, ...extra });
  assert.deepEqual(eventFollowUps([e(0)], now), []);
  assert.deepEqual(eventFollowUps([e(1)], now), [{ id: 1, which: 'feeling_24h' }]);
  assert.deepEqual(eventFollowUps([e(3, { feeling_24h: 5 })], now), [{ id: 3, which: 'feeling_72h' }]);
  assert.deepEqual(eventFollowUps([e(4, { feeling_24h: 5, feeling_72h: 3 })], now), []);
});

test('reading is capped per day and the cap only goes down', () => {
  const log = [{ created_at: now.toISOString(), minutes: 7 }, { created_at: daysAgo(1), minutes: 10 }];
  assert.equal(readingLeft(log, 10, now), 3);
  assert.equal(readingLeft([{ created_at: now.toISOString(), minutes: 12 }], 10, now), 0);
  assert.equal(lowerCap(10, 15), 10);
  assert.equal(lowerCap(10, 6), 6);
});

import { thoughtTrajectories } from '../app/logic.js';

test('thought records group recurring thoughts and keep the belief trajectory', () => {
  const t = thoughtTrajectories([
    { created_at: '2026-09-29T10:00:00', thought: "I'm a fraud.", belief_before: 90, belief_after: 60 },
    { created_at: '2026-10-02T10:00:00', thought: "i'm a  fraud", belief_before: 70, belief_after: 40 },
    { created_at: '2026-10-01T10:00:00', thought: 'They will find out', belief_before: 80, belief_after: 70 },
  ]);
  assert.equal(t.length, 2);
  assert.equal(t[0].points.length, 2);
  assert.deepEqual(t[0].points.map(p => p.after), [60, 40]);
});

test('thought record is offered in Worried mode only at energy 5 or above, never on Low days', () => {
  assert.equal(routePlan('spiral', { ...base, imposter: true, energy: 5 }).thoughtRecord, true);
  assert.equal(routePlan('spiral', { ...base, imposter: true, energy: 4 }).thoughtRecord, false);
  assert.equal(routePlan('flat', { ...base, energy: 2 }).thoughtRecord, false);
});
