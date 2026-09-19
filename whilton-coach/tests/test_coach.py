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
    print('errors', errs); b.close()
