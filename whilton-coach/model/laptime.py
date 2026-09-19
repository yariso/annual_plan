#!/usr/bin/env python3
"""Minimum lap time model for Whilton Mill.

Track: the traced centrelines in data/data.json (2 m steps, metres on the 1200 m scale), resampled to 1 m, with an
estimated height profile built from the written guides (the climb from Crook to Christmas, the drop to Ashby, the
Zulu section running down the hill). No measured heights exist, so the hill is a parameter and is swept.

Kart: a point mass with a friction ellipse, engine power through a clutch, aerodynamic drag, rolling resistance,
rear-wheel drive, rear-only brakes and gravity along the slope. Two karts: the 390cc hire kart and a two-stroke race
kart, both from published figures where they exist and estimates where they do not (see PARAMS).

Solver: quasi-steady-state. For a given path the cornering limit sets a ceiling on speed, a forward pass applies the
best acceleration the tyres and engine allow, a backward pass applies the best braking, and the profile is the lower
of the two. Both passes run twice round the closed lap.

Optimiser: the racing line is a periodic spline of lateral offsets at control points, bounded by the usable track
width. Lap time is minimised with L-BFGS-B, then the search restarts from the best line plus a random perturbation,
over and over, until several rounds in a row bring no improvement. Every round is logged.

Run:  python3 model/laptime.py            (all layouts, both karts, dry and wet, then the hill and grip sweeps)
      python3 model/laptime.py --quick    (one layout, one kart, few rounds: a smoke test)
Writes data/model.json and docs/laptime-model.md.
"""
import json, math, os, sys, time
import numpy as np
from numba import njit
from scipy.interpolate import CubicSpline
from scipy.optimize import minimize
from scipy.ndimage import gaussian_filter1d

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
D = json.load(open(os.path.join(ROOT, 'data', 'data.json')))
G = 9.81
RHO = 1.2

# ---------------------------------------------------------------- parameters, all estimates unless a source is named
PARAMS = dict(
    track_width=8.0,          # metres. Kart circuits are 7 to 9 m wide (general); Whilton's width was not found.
    kart_width=1.4,           # metres, hire kart with bodywork
    edge_margin=0.2,          # metres kept inside the white line
    hill=8.0,                 # metres from the lowest point (Ashby) to the highest (Christmas). Estimate: sources say
                              # only that the lap climbs to Christmas and drops to Ashby. Swept 4, 8, 12 below.
    ctrl_spacing=8.0,         # metres between racing line control points
    ds=1.0,                   # metres between solver points
)
# heights at corner apexes as a fraction of the hill height: -1 is the bottom, 1 the top. Reasoned from the guides:
# Oblivion "slightly downhill" (Tarporley); climb from Crook through Fine Lady to Christmas, the top (BUKC, KCL);
# off camber kink then "downhill Inkermans" to Ashby at "the bottom of the hill" (Club100, NRDD); the National
# hairpin is "downhill" (KCL) and Zulu runs "down the hill" (Club100) to rejoin before The Boot.
HEIGHT_KEYS = dict(
    start=0.05, oblivion=0.0, crook=-0.05, finelady=0.15, christmas=1.0, kink=0.85,
    inkermans=0.45, ashby=-1.0 + 0.0, parker=-0.9, chapmans=-0.6, chap2=-0.55, boot1=-0.1, boot2=-0.05, boot3=0.0, chic1=0.0, pitbend=0.05,
    inkhair=0.55, zulu1=0.1, zulu2=-0.2, zulu3=-0.45,
)
KARTS = dict(
    hire=dict(name='390cc hire kart (BirelART N35 with a Honda GX390)',
              mass=150 + 80,        # 140 to 150 kg kart (Birel ART rental pages) plus an 80 kg driver
              power_kw=9.7,         # 13 bhp at 3600 rpm (Birel ART, Honda GX390)
              drive_eff=0.85,       # clutch and chain
              v_top=24.6,           # 55 mph (Birel ART); the venue quotes up to 50 mph on its circuit
              cda=0.75,             # m2, driver upright in a rental kart: estimate
              crr=0.015,            # rolling resistance: estimate
              mu_y=1.05,            # lateral grip of hire slicks on a low-grip surface: estimate
              mu_x=0.75,            # traction from the driven rear axle only: estimate
              mu_b=0.70,            # braking with rear brakes only, load moving forward: estimate
              ),
    race=dict(name='senior two-stroke race kart (X30 or Rotax Max class)',
              mass=85 + 75, power_kw=22.0, drive_eff=0.9, v_top=33.0, cda=0.55, crr=0.012, mu_y=1.75, mu_x=1.15, mu_b=1.2),   # about 30 bhp, 74 mph, race slicks: estimates
)
WET = dict(mu_y=0.62, mu_x=0.5, mu_b=0.5)   # fractions of the dry figures are not used; these are the wet values for the hire kart, scaled for the race kart below
LAYOUT_NAMES = dict(intl_c='International with the chicane', intl_n='International without the chicane', nat_c='National with the chicane', nat_n='National without the chicane')


