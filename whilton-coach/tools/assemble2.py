# Reference only: how the centrelines in data/*.npy were traced from a circuit map image.
# Paths are from the original sandbox. To rebuild from your own image or GPS trace, adapt the input path.
# Build the two no-chicane variants by swapping the chicane for the old straight run to Pit Bend (grey on the map).
import numpy as np, json, cv2
from PIL import Image
from skimage.morphology import skeletonize
from scipy.ndimage import gaussian_filter1d
from assemble import chain, smooth_open, smooth_closed, hermite, unit, nearest, grey, im

# the old route is mostly hidden behind the blue line on the map, so rebuild it as the straight it is: x about 991, y 386 to 458
old = np.column_stack([np.linspace(991.0, 993.5, 73), np.linspace(386.0, 458.0, 73)])
print('old route pts', len(old), old[0], old[-1])
# extend the old route straight down a little so it meets the final corner cleanly
def swap(path):
    jt = nearest(path, old[0]); jb = nearest(path, old[-1] + np.array([2, 20]))
    a = jt - 10; b = jb + 6
    top = hermite(path[a], unit(path[a] - path[a - 5]), old[6], unit(old[10] - old[6]), n=25)
    bot = hermite(old[-6], unit(old[-6] - old[-10]), path[b], unit(path[b + 5] - path[b]), n=30)
    out = np.vstack([path[:a], top, old[7:-6], bot, path[b + 1:]])
    return smooth_closed(out, 2.5)
intl = np.load('intl_px.npy'); nat = np.load('nat_px.npy')
intl_n = swap(intl); nat_n = swap(nat)
np.save('intl_n_px.npy', intl_n); np.save('nat_n_px.npy', nat_n)
vis = np.asarray(im).copy()
for x, y in intl_n[::3].astype(int): cv2.circle(vis, (int(x), int(y)), 1, (255, 0, 0), -1)
cv2.imwrite('nochic_check.png', cv2.cvtColor(vis[270:560, 840:1040], cv2.COLOR_RGB2BGR))
