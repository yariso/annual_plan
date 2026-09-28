# Steady

A personal, adaptive self-help tool. Working title; rename it whatever you like.

Claude Code: "you" in this file is the person you are building for. This file is the brief. Read all of it before writing code, then follow section 10.

## 1. Purpose

You have a recurring cycle. You push hard and get deeply into the work, then a new demand lands and throws it. Confidence drops, anxiety rises, starting anything becomes hard (anhedonia), and imposter thinking takes over. The goal is a steadier state, which means three concrete things:

1. Get moving during flat phases, because starting is the block, not enjoying.
2. Work the imposter belief with evidence rather than reassurance.
3. See the tip coming and recover faster.

The tool is built around doing, not reading. Understanding the techniques has never been the problem; repeating them at the moment you least feel like it is. That is the job a therapist normally holds, and it is the job this tool has to hold.

This is not therapy and does not pretend to be. Medication is the GP's business; the tool keeps a notes-for-GP list and nothing more.

## 2. Principles

The tool must:

1. End every session with one small action. Reading is only ever attached to an exercise and is capped at 10 minutes a day.
2. Ask before it tells. Check-in first, then route.
3. Be tiny by default. In a flat state the ask is a two-minute start. The tool never asks for more than starting.
4. Use evidence, not reassurance. No affirmations, no "you're doing great". Belief ratings, evidence entries, predictions tested against outcomes.
5. Give early warning from data. Daily measures on XmR charts with limits set from your own baseline. A signal triggers a protocol, not a lecture.
6. Keep a human in the loop. A three-line weekly summary to send to a named friend, and a notes-for-GP list.
7. Stay private. Local data, exportable at any time, no telemetry.

The tool must not:

- Use streaks, badges or guilt copy. Missed days do not stack. There is no "you missed 3 days".
- Send more than one notification a day, or any after 9pm.
- Diagnose, name conditions, or comment on medication.
- Compare you with anyone.
- Offer thinking work in a flat state. Thought records and reading are switched off when energy is low; the route is the two-minute start. In a flat state, analysis turns into rumination.

## 3. States and routing

Check-in, under 60 seconds, one thumb:

- energy 1 to 10
- mood 1 to 10
- anxiety 1 to 10
- hours slept
- started anything yet today? yes / no
- imposter thought present? yes / no
- one line of free text (optional)

The check-in sets a state. You can override it with one tap.

Flat: energy 4 or below, or nothing started by 2pm. Route: one two-minute start from the activity menu. Predicted enjoyment before, actual enjoyment after. Nothing else is shown.

Spiral: anxiety 7 or above, or imposter thought present. Route: read three evidence entries (random, tagged to the relevant claim), one defusion exercise (90 seconds), then one action. A thought record is offered only if energy is 5 or above.

Push: energy 8 or above and either work hours above your set limit or a self-tag of "into something". Route: stop-time check, tomorrow's first task written down now, one non-work activity, early-warning checklist.

Steady: everything else. Route: one activity, an optional exercise, optional reading within the cap.

The thresholds are starting values. Retune them from the charts after three weeks of data.

## 4. Onboarding interview

Claude Code runs this in the terminal before building anything, one question at a time, and saves the answers to `data/profile.json`. The answers seed the activity menu, the evidence log, the early-warning list and the values list.

1. When the spiral is running, what is the sentence in your head? The actual words. (Seeds: thought record templates, spiral detection.)
2. List up to ten things you have enjoyed once you had started, past or present, even if you have not done them for years. For each, what is the two-minute version? (Seeds: activity menu. Every entry needs a two-minute start.)
3. What are three things you have been putting off? What is the two-minute version of each? (Seeds: activity menu, work-adjacent category.)
4. When something new lands and throws you, what does it usually look like? What happened last time, step by step, including what you did with the work the team could not deliver? (Seeds: cycle model, tip protocol.)
5. What do you notice in the days before a crash: sleep, body, habits, hours, tone in messages, anything? (Seeds: early-warning list.)
6. What does steady look like? Three markers you would accept as evidence. (Seeds: weekly review targets.)
7. Pick five values from a list (autonomy, craft, insight, family, honesty, service, learning, calm, play, health, others). (Seeds: values check in the defusion set.)
8. Who is the named friend for the weekly ten minutes, and what would you want them to ask you? (Seeds: weekly summary.)
9. How long do flat phases usually last, and what has helped even slightly before? (Seeds: baseline expectations, activity weighting.)
10. What rules would you set for yourself at work when you return? Examples: a 24-hour delay before taking any work back; "anything is possible" always followed by "by whom, by when". (Seeds: return-to-work module, Push protocol.)

