// Acceptance checks in a phone-sized headless browser.
// Needs Playwright (not a project dependency): npm i --no-save playwright, then node tests/e2e.mjs
// Expects `npm start` running in this folder.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const URL = process.env.STEADY_URL ?? 'http://localhost:8000/app/';
const shots = process.env.SHOTS;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const snap = async name => { if (shots) await page.screenshot({ path: `${shots}/${name}.png`, fullPage: true }); };
const tap = sel => page.locator(sel).first().tap();
const chip = (name, val) => tap(`.chips[data-name="${name}"] .chip[data-val="${val}"]`);

async function fresh() {
  await page.goto(URL);
  await page.evaluate(() => localStorage.clear());
  await page.goto(URL);
  await page.waitForSelector('.card');
}

async function doCheckin({ energy, mood = 5, anxiety = 3, sleep = 8, started = 0, imposter = 0, worry = 0 }) {
  await page.goto(URL + '#checkin');
  let taps = 0;
  const t0 = Date.now();
  await chip('energy', energy); await chip('mood', mood); await chip('anxiety', anxiety); await chip('sleep_hours', sleep);
  taps += 4;
  if (started) { await chip('started', 1); taps++; }
  if (imposter) { await chip('imposter_thought', 1); taps++; }
  if (worry) { await chip('worry', 1); taps++; }
  await tap('#save'); taps++;
  await page.waitForSelector('#step');
  return { taps, ms: Date.now() - t0 };
}

// 1. Check-in is short and one-thumb.
await fresh();
await snap('01-home-empty');
await page.goto(URL + '#checkin');
await snap('02-checkin');
const small = await page.$$eval('#f .chip, #f .btn', els => els.filter(e => e.offsetParent && e.getBoundingClientRect().height < 44).length);
assert.equal(small, 0, 'all check-in controls are at least 44px tall');
const r = await doCheckin({ energy: 3, mood: 4, anxiety: 8, imposter: 1 });
assert.ok(r.taps <= 10, `check-in in ${r.taps} taps`);
console.log(`ok check-in: ${r.taps} taps`);

// 2 and 3. Flat shows exactly one next action, and no thought record or reading, even with anxiety and imposter.
assert.equal(await page.locator('.state.flat.on').count(), 1);
assert.equal(await page.locator('#step .btn.primary').count(), 1, 'one primary action');
const text = (await page.textContent('#step')).toLowerCase();
for (const w of ['thought record', 'reading', 'evidence']) assert.ok(!text.includes(w), `flat hides ${w}`);
await snap('03-flat');
console.log('ok flat: one action, no thinking work');

// Activity flow: predict, timer, rate.
await chip('predicted', 3);
await tap('#go');
await page.waitForSelector('#clock');
await snap('04-timer');
await tap('#stop');
await chip('actual', 6); await chip('outcome', 'done');
await snap('05-rate');
await tap('#save');
await page.waitForSelector('text=today\'s one thing');
console.log('ok activity logged');

// 4. Spiral (imposter) reads the seeded evidence entry.
await fresh();
await doCheckin({ energy: 6, anxiety: 8, imposter: 1, started: 1 });
assert.equal(await page.locator('.state.spiral.on').count(), 1);
assert.ok((await page.textContent('#step')).includes('quality insights pack'), 'seed evidence visible');
await snap('06-spiral-evidence');
console.log('ok spiral shows seeded evidence');

// Spiral (worry) names worries, no evidence.
await fresh();
await doCheckin({ energy: 6, anxiety: 5, worry: 1, started: 1 });
assert.ok(!(await page.textContent('#step')).includes('quality insights pack'));
await page.fill('#w', 'the cat, A levels');
await tap('#next');
assert.ok((await page.textContent('#step')).includes('Container'), 'stage 1 worry gets the container');
await snap('07-exercise-intro');
await chip('before', 7);
await tap('#go');
assert.ok((await page.textContent('#step')).includes('the cat, A levels'));
await snap('07b-container');
await tap('#done');
await chip('after', 5);
await tap('#save');
console.log('ok worry route with stage 1 container');

// Path page: three stages; the belief exercise runs end to end and shows on the page.
await page.goto(URL + '#path');
await page.waitForSelector('.stage.current');
assert.equal(await page.locator('.stage').count(), 4, 'three stages plus compassion');
assert.ok(!/\bbook(ing)?\b|therapist/i.test(await page.textContent('main')), 'no booking prompts');
await snap('11-path');
await page.goto(URL + '#practice-belief');
await chip('before', 6);
await tap('#go');
await chip('neg', "I'm not good enough");
await chip('voc', 2);
await snap('12-belief-pick');
await tap('#next');
assert.ok((await page.textContent('#step')).includes('quality insights pack'), 'belief uses the evidence log');
await tap('#set'); await tap('#set');
await snap('13-belief-tap');
await tap('#fin');
await chip('voc2', 4);
await tap('#next');
await chip('after', 4);
await tap('#save');
await page.waitForSelector('.stage.current');
assert.ok((await page.textContent('main')).includes('Your beliefs'));
await page.goto(URL + '#practice-two-voices');
await chip('before', 5);
await tap('#go');
await page.fill('#w0', 'You are selfish');
await tap('#done');
await chip('after', 4);
await tap('#save');
await page.waitForSelector('.stage.current');
await tap('[data-stage="3"]');
assert.equal(await page.locator('.stage.current h3').textContent(), '3. DBT skills');
await tap('[data-stage="1"]');
console.log('ok path: belief and two voices exercises');