# ---------------------------------------------------------------- track
def load_track(key, hill=None, ds=None, scale=1.0):
    """scale multiplies every map distance: 1.0 is the trace as scaled to a 1200 m International with the chicane;
    1054 / 1200 is what the 2025 supplementary regulations' 1054 m would imply."""
    hill = PARAMS['hill'] if hill is None else hill
    ds = PARAMS['ds'] if ds is None else ds
    L = D['layouts'][key]
    C = np.array(L['centre'], float) * scale; C[:, 1] *= -1.0    # map y is down; use y up
    step = L['step'] * scale
    # arc length of the 2 m polyline, then resample at ds and smooth a little (periodic)
    Q = np.vstack([C, C[:1]]); seg = np.hypot(*np.diff(Q, axis=0).T); s2 = np.concatenate([[0], np.cumsum(seg)]); total = s2[-1]
    n = int(round(total / ds)); s = np.arange(n) * (total / n)
    P = np.column_stack([np.interp(s, s2, Q[:, 0]), np.interp(s, s2, Q[:, 1])])
    P = np.column_stack([gaussian_filter1d(P[:, 0], 1.5 / ds, mode='wrap'), gaussian_filter1d(P[:, 1], 1.5 / ds, mode='wrap')])
    dP = (np.roll(P, -1, axis=0) - np.roll(P, 1, axis=0)) / (2 * total / n)
    T = dP / np.hypot(dP[:, 0], dP[:, 1])[:, None]
    N = np.column_stack([-T[:, 1], T[:, 0]])                      # left of the direction of travel
    # heights: periodic spline through the corner apexes
    pts = [(0.0, HEIGHT_KEYS['start'])]
    for c, v in L['corners'].items():
        if c in HEIGHT_KEYS: pts.append((v['i'] * step, HEIGHT_KEYS[c]))
    pts.sort(); ps = np.array([p[0] for p in pts] + [total]); ph = np.array([p[1] for p in pts] + [HEIGHT_KEYS['start']])
    hs = CubicSpline(ps, ph * hill / 2.0, bc_type='periodic')      # hill is top to bottom, keys run -1..1
    h = hs(s); grade = hs(s, 1)
    corners = {c: dict(a=v['a'] * step, i=v['i'] * step, b=v['b'] * step, dir=v['dir']) for c, v in L['corners'].items()}
    return dict(key=key, P=P, T=T, N=N, s=s, ds=total / n, n=n, L=total, h=h, grade=grade, corners=corners, order=L['order'], step=step)


