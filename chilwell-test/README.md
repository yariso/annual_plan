# Chilwell driving test guide

Everything for a car practical driving test at the Nottingham (Chilwell) test centre, in
one web page: the roads around the centre on a map, the rules of the test, what the
examiner is looking for line by line, the manoeuvres, the vehicle safety questions, and a
mock test that the person in the passenger seat marks as you drive.

Open `dist/index.html` in a browser, or host it on any HTTPS site so that the phone will
give the page its location. The repository carries a GitHub Pages workflow that publishes
it; turn Pages on once under the repository's Settings, Pages, Source: GitHub Actions, and
the link appears in the Actions run. Add the page to the phone's home screen and it opens
full screen.

## What it does

- **Start** counts down from your test date and lays the preparation out in order, with
  boxes to tick that are still ticked when you come back. Underneath it are the test
  centre details, the booking and fee rules, what the car and the documents must be, what
  actually helps with nerves, what happens afterwards either way, and the pass rates.
- **Map** puts the test centre, the junctions, the hazards and the practice spots on a
  real map. Tap any of them for its card. The map needs a network for its images; the rest
  of the app does not.
- **Roads** is one card per junction: a diagram, how to drive it, what the examiner is
  watching there, and what goes wrong. The roundabout diagrams number the exits the way an
  instruction does, so "take the second exit" means something before you arrive.
- **Test** walks through the test in order, explains the three kinds of fault and the
  limit, and then gives every line on the examiner's marking sheet: what is being
  assessed, where the line between a driving fault and a serious one sits, what to do, and
  where that one bites on the roads round Chilwell.
- **Skills** steps through each manoeuvre frame by frame, with the observations marked,
  and quizzes you on the show me tell me questions. The quiz remembers which ones keep
  catching you out and asks those first.
- **Mock** turns the marking sheet into buttons. The passenger taps a driving, serious or
  dangerous fault as it happens. The running tally applies the real rules, the result says
  where the marks went, and if location is allowed every fault is pinned on a map
  afterwards, so you can see the junction that keeps costing you. What to practise next is
  worked out from the last four mocks. The sheet can also be printed on paper, and the
  history saved to a file and loaded back on another phone.

The phone is for the passenger. The driver should never touch it.

## Build and test

```
pip install playwright        # a version whose Chromium matches the browser installed
python3 build/build.py        # data/*.json into src/app.src.html, writes dist/index.html
python3 tests/test_app.py     # content checks, then the real page in a real browser
```

In a sandbox with a preinstalled Chromium, such as Claude Code on the web, install the
Playwright version whose Chromium revision matches it instead of running
`playwright install`. Playwright 1.56 matches Chromium revision 1194.

## Changing the content

All the words live in `data/*.json` and the shapes are set out in
`docs/data-contract.md`. Add a junction, a marking item or a question to the data and it
appears in the app, on the map, in the filters and on the mock sheet. The build refuses to
run if it finds an em dash or an en dash, which is the house style here.

## Honesty

`docs/validation.md` records where every part of the content came from and what could not
be checked. The short version: this is a reading of DVSA's published rules plus local
knowledge, it is not DVSA material, and no test route in it is official, because DVSA does
not publish them and no route detail for this centre was found at all.

The research behind it ran in a sandbox with two limits. Pages could not be opened: the
network policy blocked every domain tried, GOV.UK included, so the content rests on web
search results and the summaries returned with them rather than on primary pages read end
to end. And the session's web search budget ran out after six of the sixteen planned
research passes, so the rest, including every coordinate and all the local road detail,
rests on knowledge rather than sources and is labelled as such in the app. Check anything
that matters against GOV.UK.
