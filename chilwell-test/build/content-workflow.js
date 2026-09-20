export const meta = {
  name: 'chilwell-content',
  description: 'Write the app data files from the research notes, then check them for contradictions',
  phases: [
    { title: 'Write', detail: 'one agent per data file, working from the research notes' },
    { title: 'Check', detail: 'contradictions, house style and honesty across the finished data' },
  ],
}

const ROOT = '/home/user/annual_plan/chilwell-test'

const HOUSE = `
THE PROJECT
You are writing content for a single page web app for one person taking their car
practical driving test at the Nottingham (Chilwell) DVSA test centre, Unit 24 Eldon
Business Park, Eldon Road, NG9 6DZ. The reader is a learner driver and whoever is
teaching them. They will read it on a phone.

READ FIRST, IN THIS ORDER
1. ${ROOT}/docs/data-contract.md. It gives the exact shape of the file you are writing.
   The app ignores anything not in the shape, so keep to it.
2. The research notes you are told to use, in ${ROOT}/research/. Read them in full.
   They are the only source you have: the page fetching tool is blocked in this
   sandbox for every domain, so do not try to open pages, and do not invent sources.
   You may use WebSearch to fill a specific gap, but the notes already hold most of it.

HOUSE STYLE, ENFORCED BY THE BUILD
- UK English.
- NEVER use an em dash or an en dash. The build refuses the file if it finds one. Use a
  comma, a full stop, brackets, or the word "to" in a range.
- Plain prose. No marketing tone, no exclamation marks, no "don't worry", no "simply".
  Short sentences. Say the thing.
- Speak to the reader as "you". Never call them a customer or a user.
- Inline links are markdown only: [GOV.UK](https://www.gov.uk/...). Bold is **like this**.
- Every claim that came from a source carries that source inline or in the object's
  "sources" array. A claim you worked out yourself carries (reasoned). A claim nobody
  could confirm carries (unverified). Do not dress an estimate up as a measurement.
- The research notes mark many sources "cited by search, page not opened". Where a claim
  rests on one of those and it matters, say so, in the text or with (unverified).
- No content about a named individual, and nothing that encourages breaking the law or
  driving without due care.

WRITING RULES THAT MATTER HERE
- Be specific and useful, not encouraging. "Look right, then left, then right again
  before you move" beats "remember your observations".
- Where sources disagree, say so briefly and give the safer reading.
- Nothing in the app is DVSA material. Where the reader might take it as official, say
  what it actually is.
- Length: write as much as the reader needs and no more. A card the reader will read
  once at a junction should be tight. A reference section can be longer.

THE STYLE TO MATCH
${ROOT}/data/test.json and ${ROOT}/data/marking.json are already written, by hand, in the
voice the whole app uses. Read data/test.json before you start and match it: the length of
a paragraph, how sources are attached, how a disagreement between sources is handled, how
an inference is labelled. Do not change either file.

OUTPUT
Write the file with the Write tool, as valid JSON, UTF-8, no trailing commas, no
comments. Then check it parses: run
  python3 -c "import json;json.load(open('<path>'))"
and fix it if it does not. Then return the structured summary.
`

const SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    wrote: { type: 'boolean' },
    items: { type: 'number', description: 'how many entries in the main list, or 0' },
    notes: { type: 'string', description: 'anything the app author must know: a gap, a contradiction, a decision you took' },
    unverified: { type: 'array', items: { type: 'string' }, description: 'claims you had to publish without a solid source' },
  },
  required: ['file', 'wrote', 'items', 'notes', 'unverified'],
}