def path_from_offsets(tr, n_ctrl):
    K = len(n_ctrl); sc = np.arange(K) * (tr['L'] / K)
    spl = CubicSpline(np.append(sc, tr['L']), np.append(n_ctrl, n_ctrl[0]), bc_type='periodic')
    off = spl(tr['s'])
    P = tr['P'] + off[:, None] * tr['N']
    fwd = np.roll(P, -1, axis=0) - P; dl = np.hypot(fwd[:, 0], fwd[:, 1])
    d1 = (np.roll(P, -1, axis=0) - np.roll(P, 1, axis=0)) / 2.0; d2 = np.roll(P, -1, axis=0) - 2 * P + np.roll(P, 1, axis=0)
    sp = np.hypot(d1[:, 0], d1[:, 1]); kappa = (d1[:, 0] * d2[:, 1] - d1[:, 1] * d2[:, 0]) / np.maximum(sp ** 3, 1e-9)
    kappa = gaussian_filter1d(kappa, 1.0 / tr['ds'], mode='wrap')   # a kart cannot follow metre-scale wiggles in curvature
    return P, off, kappa, dl


# ---------------------------------------------------------------- solver
@njit(cache=True)
def qss(kappa, dl, grade, m, P, vtop, cda, crr, mu_y, mu_x, mu_b):
    n = kappa.shape[0]; g = 9.81; rho = 1.2
    vlim = np.empty(n)
    for i in range(n):
        k = abs(kappa[i])
        vlim[i] = vtop if k < 1e-6 else min(vtop, math.sqrt(mu_y * g / k))
    vf = vlim.copy()
    for it in range(2 * n):                                        # forward: best acceleration the rear tyres and the engine allow
        i = it % n; j = (i + 1) % n; v = vf[i]; ay = v * v * abs(kappa[i])
        rem = (mu_x * g) ** 2 - ay * ay
        agrip = math.sqrt(rem) if rem > 0 else 0.0
        apow = P / (m * max(v, 2.0))
        ares = 0.5 * rho * cda * v * v / m + crr * g + g * grade[i]
        a = min(agrip, apow) - ares
        v2 = v * v + 2 * a * dl[i]
        vn = math.sqrt(v2) if v2 > 1.0 else 1.0
        if vn < vf[j]: vf[j] = vn
    vb = vlim.copy()
    for it in range(2 * n):                                        # backward: best braking, rear brakes only, slope included
        j = n - 1 - (it % n); i = (j - 1) % n; v = vb[j]; ay = v * v * abs(kappa[j])
        rem = (mu_b * g) ** 2 - ay * ay
        abr = (math.sqrt(rem) if rem > 0 else 0.0) + 0.5 * rho * cda * v * v / m + crr * g + g * grade[j]
        if abr < 0.05: abr = 0.05
        vp = math.sqrt(v * v + 2 * abr * dl[i])
        if vp < vb[i]: vb[i] = vp
    v = np.empty(n); t = 0.0
    for i in range(n):
        v[i] = vf[i] if vf[i] < vb[i] else vb[i]
    for i in range(n):
        j = (i + 1) % n; t += dl[i] / (0.5 * (v[i] + v[j]))
    return t, v, vlim


def kart_args(kart, wet=False):
    k = KARTS[kart]
    mu_y, mu_x, mu_b = k['mu_y'], k['mu_x'], k['mu_b']
    if wet:
        f = WET['mu_y'] / KARTS['hire']['mu_y']
        mu_y, mu_x, mu_b = k['mu_y'] * f, k['mu_x'] * f, k['mu_b'] * f
    return (k['mass'], k['power_kw'] * 1000 * k['drive_eff'], k['v_top'], k['cda'], k['crr'], mu_y, mu_x, mu_b)


def lap(tr, n_ctrl, args):
    P, off, kappa, dl = path_from_offsets(tr, n_ctrl)
    t, v, vlim = qss(kappa, dl, tr['grade'], *args)
    return t, v, P, off, kappa, dl


