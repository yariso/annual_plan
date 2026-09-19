"""Check a circuit map image against the app's traced centreline.

    python3 tools/check_map.py path/to/map.jpg [--start X,Y] [--icon X,Y,R]

Traces the red loop in the image (skeleton, pruned to the closed loop, walked from the start line heading left, the
direction of travel), scales it to the app's International-with-chicane lap, aligns it with a point-to-point Procrustes
fit (both loops start at the start line and run the same way round) refined by nearest-neighbour matching, and prints
the RMS and worst distance between the two, plus the distance from every app corner apex to the drawn line.
Used on 19 September 2026 against the owner's copy of the circuit map: 0.5 m RMS, 1.6 m worst, every apex within 1.3 m.
Needs pillow, scikit-image, opencv-python-headless, scipy, numpy.
"""
import sys, json, os
import numpy as np
from PIL import Image
from skimage.morphology import skeletonize, disk, closing
from scipy.ndimage import label, convolve, gaussian_filter1d
from scipy.spatial import cKDTree

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
args = sys.argv[1:]; img_path = args[0]
start = (770, 831); icon = None
for i, a in enumerate(args):
    if a == '--start': start = tuple(int(x) for x in args[i + 1].split(','))
    if a == '--icon': icon = tuple(int(x) for x in args[i + 1].split(','))
im = Image.open(img_path).convert('RGB'); a = np.asarray(im).astype(int); H, W = a.shape[:2]
r, g, b = a[..., 0], a[..., 1], a[..., 2]
red = (r > 140) & (g < 110) & (b < 110)
if icon:
    yy, xx = np.mgrid[0:H, 0:W]; red &= ~((xx - icon[0]) ** 2 + (yy - icon[1]) ** 2 < icon[2] ** 2)
sk = skeletonize(closing(red, disk(2)))
K = np.ones((3, 3), int); K[1, 1] = 0
for _ in range(80):
    nb = convolve(sk.astype(int), K, mode='constant'); ends = sk & (nb <= 1)
    if not ends.any(): break
    sk[ends] = False
lab, n = label(sk, structure=np.ones((3, 3))); sizes = [(lab == i).sum() for i in range(1, n + 1)]; sk = lab == (1 + int(np.argmax(sizes)))
pts = np.argwhere(sk)[:, ::-1].astype(float); tree = cKDTree(pts); used = np.zeros(len(pts), bool)
i0 = int(np.argmin(np.hypot(pts[:, 0] - start[0], pts[:, 1] - start[1]))); path = [i0]; used[i0] = True; prev = np.array([-1.0, 0.0]); cur = i0
while True:
    cand = [j for j in tree.query_ball_point(pts[cur], 1.5) if not used[j]] or [j for j in tree.query_ball_point(pts[cur], 12.0) if not used[j]]
    if not cand: break
    best = max(cand, key=lambda j: np.dot(pts[j] - pts[cur], prev) / (np.hypot(*(pts[j] - pts[cur])) + 1e-9) - 0.02 * np.hypot(*(pts[j] - pts[cur])))
    step = pts[best] - pts[cur]
    for j in tree.query_ball_point(pts[cur], 1.5):
        if np.dot(pts[j] - pts[cur], step) <= 0: used[j] = True
    prev = 0.7 * prev + 0.3 * step / (np.hypot(*step) + 1e-9); cur = best; path.append(cur); used[cur] = True
P = pts[path]; print('walked', len(P), 'of', len(pts), 'skeleton pixels; closing gap', round(float(np.hypot(*(P[-1] - P[0]))), 1), 'px')
Q = np.vstack([P, P[:1]]); seg = np.hypot(*np.diff(Q, axis=0).T); s = np.concatenate([[0], np.cumsum(seg)]); m = int(s[-1]); t = np.arange(m) * (s[-1] / m)
R = np.column_stack([np.interp(t, s, Q[:, 0]), np.interp(t, s, Q[:, 1])]); R = np.column_stack([gaussian_filter1d(R[:, 0], 3, mode='wrap'), gaussian_filter1d(R[:, 1], 3, mode='wrap')])
D = json.load(open(os.path.join(ROOT, 'data', 'data.json'))); C = np.array(D['layouts']['intl_c']['centre'])
def resample(Pc, n):
    Qc = np.vstack([Pc, Pc[:1]]); sg = np.hypot(*np.diff(Qc, axis=0).T); ss = np.concatenate([[0], np.cumsum(sg)]); tt = np.arange(n) * (ss[-1] / n)
    return np.column_stack([np.interp(tt, ss, Qc[:, 0]), np.interp(tt, ss, Qc[:, 1])]), ss[-1]
A, La = resample(R, 600); B, Lb = resample(C, 600)
def umeyama(X, Y):
    mx, my = X.mean(0), Y.mean(0); Xc, Yc = X - mx, Y - my; Hm = Xc.T @ Yc / len(X); U, S_, Vt = np.linalg.svd(Hm); d = np.ones(2)
    if np.linalg.det(U @ Vt) < 0: d[-1] = -1
    Rm = U @ np.diag(d) @ Vt; sc = (S_ * d).sum() / (Xc ** 2).sum(axis=1).mean(); return sc, Rm, my - sc * (mx @ Rm)
sc, Rm, tr = umeyama(A, B); Ap = sc * (A @ Rm) + tr; d0 = np.hypot(*(Ap - B).T)
print('point-to-point fit: %.1f m RMS, %.1f m worst' % (np.sqrt((d0 ** 2).mean()), d0.max()))
treeB = cKDTree(B)
for _ in range(30):
    dd, idx = treeB.query(Ap); s2, R2, t2 = umeyama(Ap, B[idx]); Ap = s2 * (Ap @ R2) + t2
dd, idx = treeB.query(Ap); print('after nearest-neighbour refinement: %.1f m RMS, %.1f m worst, 90th percentile %.1f m' % (np.sqrt((dd ** 2).mean()), dd.max(), np.percentile(dd, 90)))
treeA = cKDTree(Ap); print('app corner apex to the drawn line, m:', {k: round(float(treeA.query(B[v['i']])[0]), 1) for k, v in D['layouts']['intl_c']['corners'].items()})