const JOBS = [
  {
    file: 'faults.json',
    label: 'faults',
    reads: ['marking-dl25.md', 'dt1-guidance.md', 'common-faults.md', 'highway-code-key.md', 'local-roads.md'],
    ask: `Write data/faults.json: every line on the examiner's marking sheet, which is both the Test tab's reference and the mock test sheet.

Cover every competency the research establishes for a car test, at the level of its sub boxes where the sub box is a different skill (so "Junctions: observation" and "Junctions: approach speed" are separate items, but do not split a sub box that adds nothing).
Leave out the boxes that belong to other test categories (trailer, taxi, motorcycle, tractor). Include the eyesight check, the vehicle safety questions, the controlled stop and the manoeuvre boxes that a car test uses, and eco safe driving, saying plainly what eco marks can and cannot do.

Groups: use a sensible running order that matches how the test unfolds and how an instructor talks: before you drive, control, moving off and stopping, mirrors and signals, speed and progress, junctions and roundabouts, positioning and judgement, other road users, awareness, the manoeuvres. Give each group an id and a name.

For each item:
- name: how the sheet words it, in plain English.
- short: two or three words, for the mock sheet button. It must read at arm's length.
- sheet: the printed wording on the form where the research gives it.
- no: the box number ONLY where the research is confident about it. The research is clear that the numbers for the manoeuvre boxes are not settled, so leave "no" out for those rather than printing a number that may be wrong.
- looking: what the examiner is actually assessing. This is the heart of the app. Use the DT1 guidance where it exists and say so.
- serious: where the line sits between a driving fault and a serious one. Quote DT1 where you can.
- do: three to six lines, in the order you would do them.
- mistakes: what actually goes wrong, from the common faults research.
- local: where this one bites on the roads round Chilwell, using the local roads notes. Only write this where you have something real to say: name a road or a junction. Leave it out otherwise rather than padding.
- mock: true for items a passenger can honestly mark while the car is moving; false for the ones they cannot (the eyesight check, the vehicle safety questions).
- sources.

Also write "intro" for the tab: one short paragraph saying what this list is and that the wording is a reading of DVSA's published guidance rather than a copy of the form.

Aim for 30 to 40 items. Make the top ten faults from the research unmistakably strong, because those are the ones that fail people.`,
  },
  {
    file: 'manoeuvres.json',
    label: 'manoeuvres',
    reads: ['manoeuvres.md', 'marking-dl25.md', 'centre-facts.md'],
    ask: `Write data/manoeuvres.json: the four manoeuvres and the controlled stop.

Items, with these exact ids and diagram names so the pictures match:
  parallel     diagram "parallel"     5 steps
  bayreverse   diagram "bayreverse"   5 steps
  bayforward   diagram "bayforward"   6 steps
  rightpull    diagram "rightpull"    7 steps
  stop         diagram "stop"         5 steps
The number of entries in "steps" MUST equal the number given above, because each step
drives one frame of the diagram. Write each step as one instruction, in the order the
driver does it, and make the step that needs an observation say so, because the diagram
marks an eye at those frames.

The diagram frames, so your words match the picture:
- parallel: 1 alongside the parked car, 2 reversing back with the wheel going left, 3 at the angle with the front swinging out, 4 straightening, 5 parked behind it.
- bayreverse: 1 driving up the car park aisle, 2 the point you stop at, 3 turning the wheel and starting back, 4 swinging into the bay, 5 straight in the bay.
- bayforward: 1 approaching, 2 the point you turn from, 3 swinging in, 4 straightening into the bay, 5 stopped in the bay, 6 reversing back out.
- rightpull: 1 mirrors and signal on the approach, 2 crossing to the right, 3 stopped at the right kerb, 4 reversing back, 5 about two car lengths back, 6 stopped, 7 moving off and back to the left.
- stop: 1 driving normally, 2 the examiner's hand goes up, 3 braking, 4 stopped, 5 moving off again.

For each: what the examiner says (quoted where the research has it), when and where it is asked, what is marked, where the serious fault line sits (kerb contact, ending outside the bay, how far from the kerb, observation), the usual taught method with reference points and why reference points differ between cars, and the common faults.

Chilwell specifics that matter: the test centre car park has seven bays, five opposite the entrance on the right as you drive in and two on the left that are perpendicular and kerbed, and the bays are not all the same width. Reverse bay parking is normally only asked at a test centre car park. Say what that means for practice. Label those car park details unofficial, because they come from a local instructor's page rather than DVSA.

Also say clearly which manoeuvres were removed from the test and when, because plenty of people still practise turn in the road and reversing round a corner.`,
  },
  {
    file: 'questions.json',
    label: 'questions',
    reads: ['show-me-tell-me.md'],
    ask: `Write data/questions.json: every show me tell me question.

All of them, the tell me questions asked before you drive and the show me questions asked while you are driving, each with the question as DVSA words it, an answer that works for a normal modern car, what else the examiner will accept, and the wrong answer people give. Where a car with an electric handbrake, a digital dashboard, stop start or no dipstick would change the answer, say so: many cars now do.

Say in "intro" how the two are asked, what happens if one is answered wrongly (one driving fault, and how that adds up if both are wrong), and that doing the show me question unsafely can cost more than the mark itself.`,
  },
  {
    file: 'junctions.json',
    label: 'junctions',
    reads: ['local-roads.md', 'tram-and-hazards.md', 'coords.md', 'routes-reported.md', 'centre-facts.md'],
    ask: `Write data/junctions.json: the places around Chilwell a candidate needs to have driven before the test, as cards on a map.

Twelve to twenty items. They must be real places from the research notes, with coordinates from research/coords.md. Where coords.md could not source a coordinate, either leave the place out or use the best coordinate available and set "precision" to "approximate". Never invent a coordinate silently: "precision" is shown to the reader.

Pick for teaching value, not for coverage: the junctions and stretches where a candidate loses marks. Almost certainly among them: the exit from Eldon Road onto the A6005, Bardills roundabout on the A52, the A52 dual carriageway itself, the A6005 Nottingham Road corridor, the tram where it meets the road at Chilwell and Beeston, the Beeston town centre one way system and its bus lanes, Queens Road and Station Road, the residential streets used for manoeuvres and for pulling up on the right, the 20 mph streets, Attenborough and the narrow lanes, Inham Nook, Stapleford and the Long Eaton approaches, and a hill start if the notes give one.

For each: kind (roundabout, lights, junction, tram, hazard or road), where, speed (say if it is not confirmed), why (one or two sentences on why it matters), drive (how to drive it, in order, as prose), watch (what the examiner is watching here), mistakes, links (ids from data/faults.json if that file already exists, otherwise leave the array empty), sources.

Diagrams: give one where it genuinely helps.
- A roundabout gets {"type":"roundabout", exits by compass bearing, enter, leave, title}. Get the bearings roughly right against the real layout in the notes: north is 0, east is 90. Put the road you arrive on as "enter" and the one you leave by as "leave", and describe the exit you are showing in "diagramCap".
- A tram or rail crossing gets {"type":"tram", ...}.
- A plain junction gets {"type":"junction","shape":"tjoin" or "crossroads","turn":"left","right" or "ahead"}.
Leave the diagram out where you cannot describe the real layout from the notes. A wrong picture is worse than none, so say in "diagramCap" that the diagram is a schematic showing the exits, not a survey.

Write "intro" saying what these cards are: the roads a test from this centre has to use, not a route.`,
  },
  {
    file: 'routes.json',
    label: 'routes',
    reads: ['routes-reported.md', 'local-roads.md', 'coords.md', 'manoeuvres.md'],
    ask: `Write data/routes.json: what is and is not known about the test routes from this centre.

"official" is a warning block, shown in a red bordered box. It must say plainly: DVSA stopped publishing test routes (give the year from the research), no route here is official, routes change, and learning a route by rote is not how to pass. Give DVSA's own position where the research found it.

"corridors": three to five directions a test from Eldon Road actually goes, each with a name, a note on what it contains and why it is worth driving, the roads in order, and "points" as a list of [lat, lon] pairs from research/coords.md so the app can draw the corridor on the map. Keep the points to places you have coordinates for. The app draws straight lines between points and says so, so do not pretend it is the road.

"spots": places worth practising at, with coordinates: the test centre car park for bay parking, a supermarket or retail car park, quiet residential streets for parallel parking and for pulling up on the right, a hill start, and somewhere to practise the tram crossing.

"notes": how to use all this honestly, including that driving every road in the area beats memorising any route, and that the examiner may take you anywhere.`,
  },
  {
    file: 'advice.json',
    label: 'advice',
    reads: ['vehicle-and-docs.md', 'nerves-evidence.md', 'after-the-test.md', 'pass-rates.md', 'centre-facts.md'],
    ask: `Write data/advice.json: the five reference panels on the Start tab. Each is one section object.

"booking": booking, the fee for a weekday and for evenings and weekends, changing and cancelling and the notice needed, what happens to the fee, waiting times and how slots come up, and what the research says about cancellation apps. Include a table of the fees if the research supports one.

"car": what to bring, the licence, the car's requirements (insurance for a test, L plates, an extra mirror, roadworthy, MOT, tyres, no dashcam pointing into the car, seatbelts and headrests), whether a hire car or an instructor's car may be used, who may sit in, what gets a test cancelled without a refund, and what DVSA does in bad weather. Give "checks" as a tick list the reader can work down on the morning.

"nerves": what the evidence actually supports and what is folklore, with the citations from the research. Then concrete things to do in the two weeks before, the night before, the morning of, and the ten minutes before. Be honest about how strong the evidence is. Do not promise that any of it will make them pass. Include the practical instructor advice too: mock tests, taking the instructor in the car, and that rebooking because of nerves is allowed but costs the fee if it is late.

"after": the result and the debrief, the pass certificate and getting the full licence, when you may drive alone, the New Drivers Act six point rule, what to do next (motorway lessons, Pass Plus), and if it is a fail: the rebooking wait, how to read the fault sheet, and what an appeal can and cannot do.

"rates": the pass rate at this centre against the national figure, with the years each covers and the caveat from the research that these come from sites republishing DVSA's tables rather than from the tables themselves, that two different "national averages" circulate, and that a centre's rate says very little about one person's chances. Give a table. Do not let the reader come away thinking Chilwell is unusually hard or unusually easy.`,
  },
  {
    file: 'plan.json',
    label: 'plan',
    reads: ['centre-facts.md', 'nerves-evidence.md', 'test-structure.md', 'common-faults.md', 'routes-reported.md'],
    ask: `Write data/plan.json: the Start tab's journey, and the short introductions that sit at the top of the other tabs.

"journey": five or six steps, in order, each an accordion the reader opens: something like 1 Learn what is actually being marked, 2 Drive the roads round the centre, 3 Practise the manoeuvres and the questions, 4 Mock test yourself properly, 5 The week before, 6 On the day. Each has a lede, a short body, a "checks" tick list (three to eight lines, concrete), and "do" buttons linking to the tab that step needs. Valid "go" values are start, map, roads, test, skills and mock.

On the day must be right: when to arrive (early enough, not so early you sit and stew), what to bring, that the postcode NG9 6DZ lands you on a business park with many units so look for the unit and the neighbours rather than the postcode pin, and not to drive to Chetwynd Road or the barracks by mistake, because the name Chetwynd belongs to other places in Chilwell and the test centre is on Eldon Road.

The short introductions, one or two sentences each, plain: "mapIntro", "roadsIntro", "faultsIntro", "qIntro", "mockIntro", "practiceEmpty", and "strap" (the line under the app title).
"mapAbout" is longer: what the map is, that the images come from OpenStreetMap over the network so the map needs a signal, that the markers are placed from coordinates that are mostly approximate, and that the corridors are straight lines between junctions rather than the roads themselves.
"mockIntro" must say who holds the phone: the person in the passenger seat, never the driver, and that it is a practice aid, not a DVSA test.`,
  },
]