# ---------------------------------------------------------------- optimiser: over and over until it stops improving
def optimise(tr, args, rounds_max=80, stale_max=8, seed=0, log=None, quick=False, maxiter=150):
    K = int(round(tr['L'] / PARAMS['ctrl_spacing']))
    nmax = PARAMS['track_width'] / 2 - PARAMS['kart_width'] / 2 - PARAMS['edge_margin']
    bounds = [(-nmax, nmax)] * K
    rng = np.random.default_rng(seed)
    lam = 2e-4                                                     # a small tidiness penalty on the line's second differences, in seconds per m^2

    def f(x):
        t = lap(tr, x, args)[0]
        d2 = x - 0.5 * (np.roll(x, 1) + np.roll(x, -1))
        return t + lam * float(np.sum(d2 * d2))

    best_x = np.zeros(K); best_t = lap(tr, best_x, args)[0]
    hist = [dict(round=0, start='centreline', lap=best_t, best=best_t, improved=True)]
    if log: log(f'  round 0  centreline {best_t:.3f} s')
    stale = 0; r = 0; t0 = time.time()
    while stale < stale_max and r < (6 if quick else rounds_max):
        r += 1
        if r == 1: x0 = best_x.copy(); how = 'from the centreline'
        else:
            sigma = 1.2 if r % 3 == 0 else max(0.25, 1.0 * 0.8 ** (r - 2))          # every third round a big shake to escape the current basin
            x0 = np.clip(best_x + rng.normal(0, sigma, K), -nmax, nmax); how = f'best line shaken by {sigma:.2f} m'
        res = minimize(f, x0, method='L-BFGS-B', bounds=bounds, options=dict(maxiter=40 if quick else maxiter, eps=2e-3, ftol=1e-10, gtol=1e-7))
        t = lap(tr, res.x, args)[0]
        improved = t < best_t - 1e-3
        if improved: best_t, best_x, stale = t, res.x.copy(), 0
        else: stale += 1
        hist.append(dict(round=r, start=how, lap=round(t, 3), best=round(best_t, 3), improved=bool(improved)))
        if log: log(f'  round {r:2d}  {how:28s} {t:.3f} s   best {best_t:.3f} s   {"improved" if improved else "no gain, stale " + str(stale)}   {time.time() - t0:.0f} s')
    return best_x, best_t, hist


# ---------------------------------------------------------------- reading the result the way the app does
def classify(v, dl, vlim, args):
    """Braking level per point, 1 to 5, from the model's longitudinal acceleration: what the feet are doing."""
    n = len(v); vtop = args[2]
    ax = np.empty(n)
    for i in range(n):
        j = (i + 1) % n; ax[i] = (v[j] ** 2 - v[i] ** 2) / (2 * dl[i])
    lv = np.ones(n, int)
    for i in range(n):
        dec = -ax[i] / G
        if dec > 0.55: lv[i] = 5
        elif dec > 0.30: lv[i] = 4
        elif dec > 0.15: lv[i] = 3
        elif dec > 0.03 or (v[i] < vtop - 0.5 and abs(ax[i]) < 0.3 * G * 0.1 and v[i] >= vlim[i] - 0.15): lv[i] = 2   # at the cornering limit with the foot off: the coast to the apex
    # tidy: a lift or a brake shorter than 3 m is curvature noise, not a pedal
    for _ in range(2):
        i = 0
        while i < n:
            j = i
            while j + 1 < n and lv[j + 1] == lv[i]: j += 1
            run = j - i + 1
            if lv[i] >= 2 and run < 3:
                left, right = lv[(i - 1) % n], lv[(j + 1) % n]
                repl = min(left, right) if lv[i] >= 3 else 1
                for q in range(i, j + 1): lv[q] = repl if repl < lv[i] else 1
            i = j + 1
    return lv, ax


