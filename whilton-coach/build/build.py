"""Inject data/data.json into src/app.src.html and write dist/index.html (one self-contained file)."""
import os, re
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
src = open(os.path.join(ROOT, 'src', 'app.src.html'), encoding='utf-8').read()
data = open(os.path.join(ROOT, 'data', 'data.json')).read()
out = src.replace('__DATA__', data)
bad = re.findall('[\u2014\u2013]', out)
print('em/en dashes found:', len(bad), '(house style: none allowed)')
os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
open(os.path.join(ROOT, 'dist', 'index.html'), 'w', encoding='utf-8').write(out)
print('wrote dist/index.html', len(out.encode()), 'bytes')
