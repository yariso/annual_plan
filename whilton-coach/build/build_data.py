import json, math, numpy as np
from scipy.ndimage import gaussian_filter1d

import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
_sc = json.load(open(os.path.join(ROOT, 'data', 'scale.json'))); scale = _sc['scale']; DETECT_SCALE = _sc.get('detect_scale', scale)
STEP = 2.0; HALF = 8.0; OFFMAX = 5.6
PATHS = {k: os.path.join(ROOT, 'data', v) for k, v in dict(intl_c='intl_px.npy', intl_n='intl_n_px.npy', nat_c='nat_px.npy', nat_n='nat_n_px.npy').items()}

def prep(px, sc=None):
    sc = scale if sc is None else sc
    p = np.column_stack([px[:, 0] * sc, -px[:, 1] * sc])
    q = np.vstack([p, p[:1]]); d = np.hypot(*np.diff(q, axis=0).T); s = np.concatenate([[0], np.cumsum(d)]); L = s[-1]
    n = int(round(L / STEP)); t = np.arange(n) * (L / n)
    P = np.column_stack([np.interp(t, s, q[:, 0]), np.interp(t, s, q[:, 1])])
    P = np.column_stack([gaussian_filter1d(P[:, 0], 1.5, mode='wrap'), gaussian_filter1d(P[:, 1], 1.5, mode='wrap')])
    dP = np.roll(P, -1, axis=0) - np.roll(P, 1, axis=0); h = np.unwrap(np.arctan2(dP[:, 1], dP[:, 0]))
    ds = L / n; k = np.roll(h, -1) - np.roll(h, 1); k[0] = k[1]; k[-1] = k[-2]; k = gaussian_filter1d(k / (2 * ds), 1.2, mode='wrap')
    return dict(P=P, h=h, k=k, L=L, ds=ds, n=n)

def detect(g, thr=1 / 70.0, min_ang=8, merge_gap=5.0):
    k, ds, n = g['k'], g['ds'], g['n']; out = []; i = 0
    while i < n:
        if abs(k[i]) < thr: i += 1; continue
        j = i; sg = np.sign(k[i])
        while j + 1 < n and abs(k[j + 1]) >= thr and np.sign(k[j + 1]) == sg: j += 1
        ang = math.degrees(float(np.sum(k[i:j + 1]) * ds))
        if abs(ang) > min_ang: out.append([i, j, int(sg), ang])
        i = j + 1
    merged = []
    for c in out:
        if merged and merged[-1][2] == c[2] and (c[0] - merged[-1][1]) * ds <= merge_gap: merged[-1][1] = c[1]; merged[-1][3] += c[3]
        else: merged.append(c)
    if len(merged) > 1 and merged[0][0] == 0 and merged[-1][1] == n - 1 and merged[0][2] == merged[-1][2]:
        raise SystemExit('a corner straddles index 0: roll the centreline so the start line sits on a straight')
    return merged

SEQ = dict(
    intl_c=['oblivion', 'crook', 'finelady', 'christmas', 'kink', 'inkermans', 'ashby', 'parker', 'chapmans', 'chap2', 'boot1', 'boot2', 'boot3', 'chic1', 'pitbend'],
    intl_n=['oblivion', 'crook', 'finelady', 'christmas', 'kink', 'inkermans', 'ashby', 'parker', 'chapmans', 'chap2', 'boot1', 'boot2', 'boot3', 'pitbend'],
    nat_c=['oblivion', 'crook', 'finelady', 'christmas', 'kink', 'inkhair', 'zulu1', 'zulu2', 'zulu3', 'boot1', 'boot2', 'boot3', 'chic1', 'pitbend'],
    nat_n=['oblivion', 'crook', 'finelady', 'christmas', 'kink', 'inkhair', 'zulu1', 'zulu2', 'zulu3', 'boot1', 'boot2', 'boot3', 'pitbend'],
)

def smooth(t): return t * t * (3 - 2 * t)