def corner_report(tr, v, lv, ax, key, ds=None):
    """Per corner: the slowest speed, where the throttle came off and where the brakes went on (metres before turn-in),
    the peak braking and the level. Works on any grid: v, lv and ax per point, ds metres per point. Each corner owns the
    stretch from the previous corner's apex to its own apex plus a few metres, so a brake zone is never credited to the
    corner before it."""
    out = {}
    n = len(v); ds = tr['ds'] if ds is None else ds; L = n * ds
    idx = lambda s: int(round((s % L) / ds)) % n
    names = tr['order']; K = len(names)
    for q0, c in enumerate(names):
        cc = tr['corners'][c]; prev = tr['corners'][names[(q0 - 1) % K]]
        a, i = idx(cc['a']), idx(cc['i']); start = (idx(prev['i']) + 1) % n
        span = (i - start) % n + int(round(6 / ds))
        own = [(a - int(round(10 / ds)) + q) % n for q in range((i - a) % n + int(round(16 / ds)))]   # the corner itself: 10 m before turn-in to 6 m past the apex
        vmin_i = min(own, key=lambda q: v[q]); vmin = v[vmin_i]
        # off throttle: walk back from the slowest point while the kart is not accelerating, no further than the previous apex; brakes on: the first real braking in that stretch
        q = vmin_i; steps = 0; limit = (vmin_i - start) % n
        while steps < limit and ax[(q - 1) % n] < 0.02 * G: q = (q - 1) % n; steps += 1
        lift = q if steps else None
        brake = None
        if lift is not None:
            k = lift
            for _ in range(steps):
                if -ax[k] / G > 0.15: brake = k; break
                k = (k + 1) % n
        before = lambda p: None if p is None else round(((a - p) % n) * ds if (a - p) % n < n / 2 else -(((p - a) % n) * ds), 1)
        stretch = [(lift if lift is not None else vmin_i) + k for k in range(steps + 1)]
        peak = max(-ax[k % n] / G for k in stretch)
        level = 5 if peak > 0.55 else 4 if peak > 0.30 else 3 if peak > 0.15 else 2 if lift is not None else 1   # the same thresholds as classify()
        out[c] = dict(v_in=round(v[lift if lift is not None else a] * 2.23694, 1), v_min=round(vmin * 2.23694, 1), v_min_ms=round(vmin, 2),
                      lift_before_turnin_m=before(lift), brake_before_turnin_m=before(brake),
                      peak_decel_g=round(float(peak), 2), level=level)
    return out


def tidy_levels(text, min_run=3):
    """On the app's 2 m grid, a lift or brake shorter than min_run points is noise: fold it into its neighbours."""
    lv = [int(c) for c in text]; n = len(lv)
    for _ in range(2):
        i = 0
        while i < n:
            j = i
            while j + 1 < n and lv[j + 1] == lv[i]: j += 1
            run = j - i + 1
            if lv[i] >= 2 and run < min_run:
                left, right = lv[(i - 1) % n], lv[(j + 1) % n]
                repl = min(left, right) if lv[i] >= 3 else 1
                for q in range(i, j + 1): lv[q] = repl if repl < lv[i] else 1
            i = j + 1
    return ''.join(str(x) for x in lv)


def resample_to_step(arr, tr, m, nearest=False):
    """Sample a per-metre array at the app's 2 m grid (m points): linear for speeds and offsets, nearest for levels."""
    s_app = np.arange(m) * (tr['L'] / m)
    if nearest: return arr[np.round(s_app / tr['ds']).astype(int) % tr['n']]
    return np.interp(s_app, tr['s'], arr, period=tr['L'])


def run_layout(key, kart, wet, hill, log, quick=False, seed=0, scale=1.0, stale_max=8, maxiter=150):
    tr = load_track(key, hill=hill, scale=scale)
    args = kart_args(kart, wet)
    x, t, hist = optimise(tr, args, log=log, quick=quick, seed=seed, stale_max=stale_max, maxiter=maxiter)
    t, v, P, off, kappa, dl = lap(tr, x, args)
    _, _, vlim = qss(kappa, dl, tr['grade'], *args)
    lv, ax = classify(v, dl, vlim, args)
    m = len(D['layouts'][key]['centre'])
    lv_app = tidy_levels(''.join(str(int(q)) for q in resample_to_step(lv, tr, m, nearest=True)))
    v_app = [round(float(q), 2) for q in resample_to_step(v, tr, m)]
    off_app = [round(float(q), 2) for q in resample_to_step(off, tr, m)]
    tc = lap(tr, np.zeros(len(x)), args)[0]
    return dict(lap=round(float(t), 3), centreline_lap=round(float(tc), 3), gain_from_line=round(float(tc - t), 3), rounds=len(hist) - 1,
                hist=hist, corners=corner_report(tr, v, lv, ax, key), levels=lv_app, v=v_app, offsets=off_app,
                flat_share=round(float(np.mean(lv == 1)), 3), v_mean=round(float(tr['L'] / t) * 2.23694, 1), v_max=round(float(v.max()) * 2.23694, 1)), tr


