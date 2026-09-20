# Whilton Mill line guide and audio coach

Open `dist/index.html` in a browser, or host it on any HTTPS site so that phone GPS is allowed: iPhones and Android phones only give a web page their location over HTTPS. The repository carries a GitHub Pages workflow (`.github/workflows/pages.yml`) that publishes `dist/index.html`; turn it on once under the repository's Settings, Pages, Source: GitHub Actions, and the link appears in the Actions run. Add the page to the phone's home screen and it opens full screen.

## Continue in Claude Code
1. Unzip this folder on your computer.
2. Open a terminal in it and start Claude Code.
3. Ask it to read CLAUDE.md first. That file holds the brief, the architecture, the known limits and a prioritised backlog.

## Build and test
```
pip install numpy scipy playwright && playwright install chromium
python build/build_data.py
python build/build.py
python tests/test_coach.py
```
In a sandbox with a preinstalled Chromium (such as Claude Code on the web) install the Playwright version whose Chromium revision matches it instead of running `playwright install`; Playwright 1.56 matches Chromium revision 1194.

## Lap time model
```
pip install numba
python3 model/laptime.py            # all layouts, both karts, dry and wet, plus the sensitivity sweeps (about 20 minutes on 4 cores)
python3 model/laptime.py --quick    # one layout, one kart: a smoke test
python3 build/build.py              # embeds data/model.json in dist/index.html
```
`model/laptime.py` finds the fastest possible lap for a point-mass kart on the traced track with an estimated hill: for any racing line it solves the speed profile at the limit of grip, engine and rear brakes, then it re-optimises the line over and over until it stops improving. Results go to `data/model.json` and `docs/laptime-model.md`, and the app shows them as the Model driver level and a Plan tab panel. Everything in it rests on estimates (hill, width, lap length, grip), so read the caveats in the report.

## What it does
- A practice loop: the whole coach on a shrunk copy of the lap laid on the ground where you stand, so you can walk or jog round it in a field and hear every call, the lap time and the coaching before you ever reach the circuit.
- The Start tab lays the journey out in order: learn the lap, test the phone at home with a walk test that draws your GPS trace live, then the GPS coach at the circuit, then the debrief.
- At home before the day: a virtual lap talked round on the map, the lap in your head (tap at each corner with your eyes shut and it checks your rhythm against the demo lap), and a corner quiz on order and pedals.
- Four driver levels, novice, intermediate, advanced and the physics model, and every feature follows the one chosen: the map's line and braking colours, the corner cards, the read-aloud lap, the virtual lap, the demo and the coach's calls.
- Before the race: the Map, Corners and Plan tabs give the line, the pedal plan, the brake marker and a kerb verdict for every corner, plus a session plan, what to bring and ask at the briefing, the flags, the hire-kart facts and what was checked against which source. On the Coach tab, Read me the lap speaks the whole lap corner by corner for the queue.
- On the day: the Coach tab opens first with one big Start button; press it in the pits, phone in the pocket, and a black pocket screen stops touches until its button is held to stop.
- The phone's motion sensor: the Start GPS press asks for motion access, the phone works out which way is forward in your pocket from the corners and the brakings, and from then on it times each brake onset, throttle point, brake pump and spin at 60 Hz, so brake-point coaching and the per-corner call calibration work at the phone's one GPS fix a second. Off if refused, and the coach runs as before.
- During the race: tones and words in the earpiece for every lift and brake, a chirp a second before each brake word, the lap time and gap to best after each lap, one coaching point per lap on a focus corner that is held until it improves and then confirmed, and GPS ready, lost and back announcements. From the second lap the calls are timed from your own last lap through each stretch, and a corner where your braking keeps landing late gets its call moved earlier.
- A shared team store (a free Supabase project, set up once from cloud/README.md): each driver signs in with their email, every lap goes up, every phone sees the whole team, and the app learns a Team driver level from the quickest driver's real brake points as the laps accumulate.
- The venue's official transponder times, pasted from its public results page, sit beside the app's laps; team files export and import so four phones can be merged into one table.
- After the session: a team table of every driver's best lap and best time through each corner (type the driver's name before Start GPS), every lap corner by corner with your best marked, the model's time through each corner alongside, and the least consistent corner named.

## The plan and the research

`docs/not-last.md` is the race plan for four novices: the 2026 event format, the ten driving changes in the coaches' order with sources, team endurance craft, the two weeks before, a race-day checklist, and what the motor learning evidence says about how the app should talk. `docs/diy-box.md` weighs buying a 25 Hz box against building a logger or a live Wi-Fi box, with a parts list and the reasons a Bluetooth box cannot feed Safari on an iPhone. Both say which of their claims were not independently verified.

## Share with team mates
Host `dist/index.html` and send the link. Everything runs in the browser and nothing is sent anywhere. Each phone keeps its own map lock, recordings and settings.