def line_cps(key):
    nat = key.startswith('nat'); chic = key.endswith('_c'); back = 'zulu3>' if nat else 'chap2>'
    A = [('start>', 0.0, -0.30), ('start>', 0.7, -0.85), ('oblivion', 0.5, 0.90), ('oblivion', 1.0, 0.75), ('oblivion>', 0.7, 0.80),
         ('crook', 0.5, -0.90), ('crook', 1.0, 0.0), ('crook>', 0.22, 1.0), ('crook>', 0.7, 0.2), ('finelady', 0.5, -0.70),
         ('finelady>', 0.3, 0.0), ('finelady>', 0.8, 0.85), ('christmas', 0.0, 0.85), ('christmas', 0.62, -0.90), ('christmas>', 0.5, 0.20), ('kink', 0.5, 0.80)]
    if nat:
        M = [('kink>', 0.6, 0.90), ('inkhair', 0.0, 0.90), ('inkhair', 0.55, -0.95), ('inkhair', 1.0, -0.30), ('inkhair>', 0.7, -0.35),
             ('zulu1', 0.45, 0.85), ('zulu1', 1.0, 0.55), ('zulu2', 0.65, -0.85), ('zulu2', 1.0, -0.60), ('zulu3', 0.4, 1.0), ('zulu3', 1.0, 0.0), (back, 0.12, -0.85)]
    else:
        M = [('kink>', 0.55, 0.35), ('inkermans', 0.0, 0.78), ('inkermans', 0.5, -0.90), ('inkermans', 1.0, -0.20), ('inkermans>', 0.25, 0.90), ('inkermans>', 0.6, 0.85),
             ('ashby', 0.0, 0.90), ('ashby', 0.55, -0.95), ('ashby', 1.0, 0.0), ('ashby>', 0.2, 1.0), ('ashby>', 0.8, -0.85),
             ('parker', 0.5, 0.90), ('parker', 1.0, 0.0), ('parker>', 0.3, -0.90), ('parker>', 0.85, -0.85),
             ('chapmans', 0.7, 0.90), ('chapmans', 1.0, 0.1), ('chap2', 0.5, -0.85), (back, 0.12, 0.45)]
    B = [(back, 0.45, -0.40), (back, 0.8, -0.85), ('boot1', 0.0, -0.85), ('boot1', 0.55, 0.90), ('boot1', 1.0, 0.30), ('boot1>', 0.5, 0.05), ('boot1>', 1.0, 0.55),
         ('boot2', 0.0, 0.65), ('boot2', 0.6, -0.90), ('boot3', 0.3, -0.30)]
    if chic:
        B += [('boot3', 0.9, -0.55), ('boot3>', 0.6, -0.85), ('chic1', 0.6, 0.90), ('chic1', 1.0, 0.35), ('pitbend', 0.55, -0.85), ('pitbend', 1.0, 0.0),
              ('pitbend>', 0.22, 0.95), ('pitbend>', 0.6, 0.2), ('pitbend>', 1.0, -0.30)]
    else:
        B += [('boot3', 0.9, 0.80), ('boot3>', 0.5, 0.85), ('pitbend', 0.0, 0.85), ('pitbend', 0.5, -0.78), ('pitbend', 1.0, 0.0),
              ('pitbend>', 0.25, 0.95), ('pitbend>', 0.6, 0.2), ('pitbend>', 1.0, -0.30)]
    return A + M + B

def zones(key, prof):
    nat = key.startswith('nat'); chic = key.endswith('_c'); nov = prof == 'novice'; z = []
    if nov: z += [('lift', 'oblivion', 30, 0.5), ('lift', 'crook', 12, 0.5)]
    z += [('brake', 'christmas', 38 if nov else 22, 5, 0.62)]
    if nat:
        z += [('brake', 'inkhair', 24 if nov else 18, 4, 0.55)]
        z += [('lift', 'zulu2', 8, 0.65), ('lift', 'zulu3', 10, 0.4)] if nov else [('lift', 'zulu3', 6, 0.25)]
    else:
        z += [('brake', 'ashby', 36 if nov else 26, 5, 0.55), ('brake', 'parker', 12 if nov else 8, 3, 0.5 if nov else 0.35), ('brake', 'chapmans', 16 if nov else 12, 4, 0.7)]
    z += [('brake', 'boot1', 40 if nov else 24, 5, 0.55)]
    if nov: z += [('coast', 'boot1', 0.55, 'boot2', 0.6)]
    if chic:
        z += [('brake', 'chic1', 16 if nov else 10, 4, 0.6), ('coast', 'chic1', 0.6, 'pitbend', 0.5 if nov else 0.3)]
    elif nov:
        z += [('lift', 'pitbend', 25, 0.5)]
    return z

def markers(key):
    m = [('christmas', 'post', 'L', 22, 'Marshal post on the left'), ('boot1', 'post', 'R', 24, 'Marshal post on the right')]
    if key.startswith('nat'): m.insert(1, ('inkhair', 'surface', 'X', 14, 'Change of tarmac surface'))
    return m

