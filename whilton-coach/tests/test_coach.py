from playwright.sync_api import sync_playwright
import os
URL = 'file://' + os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist', 'index.html'))
RUN = """
(cfg) => {
  const W = window.__wm; Object.assign(W.st, { layout: cfg.layout, chic: true, wet: !!cfg.wet, profile: 'novice' });
  Object.assign(W.set, { mode: cfg.mode || 'words', sayFlat: true, sayLift: true, sayBrake: true, coachSay: true, lapSay: false });
  window.speechSynthesis && (window.speechSynthesis.speak = () => {});
  W.sim.rate = cfg.rate; W.sim.bad = !!cfg.bad; W.sim.rot = cfg.rot || 0; W.lapReset(W.simT());
  const n = W.LY().centre.length, words = []; let now = 1000;
  W.lapE.onWord = (t, l) => words.push(((now - 1000) / 1000).toFixed(1) + 's ' + t);
  W.sim.pos = n - 18; W.sim.v = 17; W.sim.fixAcc = 1e9; W.sim.tickAcc = 0;
  const dt = 0.02; for (let s = 0; s < cfg.seconds / dt; s++) { now += dt * 1000; W.simStep(dt, now, true); }
  return { words, laps: W.lapE.laps.map(l => ({ n: l.n, s: +(l.ms / 1000).toFixed(2), tips: l.tips.map(t => t.name + ': ' + t.tip + ' [' + t.loss.toFixed(2) + ']') })) };
}
"""
FIT = """
(cfg) => {
  const W = window.__wm; Object.assign(W.st, { layout: 'intl', chic: true, wet: false, profile: 'novice' });
  W.sim.rate = 1; W.sim.bad = false; W.sim.rot = cfg.rot; 
  // record a synthetic session on the layout given, rotated and shifted, with phone-like noise
  W.st.layout = cfg.truth; const L = W.LY(), n = L.centre.length, T = { th: cfg.rot * Math.PI / 180, s: 1, tx: 350, ty: -120, origin: W.SIM_ORIGIN }, R = [];
  W.lapReset(W.simT()); W.lapE.quiet = true; W.sim.pos = n - 40; W.sim.v = 15; W.sim.fixAcc = 0; W.sim.tickAcc = 0; let now = 0, acc = 1e9; const dt = 0.02;
  for (let s = 0; s < 150 / dt; s++) { now += dt * 1000; const p = W.simStep(dt, now, true); acc += dt; if (acc >= 1) { acc = 0; const w = W.m2w(T, p.x, p.y), ll = W.toLL(w[0] + (Math.random() - .5) * 6, w[1] + (Math.random() - .5) * 6, W.SIM_ORIGIN); R.push([1.7e12 + now, ll[0], ll[1], W.sim.v, null, 5]); } }
  W.st.layout = cfg.startSel; const t0 = performance.now(), k = W.fitRecording(R), ms = performance.now() - t0;
  if (!k) return { fail: true };
  W.setRec(R); const ok = W.replay(R);
  return { ms: Math.round(ms), detected: k.key, rotDeg: +(((k.th * 180 / Math.PI) % 360 + 360) % 360).toFixed(1), rms: +k.rms.toFixed(2), cover: +k.cover.toFixed(2), laps: W.lapE.laps.map(l => +(l.ms / 1000).toFixed(2)) };
}
"""

