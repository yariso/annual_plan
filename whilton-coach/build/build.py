"""Inject data/data.json into src/app.src.html and write dist/index.html (one self-contained file)."""
import os, re
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
import json
src = open(os.path.join(ROOT, 'src', 'app.src.html'), encoding='utf-8').read()
data = open(os.path.join(ROOT, 'data', 'data.json')).read()

def trim_model():
    """A compact copy of data/model.json for the page: laps, corners, braking levels at 2 m, line offsets and speeds at 4 m."""
    for name in ('model.json', 'model_quick.json'):
        p = os.path.join(ROOT, 'data', name)
        if os.path.exists(p): break
    else: return 'null'
    m = json.load(open(p)); out = dict(source=name, params=dict(hill=m['params']['hill'], track_width=m['params']['track_width']), karts={k: dict(name=v['name'], mass=v['mass'], power_kw=v['power_kw'], v_top=v['v_top'], mu_y=v['mu_y'], mu_b=v['mu_b']) for k, v in m['karts'].items()}, benchmark=m.get('benchmark'), sweeps=m.get('sweeps', {}), layouts={})
    for key, lay in m['layouts'].items():
        out['layouts'][key] = dict(karts={})
        for kk, r in lay['karts'].items():
            out['layouts'][key]['karts'][kk] = dict(lap=r['lap'], cl=r['centreline_lap'], rounds=r['rounds'], v_mean=r['v_mean'], v_max=r['v_max'], flat=r['flat_share'], corners=r['corners'], levels=r['levels'], v4=[round(x, 1) for x in r['v'][::2]], o4=[round(x, 2) for x in r['offsets'][::2]])
    return json.dumps(out, separators=(',', ':'))

out = src.replace('__DATA__', data).replace('__MODEL__', trim_model())
bad = re.findall('[\u2014\u2013]', out)
print('em/en dashes found:', len(bad), '(house style: none allowed)')
os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
open(os.path.join(ROOT, 'dist', 'index.html'), 'w', encoding='utf-8').write(out)
print('wrote dist/index.html', len(out.encode()), 'bytes')
