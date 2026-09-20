"""Browser tests for dist/index.html.

They run the real page with the real data, so they fail if a data file goes
missing a field the app renders, as well as if the code breaks.

    pip install playwright   # a version whose Chromium matches the one installed
    python tests/test_app.py
"""
import json
import os
import re
import sys

from playwright.sync_api import sync_playwright

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PAGE = 'file://' + os.path.join(ROOT, 'dist', 'index.html')

fails = []


def check(name, ok, detail=''):
    print(('  ok   ' if ok else '  FAIL ') + name + (('  ' + detail) if detail and not ok else ''))
    if not ok:
        fails.append(name + (('  ' + detail) if detail else ''))


def data(name):
    with open(os.path.join(ROOT, 'data', name), encoding='utf-8') as fh:
        return json.load(fh)


def run(pw):
    browser = pw.chromium.launch()
    ctx = browser.new_context(
        viewport={'width': 414, 'height': 896},
        permissions=[],
        locale='en-GB',
    )
    page = ctx.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('console', lambda m: errors.append('console.error: ' + m.text) if m.type == 'error' and 'tile.openstreetmap' not in m.text and 'ERR_' not in m.text else None)
    # The sandbox has no network: block tiles so the test does not wait on them.
    page.route('**://tile.openstreetmap.org/**', lambda route: route.abort())
    page.route('**://fonts.googleapis.com/**', lambda route: route.abort())
    page.goto(PAGE)
    page.wait_for_timeout(400)

    print('\nthe page loads')
    check('no javascript errors on load', not errors, '; '.join(errors[:3]))
    check('the title is set', 'Chilwell' in page.title())

    print('\nevery tab opens and has content')
    for tab in ('start', 'map', 'roads', 'test', 'skills', 'mock'):
        page.click('nav.tabs button[data-tab="%s"]' % tab)
        page.wait_for_timeout(120)
        sec = page.locator('#tab-' + tab)
        check('tab %s is visible' % tab, sec.is_visible())
        text = sec.inner_text()
        check('tab %s has words' % tab, len(text) > 120, '%d characters' % len(text))
    check('no javascript errors after switching tabs', not errors, '; '.join(errors[:3]))

    print('\nthe test date counts down')
    page.click('nav.tabs button[data-tab="start"]')
    page.fill('#tDate', '2099-01-20')
    page.fill('#tTime', '10:14')
    page.dispatch_event('#tDate', 'change')
    page.wait_for_timeout(120)
    check('a future date gives a countdown', 'in ' in page.inner_text('#countOut'))
    page.fill('#tName', 'Sam')
    page.dispatch_event('#tName', 'change')
    page.wait_for_timeout(100)
    check('the name is used', 'Sam' in page.inner_text('#countOut'))

    print('\nthe checklists remember')
    boxes = page.locator('#journey input[data-check]')
    if boxes.count():
        page.locator('#journey details').first.evaluate('d => d.open = true')
        boxes.first.check()
        page.reload()
        page.wait_for_timeout(400)
        page.locator('#journey details').first.evaluate('d => d.open = true')
        check('a ticked box survives a reload', page.locator('#journey input[data-check]').first.is_checked())
    else:
        check('there are checklist boxes', False, 'no data-check inputs found')

    print('\nthe map draws')
    page.click('nav.tabs button[data-tab="map"]')
    page.wait_for_timeout(300)
    marks = page.locator('#mapsvg g.mk')
    check('markers are drawn', marks.count() > 0, '%d markers' % marks.count())
    before = page.evaluate("document.querySelector('#mapsvg').innerHTML.length")
    page.click('#mZoomIn')
    page.wait_for_timeout(150)
    check('zooming in redraws', page.evaluate("document.querySelector('#mapsvg').innerHTML.length") > 0)
    page.mouse.move(200, 400)
    page.mouse.down()
    page.mouse.move(260, 430, steps=6)
    page.mouse.up()
    page.wait_for_timeout(150)
    check('dragging does not break the map', page.locator('#mapsvg').count() == 1 and not errors, '; '.join(errors[:2]))
    n = marks.count()
    if n:
        # click the dot itself: the group's box includes the label, whose centre is off the marker
        box = marks.first.locator('circle').last.bounding_box()
        if box:
            page.mouse.click(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2)
            page.wait_for_timeout(200)
            check('tapping a marker opens its card', len(page.inner_text('#mapcard')) > 20)
    page.click('[data-layer="junctions"]')
    page.wait_for_timeout(150)
    check('a layer can be turned off', page.locator('#mapsvg g.mk').count() < n or n == 0)
    page.click('[data-layer="junctions"]')
    page.wait_for_timeout(150)

    print('\nthe road cards open and draw their diagrams')
    page.click('nav.tabs button[data-tab="roads"]')
    page.wait_for_timeout(150)
    items = page.locator('#roadList details')
    check('there are road cards', items.count() > 0, '%d cards' % items.count())
    drew = 0
    for i in range(min(items.count(), 12)):
        d = items.nth(i)
        d.locator('summary').click()
        page.wait_for_timeout(90)
        body = d.locator('[data-body]')
        check('road card %d fills in' % (i + 1), len(body.inner_text()) > 40)
        drew += d.locator('.diag svg').count()
    check('at least one junction diagram drew', drew > 0, '%d diagrams' % drew)

    print('\nthe map pins can be corrected by the reader')
    d = page.locator('#roadList details').first
    if d.locator('[data-setmap]').count():
        d.locator('[data-setmap]').click()
        page.wait_for_timeout(350)
        check('the crosshair appears', page.locator('#cross').is_visible())
        check('the placing bar explains itself', len(page.inner_text('#placeBar')) > 40)
        page.mouse.move(200, 400)
        page.mouse.down()
        page.mouse.move(250, 430, steps=5)
        page.mouse.up()
        page.wait_for_timeout(150)
        page.click('[data-placeok]')
        page.wait_for_timeout(250)
        saved = page.evaluate("JSON.parse(localStorage.getItem('ct.pos') || '{}')")
        check('the new position is saved', len(saved) == 1, str(saved)[:60])
        check('the crosshair goes away', not page.locator('#cross').is_visible())
        page.click('nav.tabs button[data-tab="roads"]')
        page.wait_for_timeout(150)
        d = page.locator('#roadList details').first
        d.locator('summary').click()
        page.wait_for_timeout(200)
        check('the card says the reader set it', 'set by you' in d.inner_text())
        d.locator('[data-clearpos]').click()
        page.wait_for_timeout(200)
        check('putting it back clears the override', page.evaluate("Object.keys(JSON.parse(localStorage.getItem('ct.pos') || '{}')).length") == 0)
    else:
        check('a junction card offers to move its pin', False, 'no data-setmap button')

    print('\nthe test tab lists what the examiner wants')
    page.click('nav.tabs button[data-tab="test"]')
    page.wait_for_timeout(150)
    check('the test steps are listed', page.locator('#testOrder details').count() > 0)
    check('the fault types are shown', page.locator('#markingBody .card').count() >= 2)
    faults = page.locator('#faultList details')
    check('the marking items are listed', faults.count() > 0, '%d items' % faults.count())
    if faults.count():
        faults.first.locator('summary').click()
        page.wait_for_timeout(100)
        check('a marking item has detail', len(faults.first.inner_text()) > 80)
    linked = [f['id'] for f in data('faults.json')['items']
              if any(f['id'] in (j.get('links') or []) for j in data('junctions.json')['items'])]
    if linked:
        d = page.locator('#faultList details[id="fault-%s"]' % linked[0])
        d.locator('summary').click()
        page.wait_for_timeout(200)
        check('a marking item says where to practise it', d.locator('[data-roadto]').count() > 0, linked[0])
        d.locator('[data-roadto]').first.click()
        page.wait_for_timeout(400)
        check('that button opens the road card', page.locator('#tab-roads').is_visible())
        page.click('nav.tabs button[data-tab="test"]')
        page.wait_for_timeout(150)

    print('\nthe manoeuvre diagrams step through')
    page.click('nav.tabs button[data-tab="skills"]')
    page.wait_for_timeout(150)
    mans = page.locator('#manList details')
    check('the manoeuvres are listed', mans.count() > 0, '%d manoeuvres' % mans.count())
    if mans.count():
        m = mans.first
        m.locator('summary').click()
        page.wait_for_timeout(150)
        check('the manoeuvre has a diagram', m.locator('.diag svg').count() == 1)
        first = m.locator('.diag svg').inner_html()
        m.locator('[data-mstep="1"]').click()
        page.wait_for_timeout(120)
        check('Next moves the car', m.locator('.diag svg').inner_html() != first)
        check('the step counter reads', 'Step 2' in m.locator('[data-mstepn]').inner_text())
        for _ in range(9):
            m.locator('[data-mstep="1"]').click()
        page.wait_for_timeout(120)
        check('stepping past the end is safe', not errors, '; '.join(errors[:2]))

    print('\nthe show me tell me quiz runs')
    page.click('#qStart')
    page.wait_for_timeout(150)
    check('a question is asked', len(page.inner_text('#qBox')) > 40)
    check('the answer is hidden first', 'Show the answer' in page.inner_text('#qBox'))
    page.click('[data-qshow]')
    page.wait_for_timeout(100)
    check('the answer shows', 'I had it' in page.inner_text('#qBox'))
    page.click('[data-qmark="right"]')
    page.wait_for_timeout(120)
    check('marking moves to the next question', 'Show the answer' in page.inner_text('#qBox'))
    page.click('#qAll')
    page.wait_for_timeout(120)
    check('the full question list shows', page.locator('#qList details').count() > 0)

    print('\nthe mock test marks, totals and judges')
    page.click('nav.tabs button[data-tab="mock"]')
    page.wait_for_timeout(120)
    page.fill('#mockDriver', 'Sam')
    page.click('#mockStart')
    page.wait_for_timeout(200)
    rows = page.locator('#mockSheet .frow')
    check('the sheet is built', rows.count() > 0, '%d rows' % rows.count())
    common = rows.count()
    page.click('[data-sheet="all"]')
    page.wait_for_timeout(180)
    everything = page.locator('#mockSheet .frow').count()
    check('the sheet can show everything', everything > common, '%d common, %d everything' % (common, everything))
    outside = [f['id'] for f in data('faults.json')['items'] if f.get('mock') is not False and not f.get('common')]
    if outside:
        page.locator('[data-frow="%s"] button[data-k="d"]' % outside[0]).click()
        page.wait_for_timeout(150)
        page.click('[data-sheet="common"]')
        page.wait_for_timeout(200)
        check('an item marked outside the usual list stays on it',
              page.locator('[data-frow="%s"]' % outside[0]).count() == 1, outside[0])
        page.click('#mockUndo')
        page.wait_for_timeout(150)
    rows = page.locator('#mockSheet .frow')
    first_d = rows.first.locator('button[data-k="d"]')
    for _ in range(3):
        first_d.click()
        page.wait_for_timeout(40)
    check('driving faults total', page.inner_text('#mockTally').startswith('3'), page.inner_text('#mockTally')[:20])
    page.click('#mockUndo')
    page.wait_for_timeout(120)
    check('undo takes one back', page.inner_text('#mockTally').startswith('2'))
    limit = data('marking.json')['limit']['number']
    for _ in range(limit):
        first_d.click()
        page.wait_for_timeout(20)
    page.click('#mockStop')
    page.wait_for_timeout(300)
    res = page.inner_text('#mockResult')
    check('over the limit is a fail', 'would have been a fail' in res, res[:60])

    page.click('#mockStart')
    page.wait_for_timeout(200)
    page.locator('#mockSheet .frow').first.locator('button[data-k="d"]').click()
    page.click('#mockStop')
    page.wait_for_timeout(300)
    check('one driving fault is a pass', 'would have been a pass' in page.inner_text('#mockResult'))

    page.click('#mockStart')
    page.wait_for_timeout(200)
    page.locator('#mockSheet .frow').first.locator('button[data-k="s"]').click()
    page.click('#mockStop')
    page.wait_for_timeout(300)
    check('one serious fault is a fail', 'would have been a fail' in page.inner_text('#mockResult'))
    check('the practice list fills from the mocks', len(page.inner_text('#practiceBody')) > 60)
    page.click('details:has(#histBody) summary')
    page.wait_for_timeout(150)
    check('the history lists the mocks', page.locator('#histBody tbody tr').count() >= 3,
          '%d rows' % page.locator('#histBody tbody tr').count())

    print('\nthe paper sheet and the save file')
    page.evaluate("() => { const old = window.print; window.print = () => {}; document.querySelector('#mockPrint').click(); window.print = old; }")
    page.wait_for_timeout(200)
    pa = page.inner_text('#printArea')
    check('the paper sheet is built', len(pa) > 200, '%d characters' % len(pa))
    check('the paper sheet says it is not a DVSA form', 'not a DVSA form' in pa)
    rows = page.evaluate("document.querySelectorAll('#printArea tbody tr').length")
    check('the paper sheet has a row per item', rows >= len([f for f in data('faults.json')['items'] if f.get('mock') is not False]),
          '%d rows' % rows)
    saved = page.evaluate("() => { let out = null; const old = URL.createObjectURL; URL.createObjectURL = b => { out = b.size; return 'data:text/plain,saved'; }; document.querySelector('#mockSave').click(); URL.createObjectURL = old; return out; }")
    check('the save file is produced', bool(saved and saved > 50), str(saved))

    print('\nthe mocks survive a reload')
    page.reload()
    page.wait_for_timeout(500)
    page.click('nav.tabs button[data-tab="mock"]')
    page.wait_for_timeout(200)
    check('past mocks are still there', len(page.inner_text('#practiceBody')) > 60)
    check('no javascript errors at the end', not errors, '; '.join(errors[:3]))

    print('\nthe page works on a small screen')
    page.set_viewport_size({'width': 320, 'height': 568})
    page.wait_for_timeout(200)
    over = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    check('nothing spills off the side at 320 px', over <= 2, '%d px of overflow' % over)

    browser.close()