def kerbs(key):
    """(key, primitive, f0, f1, side, status, where). status: use | care | avoid | unknown."""
    nat = key.startswith('nat'); chic = key.endswith('_c')
    k = [('oblivion_in', 'oblivion', 0.2, 0.8, 'L', 'use', 'apex'), ('crook_in', 'crook', 0.3, 0.7, 'R', 'care', 'apex'), ('crook_out', 'crook>', 0.04, 0.34, 'L', 'care', 'exit'),
         ('christmas_in', 'christmas', 0.45, 0.85, 'R', 'unknown', 'apex'), ('kink_in', 'kink', 0.25, 0.75, 'L', 'use', 'apex'),
         ('boot1_in', 'boot1', 0.3, 0.8, 'L', 'unknown', 'apex'), ('boot2_in', 'boot2', 0.35, 0.85, 'R', 'care', 'apex'), ('pitbend_out', 'pitbend>', 0.08, 0.38, 'L', 'avoid', 'exit')]
    if chic: k += [('chic1_in', 'chic1', 0.3, 0.85, 'L', 'avoid', 'apex'), ('pitbend_in', 'pitbend', 0.35, 0.75, 'R', 'unknown', 'apex')]
    else: k += [('pitbend_in', 'pitbend', 0.3, 0.7, 'R', 'care', 'apex')]
    if nat: k += [('inkhair_in', 'inkhair', 0.55, 0.95, 'R', 'use', 'apex'), ('inkhair_out', 'inkhair>', 0.0, 0.5, 'L', 'avoid', 'exit'),
                  ('zulu1_in', 'zulu1', 0.25, 0.75, 'L', 'care', 'apex'), ('zulu2_in', 'zulu2', 0.3, 0.8, 'R', 'care', 'apex'),
                  ('zulu3_in', 'zulu3', 0.12, 0.65, 'L', 'use', 'apex'), ('zulu3_out', 'zulu3>', 0.0, 0.14, 'R', 'care', 'exit')]
    else: k += [('inkermans_in', 'inkermans', 0.2, 0.8, 'R', 'use', 'apex'), ('ashby_in', 'ashby', 0.35, 0.75, 'R', 'use', 'apex'), ('ashby_out', 'ashby>', 0.06, 0.3, 'L', 'care', 'exit'),
                ('parker_in', 'parker', 0.25, 0.75, 'L', 'use', 'apex'), ('parker_out', 'parker>', 0.04, 0.4, 'R', 'avoid', 'exit'),
                ('chapmans_in', 'chapmans', 0.5, 0.9, 'L', 'unknown', 'apex'), ('chapmans_out', 'chap2', 0.1, 0.9, 'R', 'care', 'exit')]
    return k

# ---- wet: stay off the rubbered dry line, brake earlier and softer, keep off every kerb (general technique) ----
def line_cps_wet(key):
    out = []
    for c, f, o in line_cps(key):
        if abs(o) >= 0.7 and not c.endswith('>') and 0.2 < f < 0.95: o = 0.42 * (1 if o > 0 else -1)   # apexes: a kart width or more off the kerb
        elif abs(o) >= 0.7: o = 0.6 * (1 if o > 0 else -1)                                              # approaches and exits: off the rubber at the edges
        out.append((c, f, o))
    return out

def zones_wet(key, prof):
    nat = key.startswith('nat'); chic = key.endswith('_c'); nov = prof == 'novice'; m = 1.35
    z = [('brake', 'oblivion', 22 if nov else 14, 3, 0.5), ('brake', 'crook', 12 if nov else 8, 3, 0.5), ('brake', 'christmas', (38 if nov else 22) * m, 4, 0.62), ('lift', 'kink', 10, 0.5)]
    if nat: z += [('brake', 'inkhair', (24 if nov else 18) * m, 4, 0.55), ('lift', 'zulu1', 8, 0.45), ('lift', 'zulu2', 10, 0.65), ('brake', 'zulu3', 10, 3, 0.4)]
    else: z += [('lift', 'inkermans', 14, 0.5), ('brake', 'ashby', (36 if nov else 26) * m, 4, 0.55), ('brake', 'parker', 16 if nov else 12, 3, 0.5), ('brake', 'chapmans', (16 if nov else 12) * m, 4, 0.7)]
    z += [('brake', 'boot1', (40 if nov else 24) * m, 4, 0.55), ('coast', 'boot1', 0.55, 'boot2', 0.6)]
    if chic: z += [('brake', 'chic1', (16 if nov else 10) * m, 4, 0.6), ('coast', 'chic1', 0.6, 'pitbend', 0.5)]
    else: z += [('brake', 'pitbend', 18 if nov else 10, 3, 0.5)]
    return z

