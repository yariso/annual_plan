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
   They are the only source you have. Two limits apply and you must respect both:
   - The page fetching tool is blocked in this sandbox for every domain, so no page in
     the notes was opened and read. Every URL in them came back from a search engine.
   - The session's web search budget ran out partway through the research. Do not try
     to search: it will be refused. More importantly, the notes written after the budget
     ran out say so at the top, and they rest on the writer's own knowledge rather than
     on sources. Treat anything in those files that is not attached to a URL as
     knowledge, not as fact, and label it (unverified) when you use it.
   The six files written while search still worked, and so the ones with real sourcing,
   are centre-facts.md, pass-rates.md, test-structure.md, marking-dl25.md,
   common-faults.md and, in part, dt1-guidance.md. Prefer them. Where a later file
   contradicts one of those six, the sourced file wins.
   Do not invent a source, a URL, a statistic or a quotation. Ever.

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
- COORDINATES. Any lat and lon you write is "precision": "approximate" unless a source in
  the notes actually published that coordinate, in which case it is "sourced". The app
  prints the precision to the reader. Never round a guess to four decimal places to make
  it look surveyed, and never place a marker for a junction you are not confident exists
  where you are putting it. A missing junction is better than a wrong one.
- LOCAL DETAIL. A specific claim about a particular road (a speed limit, a bus lane, a
  filter arrow, a box junction, a school) is exactly the kind of thing the research could
  not verify. Write it only if the notes support it, and mark it (unverified) if they do
  not. Where you are unsure, write the true general thing tied to the named road instead:
  "the A6005 through Chilwell is a busy urban road with side turnings, parked cars and
  bus stops" is safe and useful, "there is a 20 mph limit on X" is a claim.

WRITING RULES THAT MATTER HERE
- Be specific and useful, not encouraging. "Look right, then left, then right again
  before you move" beats "remember your observations".
- Where sources disagree, say so briefly and give the safer reading.
- Nothing in the app is DVSA material. Where the reader might take it as official, say
  what it actually is.
- Length: write as much as the reader needs and no more. A card the reader will read
  once at a junction should be tight. A reference section can be longer.

