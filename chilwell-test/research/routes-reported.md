# Reported test routes from Chilwell

Research compiled 20 September 2026, for the Nottingham (Chilwell) DVSA practical test
centre, Unit 24 Eldon Business Park, Eldon Road, NG9 6DZ.

## Summary

No new evidence could be gathered in this session. Web search returned "this session has
used its web search budget (200 of 200 WebSearch calls)" on the first call, and every
WebFetch returned EGRESS_BLOCKED, including gov.uk, despatch.blog.gov.uk, wikipedia and
the four driving school pages that make route claims about Chilwell. I opened no page.

Everything below therefore comes from the sibling research notes in this same folder,
which obtained their material from search engine summaries in an earlier session, plus my
own reasoning, which is labelled as such. Every route claim here is at two removes from
its publisher, and the app must treat it accordingly.

No published test route for Nottingham (Chilwell) was found, in this session or in the
sibling notes. Nobody has produced a turn by turn sequence of roads for any Chilwell test
route. The brief anticipated this, so the fallback is done in full: section 11 below
lists the roads any route must use to leave the centre and return to it.

Four publishers, all unofficial driving schools or route sites, make route shaped claims
about Chilwell. They agree on only one thing: the routes are urban, with little or no
country road, and heavy on roundabouts and junctions. Beyond that they name individual
features, and each feature comes from a single publisher, not from several agreeing.

The named features are Bramcote Island, Bardills Roundabout, the roundabout at M1
Junction 25, the A6005 Bye Pass Road dual carriageway, Beeston High Road, roads shared
with tram lines, one way roads, no entry roads and traffic lights with left filter
arrows. One publisher names all but two of these, so this is one instructor's account,
not a consensus.

The single most useful local route fact found is that a set of traffic lights sits at the
test centre, and that routes divide there: one way towards Long Eaton, Breaston, Toton,
Stapleford, Sandiacre and Risley, the other towards Attenborough, Beeston, Bramcote,
Dunkirk, Lenton and Wollaton. That is one instructor's page, unverified.

The manoeuvre is reported by two publishers to be most often a bay park in the centre's
own seven bay car park, at the start or the end of the test. No source names a street for
the parallel park or the pull up on the right.

Nothing was found on where the independent driving section goes at Chilwell. Nothing.

DVSA changed the shape of every test on 24 November 2025: three stops instead of four,
emergency stop in about one test in seven instead of one in three, and an independent
driving section that may now run for the whole test. Any route account published before
that date describes a test that no longer exists in that form.

## Findings

### 1. Evidence limitation for this note, read this before using anything below

This section is the most important one in the file.

**No search was run.** The first WebSearch call of this session returned: "Web search was
not performed: this session has used its web search budget (200 of 200 WebSearch calls)."
The budget is shared across the sibling research agents working on the other topics in
this folder and was already spent before I started. A second call, made later to confirm
the state was final, returned the same message. (reasoned, from the recorded tool output)

**No page was opened.** WebFetch returned `EGRESS_BLOCKED` for every domain attempted:
`www.gov.uk`, `despatch.blog.gov.uk`, `en.wikipedia.org`, `www.drivingtestsuccess.com`,
`routebuddy.co.uk`, `www.drivinglessonswithmartin.co.uk` and `www.drivingtestroutes.com`.
The proxy message was "blocked by the network egress proxy" in each case. (reasoned, from
the recorded tool output)

This is the same blockage recorded in the sibling files `centre-facts.md`,
`common-faults.md`, `dt1-guidance.md`, `marking-dl25.md` and `test-structure.md`, and it
is already logged as backlog item 1 in `chilwell-test/CLAUDE.md`. This file does not
discharge that backlog item. It sharpens it, because route material is the part of this
app that rests most heavily on unofficial sources and therefore needs opening most. (reasoned)

Four provenance labels are used below and they mean different things:

- **(relayed, page not opened)**: the claim and its URL come from a sibling research file
  in this folder, which obtained them from a search engine's summary of the page. Two
  removes from the publisher. Nobody in this process has read the page.
- **(unofficial)**: the publisher is not DVSA. Driving schools, route products, road
  enthusiast sites, aggregators.
- **(unverified)**: I could not confirm it from any source available to me, including the
  sibling notes. It may be general knowledge, it may be wrong, and the app must not print
  it as fact.
- **(reasoned)**: my inference, drawn from the material above it, stated as an inference.

A claim can carry more than one label. A route claim from a driving school page reached
through a sibling note is "(relayed, page not opened, unofficial, unverified)", which is
the weakest evidence in this whole project.

### 2. The official position: DVSA does not publish test routes

DVSA does not publish practical test routes for any test centre, Chilwell included. No
GOV.UK page giving a route for Nottingham (Chilwell) was found by me or by any sibling
agent. (unverified, from the absence of any such source in this folder)

