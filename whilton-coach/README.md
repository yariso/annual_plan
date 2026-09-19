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

## Share with team mates
Host `dist/index.html` and send the link. Everything runs in the browser and nothing is sent anywhere. Each phone keeps its own map lock, recordings and settings.
