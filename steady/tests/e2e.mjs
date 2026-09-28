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
assert.ok((await page.textContent('#step')).includes("I'm noticing worry about the cat."));
await snap('07-worry-defusion');
console.log('ok worry route');

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
