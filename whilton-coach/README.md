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
- At home before the day: a virtual lap talked round on the map, the lap in your head (tap at each corner with your eyes shut and it checks your rhythm against the demo lap), and a corner quiz on order and pedals.
- Before the race: the Map, Corners and Plan tabs give the line, the pedal plan, the brake marker and a kerb verdict for every corner, plus a session plan, what to bring and ask at the briefing, the flags, the hire-kart facts and what was checked against which source. On the Coach tab, Read me the lap speaks the whole lap corner by corner for the queue.
- On the day: the Coach tab opens first with one big Start button; press it in the pits, phone in the pocket, and a black pocket screen stops touches until its button is held to stop.
- During the race: tones and words in the earpiece for every lift and brake, a chirp a second before each brake word, the lap time and gap to best after each lap, one coaching point per lap on a focus corner that is held until it improves and then confirmed, and GPS ready, lost and back announcements. From the second lap the calls are timed from your own last lap through each stretch, and a corner where your braking keeps landing late gets its call moved earlier.
- After the session: a team table of every driver's best lap and best time through each corner (type the driver's name before Start GPS), every lap corner by corner with your best marked, the model's time through each corner alongside, and the least consistent corner named.

## Share with team mates
Host `dist/index.html` and send the link. Everything runs in the browser and nothing is sent anywhere. Each phone keeps its own map lock, recordings and settings.