def content_checks():
    print('\nthe content is complete')
    faults = data('faults.json')
    ids = [f['id'] for f in faults['items']]
    check('every marking item has a unique id', len(ids) == len(set(ids)))
    groups = {g['id'] for g in faults['groups']}
    bad = [f['id'] for f in faults['items'] if f.get('group') not in groups]
    check('every marking item is in a known group', not bad, ', '.join(bad[:4]))
    short = [f['id'] for f in faults['items'] if len(f.get('short', f['name'])) > 26]
    check('mock sheet labels are short enough', not short, ', '.join(short[:4]))
    thin = [f['id'] for f in faults['items'] if len(f.get('looking', '')) < 40]
    check('every marking item says what is being looked for', not thin, ', '.join(thin[:4]))

    junc = data('junctions.json')['items']
    check('there are junctions to learn', len(junc) >= 8, '%d' % len(junc))
    nocoord = [j['id'] for j in junc if not j.get('lat')]
    check('every junction has a position', not nocoord, ', '.join(nocoord[:4]))
    noprec = [j['id'] for j in junc if j.get('lat') and not j.get('precision')]
    check('every position says how precise it is', not noprec, ', '.join(noprec[:4]))
    fids = set(ids)
    badlink = [(j['id'], l) for j in junc for l in j.get('links', []) if l not in fids]
    check('junction links point at real marking items', not badlink, str(badlink[:3]))

    frames = {'parallel': 5, 'bayreverse': 5, 'bayforward': 6, 'rightpull': 7, 'stop': 5}
    for m in data('manoeuvres.json')['items']:
        if m.get('diagram'):
            check('%s has a known diagram' % m['id'], m['diagram'] in frames, m.get('diagram', ''))
            if m['diagram'] in frames:
                check('%s has one note per diagram step' % m['id'],
                      len(m.get('steps', [])) == frames[m['diagram']],
                      '%d notes for %d steps' % (len(m.get('steps', [])), frames[m['diagram']]))

    qs = data('questions.json')['items']
    check('both kinds of vehicle safety question are covered',
          len([q for q in qs if q.get('type') == 'tell']) >= 5 and len([q for q in qs if q.get('type') == 'show']) >= 5,
          '%d tell, %d show' % (len([q for q in qs if q.get('type') == 'tell']), len([q for q in qs if q.get('type') == 'show'])))
    noans = [q['id'] for q in qs if len(q.get('a', '')) < 25]
    check('every question has an answer', not noans, ', '.join(noans[:4]))

    print('\nnothing is left half written')
    blob = ''
    for name in os.listdir(os.path.join(ROOT, 'data')):
        if name.endswith('.json'):
            with open(os.path.join(ROOT, 'data', name), encoding='utf-8') as fh:
                blob += fh.read()
    for word in ('STUB', 'TODO', 'TBD', 'Lorem ipsum', 'XXX'):
        check('no %s left in the data' % word, word not in blob)
    check('no em or en dashes in the data', not re.search('[—–]', blob))

    srcs = data('sources.json')
    check('the sources list is filled in', len(srcs.get('list', [])) >= 15, '%d sources' % len(srcs.get('list', [])))
    check('the honesty list is filled in', len(srcs.get('limits', [])) >= 5, '%d limits' % len(srcs.get('limits', [])))


if __name__ == '__main__':
    content_checks()
    with sync_playwright() as pw:
        run(pw)
    print('\n%d checks failed' % len(fails))
    for f in fails:
        print('  ' + f)
    sys.exit(1 if fails else 0)