def build(key):
    px = np.load(PATHS[key]); g = prep(px); names = SEQ[key]
    gd = prep(px, DETECT_SCALE); cs = detect(gd)                      # detect on the scale the thresholds were tuned for, then map the segments onto this geometry
    f = g['n'] / gd['n']; cs = [[int(round(c[0] * f)), min(g['n'] - 1, int(round(c[1] * f))), c[2], c[3]] for c in cs]
    assert len(cs) == len(names), (key, len(cs), len(names))
    P, h, k, L, ds, n = g['P'], g['h'], g['k'], g['L'], g['ds'], g['n']
    rng = {}; prev_end = 0.0; prev_name = 'start'
    for c, nm in zip(cs, names):
        s0, s1 = c[0] * ds, (c[1] + 1) * ds
        rng[prev_name + '>'] = (prev_end, s0); rng[nm] = (s0, s1); prev_end, prev_name = s1, nm
    rng[prev_name + '>'] = (prev_end, L)
    idx = lambda s: int(round((s % L) / ds)) % n
    def make_line(cp_list):
      cps = sorted((rng[i][0] + f * (rng[i][1] - rng[i][0]), o) for i, f, o in cp_list)
      def off(s):
          if s <= cps[0][0]: a, b = (cps[-1][0] - L, cps[-1][1]), cps[0]
          elif s >= cps[-1][0]: a, b = cps[-1], (cps[0][0] + L, cps[0][1])
          else:
              for j in range(len(cps) - 1):
                  if cps[j][0] <= s <= cps[j + 1][0]: a, b = cps[j], cps[j + 1]; break
          t = 0 if b[0] == a[0] else (s - a[0]) / (b[0] - a[0])
          return a[1] + (b[1] - a[1]) * smooth(t)
      offs = np.array([off(i * ds) for i in range(n)]); offs = gaussian_filter1d(offs, 1.0, mode='wrap') * OFFMAX
      nx, ny = -np.sin(h), np.cos(h)
      line = np.column_stack([P[:, 0] + nx * offs, P[:, 1] + ny * offs])
      line = np.column_stack([gaussian_filter1d(line[:, 0], 1.0, mode='wrap'), gaussian_filter1d(line[:, 1], 1.0, mode='wrap')])
      return line
    nx, ny = -np.sin(h), np.cos(h)
    line = make_line(line_cps(key)); line_w = make_line(line_cps_wet(key))
    def paint_i(lv, i, j, level):
        q = i % n; j = j % n
        while True:
            lv[q] = level
            if q == j: break
            q = (q + 1) % n
    def paint(lv, sa, sb, level): paint_i(lv, idx(sa), idx(sb), level)
    levels = {}
    for prof, zfun in (('novice', zones), ('expert', zones), ('novice_w', zones_wet), ('expert_w', zones_wet)):
        lv = [1] * n
        for z in zfun(key, prof.split('_')[0]):
            if z[0] == 'brake':
                _, c, before, level, af = z; s0, s1 = rng[c]
                e = idx(s0) + 2; paint_i(lv, idx(s0 - before), e, level); paint_i(lv, e + 1, max(e + 1, idx(s0 + af * (s1 - s0))) if idx(s0 + af * (s1 - s0)) > e else e + 1, 2)
            elif z[0] == 'lift':
                _, c, before, af = z; s0, s1 = rng[c]; paint(lv, s0 - before, s0 + af * (s1 - s0), 2)
            else:
                _, c1, f1, c2, f2 = z; paint(lv, rng[c1][0] + f1 * (rng[c1][1] - rng[c1][0]), rng[c2][0] + f2 * (rng[c2][1] - rng[c2][0]), 2)
        levels[prof] = lv
    def pt(s, side=0.0):
        i = idx(s); return (P[i, 0] + nx[i] * side, P[i, 1] + ny[i] * side, h[i])
    mk = []
    for c, kind, side, before, text in markers(key):
        s = rng[c][0] - before; so = {'L': HALF + 6, 'R': -(HALF + 6), 'X': 0}[side]; x, y, hh = pt(s, so)
        mk.append(dict(corner=c, kind=kind, side=side, x=x, y=y, i=idx(s), text=text))
    kb = []
    for kk, prim, f0, f1, side, status, where in kerbs(key):
        s0, s1 = rng[prim]; sa, sb = s0 + f0 * (s1 - s0), s0 + f1 * (s1 - s0); so = (HALF + 1.0) * (1 if side == 'L' else -1)
        path = []; s = sa
        while s <= sb + 0.01: x, y, _ = pt(s, so); path.append((x, y)); s += ds
        bx, by, _ = pt((sa + sb) / 2, (HALF + 7.5) * (1 if side == 'L' else -1))
        kb.append(dict(key=kk, side=side, status=status, where=where, corner=prim.rstrip('>'), path=path, bx=bx, by=by))
    apexf = {}
    for c, f, o in line_cps(key):
        if c in names and abs(o) >= 0.7 and 0.15 <= f <= 0.85 and (c not in apexf or abs(o) > apexf[c][1]): apexf[c] = (f, abs(o))
    apexf = {c: v[0] for c, v in apexf.items()}
    cn = {}
    for c, nm in zip(cs, names):
        s0, s1 = rng[nm]; sa = s0 + apexf.get(nm, 0.5) * (s1 - s0); i = idx(sa); sign = c[2]
        cn[nm] = dict(i=i, a=idx(s0), b=idx(s1), i0=idx(s0 - 42), i1=idx(s1 + 22), x=P[i, 0], y=P[i, 1], ox=math.sin(h[i]) * sign, oy=-math.cos(h[i]) * sign, dir='L' if sign > 0 else 'R')
    return dict(total=L, step=ds, centre=P, head=h, curv=k, line=line, line_w=line_w, levels=levels, markers=mk, kerbs=kb, corners=cn, order=names)

