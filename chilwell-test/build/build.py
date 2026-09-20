"""Assemble data/*.json into src/app.src.html and write dist/index.html (one self-contained file).

House style is enforced here: no em dashes or en dashes anywhere in the built page,
and every content file must carry a source or a reasoned label on each claim that needs one.
"""
import json
import os
import re
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DATA = os.path.join(ROOT, 'data')

# Every data file, keyed by the name it takes inside the page's D object.
FILES = {
    'centre': 'centre.json',
    'test': 'test.json',
    'marking': 'marking.json',
    'faults': 'faults.json',
    'manoeuvres': 'manoeuvres.json',
    'questions': 'questions.json',
    'junctions': 'junctions.json',
    'routes': 'routes.json',
    'advice': 'advice.json',
    'plan': 'plan.json',
    'sources': 'sources.json',
}


def load():
    out = {}
    missing = []
    for key, name in FILES.items():
        path = os.path.join(DATA, name)
        if not os.path.exists(path):
            missing.append(name)
            continue
        with open(path, encoding='utf-8') as fh:
            try:
                out[key] = json.load(fh)
            except json.JSONDecodeError as exc:
                sys.exit('%s is not valid JSON: %s' % (name, exc))
    if missing:
        sys.exit('missing data files: ' + ', '.join(missing))
    return out


def walk(node, path=''):
    """Yield (path, string) for every string in the data tree."""
    if isinstance(node, dict):
        for k, v in node.items():
            yield from walk(v, path + '.' + str(k))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from walk(v, path + '[%d]' % i)
    elif isinstance(node, str):
        yield path, node


def main():
    data = load()

    # House style: no em or en dashes in the content.
    bad = [(p, s) for p, s in walk(data) if re.search('[—–]', s)]
    for p, s in bad[:10]:
        print('em/en dash in %s: %s' % (p, s[:80]))
    if bad:
        sys.exit('%d em or en dashes in the data (house style: none allowed)' % len(bad))

    src_path = os.path.join(ROOT, 'src', 'app.src.html')
    with open(src_path, encoding='utf-8') as fh:
        src = fh.read()

    if '__DATA__' not in src:
        sys.exit('src/app.src.html has no __DATA__ placeholder')

    blob = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
    out = src.replace('__DATA__', blob)

    bad_src = re.findall('[—–]', out)
    if bad_src:
        sys.exit('%d em or en dashes in the built page (house style: none allowed)' % len(bad_src))

    left = re.findall(r'__[A-Z_]+__', out)
    if left:
        sys.exit('placeholders left unreplaced: ' + ', '.join(sorted(set(left))))

    os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
    dist = os.path.join(ROOT, 'dist', 'index.html')
    with open(dist, 'w', encoding='utf-8') as fh:
        fh.write(out)

    counts = {k: (len(v) if isinstance(v, (list, dict)) else 1) for k, v in data.items()}
    print('data: ' + ', '.join('%s %d' % (k, n) for k, n in sorted(counts.items())))
    print('wrote dist/index.html %d bytes' % len(out.encode()))


if __name__ == '__main__':
    main()
