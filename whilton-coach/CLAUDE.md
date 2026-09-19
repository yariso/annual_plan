# Whilton Mill line guide and audio coach: project brief for Claude Code

## What this is
A single-file web app (dist/index.html) for a novice kart driver at Whilton Mill, UK. Four tabs:
- Map: real track shape, racing line coloured 1 to 5 by braking effort, kerb verdicts, brake markers. Switches: layout (International 1200 m, National 960 m), driver (novice, experienced), 2024 chicane on or off, dry or wet.
- Corners: every corner in lap order. Each card has a pedal plan (how hard, from where, for how long), brake marker, line, apex kerb, exit kerb, mistakes, wet notes, and a zoomed close-up.
- Plan: session plan, kerb summary, wet notes, hire-kart notes, validation record and sources.
- Coach: GPS audio coach. Demo lap on the map, live GPS, map lock, tones and words, lap-by-lap coaching, debrief.

## House style (owner preference, keep to it)
- UK English. Never use em dashes anywhere (build.py counts them). Plain headings, plain prose, no marketing tone.
- Every driving claim should trace to a source or be flagged as reasoned. See docs/validation.md.
- Human validation matters: never present estimates as measured.

## Layout of the repo
- src/app.src.html: the whole app (HTML, CSS, JS). `__DATA__` is replaced at build time.
- build/build_data.py: geometry to data. Reads data/*_px.npy (centrelines in image pixels) and data/scale.json, detects corners by curvature, names them per layout, builds the racing line (lateral offsets), dry and wet braking levels, kerbs, markers. Writes data/data.json.
- build/build.py: injects data.json into the source, writes dist/index.html.
- tests/test_coach.py: Playwright tests that run simulated laps through the real engine: words and tones, coaching on a deliberately poor driver, wet mode, and the map lock on rotated noisy synthetic GPS.
- tools/: how the centrelines were traced from a map image (reference only).
- Build and test: `python build/build_data.py && python build/build.py && python tests/test_coach.py` (needs numpy, scipy, playwright with chromium).

## Engine design (src/app.src.html, second half of the script)
- Map lock (`fitOne`, `fitRecording`): ICP with a 2D similarity transform fits the map centreline to a GPS recording, tries both layouts, reports RMS and coverage. Stored in localStorage as `wm.lock`.
- Lap engine (`lapFix`, `lapTick`): each fix is transformed into map space and matched to the centreline (windowed nearest point). Position is carried forward between fixes using speed and acceleration. Lap timing by start-line crossing.
- Audio: a continuous tone sounds for as long as the painted level is above 1 at the look-ahead position. Pitch encodes level (2 lift hum, 3 to 5 brake). Words (Hard brake, Firm brake, Dab, Lift, Flat) fire at a longer look-ahead. Talk-me-round mode speaks a sentence per corner.
- Coaching (`lapMetrics`, `coachTips`): per-corner windows, entry speed, slowest speed, brake onset, throttle pick-up, segment time. Rules compare with the guide (flat, lift, brake) and with the driver's own best through that corner. Thresholds widen at low GPS rates.
- Demo (`simStep`): a simulated kart follows the painted levels; "makes mistakes" brakes early, over-slows and lifts at flat corners so the coach has something to say. Emulated GPS (1, 10 or 25 Hz, noise, latency) feeds the same engine as live GPS.

## Known limits (be honest about these in any UI text)
- Phone browser GPS is about 1 fix per second. Tone start is good to roughly 10 m, tone end less. Real accuracy needs a 10 to 25 Hz receiver.
- Geometry was traced from the Kart Directory circuit map image (a commercial map). It validated well (1190 m without the chicane when scaled to 1200 m). For anything public, replace it with your own GPS survey. The map lock plus a clean recording can generate that.
- Braking levels 1 to 5, zone lengths and lateral line positions are a reading of the written guides, not measured data.
- The 2024 chicane has no written driving guide. Its card is reasoned from shape and general technique.
- Wet line is general technique. Whilton-specific wet guides exist only as videos that could not be read.
- YouTube transcripts could not be fetched. docs/validation.md lists the videos to review by hand.

## Backlog, in priority order
1. Native app (React Native or Expo) reading a RaceBox Mini S over BLE at 25 Hz (protocol is published by RaceBox). Port the lap engine, audio and coaching as a TypeScript module with unit tests. Wired audio to race earpieces.
2. Survey mode: build the centreline, brake zones and corner windows from the driver's own clean laps, so the map no longer depends on a traced image.
3. Calibrate levels and zone lengths from recorded laps of a quick driver. Replace estimates with measured brake points per kart type (390cc hire kart, Club100, Rotax).
4. Watch the 2025 chicane guide by Wolemid and the wet laps by Rich Tea Racing, and update the chicane card and wet line.
5. Team sharing: export and import of laps, best-lap ghosts, a shared leaderboard per corner.
6. Coaching: add consistency scoring, racing-line deviation (needs 10 Hz or better), and trend across sessions.
7. Accessibility and offline: make it an installable PWA for Android with Web Bluetooth to the RaceBox.