## 5. Modules by phase

### Phase 1 (build first, one session)

Check-in. As in section 3. Stores every field with a timestamp.

Today's one thing. Behavioural activation. The activity menu comes from interview questions 2 and 3. Each activity has a category (physical, craft, social, outdoors, work-adjacent, rest) and a two-minute start. The tool suggests one. You record predicted enjoyment (0 to 10) before, start a two-minute timer, then record actual enjoyment and done / partial / not. The gap between predicted and actual is the data point that matters; show it back to you over time. Suggestion logic: prefer activities where actual has beaten predicted historically, rotate categories, and in a flat state only suggest activities with a two-minute start.

Evidence log. Fields: date, source, what happened (short, your words), which claim it bears on (claim 1: quality of your work; claim 2: leadership and team building; claim 3: other), strength 1 to 5, the "yes but" your mind offers, and a read count. The Spiral route pulls three entries. Seed entry for today: at a national board meeting, the quality insights pack was described as fantastic by several very senior members; your deputy reported never having heard such positive feedback from so senior an audience. Claim 1, strength 5.

Charts. XmR charts for energy, mood and anxiety. Baseline from the first 15 points, then fixed until you choose to recalculate. Rule set is pluggable; use the Making Data Count conventions you already use at work. A rule break puts a flag on the home screen and offers the matching protocol.

Export. JSON and CSV dump of everything.

Acceptance checklist for Phase 1:

- [ ] Check-in completes in under 60 seconds on a phone with one thumb.
- [ ] After check-in the home screen shows exactly one next action.
- [ ] Flat state never shows a thought record or reading.
- [ ] The evidence log has today's entry seeded and it is readable from the Spiral route.
- [ ] Charts show limits after 15 points and flag rule breaks.
- [ ] Everything works offline once installed as a PWA.
- [ ] Routing logic and XmR rules have unit tests.

### Phase 2 (after a week of real data)

Thought record, imposter edition. Situation; the thought, verbatim; belief 0 to 100; emotion and intensity; evidence for; evidence against (pull from the evidence log); the claim-slide check ("has the claim changed since you started? quality of work, then leadership, then something else"); the yes-but; a balanced thought; re-rate belief. Save, and show the belief trajectory over time for each recurring thought.

Defusion set. Short ACT exercises scripted in the app, 60 to 120 seconds each: "I'm having the thought that..."; naming the story ("the imposter story, episode n"); thanking the mind; a values check ending in one committed action for the next ten minutes.

Compassion set. Compassion-focused therapy exercises: soothing-rhythm breathing with a two-minute guided timer; a compassionate letter written as if to a deputy who had just had this feedback and still felt a fraud, then read back addressed to you; a written two-voice exercise (critic voice, then compassionate voice) on the day's thought.

Reading library. Section 6, attached per module. The 10-minute daily cap is enforced by the interface: a timer, then "back to the exercise".

### Phase 3 (after a month)

Cycle model. An event log for "new thing landed": what it was, what happened next (took it back / delegated / parked / asked for help), and how it felt at 24 and 72 hours. The early-warning list from interview question 5 is checked in the weekly review; three or more present triggers the tip protocol, which you write yourself in advance (for example: tell the deputy, remove one commitment, no new work for 48 hours, book two recovery activities).

Weekly review. What the charts say, what beat prediction, what got skipped. Generates the three-line summary for the named friend with a share button, and the notes-for-GP list.

Return-to-work module. Optional. A phased-return plan and the rules from interview question 10, surfaced on work days.

AI coach. Optional. Socratic questioning inside thought records and activity planning. Use the Anthropic API or a local model you already run. System prompt constraints: techniques from this spec only; ask more than tell; no diagnosis; no reassurance; no more than three sentences per turn; if risk language appears, stop and show the safety card. Log every prompt and response locally.

## 6. Reading library

Rule: reading is attached to an exercise, and the tool shows a chapter, not a book.

Behavioural activation. Addis and Martell, Overcoming Depression One Step at a Time (the activity scheduling chapters). The free NHS self-help guide on depression and low mood from Cumbria, Northumberland, Tyne and Wear NHS Foundation Trust has a short behavioural activation section and is a good first read. Attached to: Today's one thing.

Thought records. Greenberger and Padesky, Mind Over Mood (the thought record chapters). Attached to: Thought record.

Imposter thinking. Hibberd, The Imposter Cure, by a UK clinical psychologist. Attached to: Thought record and Evidence log.

