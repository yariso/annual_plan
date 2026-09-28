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
  assert.equal(p.steps[1].id, 'calm-place');
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
