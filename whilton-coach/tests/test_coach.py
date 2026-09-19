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
  W.lapE.onWord = (t, l) => { if (l > 0) { cur.words++; if (l >= 3) { cur.brakes++; tot.brakes++; const ev = W.lapE.events.filter(e => e.level >= 3).map(e => ((e.i - W.sim.pos) % n + n) % n).sort((a, b) => a - b)[0]; (cur.ahead = cur.ahead || []).push(+(ev * 2).toFixed(1)); } } };
  W.lapE.onCue = k => { cur.cues++; tot.cues++; };
  W.lapE.onLap = lap => { const ah = cur.ahead || []; perLap.push(Object.assign({ n: lap.n, s: +(lap.ms / 1000).toFixed(2), focus: lap.focus, said: lap.said, tip: lap.tip, prof: !!W.lapE.prof, adj: Object.assign({}, W.lapE.leadAdj), aheadMean: ah.length ? +(ah.reduce((x, y) => x + y, 0) / ah.length).toFixed(1) : null }, cur)); cur.words = 0; cur.brakes = 0; cur.cues = 0; cur.ahead = []; };
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
    r = pg.evaluate(RUNX, dict(layout='intl', rate=10, seconds=300, late=True)); print('LATE BRAKER 10Hz: adj per lap', [(l['n'], l['s'], {k: v for k, v in l['adj'].items() if v}, l['aheadMean']) for l in r['laps']], 'moved note', r['moved'])
    assert len(r['laps']) >= 4 and any(v > 0 for v in r['leadAdj'].values()) and r['moved'], 'a late braker should get earlier calls after three laps'
    assert r['laps'][3]['aheadMean'] - r['laps'][0]['aheadMean'] >= 4, 'the brake words did not move earlier once the lead was learned: ' + str([l['aheadMean'] for l in r['laps']])
    r0 = pg.evaluate(RUNX, dict(layout='intl', rate=10, seconds=300, late=True, autoLead=False)); assert len(r0['laps']) >= 4 and r0['tot']['brakes'] > 10 and not any(r0['leadAdj'].values()), 'auto lead off must not adjust'
    r1 = pg.evaluate(RUNX, dict(layout='intl', rate=1, seconds=300, late=True)); assert not any(r1['leadAdj'].values()) and not r1['moved'], 'at one fix a second nothing must be learned, even from a late braker'
    r2 = pg.evaluate(RUNX, dict(layout='intl', rate=10, seconds=300)); assert not any(r2['leadAdj'].values()) and not r2['moved'], 'a driver on the plan must not get a learned lead: ' + str(r2['leadAdj'])
    r = pg.evaluate(RUNX, dict(layout='nat', rate=10, seconds=330, bad=True, badUntil=125)); print('FOCUS nat 10Hz:'); [print('   ', l['n'], l['s'], 'focus', l['focus'], '|', l['tip']) for l in r['laps']]
    assert any(l['focus'] for l in r['laps']), 'no focus corner chosen'
    assert any(l['said'] and 'found' in l['said'] for l in r['laps']), 'no confirmation after the driver improved'
    fk = next(l['focus'] for l in r['laps'] if l['focus']); fs = next(l['said'] for l in r['laps'] if l['said'] and 'found' in l['said']); assert fs.split(' better')[0].lower() in {'christmas': 'christmas', 'crook': 'crook'}.get(fk, fk).lower() or fk in fs.lower() or fs.lower().startswith(fk[:4]), 'the confirmation names a different corner from the focus: ' + fk + ' / ' + fs
    print('SESSION TABLE rows', r['rows'], 'model row', r['modelRow'], 'spread', r['spread'])
    assert r['rows'] >= len(r['laps']) + 2 and r['spread'], 'session table incomplete'
    tb = pg.evaluate("() => { const h = document.querySelector('#debriefBody').innerHTML; return { bestRows: (h.match(/ best<\\/td>/g) || []).length, greens: (h.match(/class=\"pos\"/g) || []).length, spreadNums: ((h.match(/<td>Spread<\\/td>(.*?)<\\/tr>/) || ['', ''])[1].match(/\\d+\\.\\d/g) || []).length }; }")
    print('SESSION TABLE detail', tb); assert tb['bestRows'] == 1 and tb['greens'] >= 3 and tb['spreadNums'] >= 3, 'session table rows or marks wrong'
    if m != 'no model': assert r['modelRow'], 'model row missing'

    # practice at home: the silent reference lap, the lap in your head, the corner quiz and the talked virtual lap
    r = pg.evaluate("""() => { const W = window.__wm; window.speechSynthesis.speak = () => {}; Object.assign(W.st, { layout: 'intl', chic: true, wet: false, profile: 'novice' }); W.setTab('coach');
      const R = W.refTimes(), list = W.LY() && R.corners; document.querySelector('#mindBtn').click(); W.mindTap();
      for (let j = 0; j < list.length; j++) { W.mind.t0 = performance.now() - R.corners[j].t * 1000 * (j < 4 ? 0.6 : 1.0); W.mindTap(); }
      W.mind.t0 = performance.now() - R.lap * 1000 * 0.9; W.mindTap(); const out = document.querySelector('#mindOut');
      document.querySelector('#quizBtn').click(); const btns = document.querySelectorAll('#quizA button').length; W.quizAnswer(W.quiz.cur.answer); const s1 = document.querySelector('#quizScore').textContent; W.quizAsk(); W.quizAnswer('nonsense'); const s2 = document.querySelector('#quizScore').textContent;
      const was = W.set.mode; W.virtualStart(); const v = { on: W.sim.on, mode: W.set.mode }; W.simStop();
      return { corners: R.corners.length, lap: +R.lap.toFixed(1), mono: R.corners.every((c, i) => !i || c.t > R.corners[i - 1].t), mindOn: W.mind.on, summary: out.querySelector('b') && out.querySelector('b').textContent, rows: out.querySelectorAll('tr').length, btns, s1: s1.slice(0, 6), s2: s2.slice(0, 3), virtual: v, restored: W.set.mode === was }; }""")
    print('HOME PRACTICE:', r)
    assert r['corners'] == 12 and 50 < r['lap'] < 90 and r['mono'], 'reference lap wrong'
    assert not r['mindOn'] and 'demo lap takes' in r['summary'] and r['rows'] == r['corners'] + 2, 'lap in your head report wrong'
    assert r['btns'] == 3 and r['s1'] == 'Right.' and r['s2'] == 'No:', 'quiz wrong'
    assert r['virtual'] == {'on': True, 'mode': 'talk'} and r['restored'], 'virtual lap did not run in talk mode or did not restore the mode'

    # laps driven on one layout, then the Map tab switched to the other: the debrief must not crash and the model row must not mix layouts
    r = pg.evaluate("""() => { const W = window.__wm; const errs = []; window.addEventListener('error', e => errs.push(String(e.message)));
      Object.assign(W.st, { layout: 'nat', chic: true, wet: false, profile: 'novice' }); W.renderDebrief(); const before = document.querySelector('#debriefBody').innerHTML.length;
      Object.assign(W.st, { layout: 'intl' }); W.setTab('coach'); W.renderDebrief(); const html = document.querySelector('#debriefBody').innerHTML; Object.assign(W.st, { layout: 'intl' });
      return { before, after: html.length, modelRow: /<td>Model<\/td>/.test(html), errs }; }""")
    print('LAYOUT SWITCH debrief:', r)
    assert r['after'] > 0 and not r['errs'] and not r['modelRow'], 'debrief broke after a layout switch'

    # the team table: two drivers' live laps kept on the phone, fastest per corner marked, cleared by the button
    r = pg.evaluate("""() => { const W = window.__wm; Object.assign(W.st, { layout: 'intl', chic: true, wet: false, profile: 'novice' }); W.lapReset(W.simT()); W.team.laps = [];
      const mk = (d, ms, t) => { document.querySelector('#driverName').value = d; const m = {}; W.LY(); ['oblivion', 'christmas', 'boot'].forEach((k, i) => { m[k] = { tSeg: t + i, vMin: 10 }; }); W.teamLog({ ms, m }); };
      mk('Sam', 66000, 5.0); mk('Sam', 65500, 4.8); mk('Jo', 70000, 5.6); W.renderDebrief(); const html = document.querySelector('#debriefBody').innerHTML, rows = (html.match(/<tr>/g) || []).length, greens = (html.match(/class="pos"/g) || []).length;
      document.querySelector('#teamClear').click(); const after = document.querySelector('#debriefBody').innerHTML; return { rows, greens, hasSam: /Sam/.test(html), cleared: !/Sam/.test(after), stored: (JSON.parse(localStorage.getItem('wm.team') || '[]')).length }; }""")
    print('TEAM TABLE:', r)
    assert r['rows'] == 3 and r['hasSam'] and r['greens'] >= 4 and r['cleared'] and r['stored'] == 0, 'team table wrong'

    # a steady driver at one fix a second must not be coached on noise; the go blip must not fire inside brake zones on GPS snaps
    r = pg.evaluate("""() => { const W = window.__wm; Object.assign(W.st, { layout: 'intl', chic: true, wet: false, profile: 'novice' }); Object.assign(W.set, { mode: 'words', sayFlat: true, sayLift: true, sayBrake: true, coachSay: true, lapSay: false, prepCue: true, autoLead: true, wordLead: 1.6 });
      window.speechSynthesis.speak = () => {}; W.sim.rate = 1; W.sim.bad = false; W.sim.late = false; W.sim.crawl = false; W.sim.rot = 0; W.lapReset(W.simT()); W.lapE.goBlips = 0;
      const n = W.LY().centre.length, laps = []; let now = 1000; W.lapE.onLap = lap => laps.push({ n: lap.n, s: +(lap.ms / 1000).toFixed(2), say: lap.say, focus: lap.focus });
      W.sim.pos = n - 18; W.sim.v = 17; W.sim.fixAcc = 1e9; W.sim.tickAcc = 0; const dt = 0.02; for (let s = 0; s < 420 / dt; s++) { now += dt * 1000; W.simStep(dt, now, true); }
      const zones = (W.LVL(W.LY()).match(/1[2-5]/g) || []).length; return { laps, goBlips: W.lapE.goBlips, zones }; }""")
    print('STEADY 1Hz:', r['laps'], 'go blips', r['goBlips'], 'zones per lap', r['zones'])
    spoken = [l for l in r['laps'] if l['say'] and not l['say'].startswith('Best lap')]
    assert len(r['laps']) >= 5 and len(spoken) <= 1, 'a steady driver was coached on noise: ' + str(spoken)
    assert r['goBlips'] <= (r['zones'] + 1) * len(r['laps']) + 2, 'go blips fired inside brake zones'
    # a lap stuck behind a slower kart must not spoil the next lap's look-ahead: the realised word lead stays near the setting
    r = pg.evaluate("""() => { const W = window.__wm; Object.assign(W.set, { autoLead: false, wordLead: 1.6, mode: 'words' }); W.sim.rate = 1; W.lapReset(W.simT());
      const n = W.LY().centre.length, E = W.lapE, leads = {}; let now = 1000, lapNo = 1; W.lapE.onLap = lap => { lapNo = lap.n + 1; };
      W.lapE.onWord = (t, l) => { if (l < 3) return; const ev = E.events.filter(e => e.level >= 3).map(e => ((e.i - W.sim.pos) % n + n) % n).sort((a, b) => a - b)[0]; (leads[lapNo] = leads[lapNo] || []).push(+(ev * 2 / W.sim.v).toFixed(2)); };
      W.sim.pos = n - 18; W.sim.v = 17; W.sim.fixAcc = 1e9; W.sim.tickAcc = 0; const dt = 0.02;
      for (let s = 0; s < 300 / dt; s++) { now += dt * 1000; W.sim.crawl = lapNo === 2 && W.sim.pos > 60 && W.sim.pos < 200; W.simStep(dt, now, true); } W.sim.crawl = false;
      const mean = a => a.length ? +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(2) : null; const out = {}; Object.keys(leads).forEach(k => { out[k] = { n: leads[k].length, mean: mean(leads[k]), min: Math.min(...leads[k]), max: Math.max(...leads[k]) }; }); return out; }""")
    print('REALISED LEAD by lap (s):', r)
    assert '3' in r and r['3']['min'] >= 1.0 and r['3']['max'] <= 2.6, 'the lap after a traffic lap has wrong word leads: ' + str(r.get('3'))
    # speech start: the median of measured starts, capped at a second, nothing until three are known
    r = pg.evaluate("""() => { const W = window.__wm; W.speechLags.length = 0; const a = W.speechLag(); W.speechLags.push(.2, .5, .3); const b = W.speechLag(); W.speechLags.push(9, 9, 9, 9); const c = W.speechLag(); W.speechLags.length = 0; return { a, b, c, short: [W.SHORT('brake later, by about 20 metres'), W.SHORT('you over-slowed. 3 miles an hour down'), W.SHORT('keep it flat. You dropped 5 miles an hour')] }; }""")
    print('SPEECH LAG:', r)
    assert r['a'] == 0 and abs(r['b'] - .3) < 1e-9 and r['c'] == 1 and r['short'] == ['brake later', 'carry speed', 'stay flat'], 'speech lag or short forms wrong'

    # the intermediate level: levels for every layout and condition, its own card text, a lap of words through the engine
    r = pg.evaluate("""() => { const W = window.__wm, out = {}; for (const lay of ['intl','nat']) for (const chic of [true,false]) for (const wet of [false,true]) { Object.assign(W.st, { layout: lay, chic, wet, profile: 'inter' }); const L = W.LY(); out[lay+(chic?'_c':'_n')+(wet?'_w':'')] = W.LVL(L).length === L.centre.length; }
      Object.assign(W.st, { layout: 'intl', chic: true, wet: false }); document.querySelector('[data-profile="inter"]').click(); W.setTab('corners'); const flat = [...document.querySelectorAll('#acc details')].find(d => /Fine Lady/.test(d.querySelector('.nm').textContent)).querySelector('.do').textContent, brake = [...document.querySelectorAll('#acc details')].find(d => /Christmas/.test(d.querySelector('.nm').textContent)).querySelector('.do').textContent;
      Object.assign(W.set, { mode: 'words', sayFlat: true, sayLift: true, sayBrake: true, lapSay: false, coachSay: true }); W.sim.rate = 10; W.sim.bad = false; W.lapReset(W.simT()); const n = W.LY().centre.length, words = []; let now = 1000; W.lapE.onWord = (t, l) => { if (l > 0) words.push(t); };
      W.sim.pos = n - 18; W.sim.v = 17; W.sim.fixAcc = 1e9; W.sim.tickAcc = 0; const dt = 0.02; for (let s = 0; s < 150 / dt; s++) { now += dt * 1000; W.simStep(dt, now, true); }
      const res = { levels: Object.values(out).every(Boolean), flatNote: /intermediate/.test(flat), brakeOwn: /novice's early point/.test(brake), words: words.length, laps: W.lapE.laps.length }; document.querySelector('[data-profile="novice"]').click(); return res; }""")
    print('INTERMEDIATE:', r)
    assert r['levels'] and not r['flatNote'] and r['brakeOwn'] and r['words'] > 20 and r['laps'] >= 1, 'intermediate level incomplete'

    # the practice loop: a walker jogs and walks round the shrunk lap laid on the ground; every call comes, laps time, coaching speaks
    LOOP = """(sc) => { const W = window.__wm; window.speechSynthesis.speak = () => {}; document.querySelector('[data-profile="novice"]').click(); Object.assign(W.st, { layout: 'intl', chic: true, wet: false }); Object.assign(W.set, { mode: 'words', sayFlat: true, sayLift: true, sayBrake: true, lapSay: true, coachSay: true });
      const origin = { lat: 52.2, lon: -1.1 }, heading = [Math.cos(.4), Math.sin(.4)], T = W.loopFit(origin, heading, sc); W.lapReset(T); W.lapE.gate = .35; W.lapE.offScale = 1.5;
      const L = W.LY(), n = L.centre.length, lv = W.LVL(L), words = [], laps = []; W.lapE.onWord = (t, l) => { if (l > 0) words.push(t); }; W.lapE.onLap = lap => laps.push({ s: +(lap.ms / 1000).toFixed(1), say: lap.say });
      let pos = n - 6, now = 1000, t = 0, fixes = 0;
      for (let k = 0; k < 9000; k++) { now += 100; const i = Math.floor(pos) % n, level = +lv[i], vReal = level >= 3 ? 1.2 : level === 2 ? 1.8 : 2.5; pos += vReal / sc * .1 / L.step; t += .1;
        if (Math.round(t * 10) % 10 === 0) { const j = Math.floor(pos - (0.3 * vReal / sc) / L.step) % n, p = L.centre[(j + n) % n], w = W.m2w(T, p[0], p[1]), ll = W.toLL(w[0] + (Math.random() - .5) * 4, w[1] + (Math.random() - .5) * 4, origin); W.lapFix({ t: now, lat: ll[0], lon: ll[1], spd: (vReal + (Math.random() - .5) * .5) / sc, acc: 3 }); fixes++; }
        W.lapTick(now); if (laps.length >= 2) break; }
      const startAt = W.m2w(T, L.centre[0][0], L.centre[0][1]); W.lapReset(W.simT()); return { len: Math.round(L.total * sc), fixes, nWords: words.length, brakes: words.filter(w => /brake/i.test(w)).length, laps, startAt: startAt.map(x => +x.toFixed(2)) }; }"""
    r = pg.evaluate(LOOP, 1 / 3); print('PRACTICE LOOP 1:3:', r)
    assert abs(r['startAt'][0]) < 0.01 and abs(r['startAt'][1]) < 0.01, 'the start line must sit on the origin'
    assert len(r['laps']) == 2 and 150 < r['laps'][0]['s'] < 220 and r['brakes'] >= 8 and r['nWords'] >= 20, 'the practice loop did not coach a full walked lap'
    print('errors', errs); b.close()