THE STYLE TO MATCH
${ROOT}/data/test.json, ${ROOT}/data/marking.json, ${ROOT}/data/questions.json and
${ROOT}/data/manoeuvres.json are already written, by hand, in the
voice the whole app uses. Read data/test.json before you start and match it: the length of
a paragraph, how sources are attached, how a disagreement between sources is handled, how
an inference is labelled. Do not change any of those four files.

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
    reads: ['marking-dl25.md', 'dt1-guidance.md', 'common-faults.md', 'local-roads.md'],
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
    file: 'junctions.json',
    label: 'junctions',
    reads: ['local-roads.md', 'routes-reported.md', 'centre-facts.md', 'common-faults.md'],
    ask: `Write data/junctions.json: the places around Chilwell a candidate needs to have driven before the test, as cards on a map.

Twelve to eighteen items. They must be real places named in the research notes. There is no coordinate file: the research ran out of web search budget before one could be made, so no coordinate in this app is sourced. Give your best coordinate for each place from your own knowledge of the area, to four decimal places, and set "precision": "approximate" on every single one. The app prints that to the reader and offers them a button to move the pin to the right place themselves, so an approximate pin is useful and an invented junction is not. If you are not reasonably sure a place exists where you would put it, leave it out.

Pick for teaching value, not for coverage: the junctions and stretches where a candidate loses marks. Almost certainly among them: the exit from Eldon Road onto the A6005, Bardills roundabout on the A52, the A52 dual carriageway itself, the A6005 Nottingham Road corridor, the tram where it meets the road at Chilwell and Beeston, the Beeston town centre one way system and its bus lanes, Queens Road and Station Road, the residential streets used for manoeuvres and for pulling up on the right, the 20 mph streets, Attenborough and the narrow lanes, Inham Nook, Stapleford and the Long Eaton approaches, and a hill start if the notes give one.

For each: kind (roundabout, lights, junction, tram, hazard or road), where, speed, why (one or two sentences on why it matters), drive (how to drive it, in order, as prose), watch (what the examiner is watching here), mistakes, links (ids from data/faults.json if that file already exists, otherwise leave the array empty), sources.

Diagrams: give one where it genuinely helps.
- A roundabout gets {"type":"roundabout", exits by compass bearing, enter, leave, title}. Get the bearings roughly right against the real layout in the notes: north is 0, east is 90. Put the road you arrive on as "enter" and the one you leave by as "leave", and describe the exit you are showing in "diagramCap".
- A tram or rail crossing gets {"type":"tram", ...}.
- A plain junction gets {"type":"junction","shape":"tjoin" or "crossroads","turn":"left","right" or "ahead"}.
Leave the diagram out where you cannot describe the real layout from the notes. A wrong picture is worse than none, so say in "diagramCap" that the diagram is a schematic showing the exits, not a survey.

SPEED LIMITS. Not one speed limit in the notes was confirmed against a council or mapping source, and the notes say so. So do not print a bare speed limit as fact. Either leave "speed" out, or write what kind of road it is ("urban road with side turnings and bus stops", "dual carriageway"), or give the limit followed by (unverified). The reader is going to be looking at the signs anyway, and a wrong limit in an app is worse than none.

Write "intro" saying what these cards are: the roads a test from this centre has to use, not a route, and that the local detail comes from driving school pages and local knowledge rather than from a survey, so the signs on the road always win.`,
  },
  {
    file: 'routes.json',
    label: 'routes',
    reads: ['routes-reported.md', 'local-roads.md', 'centre-facts.md'],
    ask: `Write data/routes.json: what is and is not known about the test routes from this centre.

"official" is a warning block, shown in a red bordered box. It must say plainly: DVSA stopped publishing test routes (give the year from the research), no route here is official, routes change, and learning a route by rote is not how to pass. Give DVSA's own position where the research found it.

"corridors": three to five directions a test from Eldon Road actually goes, each with a name, a note on what it contains and why it is worth driving, the roads in order, and "points" as a list of [lat, lon] pairs, from your own knowledge of the area, so the app can draw the corridor on the map. Four or five points each is plenty. Keep the points to places you have coordinates for. The app draws straight lines between points and says so, so do not pretend it is the road.

"spots": places worth practising at, with coordinates: the test centre car park for bay parking, a supermarket or retail car park, quiet residential streets for parallel parking and for pulling up on the right, a hill start, and somewhere to practise the tram crossing.

"notes": how to use all this honestly, including that driving every road in the area beats memorising any route, and that the examiner may take you anywhere.`,
  },
  {
    file: 'advice.json',
    label: 'advice',
    reads: ['pass-rates.md', 'centre-facts.md', 'test-structure.md', 'marking-dl25.md'],
    ask: `Write data/advice.json: the five reference panels on the Start tab. Each is one section object.

IMPORTANT. The research notes for booking, the car and the documents, nerves, and what happens afterwards were never written: the session ran out of web search budget first. So three of these five sections come from your own knowledge, and you must handle that honestly.
- What you may state plainly: the stable, well known rules (what to bring, the L plates, the extra mirror, the insurance, the ten working day wait after a fail, the six point New Drivers Act rule, how an appeal works). Attach the GOV.UK page you believe carries it, as a link, and say in the section's "sources" that the pages were not opened in this research.
- What you must hedge: any figure that changes (fees, waiting times). The fee figures in research/test-structure.md, 62 pounds on a weekday and 75 pounds in the evening or at a weekend, came from a search result and are the ones to use, with a line telling the reader to check the current fee on GOV.UK.
- The nerves section: describe what the evidence supports in general terms. DO NOT cite a study, an author, a year or a journal. You have no research note to draw them from and a made up citation would be worse than no citation. Say instead that the research literature behind this was not reachable when the app was written (unverified), and keep the advice to what a driving instructor would recognise: sleep, routine, practising under pressure with mock tests, arriving with time, and that nerves are normal and the examiner is instructed to try to settle you (that last one IS sourced, in research/test-structure.md).

"booking": booking, the fee for a weekday and for evenings and weekends, changing and cancelling and the notice needed, what happens to the fee, waiting times and how slots come up, and what the research says about cancellation apps. Include a table of the fees if the research supports one.

"car": what to bring, the licence, the car's requirements (insurance for a test, L plates, an extra mirror, roadworthy, MOT, tyres, no dashcam pointing into the car, seatbelts and headrests), whether a hire car or an instructor's car may be used, who may sit in, what gets a test cancelled without a refund, and what DVSA does in bad weather. Give "checks" as a tick list the reader can work down on the morning.

"nerves": what the evidence actually supports and what is folklore, with the citations from the research. Then concrete things to do in the two weeks before, the night before, the morning of, and the ten minutes before. Be honest about how strong the evidence is. Do not promise that any of it will make them pass. Include the practical instructor advice too: mock tests, taking the instructor in the car, and that rebooking because of nerves is allowed but costs the fee if it is late.

"after": the result and the debrief, the pass certificate and getting the full licence, when you may drive alone, the New Drivers Act six point rule, what to do next (motorway lessons, Pass Plus), and if it is a fail: the rebooking wait, how to read the fault sheet, and what an appeal can and cannot do.

"rates": the pass rate at this centre against the national figure, with the years each covers and the caveat from the research that these come from sites republishing DVSA's tables rather than from the tables themselves, that two different "national averages" circulate, and that a centre's rate says very little about one person's chances. Give a table. Do not let the reader come away thinking Chilwell is unusually hard or unusually easy.`,
  },
  {
    file: 'plan.json',
    label: 'plan',
    reads: ['centre-facts.md', 'test-structure.md', 'common-faults.md', 'routes-reported.md', 'local-roads.md'],
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
Read whatever else in ${ROOT}/research/ looks relevant; there is no gaps.md, because the
research was stopped when its web search budget ran out.

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