Defusion and values. Harris, The Happiness Trap (the defusion chapters) and Harris, The Confidence Gap. Attached to: Defusion set.

Compassion. Irons and Beaumont, The Compassionate Mind Workbook, with Gilbert, The Compassionate Mind as background. Attached to: Compassion set.

Lifelong patterns. Young and Klosko, Reinventing Your Life. Do the questionnaire in the book before choosing which chapters to attach. Attached to: Cycle model.

Stress cycle. Nagoski and Nagoski, Burnout, on completing the stress cycle. Attached to: Push protocol.

Several of these are on the Reading Well "Books on Prescription" list and can be borrowed free from Derby libraries. For buying, use amazon.co.uk or Waterstones.

## 7. Data model

SQLite, single user. Suggested tables, all with id and created_at:

- profile: interview answers as JSON
- checkins: energy, mood, anxiety, sleep_hours, started, imposter_thought, note, state, state_overridden
- activities: name, category, two_minute_start, active
- activity_log: activity_id, predicted, actual, outcome (done / partial / not), note
- evidence: date, source, what_happened, claim (1 / 2 / 3), strength, yes_but, read_count
- thought_records: situation, thought, belief_before, emotion, intensity, evidence_for, evidence_against, claim_slide, yes_but, balanced_thought, belief_after
- exercise_log: exercise_name, module, duration_seconds, completed
- events: kind (new_thing / tip / other), description, response, feeling_24h, feeling_72h
- signals: metric, rule, date_flagged, acknowledged
- reading_items: title, module, chapter_hint, url
- reading_log: reading_item_id, minutes
- settings: thresholds, notification_time, work_hours_limit, friend_name

## 8. Safety card

Shown when mood is 2 or below for three consecutive days, or when free text contains risk language (keep a phrase list; the AI coach also flags). Also reachable permanently from settings.

Content, calm and short: "This tool isn't for this bit. Call your GP today, or NHS 111 and choose the mental health option, or Samaritans on 116 123, free, any time. If you are in immediate danger, call 999." One tap to dial each. No lecture, no pop-up loop.

## 9. Adaptation

Rules first; the data decides. No model needed for any of this.

- Activity suggestions are weighted by actual-minus-predicted enjoyment, completion rate, recency and category rotation.
- An exercise skipped twice is shortened. Skipped three times, it is retired for a month.
- After three weeks, the state thresholds in section 3 are retuned from the charts (for example, Flat becomes energy below your own lower quartile).
- The single daily prompt is scheduled at the time of day you actually complete things, learned from the activity log.
- The reading cap only ever adjusts down.
- Every four weeks the weekly review asks: what is helping, what is not, what to drop.

## 10. Build notes for Claude Code

- Suggested stack: FastAPI with SQLite, React front end, mobile-first, installable as a PWA. Runs locally or on whatever you already host personal apps on. Change the stack if you prefer; the spec does not depend on it.
- Create CLAUDE.md stating: single user, mobile-first, no external calls in Phase 1, no telemetry, tests for routing logic and XmR rules, no em dashes in any copy.
- Phase 1 only. Stop and show the running app before touching Phase 2.
- Build sessions are capped at 90 minutes, then the tool gets used rather than built. Building this is a good thing to be into this week; it is also exactly the kind of work that runs away. The cap is part of the tool.

## 11. The path (added after Phase 1)

A friend's plan, adopted by the user as self-help, without booking therapists: EMDR skills first, then gestalt, then DBT if new coping strategies are still needed. The tool follows this order.

- Stage 1, EMDR skills: calm place, container, butterfly hug for a present feeling, and strengthening a better belief (the negative belief, the belief you would rather have, how true it feels from 1 to 7, a real memory from the evidence log, slow butterfly-hug tapping, re-rate). Belief ratings are tracked over time.
- Stage 2, gestalt skills: "right now I notice" awareness, "I" statements, two voices (a written two-chair dialogue between the critic and the part it attacks), unsent letter.
- Stage 3, DBT skills: STOP, TIPP, wise mind, opposite action, check the facts, PLEASE, DEAR MAN.
- Left out on purpose: EMDR processing of painful past memories. Done alone it can open up more than can be closed again. Any exercise that stirs a painful memory says to stop and go to the calm place.
- The Worried route and the optional Steady exercise use the current stage. Low days stay one two-minute activity at every stage; at stage 3 it is framed as opposite action.
- Every exercise rates how upset you are before and after (0 to 10). Written answers go to that stage's notes on My path.
- The user chooses when to move stage.