RUNX = """
(cfg) => {
  const W = window.__wm; Object.assign(W.st, { layout: cfg.layout || 'intl', chic: true, wet: false, profile: 'novice' });
  Object.assign(W.set, { mode: 'words', sayFlat: true, sayLift: true, sayBrake: true, coachSay: true, lapSay: false, prepCue: true, autoLead: cfg.autoLead !== false, wordLead: 1.6 });
  window.speechSynthesis && (window.speechSynthesis.speak = () => {});
  W.sim.rate = cfg.rate; W.sim.bad = !!cfg.bad; W.sim.late = !!cfg.late; W.sim.rot = 0; W.lapReset(W.simT());
  const n = W.LY().centre.length, perLap = [], cur = { words: 0, brakes: 0, cues: 0 }, brakeAt = {}; let now = 1000, tot = { brakes: 0, cues: 0 };
  W.lapE.onWord = (t, l) => { if (l > 0) { cur.words++; if (l >= 3) { cur.brakes++; tot.brakes++; } } };
  W.lapE.onCue = k => { cur.cues++; tot.cues++; };
  W.lapE.onLap = lap => { perLap.push(Object.assign({ n: lap.n, s: +(lap.ms / 1000).toFixed(2), focus: lap.focus, said: lap.said, tip: lap.tip, prof: !!W.lapE.prof, adj: Object.assign({}, W.lapE.leadAdj) }, cur)); cur.words = 0; cur.brakes = 0; cur.cues = 0; };
  W.sim.pos = n - 18; W.sim.v = 17; W.sim.fixAcc = 1e9; W.sim.tickAcc = 0;
  const dt = 0.02; for (let s = 0; s < cfg.seconds / dt; s++) { now += dt * 1000; if (cfg.badUntil && W.sim.bad && (now - 1000) / 1000 > cfg.badUntil) W.sim.bad = false; W.simStep(dt, now, true); }
  W.renderDebrief(); const html = document.querySelector('#debriefBody').innerHTML; W.sim.late = false; W.sim.bad = false;
  return { laps: perLap, tot, leadAdj: W.lapE.leadAdj, rows: (html.match(/<tr>/g) || []).length, modelRow: /<td>Model<\/td>/.test(html), spread: /Least consistent/.test(html), moved: /moved earlier/.test(html) };
}
"""

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 390, 'height': 844}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(URL); pg.wait_for_timeout(600); print('load errors:', errs)
    r = pg.evaluate(RUN, dict(layout='intl', rate=1, seconds=150, mode='words')); print('WORDS intl 1Hz:'); [print('   ', w) for w in r['words']]; print('  laps', r['laps'])
    r = pg.evaluate(RUN, dict(layout='nat', rate=10, seconds=260, bad=True)); print('BAD DRIVER nat 10Hz: laps'); [print('   ', l) for l in r['laps']]
    r = pg.evaluate(RUN, dict(layout='intl', rate=1, seconds=190, wet=True)); print('WET intl: laps', [l['s'] for l in r['laps']], 'first words', r['words'][:6])
    for cfg in (dict(truth='nat', startSel='intl', rot=37), dict(truth='intl', startSel='nat', rot=212)):
        print('FIT', cfg, '->', pg.evaluate(FIT, cfg))
    # the Model driver level: a level string and a line for every layout, no one-point blips, and a lap of words and tones through the engine
    m = pg.evaluate("""() => { const W = window.__wm; if (!W.M) return 'no model'; const out = {}; for (const lay of ['intl', 'nat']) for (const chic of [true, false]) for (const wet of [false, true]) {
      Object.assign(W.st, { layout: lay, chic, wet, profile: 'model' }); const L = W.LY(), mk = W.MK(); if (!mk) { out[lay + chic + wet] = 'missing'; continue; }
      const lv = W.LVL(L), n = L.centre.length, line = W.modelLine(L); let blips = 0; for (let i = 0; i < n; i++) { const a = lv[(i - 1 + n) % n], b = lv[(i + 1) % n]; if (lv[i] !== a && lv[i] !== b && a === b) blips++; }
      out[lay + (chic ? '_c' : '_n') + (wet ? '_wet' : '')] = { lap: mk.lap, lvOk: lv.length === n, lineOk: line.length === n, blips }; }
      Object.assign(W.st, { layout: 'intl', chic: true, wet: false, profile: 'novice' }); return out; }""")
    print('MODEL levels and lines:', m)
    if m != 'no model':
        r = pg.evaluate(RUN, dict(layout='intl', rate=10, seconds=150, mode='words')); pg.evaluate("() => { window.__wm.st.profile = 'novice'; }")
    r = pg.evaluate("""(cfg) => { const W = window.__wm; Object.assign(W.st, { layout: 'intl', chic: true, wet: false, profile: 'model' }); Object.assign(W.set, { mode: 'words', sayFlat: true, sayLift: true, sayBrake: true, coachSay: true, lapSay: false });
      window.speechSynthesis.speak = () => {}; W.sim.rate = 10; W.sim.bad = false; W.sim.rot = 0; W.lapReset(W.simT()); const n = W.LY().centre.length, words = []; let now = 1000; W.lapE.onWord = (t, l) => words.push(t);
      W.sim.pos = n - 18; W.sim.v = 17; W.sim.fixAcc = 1e9; W.sim.tickAcc = 0; const dt = 0.02; for (let s = 0; s < 150 / dt; s++) { now += dt * 1000; W.simStep(dt, now, true); }
      const r = { words: words.length, laps: W.lapE.laps.map(l => +(l.ms / 1000).toFixed(2)) }; Object.assign(W.st, { profile: 'novice' }); return r; }""", {})
    print('MODEL profile lap through the engine:', r)

    # phone-first additions: last-lap profile, one chirp per brake word, learned lead for a late braker, focus corner with confirmation, session table
    r = pg.evaluate(RUNX, dict(layout='intl', rate=1, seconds=230)); print('PROFILE 1Hz:', [(l['n'], l['s'], l['prof'], l['brakes'], l['cues']) for l in r['laps']], 'totals', r['tot'])
    assert len(r['laps']) >= 2 and all(l['prof'] for l in r['laps'][1:]), 'speed profile missing after lap one'
    assert abs(r['tot']['brakes'] - r['tot']['cues']) <= 1, 'chirps should match brake words'
    r = pg.evaluate(RUNX, dict(layout='intl', rate=10, seconds=300, late=True)); print('LATE BRAKER 10Hz: adj per lap', [(l['n'], l['s'], {k: v for k, v in l['adj'].items() if v}) for l in r['laps']], 'moved note', r['moved'])
    assert len(r['laps']) >= 4 and any(v > 0 for v in r['leadAdj'].values()), 'a late braker should get earlier calls after three laps'
    r0 = pg.evaluate(RUNX, dict(layout='intl', rate=10, seconds=300, late=True, autoLead=False)); assert not any(r0['leadAdj'].values()), 'auto lead off must not adjust'
    r = pg.evaluate(RUNX, dict(layout='nat', rate=10, seconds=330, bad=True, badUntil=125)); print('FOCUS nat 10Hz:'); [print('   ', l['n'], l['s'], 'focus', l['focus'], '|', l['tip']) for l in r['laps']]
    assert any(l['focus'] for l in r['laps']), 'no focus corner chosen'
    assert any(l['said'] and 'found' in l['said'] for l in r['laps']), 'no confirmation after the driver improved'
    print('SESSION TABLE rows', r['rows'], 'model row', r['modelRow'], 'spread', r['spread'])
    assert r['rows'] >= len(r['laps']) + 2 and r['spread'], 'session table incomplete'
    if m != 'no model': assert r['modelRow'], 'model row missing'
    print('errors', errs); b.close()