phase('Write')
log(`Writing ${JOBS.length} data files from the research notes`)

const written = await parallel(JOBS.map((j) => () =>
  agent(
    `${HOUSE}

YOUR FILE: ${ROOT}/data/${j.file}

RESEARCH NOTES TO READ IN FULL FIRST: ${j.reads.map((r) => ROOT + '/research/' + r).join(', ')}
(Also read ${ROOT}/research/gaps.md, which lists what the research got wrong or thin.)

WHAT TO WRITE:
${j.ask}

A file already exists at that path with placeholder content. Overwrite it completely.
Other agents are writing the other data files at the same time, so change nothing else.`,
    { label: `write:${j.label}`, phase: 'Write', schema: SCHEMA }
  )
)).then((r) => r.filter(Boolean))

log(`${written.length} of ${JOBS.length} data files written`)

phase('Check')

const [sources, consistency] = await parallel([
  () => agent(
    `${HOUSE}

YOUR FILE: ${ROOT}/data/sources.json

Read every file in ${ROOT}/research/ (Glob then Read them all) and every file in ${ROOT}/data/.

Write the app's honesty page.
"intro": two or three paragraphs saying how this content was gathered and what that means for the reader. The important fact to state plainly: the research was done in a sandbox where the tool that opens web pages was blocked for every domain, so nearly everything rests on web search results and the summaries returned with them rather than on primary pages read end to end. Say that GOV.UK is the authority and that anything that matters should be checked there. Say that this is not DVSA material.
"limits": every claim in the app that is not properly verified, said plainly, one line each. Draw them from the "Not found" sections of the research notes, from research/gaps.md, and from what the other data files had to publish unverified. At least fifteen lines. Include: the pass rate figures, the eyesight distance if sources disagreed, the marking sheet box numbers, the test centre's parking and waiting room, the opening hours, the coordinates, the routes, the local speed limits, and the examiner wordings.
"list": every source actually used, with name, url, what it gave, and kind (official, unofficial, research or reasoned). Put the GOV.UK and DVSA sources first. At least 30 entries, and do not invent one: take them from the Sources sections of the research notes.`,
    { label: 'sources', phase: 'Check', schema: SCHEMA }
  ),
  () => agent(
    `You are checking the finished content of a driving test app before it is published.

Read ${ROOT}/docs/data-contract.md, then every file in ${ROOT}/data/.

Report, precisely, with the file and the item id for each:
1. Contradictions between files (two files giving a different number for the same thing: the fault limit, the eyesight distance, the independent driving length, the test fee, the pass rate, the address).
2. Anything stated as fact that the research could not support, and anything that reads as measured but is an estimate.
3. Breaches of house style: em dashes, en dashes, American spelling, marketing tone, exclamation marks, "simply", "don't worry", "just".
4. Anything unsafe or wrong as driving advice.
5. Contract breaches: a missing required field, a wrong "go" target, a manoeuvre whose steps do not match its diagram frame count (parallel 5, bayreverse 5, bayforward 6, rightpull 7, stop 5), a junction with no "precision", a link pointing at a fault id that does not exist.
6. Gaps a person sitting this test would notice.

Do not fix anything. Report it.`,
    {
      label: 'consistency check', phase: 'Check',
      schema: {
        type: 'object',
        properties: {
          contradictions: { type: 'array', items: { type: 'string' } },
          unsupported: { type: 'array', items: { type: 'string' } },
          style: { type: 'array', items: { type: 'string' } },
          unsafe: { type: 'array', items: { type: 'string' } },
          contract: { type: 'array', items: { type: 'string' } },
          gaps: { type: 'array', items: { type: 'string' } },
        },
        required: ['contradictions', 'unsupported', 'style', 'unsafe', 'contract', 'gaps'],
      },
    }
  ),
])

return { written, sources, consistency }