def _job(job):
    """One optimisation, run in a worker process. Returns (label, result dict without the track)."""
    kind = job['kind']
    if kind == 'grip':
        saved = dict(KARTS['hire']); f = job['f']
        KARTS['hire']['mu_y'] = saved['mu_y'] * f; KARTS['hire']['mu_x'] = saved['mu_x'] * f; KARTS['hire']['mu_b'] = saved['mu_b'] * f
    if kind == 'width': saved_w = PARAMS['track_width']; PARAMS['track_width'] = job['w']
    r, _ = run_layout(job['key'], job['kart'], job['wet'], job.get('hill', PARAMS['hill']), None, quick=job.get('quick', False),
                      scale=job.get('scale', 1.0), stale_max=job.get('stale', 8), maxiter=job.get('maxiter', 120), seed=job.get('seed', 0))
    if kind == 'grip': KARTS['hire'].update(saved)
    if kind == 'width': PARAMS['track_width'] = saved_w
    return job['label'], r


def main():
    quick = '--quick' in sys.argv
    if '--retidy' in sys.argv:      # re-apply the level tidying and recompute the corner tables from the stored 2 m results, then rewrite the report
        path = os.path.join(ROOT, 'data', 'model.json'); out = json.load(open(path))
        for key, lay in out['layouts'].items():
            tr = load_track(key)
            for r in lay['karts'].values():
                r['levels'] = tidy_levels(r['levels']); v = np.array(r['v']); m = len(v); ds2 = tr['L'] / m
                ax = np.array([(v[(j + 1) % m] ** 2 - v[j] ** 2) / (2 * ds2) for j in range(m)]); lv = np.array([int(ch) for ch in r['levels']])
                r['corners'] = corner_report(tr, v, lv, ax, key, ds=ds2)
        json.dump(out, open(path, 'w'), separators=(',', ':')); write_report(out); print('retidied', path); return
    if '--refine' in sys.argv:      # the hire kart, dry, every layout, three seeds each with the stronger shake schedule: keep the best line found
        from multiprocessing import Pool
        jobs = [dict(kind='main', label=f'{key}|hire|seed{seed}', key=key, kart='hire', wet=False, seed=seed, stale=8, maxiter=120) for key in ['intl_c', 'intl_n', 'nat_c', 'nat_n'] for seed in (1, 2, 3)]
        t0 = time.time(); found = {}
        with Pool(max(1, (os.cpu_count() or 2))) as pool:
            for label, r in pool.imap_unordered(_job, jobs):
                key, _, sd = label.split('|'); found.setdefault(key, []).append((r['lap'], sd, r))
                print(f'{label:28s} {r["lap"]:.3f} s after {r["rounds"]} rounds   {time.time() - t0:.0f} s', flush=True)
        path = os.path.join(ROOT, 'data', 'model.json'); out = json.load(open(path))
        for key, lst in found.items():
            lst.sort(key=lambda x: x[0]); have = out['layouts'][key]['karts']['hire']; best_lap, sd, r = lst[0]
            spread = round(max(x[0] for x in lst) - min(x[0] for x in lst), 3)
            out['layouts'][key].setdefault('seeds', {})['hire'] = dict(laps={x[1]: x[0] for x in lst}, first_run=have['lap'], spread=spread)
            if best_lap < have['lap'] - 1e-3:
                r['seed'] = sd; out['layouts'][key]['karts']['hire'] = r; print(f'{key}: {sd} improves the hire lap {have["lap"]:.3f} -> {best_lap:.3f} s (spread across seeds {spread} s)')
            else: print(f'{key}: the first run stands at {have["lap"]:.3f} s (seeds {[x[0] for x in lst]}, spread {spread} s)')
        json.dump(out, open(path, 'w'), separators=(',', ':')); write_report(out); print('refined', path); return
    if '--sweeps' in sys.argv:      # rerun only the sensitivity and calibration cases, deeper than the quick runs, and merge them in
        from multiprocessing import Pool
        path = os.path.join(ROOT, 'data', 'model.json'); out = json.load(open(path)); jobs = []
        for hill in (0.0, 4.0, 8.0, 12.0): jobs.append(dict(kind='hill', label=f'sweep|hill_{hill:.0f}m', key='intl_n', kart='hire', wet=False, hill=hill, stale=3, maxiter=80))
        for f in (0.85, 1.0, 1.15, 1.3): jobs.append(dict(kind='grip', label=f'sweep|grip_x{f:.2f}', key='intl_n', kart='hire', wet=False, f=f, stale=3, maxiter=80))
        for w in (7.0, 8.0, 9.0): jobs.append(dict(kind='width', label=f'sweep|width_{w:.0f}m', key='intl_n', kart='hire', wet=False, w=w, stale=3, maxiter=80))
        jobs.append(dict(kind='scale', label='sweep|length_1054m', key='intl_n', kart='hire', wet=False, scale=1054.0 / 1200.0, stale=3, maxiter=80))
        for sc, f in ((1.0, 1.3), (1054.0 / 1200.0, 1.15), (1054.0 / 1200.0, 1.3), (1054.0 / 1200.0, 1.45)):
            jobs.append(dict(kind='grip', label=f'calib|len_{1200 * sc:.0f}m_grip_x{f:.2f}', key='intl_n', kart='hire', wet=False, f=f, scale=sc, stale=3, maxiter=80))
        t0 = time.time()
        with Pool(max(1, (os.cpu_count() or 2))) as pool:
            for label, r in pool.imap_unordered(_job, jobs):
                name = label.split('|')[1]; out['sweeps'][name] = dict(lap=r['lap'], v_mean=r['v_mean'], v_max=r['v_max'], flat_share=r['flat_share'], rounds=r['rounds'], christmas=r['corners'].get('christmas'), ashby=r['corners'].get('ashby'))
                print(f'{label:34s} {r["lap"]:.3f} s after {r["rounds"]} rounds   {time.time() - t0:.0f} s', flush=True)
        out['sweeps_note'] = 'sweeps run to three idle rounds of 80 iterations; the main results to five idle rounds of 120'
        json.dump(out, open(path, 'w'), separators=(',', ':')); write_report(out); print('sweeps merged into', path); return
    log = lambda s: print(s, flush=True)
    out = dict(params=PARAMS, height_keys=HEIGHT_KEYS, karts=KARTS, wet=WET, layouts={}, sweeps={}, benchmark=dict(
        hire_record_s=56.992, hire_record_note='Sodi RT8 hire kart, International before the chicane, video titles by the same driver: 56.99 s and 56.19 s',
        hire_record_url='https://www.youtube.com/watch?v=UuduhSd-Qx0',
        hire_typical_s=64.537, hire_typical_note='fastest lap in a 20-minute International arrive-and-drive practice session, 18 February 2025, with the chicane (Alpha Timing)',
        race_s=45.28, race_note='Senior X30 test session, WMKC Round 3, May 2025, with the chicane; Senior Rotax 45.54, Junior X30 45.59 (Alpha Timing)',
        race_2021_s=44.8, race_2021_note='Brad Philpot, Rotax Max, June 2021, International before the chicane (Karting Track Guides)'))
    t0 = time.time()
    if quick:
        r, _ = run_layout('intl_n', 'hire', False, PARAMS['hill'], log, quick=True)
        out['layouts']['intl_n'] = dict(name=LAYOUT_NAMES['intl_n'], total=D['layouts']['intl_n']['total'], karts=dict(hire=r))
        path = os.path.join(ROOT, 'data', 'model_quick.json'); json.dump(out, open(path, 'w'), separators=(',', ':')); log(f'wrote {path}'); return
    from multiprocessing import Pool
    jobs = []
    for key in ['intl_c', 'intl_n', 'nat_c', 'nat_n']:
        for kart in ['hire', 'race']:
            for wet in [False, True]:
                jobs.append(dict(kind='main', label=f'{key}|{kart}{"_w" if wet else ""}', key=key, kart=kart, wet=wet, stale=8, maxiter=120))
        jobs.append(dict(kind='main', label=f'{key}|hire|seed1', key=key, kart='hire', wet=False, seed=1, stale=8, maxiter=120))   # a second seed for the lap the app follows
    # sensitivity on the pre-chicane International for the hire kart: the hill, the grip, the width and the lap length, none of them measured
    SW = dict(stale=3, maxiter=80)
    for hill in (0.0, 4.0, 8.0, 12.0): jobs.append(dict(kind='hill', label=f'sweep|hill_{hill:.0f}m', key='intl_c', kart='hire', wet=False, hill=hill, **SW))
    for f in (0.85, 1.0, 1.15, 1.3): jobs.append(dict(kind='grip', label=f'sweep|grip_x{f:.2f}', key='intl_c', kart='hire', wet=False, f=f, **SW))
    for w in (7.0, 8.0, 9.0): jobs.append(dict(kind='width', label=f'sweep|width_{w:.0f}m', key='intl_c', kart='hire', wet=False, w=w, **SW))
    jobs.append(dict(kind='scale', label='sweep|length_1200m', key='intl_c', kart='hire', wet=False, scale=1200.0 / 1054.0, **SW))   # the venue's figure, for comparison
    log(f'{len(jobs)} optimisations on {os.cpu_count()} cpus')
    with Pool(max(1, (os.cpu_count() or 2) - 0)) as pool:
        for label, r in pool.imap_unordered(_job, jobs):
            group, name = label.split('|')
            if group in ('sweep', 'calib'):
                out['sweeps'][name] = dict(lap=r['lap'], v_mean=r['v_mean'], v_max=r['v_max'], flat_share=r['flat_share'], christmas=r['corners'].get('christmas'), ashby=r['corners'].get('ashby'))
                log(f'{label:34s} {r["lap"]:.3f} s   {time.time() - t0:.0f} s')
            else:
                key = group; kk = name; lay = out['layouts'].setdefault(key, dict(name=LAYOUT_NAMES[key], total=D['layouts'][key]['total'], karts={}, seeds={}))
                if kk.startswith('hire|seed') or (kk == 'hire' and 'hire' in lay['karts']):      # two seeds for the hire kart dry: keep the better, record both
                    other = lay['karts'].get('hire'); laps = dict(lay['seeds'].get('hire', {}).get('laps', {})); laps['seed1' if kk.startswith('hire|seed') else 'seed0'] = r['lap']
                    if other is None or r['lap'] < other['lap']: lay['karts']['hire'] = r
                    lay['seeds']['hire'] = dict(laps=laps, first_run=laps.get('seed0', r['lap']), spread=round(max(laps.values()) - min(laps.values()), 3) if len(laps) > 1 else 0.0)
                else: lay['karts'][kk] = r
                log(f'{label:34s} {r["lap"]:.3f} s after {r["rounds"]} rounds (centreline {r["centreline_lap"]:.3f} s), mean {r["v_mean"]} mph, top {r["v_max"]} mph, flat {r["flat_share"] * 100:.0f}%   {time.time() - t0:.0f} s')
    out['run_seconds'] = round(time.time() - t0, 1); out['sweeps_note'] = 'sweeps run to three idle rounds of 80 iterations on the International with the chicane; the main results to eight idle rounds of 120'
    path = os.path.join(ROOT, 'data', 'model.json')
    json.dump(out, open(path, 'w'), separators=(',', ':'))
    log(f'wrote {path} ({os.path.getsize(path)} bytes) in {out["run_seconds"]} s')
    write_report(out)


def write_report(out):
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from report import write
    write(out, os.path.join(ROOT, 'docs', 'laptime-model.md'))


if __name__ == '__main__':
    main()
