# Steady

A small, private, offline app for getting moving on flat days, working worry and imposter thoughts with evidence, and seeing a tip coming. The brief is in `steady-spec.md`.

## Run it

```
npm start          # serves this folder on port 8000
npm test           # routing and XmR rule tests
```

Open http://localhost:8000/app/ on your phone (same wifi: use your computer's IP) and "Add to Home Screen". Once installed it works offline. Your data stays in the browser on that device; export it from More.

Your interview answers live in `data/profile.json`, which is not in git. Served from this folder, the app loads it automatically on first run. Otherwise load it from More, Profile.