The only statement to this effect that reached this folder is from a local instructor's
page, which states that DVSA test routes are updated from time to time and are not
published.
[Driving Lessons with Martin, Chilwell Test Centre](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
(relayed, page not opened, unofficial). The sibling note records this as matching DVSA's
long standing position but says it could not be verified on GOV.UK. That remains true.

**The app must not attribute this to DVSA.** It is an instructor's restatement of what
instructors understand DVSA's position to be. Until the primary source is opened, the app
should say "DVSA does not publish test routes" as an uncited statement of the situation,
and should not put it in quotation marks or hang a gov.uk link on it. (reasoned)

### 3. When publication stopped, and why

This repository's own brief states: "DVSA stopped publishing test routes in 2010."
[chilwell-test/CLAUDE.md](/home/user/annual_plan/chilwell-test/CLAUDE.md), and the same
sentence appears in `docs/validation.md`. That is an internal assertion from an earlier
pass of this project, not an external source. (unverified)

**I could not establish the date, the body that made the decision, or the stated reason.**
The relevant history would be that the Driving Standards Agency, DVSA's predecessor,
published test routes for a period and then withdrew them. I have no source in this folder
for when that happened or why, and I could not search. Treat the year 2010 as unconfirmed
until somebody opens a primary source. (reasoned)

**DVSA's own statement about learning routes by rote: not found.** The brief asked for it
specifically. A statement to the effect that learning a test route by heart is no
substitute for learning to drive on any road is widely attributed to DVSA and to DSA
before it, and it is the kind of line DVSA's Despatch blog and the Ready to Pass campaign
use. I could not find it, could not verify its wording, and will not reconstruct it.
**The app must not print any such quotation.** If the app wants to make the argument, it
must make it in its own words, or wait until the source is opened. (reasoned)

What can be said in the app's own voice, without a quotation, and defended from sources
that are in this folder:

- The examiner chooses the route on the day and the candidate is not told it in advance.
  (reasoned, from the test wordings in section 9 below, which have the examiner giving
  directions as the drive goes along)
- Since 24 November 2025 examiners have explicitly been given room to build routes that
  reach more high speed and higher risk roads where the location allows.
  [despatch.blog.gov.uk, 19 November 2025](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)
  (relayed, page not opened, primary source). That is DVSA saying, in effect, that routes
  are not fixed.
- The independent driving section is not a memory test of directions.
  [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-skills/following-routes/)
  (relayed, page not opened, primary source, DVSA campaign site).

### 4. What DVSA does publish that is route shaped

One thing, and it is worth the app knowing about:

GOV.UK publishes an example independent driving route diagram.
[gov.uk, Independent driving route diagram example](https://www.gov.uk/government/publications/independent-driving-route-diagram-example)
(relayed, page not opened, primary source). This is an illustration of what an independent
driving section looks like as a diagram, not a real route from a real centre. It is the
nearest thing to an official route document and it should be opened, because it would tell
the app author how DVSA itself chooses to draw a route, which is a good model for the map
tab. (reasoned)

Beyond that, DVSA publishes the examiner's directions wordings in DT1, which describe how
a route is communicated rather than where it goes. Those are in section 9. (reasoned)

### 5. Why every route from every centre changed on 24 November 2025

This is the most important dating fact in this file, and it is from a primary source.

DVSA made three adjustments permanent at every test centre from 24 November 2025, after a
trial that ran from April 2025 at 20 centres:

1. Stops during the test reduced from 4 to 3.
2. Emergency stop frequency reduced from about 1 test in 3 to about 1 test in 7.
3. The independent driving segment given flexibility to use a sat nav, traffic signs or
   both, and to run for the full duration of the test.

[despatch.blog.gov.uk, Making adjustments to the driving test, 19 November 2025](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)
(relayed, page not opened, primary source, via `research/test-structure.md`)

DVSA's stated reason was to improve the flow of the test, to make it better reflect real
world driving, and to let examiners build routes that reach more high speed and higher
risk roads where location allows. Same source. (relayed, page not opened)

Consequences for route material, all (reasoned) from the above:

- Any YouTube route video, forum post or driving school route page published before
  24 November 2025 describes a test with four stops and a one in three emergency stop
  chance. Its route may still be broadly right, but its account of the test is not.
- The phrase "where location allows" matters at Chilwell. The local sources say there is
  little country road near this centre, so the higher speed roads reachable from Chilwell
  are the A6005 dual carriageway and the A52. If examiners are now pushed towards higher
  speed roads, the A52 corridor becomes more likely on a Chilwell route, not less. This is
  an inference and the app should present it as one.
- An independent driving section that can now run the whole test means the "20 minutes of
  examiner directions then 20 minutes of sat nav" picture that most route videos show is
  out of date.

A separate 2026 change worth noting because it affects what the candidate can do rather
than where they drive: from 9 June 2026 a test can only be moved to one of the candidate's
three nearest test centres.
[carwow](https://www.carwow.co.uk/news/10823/dvsa-driving-test-booking-changes-2026)
(relayed, page not opened, unofficial, and the sibling note records that the underlying
DVSA bulletin could not be opened). Not a route matter, but it means a candidate who does
not like the Chilwell roads may not be able to move far. (reasoned)

### 6. The reported route claims for Chilwell, publisher by publisher

Every entry here is (relayed, page not opened, unofficial, unverified). None of these
publishers is DVSA, none of these pages was opened by anyone in this project, and no
publication date was established for any of them except where stated.

**Publisher 1. Driving Lessons with Martin, a local approved driving instructor.**
URL: https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/
Date: not established.
This is the richest single source of local route material found, and most of the named
features in this file come from it alone.

Claims:

- From the traffic lights at the test centre, routes can go towards Long Eaton, Breaston,
  Toton, Stapleford, Sandiacre and Risley, or towards Attenborough, Beeston, Bramcote,
  Dunkirk, Lenton and Wollaton. (via `research/centre-facts.md`)
- The test area includes many multiple lane and busy roundabouts, notably Bramcote Island,
  Bardills Roundabout and the roundabout at M1 Junction 25, as well as several quirky
  roads and junctions including roads shared with tram lines, one way roads, no entry
  roads and traffic lights with left filter arrows. (via `research/common-faults.md`, which
  records this in quotation marks)
- The entrance road to the test centre, off Eldon Road, is shared with other businesses
  and leads to a small car park outside the entrance to the building.
- There are seven marked bays, five opposite the entrance on the right as you drive in and
  two on the left, perpendicular to the others and bounded by a kerb.
- The test centre is just behind the Village Hotel that was used before the present centre
  opened.
- DVSA test routes are updated from time to time and are not published.

**Publisher 2. NGPass Driving Academy, a Nottingham driving school.**
URL: https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/
Date: not established.

Claims:

- Routes from Chilwell are mainly urban, with little country road nearby, and heavy on
  roundabouts, junctions and crossroads, ranging from quiet back roads to busy main
  streets. (via `research/common-faults.md`, recorded in quotation marks)
- Because the centre has a usable car park, there is a high chance of the bay park
  manoeuvre being set at the start or the end of the test, in the centre's own car park.
  (via `research/common-faults.md` and `research/dt1-guidance.md`)
- At some centres including Chilwell the manoeuvre may be the bay park done on returning
  to the centre car park, so the last thing a candidate does can be the manoeuvre rather
  than an ordinary park. (via `research/test-structure.md`)

**This publisher is demonstrably wrong about something checkable.** The same page was
summarised as saying "The Chilwell test centre is located on Cator Lane in Chilwell, NG9".
Every other source puts the centre at Eldon Road, NG9 6DZ, and `research/centre-facts.md`
records the Cator Lane claim as contradicted and to be treated as wrong. A page that gets
the address of the test centre wrong should not be trusted on the roads around it. The app
author should weight this source accordingly. (reasoned)

**Publisher 3. RouteBuddy, a route information site.**
URLs: https://routebuddy.co.uk/chilwell-driving-test-routes/ and
https://routebuddy.co.uk/nottingham-chilwell-driving-test-routes/
Dates: not established. Two separate pages on the same centre, which is a pattern typical
of search optimised content rather than of a single considered guide. (reasoned)

Claims:

- Bye Pass Road, the A6005, is a major route connecting Beeston and Long Eaton, with dual
  carriageway driving and merging. (first URL, via `research/common-faults.md`)
- The High Road through Beeston town centre is one of the busiest sections, with bus lanes,
  bus stops, cyclists, pedestrians crossing between shops and frequent signal controlled
  junctions. (second URL, via `research/common-faults.md`, recorded in quotation marks)

Note the phrase "one of the busiest sections". The word "sections" implies the page
describes routes in sections, which suggests there is more route detail on that page than
reached this folder. **This is the single page most worth opening first.** (reasoned)

**Publisher 4. Intensive Lessons, a driving course booking site.**
URL: https://intensivelessons.co.uk/Practical-Test-Centres/Nottinghamshire/Nottingham-Chilwell
Date: not established.

Claim:

- The 40 minute driving test from Chilwell will primarily feature urban driving due to the
  lack of country roads within the vicinity. (via `research/common-faults.md`, recorded in
  quotation marks)

Note that the stated duration, 40 minutes, is the whole appointment rather than the drive.
GOV.UK's figure for the driving part is around 35 minutes.
[gov.uk](https://www.gov.uk/driving-test/what-happens-during-test) (relayed, page not
opened, primary source, via `research/test-structure.md`). A page that rounds the drive up
to 40 minutes is describing the test loosely. (reasoned)

**Publisher 5. h2g2, a collaborative road description site.**
URL: https://h2g2.com/edited_entry/A425927
Date: not established.
This is not a driving test source at all. It is a description of the A52 corridor, and it
reached this folder because it describes Bardills. Its claims are in section 7.

**Route products that claim Chilwell coverage but whose content is unknown.** These were
found by sibling agents while looking for pass rates, and each has a Chilwell page. None
was opened, and none of their route content reached this folder:

- DrivingTestRoutes: https://www.drivingtestroutes.com/driving-test-routes-in-nottingham-chilwell/
  (the sibling notes used this page only for a pass rate, 44.2 per cent for 2024/25)
- AUDrive: https://audrive.net/en/office/ENG/nottingham-chilwell/routes
  (the URL ends in "routes", so it is a routes page; the sibling notes used it only for a
  44 per cent pass rate)
- Driving Test Tips: https://www.drivingtesttips.biz/driving-test-centres/chilwell-driving-test-centre.html
  (attempted by a sibling agent, EGRESS_BLOCKED)
- ExamRoutes: https://examroutes.co.uk/ (the sibling notes cite several ExamRoutes articles
  on manoeuvres and waiting times, but no Chilwell route page was found)

### 7. Reported roundabouts and junctions that come up repeatedly

The brief asked which junctions or roundabouts come up repeatedly. The honest answer needs
a caveat first.

**The repetition is in my notes, not in the world.** Three sibling files cite the same
Driving Lessons with Martin page, so the same list of roundabouts appears three times in
this folder. That is one publisher repeated, not three publishers agreeing. Nothing below
is corroborated by an independent source. (reasoned)

**Bramcote Island.** Named as a multiple lane and busy roundabout in the test area.
[drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
(relayed, page not opened, unofficial, unverified). No source in this folder describes its
layout, the number of exits, the lane markings or which approach a test would use. Not
found, see the Not found section.

**Bardills Roundabout.** Named in the same list. Two further sources describe the junction
itself, though neither is about driving tests:

- Bardills roundabout joins the A52 Brian Clough Way to the B6003 at Stapleford, and is
  named after the Bardills Garden Centre that accesses it.
  [h2g2](https://h2g2.com/edited_entry/A425927),
  [Wikipedia, List of road junctions in the United Kingdom: B](https://en.wikipedia.org/wiki/List_of_road_junctions_in_the_United_Kingdom:_B)
  (both relayed, pages not opened, unofficial)
- Bardills Island is a roundabout with an inner slip road in the centre that links traffic
  from the A52 towards Derby to the B6003 towards Toton and Long Eaton, to cut out the
  congestion of the A52 Nottingham junction. A third lane appears on the approach, as does
  a set of traffic lights on the large roundabout.
  [h2g2](https://h2g2.com/edited_entry/A425927) (relayed, page not opened, unofficial)
- Three of the four approaches into this priority roundabout suffer significant queue and
  delay problems throughout the peak periods, with queues in excess of 300 and 200 vehicles
  commonly recorded in the AM and PM peak on the A52 eastbound and Stapleford Lane
  respectively.
  [JCT Consultancy, Cutting Corners at Bardills](https://www.jctconsultancy.co.uk/Home/docs/jctSymp_bardillsCuttingCorners.pdf)
  (relayed, page not opened, a traffic engineering conference paper, and the sibling note
  records the queue figures as undated)

If a Chilwell route does use Bardills, an inner slip road, a third lane appearing on the
approach and signals on the roundabout itself are exactly the combination that produces
lane discipline and road markings faults. That is worth a card in the Roads tab whether or
not a test goes there, because a candidate who has practised it will not be surprised.
(reasoned)

**The roundabout at M1 Junction 25.** Named in the same list.
[drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
(relayed, page not opened, unofficial, unverified).

**A warning the app must carry if it mentions this.** The roundabout at a motorway
junction is an ordinary surface roundabout and can be driven on a learner test. The
motorway itself cannot: a candidate on a practical test does not drive on the motorway.
If the app shows M1 Junction 25 it must make that distinction, or it will frighten a
nervous candidate into thinking the test might put them on the M1. (reasoned, and the
motorway rule should be checked on GOV.UK before the app states it)

**Traffic lights at the test centre.** One source places a set of traffic lights at the
test centre and treats them as the point where routes diverge.
[drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
(relayed, page not opened, unofficial, unverified). If that is right, these lights are the
first hazard of every test and the last before the return, which makes them the single
most valuable thing on the map. They need locating properly on a map or on the ground.
(reasoned)

**Traffic lights with left filter arrows.** Named as a feature of the area, with no
location given. Same source. (relayed, page not opened, unofficial, unverified)

**One way roads and no entry roads.** Named as a feature of the area, with no location
given. Same source. (relayed, page not opened, unofficial, unverified)

**Roads shared with tram lines.** Named as a feature of the area, with no location given.
Same source. (relayed, page not opened, unofficial, unverified)

On the tram, the sibling note establishes that Nottingham Express Transit Line 1 serves
this corridor, and names stops including Bramcote Lane, Eskdale Drive, Inham Road and
Toton Lane.
[Wikipedia, Eskdale Drive tram stop](https://en.wikipedia.org/wiki/Eskdale_Drive_tram_stop),
[Wikipedia, Inham Road tram stop](https://en.wikipedia.org/wiki/Inham_Road_tram_stop),
[Wikipedia, Bramcote Lane tram stop](https://en.wikipedia.org/wiki/Bramcote_Lane_tram_stop),
[Wikipedia, Toton Lane tram stop](https://en.wikipedia.org/wiki/Toton_Lane_tram_stop)
(all relayed, pages not opened)

A tram stop is normally named after the road it sits on or beside, so Bramcote Lane,
Eskdale Drive, Inham Road and Toton Lane are very likely to be real roads in this corridor
that the tram meets. That is an inference from the stop names and needs checking on a map
before the app draws anything. (reasoned). It does not establish that any of them is on a
test route. (reasoned)

### 8. Where the manoeuvres are reported to be asked for

**The bay park, in the test centre car park.** Two publishers say the same thing:

- Because the centre has a usable car park of seven bays, there is a high chance of the bay
  park manoeuvre being set at the start or the end of the test, in the centre's own car
  park.
  [ngpassdrivingacademy.co.uk](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/),
  [drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
  (both relayed, pages not opened, unofficial, unverified)
- At some centres including Chilwell the manoeuvre may be the bay park done on returning to
  the centre car park.
  [ngpassdrivingacademy.co.uk](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/)
  (relayed, page not opened, unofficial, unverified)

There is a general rule behind this that does not depend on either publisher: reverse bay
parking is normally only set at a test centre car park, because that is where the marked
bays are, whereas forward bay parking can be set in any car park.
[Exam Routes, Driving Test Centre Car Parks in 2026](https://examroutes.co.uk/27239/driving-test-centre-car-parks-2026/)
(relayed, page not opened, unofficial). So if a reverse bay park is set at Chilwell, it
will almost certainly be in the centre's own car park. (reasoned)

The car park detail matters for practising it. Seven bays, five opposite the entrance on
the right as you drive in and two on the left set perpendicular and bounded by a kerb, the
two on the left being poor for the three line method and unforgiving because of the kerb,
and the bays not being equal widths, the widest about 10 per cent wider than the narrowest.
[drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
(relayed, page not opened, unofficial, unverified). `research/centre-facts.md` holds the
full detail and should be the source the app uses for the car park.

**The parallel park: not found.** No source names a street. (see Not found)

**The pull up on the right and reverse: not found.** No source names a street. (see Not found)

What can be said without inventing anything: the parallel park and the pull up on the
right both need a residential street with parked cars and light traffic, so they will be
set somewhere in the residential streets rather than on the A6005 or the A52. The
residential areas within a few minutes of the centre are Chilwell, Attenborough, Toton and
Beeston. (reasoned). **The app must not name a specific street as a manoeuvre spot**,
because no source does, and naming one would be inventing route detail. (reasoned)

### 9. The independent driving section, where it commonly goes

**Not found for Chilwell.** No source in this folder says anything about where the
independent driving section goes from this centre, which destination is given, or which
signs are followed. Nothing.

What is known is the generic shape, and it is well sourced through the sibling file
`research/test-structure.md`:

- The section lasts 20 to 35 minutes.
  [gov.uk](https://www.gov.uk/driving-test/what-happens-during-test) (relayed, primary)
- Since 24 November 2025 it may use a sat nav, traffic signs or both, and may run for the
  full duration of the test.
  [despatch.blog.gov.uk](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)
  (relayed, primary)
- The examiner provides and sets up the sat nav and the candidate may not use their own.
  [gov.uk](https://www.gov.uk/driving-test/what-happens-during-test) (relayed, primary)
- Historically about 1 test in 5 used traffic signs rather than a sat nav.
  [despatch.blog.gov.uk, 6 July 2017](https://despatch.blog.gov.uk/2017/07/06/making-the-driving-test-more-reflective-of-real-life-driving/)
  (relayed, primary). Whether that split still holds after November 2025: not found.
- Going the wrong way is not itself a fault and the examiner helps the candidate back on
  route. [gov.uk](https://www.gov.uk/driving-test/what-happens-during-test) (relayed, primary)

The traffic signs version is the one that has a local dimension, because it needs a
destination that is signed continuously from where the section starts. From this part of
Nottinghamshire the destinations that are signed on the main roads are the kind of names
that appear on the A52 and A6005: Nottingham, Derby, Long Eaton, Beeston, Stapleford, and
the M1. **This is an inference about what is plausible, not a report of what happens.** No
source says which destination is used at Chilwell. (reasoned)

The examiner's wording for the signs version, from DT1, gives the app a way to present
this honestly without guessing the destination: the examiner names the destination out
loud at the time. (reasoned, from the wording quoted in section "Quotes worth using")

### 10. Route videos, forums and route apps

**No YouTube video of a Chilwell test route was found and none is cited in this folder.**
I could not search, so I cannot say whether any exists. I will not name a video, a channel
or a URL, because I have none. (see Not found)

**No forum thread about Chilwell routes was found and none is cited in this folder.** Same
reason. (see Not found)

**Route apps and route sites.** Four exist with Chilwell pages, listed in section 6. None
was opened. Their content is unknown. Two of them, DrivingTestRoutes and AUDrive, were used
by sibling agents only for pass rate figures, which suggests the search summaries returned
pass rate text rather than route text, but that is weak evidence about what is on the page.
(reasoned)

A general caution the app should carry about all of these, which follows from section 5 and
needs no source: a route product sells the idea that routes can be known. DVSA changes
routes, changed the shape of the test in November 2025, and does not publish routes. A
route product cannot be checked against anything. (reasoned)

### 11. The roads any route from this centre must use to leave and return

This is the fallback the brief asks for, and given that no route detail was found, it is
the most useful section in this file. It is built from the centre's address and from the
local sources in `research/centre-facts.md`. Each tier below is labelled by how certain it
is.

**Tier 1, certain from the address alone. (reasoned)**

1. **The test centre car park**, Unit 24, Eldon Business Park, NG9 6DZ. Every test begins
   and ends here. The drive is measured from signing the declaration to switching the
   engine off at the end.
   [gov.uk DT1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/01-the-practical-driving-test-and-extended-test-for-cars)
   (relayed, primary, via `research/test-structure.md`)
2. **The business park access road off Eldon Road**, described as shared with other
   businesses and leading to the small car park outside the building.
   [drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
   (relayed, page not opened, unofficial)
3. **Eldon Road** itself. It is in the address.

**Tier 2, near certain from the landlord's own description of the site. (reasoned)**

4. **The A6005 Nottingham Road.** Eldon Business Park is described by its landlord as
   prominently situated on the A6005 Nottingham Road, which runs between Nottingham and
   Long Eaton, and the Eldon Road Trading Estate as located just off the A6005 and adjacent
   to Chilwell Retail Park.
   [Logicor](https://www.logicor.eu/en/uk/properties/nottinghamshire-eldon-business-park-nottingham/nottinghamshire-eldon-road-trading-estate-nottingham)
   (relayed, page not opened, unofficial, but a landlord describing its own property).
   Two aggregators agree that the centre is beside the A6005.
   [getdriving.co.uk](https://www.getdriving.co.uk/test-centre/nottingham-chilwell),
   [PassMeFast](https://www.passmefast.co.uk/test-centres/practical/nottinghamshire/nottingham-chilwell)
   (both relayed, pages not opened, unofficial).
   **So the first classified road on every route, and the last, is almost certainly the
   A6005.** (reasoned)
5. **The traffic lights at or beside the test centre**, treated by a local instructor as the
   point where routes divide.
   [drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
   (relayed, page not opened, unofficial). If they exist as described, they are unavoidable
   and they are the first thing the candidate does after leaving the car park. (reasoned)

**Tier 3, the two directions, from one instructor's page. (relayed, unofficial, unverified)**

Routes from those lights go either:

6. **South west along the A6005**, towards Toton, Long Eaton, Stapleford, Sandiacre, Risley
   and Breaston, or
7. **North east along the A6005**, towards Attenborough, Beeston, Bramcote, Dunkirk, Lenton
   and Wollaton.

[drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)

The two destination lists correspond to the two directions of the A6005, which runs roughly
south west to north east through Chilwell between Long Eaton and Nottingham. Long Eaton,
Toton and Sandiacre lie to the south west, and Beeston, Dunkirk and Lenton lie towards
Nottingham to the north east. (reasoned, from the destination lists and the landlord's
description of the A6005 as running between Nottingham and Long Eaton). This should be
checked on a map before the app draws it.

**Tier 4, named corridors beyond the immediate area. All single sourced, all unofficial,
all unverified.**

8. **The A6005 Bye Pass Road**, connecting Beeston and Long Eaton, with dual carriageway
   driving and merging.
   [routebuddy.co.uk](https://routebuddy.co.uk/chilwell-driving-test-routes/)
9. **Beeston High Road**, with bus lanes, bus stops, cyclists, pedestrians crossing between
   shops and frequent signal controlled junctions.
   [routebuddy.co.uk](https://routebuddy.co.uk/nottingham-chilwell-driving-test-routes/)
10. **The A52 corridor**, with Bramcote Island, Bardills Roundabout and the roundabout at
    M1 Junction 25.
    [drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
11. **The B6003**, which meets the A52 at Bardills and runs towards Toton and Long Eaton.
    [h2g2](https://h2g2.com/edited_entry/A425927)

**Roads very close to the centre that are not named by any route source but are worth the
map, because they are where a candidate can practise. (reasoned)**

- **Barton Lane**, Chilwell, on which Chilwell Retail Park sits, just off the A6005.
  [getoccupi.com](https://getoccupi.com/malls/chilwell-retail-park),
  [ShopsNearMe](https://shopsnearme.com/location/nottingham-chilwell-retail-park/)
  (both relayed, pages not opened, unofficial)
- **Brailsford Way**, Chilwell, NG9 6DL, the address of the Village Hotel, which one
  instructor uses as the landmark for finding the centre.
  [Village Hotels](https://www.village-hotels.co.uk/nottingham),
  [drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
  (both relayed, pages not opened)
- **The Chilwell Retail Park car park**, the obvious place to practise a forward bay park
  and a parallel park approach without using the test centre's own car park. It has TK
  Maxx, Matalan, Marks and Spencer Foodhall, Halfords and McDonald's among its occupiers.
  [getoccupi.com](https://getoccupi.com/malls/chilwell-retail-park) (relayed, page not
  opened, unofficial). Note that this is a private car park and practising there is at the
  operator's discretion. (reasoned)

**What the app must not do with this list.** It must not present it as a route. It is a
list of roads that a route must touch at the start and the end, plus a list of roads that
unofficial sources associate with the area. There is no order, no sequence and no turn by
turn anything, because none was found. (reasoned)

### 12. How reliable each class of source is

This section exists so the app author can weight what is above.

**Local instructor pages.** The most likely to be right about the roads, because the
author drives them. The Driving Lessons with Martin page reads as first hand: the bay
widths differing by about 10 per cent is the kind of detail only somebody who has measured
or repeatedly used the car park would write. (reasoned). But it is one person's experience
of the routes they have seen, undated, and it may predate November 2025.

**Driving school marketing pages.** Written for search engines. The NGPass page gets the
test centre's address wrong, putting it on Cator Lane rather than Eldon Road, which is a
checkable error on the most basic fact about the centre.
[research/centre-facts.md](/home/user/annual_plan/chilwell-test/research/centre-facts.md)
records that contradiction. Treat everything else on such a page as similarly unchecked.
(reasoned)

**Route products and route apps.** Sell the premise that routes are knowable. Cannot be
checked against any published route, because there is no published route. Their pass rate
figures, where sibling agents used them, disagree with each other by up to 8 percentage
points, which is evidence about their general accuracy.
[research/pass-rates.md](/home/user/annual_plan/chilwell-test/research/pass-rates.md)
(reasoned)

**Road enthusiast sites.** h2g2 on Bardills is describing a road junction, not a test
route, and is probably the more reliable of the two kinds of claim for that reason: there
is no incentive to guess. Still unofficial and undated. (reasoned)

**Aggregator test centre pages.** getdriving, PassMeFast, just-drive, drivebot and the rest
repeat each other and contradict each other on basic facts such as whether the centre has
parking. `research/centre-facts.md` records those contradictions in detail. Useful for
triangulating, not for a single claim. (reasoned)

**YouTube route videos.** None found. In general, a video is a real drive, which is its
strength, and one route on one day, which is its limit. A 2026 candidate watching a 2021
video is watching a test with four stops and a different independent driving rule. (reasoned)

### 13. What the app should do with all of this

Recommendations, all (reasoned), for the app author to accept or reject.

1. **Do not draw a route.** Draw corridors, which is what `data/routes.json` already models,
   and label every corridor unofficial on the card. The CLAUDE.md brief already says the
   corridors are straight lines between junctions and not roads, and the app already says
   so. Keep that.
2. **Put the reader's attention on road types, not on sequences.** The defensible local
   claim, agreed by four publishers at the level of generality they agree on, is that
   Chilwell routes are urban and roundabout heavy with little country road. That is enough
   to tell a candidate what to practise.
3. **Make the traffic lights at the centre the first card.** If the local source is right,
   they are the only feature guaranteed to appear on every test twice.
4. **Make the bay park in the centre car park the headline manoeuvre**, with the seven bay
   layout from `centre-facts.md`, while teaching all four manoeuvres because the examiner
   chooses.
5. **Say plainly on the Map tab that no route here is official**, that DVSA does not publish
   routes, and that the roads shown are where unofficial local sources say tests tend to go.
6. **Date stamp the route claims as undated.** Every one of them is of unknown age and may
   predate the November 2025 changes.
7. **Use the DVSA quotes in the next section rather than route claims** wherever the app
   wants authority. They are primary, they are about how the route is communicated, and
   they are the reassuring part: the examiner names the exit, a wrong turn is not a fault,
   and asking for a direction to be repeated is not marked against you.

### 14. Searches to run when egress is restored

Listed so that the next pass does not have to work them out. (reasoned)

1. Open the four route pages in section 6 and record their route text verbatim:
   drivinglessonswithmartin.co.uk/451/chilwell-test-centre/, the two routebuddy.co.uk
   Chilwell pages, and ngpassdrivingacademy.co.uk.
2. Open https://audrive.net/en/office/ENG/nottingham-chilwell/routes and
   https://www.drivingtestroutes.com/driving-test-routes-in-nottingham-chilwell/ and record
   what route content, if any, they hold.
3. Search YouTube for "Chilwell driving test route", "Nottingham Chilwell test route",
   "Eldon Road test centre driving test" and "Chilwell mock test drive", and record the
   channel, the upload date and the roads named in each video's description. Reject
   anything uploaded before 24 November 2025 as describing an outdated test shape.
4. Search for the DVSA or DSA statement on withdrawing published test routes: try
   despatch.blog.gov.uk site search for "test routes", and the National Archives web
   archive for the old Driving Standards Agency site, which is where any withdrawn route
   pages would survive.
5. Open https://www.gov.uk/government/publications/independent-driving-route-diagram-example
   and see how DVSA draws a route.
6. Check on a map, or on the ground, where the traffic lights beside the test centre
   actually are, and which arm of them the exit from Eldon Business Park meets.
7. Check whether Bramcote Lane, Eskdale Drive, Inham Road and Cator Lane are roads crossed
   or shared by the tram, and where the tram has priority over traffic.
8. Search Reddit and PistonHeads for "Chilwell test centre" and "Chilwell driving test" for
   first hand candidate accounts, which are the only unofficial source type that is not
   selling something.

## Quotes worth using

**Caution on every quote below.** None was read by me on the source page. Each reached this
folder through a search engine's summary, recorded in a sibling research file. Each must be
opened and checked character by character before the app prints it as a quotation. Two are
marked as paraphrase risks. (reasoned)

### Primary sources, DVSA, on how a route is communicated

These are the ones the app should lean on, because they are official and because they are
reassuring.

1. "Throughout the drive continue ahead, unless traffic signs direct you otherwise. When I
   want you to turn left or right, I will tell you in plenty of time."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings
   (relayed, via `research/dt1-guidance.md`)

2. "At the roundabout follow the road ahead (it is the second exit)."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings
   (relayed, via `research/dt1-guidance.md`). This is the most useful single quote for a
   Chilwell candidate, because the routes are roundabout heavy and the examiner names the
   exit number out loud. (reasoned)

3. "Now I would like you to drive independently following the traffic signs for …….,
   continue to follow the signs until I tell you otherwise. Drive on when you are ready."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings
   (relayed, via `research/test-structure.md`). The gap is in the original as recorded: the
   examiner names the destination at the time.

4. "Thank you, that's the end of the independent driving. I will direct you from now on."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings
   (relayed, via `research/test-structure.md`)

5. "Independent driving is not a test of how you follow directions."
   https://readytopass.campaign.gov.uk/driving-skills/following-routes/
   (relayed, via `research/dt1-guidance.md`. DVSA campaign site, so primary.)

### Unofficial local sources, on the roads

Use these only with the publisher named on screen and the word unofficial beside them.

6. "includes many multiple lane and busy roundabouts, notably Bramcote Island, Bardills
   Roundabout and the roundabout at M1 Junction 25, as well as several quirky roads and
   junctions including roads shared with tram lines, one way roads, no entry roads and
   traffic lights with left filter arrows"
   https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/
   (relayed, unofficial, undated)

7. "The 40 minute driving test from Chilwell will primarily feature urban driving due to
   the lack of country roads within the vicinity."
   https://intensivelessons.co.uk/Practical-Test-Centres/Nottinghamshire/Nottingham-Chilwell
   (relayed, unofficial, undated. Note the 40 minutes is the appointment, not the drive.)

8. "mainly urban, with little country road nearby, and heavy on roundabouts, junctions and
   crossroads, ranging from quiet back roads to busy main streets"
   https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/
   (relayed, unofficial, undated. **Paraphrase risk**: the sibling note records this in
   quotation marks but the grammar suggests a summariser's compression. This publisher also
   states the centre's address wrongly.)

9. "one of the busiest sections, with bus lanes, bus stops, cyclists, pedestrians crossing
   between shops and frequent signal controlled junctions", of Beeston High Road.
   https://routebuddy.co.uk/nottingham-chilwell-driving-test-routes/
   (relayed, unofficial, undated)

10. "The two bays on the left are perpendicular to the other five bays and are not a good
    option for people who use the 'Three Line' method of bay parking."
    https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/
    (relayed, unofficial, undated. **Paraphrase risk**: reconstructed from the sibling
    note's prose rather than recorded there as a quotation, so treat it as a paraphrase
    until the page is opened.)

## Not found

What I looked for and could not establish. Because no search could be run and no page
could be opened, "what I searched" below means the searches the app author should run, and
the sources in this folder that I read instead.

1. **Any published turn by turn test route for Nottingham (Chilwell).** Nobody has one.
   Read: all six research files in this folder. No sibling agent found a route sequence
   either. Cannot search.

2. **The date DVSA or DSA stopped publishing test routes, and the official reason.** The
   repository asserts 2010 in `CLAUDE.md` and `docs/validation.md`, with no external
   source. Attempted: https://www.gov.uk/guidance/driving-test-routes (EGRESS_BLOCKED) and
   a Despatch blog search at https://despatch.blog.gov.uk/?s=test+routes (EGRESS_BLOCKED).

3. **DVSA's own statement about learning routes by rote.** The brief asked for it by name.
   Not found, not reconstructed, and the app must not print one. Attempted: the same two
   URLs as item 2.

4. **The order of roads on any Chilwell route.** Not found.

5. **Where the independent driving section goes from Chilwell**, and which destination is
   used for the traffic signs version. Not found. Nothing in any of the six research files
   touches this.

6. **Any street name for the parallel park or the pull up on the right at Chilwell.** Not
   found. Only the bay park has a reported location, the centre's own car park.

7. **Any YouTube video of a Chilwell test route.** None cited in this folder and none
   findable without search. No channel, no URL, no date.

8. **Any forum thread about Chilwell routes.** None cited in this folder.

9. **The layout of Bramcote Island**: number of exits, lane markings, which approach a test
   would use, whether it is signalised. Not found. The only description of any local
   roundabout is h2g2 on Bardills.

10. **Whether the roundabout at M1 Junction 25 is realistically reachable and returnable
    within a 35 minute drive from Eldon Road.** Not established. No source gives a distance
    or a driving time from the centre to that junction.

11. **Where exactly the traffic lights beside the test centre are**, and which arm the
    business park exit meets. Not established. This is the highest value unknown in this
    file, because those lights are on every route twice.

12. **Whether any of the route claims in section 6 postdates 24 November 2025.** No
    publication date was established for any of the four route publishers.

13. **Whether the A6005 dual carriageway section near the centre is actually on test
    routes**, as distinct from being a road in the area. RouteBuddy names it, no second
    source confirms it.

14. **Which roads in Chilwell are shared with the tram, and where tram priority applies.**
    Named as a feature of the area by one instructor with no locations. The tram stop names
    give candidates for the roads but no source puts a test on them.

15. **Whether the content of routebuddy.co.uk, drivingtestroutes.com or audrive.net
    contains actual route sequences.** Unknown, pages blocked.

## Sources

**URLs I opened in this session: none.** Every fetch was refused by the organisation's
egress proxy and the web search budget was exhausted before I began. The list below is the
evidence chain, not a list of pages I read.

### Attempted by me in this session and blocked

1. https://www.gov.uk/guidance/driving-test-routes
   EGRESS_BLOCKED. Would have settled the official position on published routes.
2. https://despatch.blog.gov.uk/?s=test+routes
   EGRESS_BLOCKED. DVSA blog search, would have given the rote learning statement if it
   exists there.
3. https://www.drivingtestsuccess.com/blog/driving-test-routes
   EGRESS_BLOCKED. Unofficial, probed to test whether the block was gov.uk specific.
4. https://en.wikipedia.org/wiki/Chilwell
   EGRESS_BLOCKED. Would have given the local road network.
5. https://routebuddy.co.uk/chilwell-driving-test-routes/
   EGRESS_BLOCKED. The route page most worth opening.
6. https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/
   EGRESS_BLOCKED. The richest local instructor source.
7. https://www.drivingtestroutes.com/driving-test-routes-in-nottingham-chilwell/
   EGRESS_BLOCKED. A route product's Chilwell page.

Two WebSearch calls were also made, at the start and again later to confirm the state was
final. Both returned the budget exhausted message and performed no search.

### Inherited evidence chain: URLs carrying route relevant claims

None of these was opened by me. The sibling research files record that they were not opened
by their authors either, and reached them as search engine summaries. Treat all as second
hand.

8. https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/
   Unofficial, local ADI, undated. The destinations from the traffic lights at the centre,
   Bramcote Island, Bardills, M1 Junction 25, tram shared roads, one way and no entry roads,
   left filter arrows, the seven bay car park layout, the Village Hotel landmark, and the
   statement that DVSA routes are updated and not published.
9. https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/
   Unofficial, Nottingham driving school, undated. Routes urban and roundabout heavy, bay
   park likely at the start or the end. Also states the centre's address wrongly as Cator
   Lane, which is contradicted by every other source.
10. https://routebuddy.co.uk/chilwell-driving-test-routes/
    Unofficial, undated. A6005 Bye Pass Road, dual carriageway driving and merging.
11. https://routebuddy.co.uk/nottingham-chilwell-driving-test-routes/
    Unofficial, undated. Beeston High Road, bus lanes, cyclists, signal controlled
    junctions, and the word "sections", which suggests more route detail on the page.
12. https://intensivelessons.co.uk/Practical-Test-Centres/Nottinghamshire/Nottingham-Chilwell
    Unofficial, undated. Chilwell tests primarily urban due to lack of country roads.
13. https://h2g2.com/edited_entry/A425927
    Unofficial, undated. Bardills Island layout, the inner slip road, the third lane on the
    approach, and traffic lights on the roundabout.
14. https://www.jctconsultancy.co.uk/Home/docs/jctSymp_bardillsCuttingCorners.pdf
    Traffic engineering conference paper, undated figures. Queue lengths on three of the
    four Bardills approaches.
15. https://www.logicor.eu/en/uk/properties/nottinghamshire-eldon-business-park-nottingham/nottinghamshire-eldon-road-trading-estate-nottingham
    Unofficial but the landlord's own description. Eldon Business Park on the A6005
    Nottingham Road between Nottingham and Long Eaton, adjacent to Chilwell Retail Park,
    easy access to M1 Junction 25.
16. https://www.getdriving.co.uk/test-centre/nottingham-chilwell
    Unofficial aggregator. The centre is beside the A6005 and five minutes from the A52.
17. https://www.passmefast.co.uk/test-centres/practical/nottinghamshire/nottingham-chilwell
    Unofficial aggregator. Neighbours EvoEnergy, Sheetfabs and NK Motors, easy access due to
    the A6005.
18. https://examroutes.co.uk/27239/driving-test-centre-car-parks-2026/
    Unofficial, 2026. Reverse bay parking is normally only set at a test centre car park.
19. https://getoccupi.com/malls/chilwell-retail-park
    Unofficial. Chilwell Retail Park on Barton Lane just off the A6005, and its occupiers.
20. https://shopsnearme.com/location/nottingham-chilwell-retail-park/
    Unofficial. Same, corroborating the Barton Lane location.
21. https://www.village-hotels.co.uk/nottingham
    The hotel's own site. Brailsford Way, Chilwell, NG9 6DL.
22. https://en.wikipedia.org/wiki/Eskdale_Drive_tram_stop
23. https://en.wikipedia.org/wiki/Inham_Road_tram_stop
24. https://en.wikipedia.org/wiki/Bramcote_Lane_tram_stop
25. https://en.wikipedia.org/wiki/Toton_Lane_tram_stop
    All four: NET Line 1 stops in the Chilwell and Toton corridor, the source of the
    candidate road names for the tram shared sections.
26. https://en.wikipedia.org/wiki/List_of_road_junctions_in_the_United_Kingdom:_B
    Bardills roundabout joins the A52 Brian Clough Way to the B6003 at Stapleford.
27. https://nationalhighways.co.uk/our-roads/east-midlands/a52-nottingham-junctions/
    Primary source. National Highways A52 Nottingham junctions improvement programme, which
    means the A52 junction layouts may be changing.

### Inherited evidence chain: DVSA primary sources bearing on routes

28. https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/
    The 24 November 2025 changes: 4 stops to 3, emergency stop 1 in 3 to 1 in 7,
    independent driving flexible and able to run the full test, and the statement about
    examiners building routes reaching more high speed and higher risk roads where location
    allows. **The most important unopened document for this topic.**
29. https://www.gov.uk/driving-test/what-happens-during-test
    Independent driving 20 to 35 minutes, examiner supplies and sets up the sat nav, a wrong
    turning is not a fault.
30. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings
    The examiner's directions wordings, including the roundabout exit wording and the
    independent driving start and end wordings.
31. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test
    Asking for a direction to be repeated is not a prompt.
32. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/01-the-practical-driving-test-and-extended-test-for-cars
    The test measured from signing the declaration to switching off the engine.
33. https://readytopass.campaign.gov.uk/driving-skills/following-routes/
    DVSA campaign site. Independent driving is not a test of how you follow directions, and
    going off route is not in itself a fault.
34. https://www.gov.uk/government/publications/independent-driving-route-diagram-example
    The only route shaped document DVSA publishes.
35. https://despatch.blog.gov.uk/2017/07/06/making-the-driving-test-more-reflective-of-real-life-driving/
    The 2017 introduction of sat nav independent driving, the TomTom Start 52, and the 1 in
    5 traffic signs split.

### Route products with Chilwell pages, content unknown

36. https://audrive.net/en/office/ENG/nottingham-chilwell/routes
    A routes page by URL. Used by a sibling agent only for a 44 per cent pass rate.
37. https://www.drivingtestroutes.com/driving-test-routes-in-nottingham-chilwell/
    Used by sibling agents only for pass rates, 44.2 per cent for 2024/25 and a rank of 226
    of 270 centres.
38. https://www.drivingtesttips.biz/driving-test-centres/chilwell-driving-test-centre.html
    Attempted by a sibling agent, EGRESS_BLOCKED.
39. https://passdrivingtest.co.uk/nottingham-chilwell-driving-test-centre/NThiLSpF
    Used by a sibling agent for pass rates only.
40. https://drivebot.co.uk/test-centres/nottingham-chilwell
    Used by a sibling agent for pass rates and rescheduling rules only.
41. https://just-drive.co.uk/test-centres/nottingham-chilwell/
    Used by a sibling agent for pass rates and facilities only.

### Files in this repository that I did read

42. /home/user/annual_plan/chilwell-test/CLAUDE.md
    The project brief, the house style, and the assertion that DVSA stopped publishing test
    routes in 2010.
43. /home/user/annual_plan/chilwell-test/docs/validation.md
    The validation record, the egress limitation, and the note that the map's route
    corridors are straight lines between junctions and not roads.
44. /home/user/annual_plan/chilwell-test/research/centre-facts.md
    The address, the car park, the A6005 relationship, the destinations from the traffic
    lights, the local landmarks, the tram stops, Bardills, and the Cator Lane contradiction.
45. /home/user/annual_plan/chilwell-test/research/common-faults.md
    The local hazards list in quotation marks, the mapping of those hazards onto the
    national top ten faults, and the unofficial source list numbered 41 to 46.
46. /home/user/annual_plan/chilwell-test/research/test-structure.md
    The 24 November 2025 changes, the independent driving section in detail, the examiner
    wordings, and the return to the test centre.
47. /home/user/annual_plan/chilwell-test/research/dt1-guidance.md
    The DT1 material, the roundabout exit wording, the point that asking for a direction to
    be repeated is not a prompt, and the provenance labelling convention this file follows.
48. /home/user/annual_plan/chilwell-test/research/pass-rates.md
    Used only to judge the reliability of the route product sites, which disagree with each
    other on Chilwell pass rates by up to 8 percentage points.
49. /home/user/annual_plan/chilwell-test/data/routes.json
    The current state of the app's route data, which is a stub and awaits this file.
