# Reference only: how the centrelines in data/*.npy were traced from a circuit map image.
# Paths are from the original sandbox. To rebuild from your own image or GPS trace, adapt the input path.
import numpy as np, json, cv2
from PIL import Image
from skimage.morphology import skeletonize, binary_closing, disk
from scipy.ndimage import convolve, label

im = Image.open('/mnt/user-data/uploads/daa61d706267ffeaff832365da2c57d8e5b76cd8.jpeg').convert('RGB')
a = np.asarray(im).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]

def ordered_loop(mask, start_xy, first_dir_xy):
    sk = skeletonize(mask)
    K = np.ones((3, 3), int); K[1, 1] = 0
    # prune spurs until only cycles remain
    while True:
        nb = convolve(sk.astype(int), K, mode='constant')
        ends = sk & (nb <= 1)
        if not ends.any(): break
        sk[ends] = False
    lab, n = label(sk, structure=np.ones((3, 3)))
    sizes = [(lab == i).sum() for i in range(1, n + 1)]
    sk = lab == (1 + int(np.argmax(sizes)))
    pts = np.argwhere(sk)[:, ::-1]  # x,y
    # walk the loop
    S = set(map(tuple, pts.tolist()))
    d0 = np.hypot(pts[:, 0] - start_xy[0], pts[:, 1] - start_xy[1]); cur = tuple(pts[int(np.argmin(d0))])
    path = [cur]; S.discard(cur); prev_dir = np.array(first_dir_xy, float)
    while True:
        cand = [(cur[0] + dx, cur[1] + dy) for dx in (-1, 0, 1) for dy in (-1, 0, 1) if (dx or dy) and (cur[0] + dx, cur[1] + dy) in S]
        if not cand: break
        # prefer the neighbour most aligned with the running direction
        best = max(cand, key=lambda c: (np.dot(np.array(c) - np.array(cur), prev_dir) / (np.hypot(*(np.array(c) - np.array(cur))) + 1e-9)))
        step = np.array(best) - np.array(cur); prev_dir = 0.7 * prev_dir + 0.3 * step / np.hypot(*step)
        cur = best; path.append(cur); S.discard(cur)
        for dx in (-1, 0, 1):          # drop skeleton pixels adjacent to the path to avoid back-tracking on 2-px-wide spots
            for dy in (-1, 0, 1):
                pass
    return np.array(path, float), len(pts)

blue = (b > 140) & (b - r > 60) & (b - g > 30)
blue = binary_closing(blue, disk(2))
path, npx = ordered_loop(blue, (718, 515), (-1, 0))
print('skeleton px', npx, 'walked', len(path), 'start', path[0], 'end', path[-1])
np.save('blue_path.npy', path)

# grey links: Zulu link and the old no-chicane route
grey = (abs(r - g) < 7) & (abs(g - b) < 7) & (r > 196) & (r < 234)
cv2.imwrite('grey_mask.png', (grey * 255).astype(np.uint8))
vis = np.asarray(im).copy()
for x, y in path[::4].astype(int): cv2.circle(vis, (int(x), int(y)), 1, (255, 0, 0), -1)
cv2.imwrite('trace_check.png', cv2.cvtColor(vis, cv2.COLOR_RGB2BGR))