data = {k: build(k) for k in PATHS}
allx = np.concatenate([d['centre'][:, 0] for d in data.values()]); ally = np.concatenate([d['centre'][:, 1] for d in data.values()])
PADX, PADR, PADY = 54, 66, 30
minx, maxy = allx.min(), ally.max(); W = allx.max() - minx + PADX + PADR; H = maxy - ally.min() + 2 * PADY
T = lambda x, y: (round(float(x - minx + PADX), 1), round(float(maxy - y + PADY), 1))
out = dict(w=round(float(W), 1), h=round(float(H), 1), half=HALF, layouts={})
for k, d in data.items():
    o = dict(total=round(float(d['total']), 1), official={'intl_c': 1054, 'intl_n': 1045, 'nat_c': 859, 'nat_n': 851}[k], venue={'intl_c': 1200, 'intl_n': 1200, 'nat_c': 960, 'nat_n': 960}[k], step=round(float(d['step']), 4), order=d['order'])   # the map is scaled so the International with the chicane measures the 1054 m in the 2025 regulations; venue: the figures the venue advertises
    o['centre'] = [T(x, y) for x, y in d['centre']]; o['line'] = [T(x, y) for x, y in d['line']]; o['line_w'] = [T(x, y) for x, y in d['line_w']]
    o['curv'] = [round(float(c), 4) for c in d['curv']]
    o['levels'] = {p: ''.join(map(str, lv)) for p, lv in d['levels'].items() if not p.endswith('_w')}
    o['levels_w'] = {p[:-2]: ''.join(map(str, lv)) for p, lv in d['levels'].items() if p.endswith('_w')}
    o['markers'] = [dict(corner=m['corner'], kind=m['kind'], side=m['side'], i=m['i'], text=m['text'], p=T(m['x'], m['y'])) for m in d['markers']]
    o['kerbs'] = [dict(key=q['key'], side=q['side'], status=q['status'], where=q['where'], corner=q['corner'], path=[T(x, y) for x, y in q['path']], b=T(q['bx'], q['by'])) for q in d['kerbs']]
    o['corners'] = {c: dict(i=v['i'], a=v['a'], b=v['b'], i0=v['i0'], i1=v['i1'], p=T(v['x'], v['y']), o=(round(float(v['ox']), 3), round(float(-v['oy']), 3)), dir=v['dir']) for c, v in d['corners'].items()}
    out['layouts'][k] = o
json.dump(out, open(os.path.join(ROOT, 'data', 'data.json'), 'w'), separators=(',', ':'))
print('W,H', out['w'], out['h'], {k: (len(v['centre']), v['total']) for k, v in out['layouts'].items()}, 'bytes', len(json.dumps(out, separators=(',', ':'))))
for c, v in out['layouts']['intl_c']['corners'].items(): print('  intl_c %-10s p=%s o=%s' % (c, v['p'], v['o']))
for c in ('inkhair', 'zulu1', 'zulu2', 'zulu3'): print('  nat_c  %-10s p=%s' % (c, out['layouts']['nat_c']['corners'][c]['p']))
