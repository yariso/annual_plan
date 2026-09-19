# Reference only: how the centrelines in data/*.npy were traced from a circuit map image.
# Paths are from the original sandbox. To rebuild from your own image or GPS trace, adapt the input path.
import numpy as np, json, cv2
from PIL import Image
from skimage.morphology import skeletonize
from scipy.ndimage import label, gaussian_filter1d

im = Image.open('/mnt/user-data/uploads/daa61d706267ffeaff832365da2c57d8e5b76cd8.jpeg').convert('RGB')
a = np.asarray(im).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]
grey = (abs(r - g) < 7) & (abs(g - b) < 7) & (r > 196) & (r < 234)
blue = np.load('blue_path.npy')            # ordered, starts at S/F, first heading west

def chain(mask_region, start):
    sk = skeletonize(mask_region)
    pts = np.argwhere(sk)[:, ::-1].astype(float)
    # greedy nearest-neighbour ordering from the start end (handles the small gap at the crossing)
    left = pts.tolist(); cur = min(left, key=lambda p: np.hypot(p[0] - start[0], p[1] - start[1])); left.remove(cur); out = [cur]
    while left:
        nxt = min(left, key=lambda p: (p[0] - cur[0]) ** 2 + (p[1] - cur[1]) ** 2)
        if np.hypot(nxt[0] - cur[0], nxt[1] - cur[1]) > 40: break
        left.remove(nxt); out.append(nxt); cur = nxt
    return np.array(out)

m = np.zeros_like(grey); m[130:430, 520:660] = grey[130:430, 520:660]
zulu = chain(m, (646, 146))
#print('zulu link pts', len(zulu), zulu[0], zulu[-1])

def smooth_open(p, s=3):
    return np.column_stack([gaussian_filter1d(p[:, 0], s, mode='nearest'), gaussian_filter1d(p[:, 1], s, mode='nearest')])
def smooth_closed(p, s=3):
    return np.column_stack([gaussian_filter1d(p[:, 0], s, mode='wrap'), gaussian_filter1d(p[:, 1], s, mode='wrap')])
def hermite(p0, t0, p1, t1, n=40, k=1.0):
    d = np.hypot(*(p1 - p0)) * k; u = np.linspace(0, 1, n)[:, None]
    h00 = 2 * u**3 - 3 * u**2 + 1; h10 = u**3 - 2 * u**2 + u; h01 = -2 * u**3 + 3 * u**2; h11 = u**3 - u**2
    return h00 * p0 + h10 * d * t0 + h01 * p1 + h11 * d * t1
def unit(v): return v / (np.hypot(*v) + 1e-9)
def nearest(path, xy): return int(np.argmin(np.hypot(path[:, 0] - xy[0], path[:, 1] - xy[1])))

blue_s = smooth_closed(blue, 3.5); zulu_s = smooth_open(zulu, 4)
jt = nearest(blue_s, zulu_s[0]); jb = nearest(blue_s, zulu_s[-1])
print('junction idx top', jt, blue_s[jt], 'bottom', jb, blue_s[jb], 'of', len(blue_s))
# top: leave the blue path part-way round the Inkermans bend, blend tightly onto the link (hairpin right)
cutA = jt - 26; zc0 = 22
A0, A1 = blue_s[cutA], zulu_s[zc0]
top = hermite(A0, unit(blue_s[cutA] - blue_s[cutA - 6]), A1, unit(zulu_s[zc0 + 6] - zulu_s[zc0]), n=50, k=1.35)
# bottom: blend from the link onto the back straight (left turn)
zc1 = len(zulu_s) - 16; cutB = jb + 26
B0, B1 = zulu_s[zc1], blue_s[cutB]
bot = hermite(B0, unit(zulu_s[zc1] - zulu_s[zc1 - 6]), B1, unit(blue_s[cutB + 6] - blue_s[cutB]), n=40, k=1.0)
nat = np.vstack([blue_s[:cutA], top, zulu_s[zc0 + 1:zc1], bot, blue_s[cutB + 1:]])
nat = smooth_closed(nat, 2.5)

def resample(p, step):
    q = np.vstack([p, p[:1]]); d = np.hypot(*np.diff(q, axis=0).T); s = np.concatenate([[0], np.cumsum(d)]); L = s[-1]
    n = int(round(L / step)); t = np.arange(n) * (L / n)
    return np.column_stack([np.interp(t, s, q[:, 0]), np.interp(t, s, q[:, 1])]), L

_, Lpx = resample(blue_s, 1.0); scale = 1200.0 / Lpx
_, Lnat = resample(nat, 1.0)
print('intl px', round(Lpx, 1), 'scale m/px', round(scale, 4), '| national length m', round(Lnat * scale, 1))
np.save('intl_px.npy', blue_s); np.save('nat_px.npy', nat)
json.dump(dict(scale=scale), open('scale.json', 'w'))
vis = np.asarray(im).copy()
for x, y in nat[::3].astype(int): cv2.circle(vis, (int(x), int(y)), 1, (255, 0, 0), -1)
cv2.imwrite('nat_check.png', cv2.cvtColor(vis[60:660, 280:1040], cv2.COLOR_RGB2BGR))
