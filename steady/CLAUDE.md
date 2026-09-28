# Steady

A personal self-help tool. The brief is `steady-spec.md`; read it before changing anything.

- Single user. No accounts, no sync, no multi-user code paths.
- Mobile-first. Every control is thumb-sized (48px minimum). Check-in must stay under 60 seconds.
- No external calls in Phase 1. No CDNs, fonts, analytics or APIs. The app is static files plus localStorage.
- No telemetry, ever.
- Tests for routing logic and XmR rules live in `tests/` and run with `npm test` (Node's built-in test runner, no dependencies). Keep pure logic in `app/logic.js` so it stays testable.
- No em dashes in any copy. No streaks, badges, praise or guilt copy. No "you missed" anything.
- `data/` is gitignored. It holds `profile.json` from the onboarding interview, which is personal. Never commit it.
- Build sessions are capped at 90 minutes. Phase 1 only until the user has a week of real data.

Run: `npm start` from this folder, then open http://localhost:8000/app/ (serving from here lets the app pick up `data/profile.json` on first load).
When changing any app file, bump `VERSION` in `app/sw.js` so installed copies update.
