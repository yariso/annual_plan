# Chilwell driving test guide: project brief for Claude Code

## What this is
A single-file web app (dist/index.html) for one person taking the car practical driving
test at the Nottingham (Chilwell) DVSA test centre, Unit 24 Eldon Business Park, Eldon
Road, NG9 6DZ. It holds the roads around the centre, the rules of the test, what the
examiner is looking for item by item, the manoeuvres, the vehicle safety questions, and
a mock test the accompanying driver marks from the passenger seat. Six tabs, Start first
and the default on load:

- Start: the journey in order, counting down from the test date typed at the top. Each
  step is an accordion with tickable checks that survive a reload, and buttons that jump
  to the tab that step needs. Below it the test centre card, then the reference panels
  (booking and the fee, the car and the documents, nerves, afterwards, pass rates, and
  where all of this comes from).
- Map: a real map of the area with the test centre, the junctions, the hazards, the
  practice spots and the route corridors on it. Tiles come from OpenStreetMap at run
  time, so the map needs a network; everything else in the app does not. Tap a marker
  for that place's card. Layers can be switched off, and a GPS button shows where the
  phone is.
- Roads: every junction and hazard as a card, with a schematic diagram (roundabout exits
  numbered the way an instruction numbers them, a plain junction, a tram crossing), how
  to drive it, what the examiner is watching there, and what goes wrong. Filtered by kind.
- Test: the test in order from meeting the examiner to the result, then how it is marked
  (the three fault types, the 15 driving fault limit, what ends a test), then every line
  on the marking sheet with what the examiner is assessing, where the line between a
  driving fault and a serious one sits, what to do, and where it bites locally.
- Skills: the four manoeuvres and the emergency stop, each with a stepped diagram the
  reader walks through frame by frame, and the show me tell me questions as a quiz that
  remembers which ones keep catching you out and asks those first.
- Mock: the marking sheet from the Test tab turned into buttons. The passenger taps
  driving, serious or dangerous against each item while the car is moving. A running
  tally judges it against the real limits, the result names where the marks went, every
  tap is stamped with the time and, if location is allowed, with where the car was, so
  the faults appear as pins on a second map afterwards. What to practise next is built
  from the last four mocks. Sheets can be printed on paper and the history saved to a
  file and loaded back.

## House style (owner preference, keep to it)
- UK English. Never use em dashes or en dashes anywhere: build/build.py refuses to build
  if it finds one in the data or the page.
- Plain headings, plain prose, no marketing tone.
- Every claim traces to a source or is flagged as reasoned. See docs/validation.md.
- Never present an estimate as measured. Coordinates say whether they were sourced or
  approximate, and the app shows that on the card.

## Layout of the repo
- src/app.src.html: the whole app (HTML, CSS, JS). `__DATA__` is replaced at build time
  with the contents of every file in data/.
