# Whilton Mill line guide and audio coach

Open `dist/index.html` in a browser, or host it on any HTTPS site (GitHub Pages works) so that phone GPS is allowed.

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

## What it does
- Before the race: the Map, Corners and Plan tabs give the line, the pedal plan, the brake marker and a kerb verdict for every corner, plus a session plan. On the Coach tab, Read me the lap speaks the whole lap corner by corner for the queue.
- During the race: tones and words in the earpiece for every lift and brake, the lap time and gap to best after each lap, one coaching point per lap, and GPS ready, lost and back announcements.

## Share with team mates
Host `dist/index.html` and send the link. Everything runs in the browser and nothing is sent anywhere. Each phone keeps its own map lock, recordings and settings.