// Low days hide reading; other days show it, capped.
await fresh();
await doCheckin({ energy: 3 });
assert.equal(await page.locator('#step a[href^="#read-"]').count(), 0, 'no reading on low days');
await fresh();
await doCheckin({ energy: 6, started: 1 });
assert.ok(await page.locator('#step a[href^="#read-"]').count() >= 1, 'reading offered on steady days');
await page.goto(URL + '#read-burnout');
await page.waitForSelector('#go');
assert.ok((await page.textContent('#go')).includes('10 min'));
console.log('ok reading: off on low days, capped');

// Work: log a new thing; weekly look back builds the three lines.
await page.goto(URL + '#work');
await page.fill('#what', 'New national report asked for by Friday');
await chip('resp', 'took-back'); await chip('now', 7);
await tap('#log');
assert.ok((await page.textContent('main')).includes('Past ones (1)'));
await snap('14-work');
await page.goto(URL + '#review');
await page.fill('#focus', 'say yes to one walk');
const sum = await page.inputValue('#sum');
assert.ok(sum.includes('Next week: say yes to one walk'), sum);
assert.ok(sum.includes('Questions to ask me'), 'wife questions included');
assert.ok(!/missed|streak|well done/i.test(sum));
await snap('15-review');
await tap('#save');
await page.waitForSelector('#main .card');
console.log('ok work log and weekly look back');

// Compassion exercise from My path.
await page.goto(URL + '#practice-compassionate-letter');
await chip('before', 6); await tap('#go');
await page.fill('#w0', 'You earned that feedback.');
await tap('#done'); await chip('after', 5); await tap('#save');
await page.waitForSelector('.stage.current');
console.log('ok compassion letter');

// Thought record: blocked on low days, saves and shows the belief trajectory otherwise.
await fresh();
await doCheckin({ energy: 3 });
await page.goto(URL + '#thought');
assert.ok((await page.textContent('main')).includes('Not today'));
await fresh();
await doCheckin({ energy: 6, anxiety: 8, imposter: 1, started: 1 });
await page.goto(URL + '#thought');
await page.fill('#thoughtx', "They'll find out I'm a fraud");
await chip('belief_before', 80);
await page.locator('[data-ev]').first().check();
await chip('claim_slide', 'leadership');
await chip('belief_after', 50);
await snap('16-thought');
await tap('#save');
await page.waitForSelector('text=How much you believed each thought');
assert.ok((await page.textContent('main')).includes('80 to 50'));
console.log('ok thought record');

// An old saved plan with a step type that no longer exists does not break Today.
await page.evaluate(() => {
  const db = JSON.parse(localStorage.getItem('steady.v1'));
  db.today.plan.steps = [{ kind: 'defusion', seconds: 90 }, { kind: 'activity' }];
  db.today.step = 0;
  localStorage.setItem('steady.v1', JSON.stringify(db));
});
await page.goto(URL + '#home');
await page.reload();
await page.waitForSelector('#go');
console.log('ok old plans skip unknown steps');

// 5. Charts: limits after 15 points, and rule breaks flagged.
await fresh();
await page.evaluate(() => {
  const db = JSON.parse(localStorage.getItem('steady.v1'));
  const vals = [5, 6, 5, 4, 6, 5, 5, 6, 4, 5, 6, 5, 4, 5, 6];
  const d0 = new Date(); d0.setDate(d0.getDate() - vals.length);
  vals.forEach((v, i) => {
    const d = new Date(d0); d.setDate(d0.getDate() + i); d.setHours(10);
    db.checkins.push({ id: 1000 + i, created_at: d.toISOString(), energy: v, mood: v, anxiety: 10 - v, sleep_hours: 8, started: true });
  });
  localStorage.setItem('steady.v1', JSON.stringify(db));
});
await page.goto(URL + '#charts');
await page.reload();
await page.waitForSelector('.chart');
assert.ok((await page.locator('.chart .limit').count()) >= 6, 'limit lines drawn');
await doCheckin({ energy: 1, mood: 5, anxiety: 3 });
assert.ok((await page.textContent('.flag')).includes('Energy'), 'energy signal flagged on home');
await snap('08-signal-home');
await page.goto(URL + '#charts');
assert.ok(await page.locator('.chart .pt.concern').count() >= 1);
await snap('09-charts');
console.log('ok charts: limits and flagged signal');

// Safety card on risk language.
await page.goto(URL + '#checkin');
await chip('energy', 5); await chip('mood', 5); await chip('anxiety', 5); await chip('sleep_hours', 8);
await page.fill('#note', 'some days I want to die');
await tap('#save');
await page.waitForSelector('.safety');
assert.equal(await page.locator('.safety a[href="tel:116123"]').count(), 1);
await snap('10-safety');
console.log('ok safety card');

// 6. Offline once installed.
await page.goto(URL);
await page.evaluate(() => navigator.serviceWorker.ready);
await page.reload();
await ctx.setOffline(true);
await page.reload();
await page.waitForSelector('.card');
await page.goto(URL + '#charts');
await page.waitForSelector('.chart');
await ctx.setOffline(false);
console.log('ok offline reload');

await browser.close();