- data/*.json: all the content. The shapes are fixed and documented in
  docs/data-contract.md. Nothing in the code is specific to a particular junction,
  marking item or question: add one to the data and it appears.
- build/build.py: loads every data file, refuses em and en dashes, injects the lot into
  the source and writes dist/index.html. No other build step, no dependencies.
- build/content-workflow.js: the workflow script that wrote data/faults.json,
  junctions.json, routes.json, advice.json, plan.json and sources.json from the research
  notes, one agent per file, with the house style and the honesty rules in its prompt.
  Kept so the same thing can be done again for another test centre. The other data files
  were written by hand.
- tests/test_app.py: Playwright tests that drive the real page, plus content checks over
  the data files (ids unique, every junction has a position and says how precise it is,
  every manoeuvre has one note per diagram frame, nothing left half written). Playwright's
  Chromium revision must match the browser installed; in the Claude Code web sandbox that
  is Playwright 1.56 with the preinstalled Chromium, and `playwright install` must not be
  run there.
- research/*.md: the raw research notes, one file per topic, with sources. The content in
  data/ was written from these.
- docs/validation.md: what was checked against what, and what is not verified.
- docs/data-contract.md: the shape of every data file.
- Build and test: `python3 build/build.py && python3 tests/test_app.py`.

## Engine design (src/app.src.html)
- The map (`makeMap`) is hand written, not a library: Web Mercator, 256 px raster tiles
  from tile.openstreetmap.org positioned absolutely, an SVG overlay for markers, route
  corridors and the GPS dot, and pointer handling for drag, pinch and tap. Zoom is
  fractional and the tile size is scaled to suit, so there is no separate transform layer.
  `m.fit(points)` frames a set of points. Two instances exist: the Map tab and the fault
  pin map on the Mock tab. If tiles fail to load the overlay still works and the map says
  so.
- Diagrams (`diagRoundabout`, `diagJunction`, `diagTram`, `diagManoeuvre`) are generated
  SVG. Geometry lives in the code and words live in the data, so a content change cannot
  break a picture. Roundabout exits are given as compass bearings and the app numbers them
  from the entry road the way an instruction does ("the second exit"). Manoeuvre diagrams
  are frames in metres with a car drawn at each one, and an eye mark where the examiner
  wants to see an observation; `MAN` holds the frame counts, which the tests check against
  the number of step notes in the data.
- The mock test (`mockStart`, `mockAdd`, `mockStop`) keeps marks as `{id, kind, t, lat, lon}`.
  `mockVerdict` applies the real rule: any serious or dangerous fault fails, and more than
  the limit of driving faults fails. History, the quiz's score, the checklist ticks and the
  test date live in localStorage under the `ct.` prefix.
- The quiz (`quizStart`) weights the order by what the reader has got wrong before, so the
  questions that keep catching them come round first.
- Speech (`speak`) reads a question aloud with an en-GB voice where the phone has one.

## Known limits (be honest about these in any UI text)
- Nothing here is DVSA material. It is a reading of DVSA's published rules and of local
  knowledge, and the examiner's decision on the day is the only one that counts.
- The research behind the content was done in a sandbox with two limits. The page fetching
  tool was blocked by the network policy for every domain, GOV.UK included, so no page
  behind any URL in this app was opened and read. And the session's budget of 200 web
  searches ran out after six of the sixteen planned research passes, so everything written
  after that point rests on what those six had gathered or on the writer's own knowledge.
  docs/validation.md has the claim by claim record and says which tier each part sits in.
  Anything that matters should be checked against GOV.UK.
- DVSA does not publish test routes. No route in this app is official, and no route detail
  for this centre was found at all. The year the practice stopped is often given as 2010,
  but no source for that was found, so the app does not state a year. The corridors on the
  map are drawn as straight lines between junctions, not as roads.
- Coordinates are mostly derived from postcodes and from reading a map, not surveyed. Each
  one carries its precision and the app shows it.
- Pass rate figures come from sites that republish DVSA's tables, not from the tables
  themselves, because the spreadsheet could not be opened.
- The map needs a network for its tiles. Everything else works offline once the page is
  loaded.
- Phone behaviour (location needing an https page, permission prompts, the screen locking
  during a mock) is from memory and needs a hand test on an iPhone and an Android phone.

## Backlog, in priority order
1. Open the primary sources on a machine with normal network access and settle the table
   in docs/validation.md: the DT1 wordings character by character, the DL25 item list and
   its box numbers from the published PDF, the Chilwell pass rate from DRT122A, the top ten
   faults at ranks three to seven, the seventh show me question, and the test centre's
   opening hours and parking.
2. Survey the junctions: every coordinate in the app was placed from knowledge of the
   area, so drive or walk each one and use the app's own "set it from where I am" button,
   then export the corrections and fold them back into data/junctions.json as sourced
   positions. Confirm the speed limits from the signs while you are there.
3. Record a real practice drive with the mock sheet running and check that the fault pins
   land where the fault happened, allowing for the lag between the fault and the tap.
4. Add the examiner's wording for each manoeuvre from a recent test, rather than from
   instructor accounts.
5. An installable PWA so the app and the last-viewed tiles work with no signal.
6. A second centre (Colwick or Watnall) by adding a data set and a switch, once the data
   contract has proved itself on this one.
