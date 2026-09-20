# The road network around Chilwell that a test would use

## Summary

This note could not be researched the way the brief asked. The session's web search
budget was already spent by earlier research passes (200 of 200 calls used) and the
network egress proxy blocked the page fetching tool for every domain tried, including
gov.uk, nottinghamshire.gov.uk, thetram.net, openstreetmap.org, despatch.blog.gov.uk
and en.wikipedia.org. So no council speed limit map, no mapping source and no DVSA page
was opened or searched for this topic. Nothing below is confirmed from a source read in
this session.

What this note does contain is three separable things, labelled so the app author can
tell them apart. First, the local road material that already exists in this repository
in research/centre-facts.md and research/common-faults.md, carried across with its
original URLs and its original caveat that those pages were found by search but never
opened. Second, background knowledge of the Chilwell, Beeston and Toton road network
held by the model writing this, labelled unverified and given a confidence marker,
because an app written from nothing would be worse than an app written from this and
told to check it. Third, reasoning from the Highway Code and from ordinary driving test
practice about what each kind of road loads onto the marking sheet, which is sound
independently of the local detail.

The headline points that do rest on real sources, all of them unofficial driving school
or enthusiast pages cited in this repository rather than opened: the test centre sits on
Eldon Road in Eldon Business Park just off the A6005 Nottingham Road next to Chilwell
Retail Park; routes from the centre run either west and south towards Toton, Stapleford,
Sandiacre, Long Eaton and Risley, or east and north towards Attenborough, Beeston,
Bramcote, Dunkirk, Lenton and Wollaton; the named hard features of the test area are
Bramcote Island, Bardills roundabout and the M1 Junction 25 roundabout, plus roads shared
with tram lines, one way roads, no entry roads and traffic lights with left filter
arrows; Bardills has an inner slip road linking A52 Derby traffic to the B6003 for Toton
and Long Eaton, a third lane on the approach and a set of traffic lights on the
roundabout; the A6005 Bye Pass Road towards Long Eaton gives dual carriageway driving and
merging; and Beeston High Road is one of the busiest sections, with bus lanes, bus stops,
cyclists and frequent signal controlled junctions.

Not one speed limit in this document has been confirmed against a council or mapping
source. Every speed figure here, including the 40 mph already sitting in data/junctions.json
for Bardills, must be treated as unverified and checked before the app shows it. Telling a
learner the wrong limit is worse than telling them nothing, so the recommendation is that
the app states the Highway Code default rule (street lighting means 30 mph unless signs
say otherwise) and marks individual road limits as unconfirmed until someone drives or
looks them up.

## Findings

### Status of this note, and what was actually attempted

The brief asked for WebSearch and WebFetch against primary sources. Both were
unavailable.

WebSearch returned, on the first call: "Web search was not performed: this session has
used its web search budget (200 of 200 WebSearch calls)." No search was run for this
topic at all. (observed in this session)

WebFetch returned an EGRESS_BLOCKED error for every domain tried. The domains tried and
blocked were www.gov.uk, en.wikipedia.org, www.nottinghamshire.gov.uk, www.thetram.net,
www.openstreetmap.org and despatch.blog.gov.uk. (observed in this session)

An attempt to read the proxy status endpoint and the proxy README, to find out whether
any domain was permitted, was refused by the permission system. (observed in this
session)

This matches, and is worse than, the limitation already recorded for the whole project
in docs/validation.md, which says the earlier passes had search working but page fetching
blocked. This pass had neither. (repo, docs/validation.md)

### How to read the labels in this file

- (repo, centre-facts.md) or (repo, common-faults.md): the claim and its URL were already
  in this repository, gathered by an earlier pass from a search result summary. The page
  was not opened by that pass either. Treat as unofficial and unconfirmed.
- (unverified, background knowledge, confidence high / medium / low): the model's own
  recollection of the area, with no source. High means it would be surprising if this
  were wrong. Low means it is a guess and should be deleted rather than shown if nobody
  can check it.
- (reasoned): an inference, either from the geography or from general driving test and
  Highway Code principles. Sound as reasoning, not as a fact about a particular road.
- (not found): looked for, not established, with what would settle it.

### The test centre and the roads immediately around it

The centre is Unit 24, Eldon Business Park, Eldon Road, NG9 6DZ, reached from the A6005
Nottingham Road. The access road off Eldon Road is shared with other businesses.
(repo, centre-facts.md, from
https://www.passmefast.co.uk/test-centres/practical/nottinghamshire/nottingham-chilwell
and
https://www.logicor.eu/en/uk/properties/nottinghamshire-eldon-business-park-nottingham/nottinghamshire-eldon-road-trading-estate-nottingham)

Eldon Business Park is on the A6005 Nottingham Road, which runs between Nottingham and
Long Eaton, and is adjacent to Chilwell Retail Park.
(repo, centre-facts.md, from Logicor, unofficial but the landlord)

Routes leave "from the traffic lights at the test centre", which implies the junction
where the estate road or Eldon Road meets the A6005 is signal controlled rather than a
give way.
(repo, centre-facts.md, from
https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/, unofficial)

Reading that the other way: the first thing a candidate does after pulling out of the
test centre is emerge from a business estate onto a main A road at a set of lights,
usually turning either left towards Long Eaton and Toton or right towards Beeston and
Nottingham. That is a cold start on the busiest road of the test, within a minute of
moving off, with the examiner watching the move off and the first observation. It is
worth practising in both directions repeatedly. (reasoned)

Chilwell Retail Park is on Barton Lane, Chilwell, just off the A6005 Nottingham Road.
(repo, centre-facts.md)

Eldon Road and the estate roads are industrial estate roads: wide, lightly trafficked
outside working hours, with lorries, kerbed bays and van traffic. Estate roads of this
kind are typically 30 mph by virtue of street lighting, though many such estates are
signed 20 mph. (unverified, background knowledge, confidence low. This is a general
pattern, not a statement about Eldon Road.)

An MOT garage called Chilwell MOT Centre sits on Chetwynd Road, Chilwell, NG9 5GE, and
is the address most easily confused with the test centre. The app should warn the user
not to drive to Chetwynd Road.
(repo, centre-facts.md)

### The A6005 corridor

The A6005 is the spine of the whole test area. Along its length, from Nottingham towards
Long Eaton, the recalled sequence of street names is University Boulevard (Dunkirk to
Beeston), Queens Road (Beeston), Chilwell Road, High Road (Chilwell), Nottingham Road
(Chilwell, where the test centre is), then Bye Pass Road towards Long Eaton and Sawley.
(unverified, background knowledge, confidence medium. The Nottingham Road and Bye Pass
Road elements are corroborated by the repo's sources; the ordering of Queens Road,
Chilwell Road and High Road is recollection only.)

Bye Pass Road (A6005) is a major route connecting Beeston and Long Eaton, with dual
carriageway driving and merging.
(repo, centre-facts.md and common-faults.md, from
https://routebuddy.co.uk/chilwell-driving-test-routes/, unofficial)

The High Road through Beeston town centre is described as one of the busiest sections,
with bus lanes, bus stops, cyclists, pedestrians crossing between shops and frequent
signal controlled junctions.
(repo, centre-facts.md and common-faults.md, from
https://routebuddy.co.uk/nottingham-chilwell-driving-test-routes/, unofficial)

The A6005 dual carriageway loads positioning, specifically the fault of unnecessary right
hand lane use, and it loads merging and use of speed.
(repo, common-faults.md)

What the corridor asks of a candidate, taking the above together: lane discipline and
returning to the left lane on the dual carriageway section; clearance to parked cars, bus
stops and cyclists on the built up section; anticipation at repeated sets of lights;
correct reaction to bus lanes; and judgement of speed changing between a fast dual
carriageway and a shopping street. (reasoned)

The transition points, where the road changes character from dual carriageway to town
street and back, are where speed faults cluster, because a candidate carries the speed of
the last section into the next one. (reasoned)

### Bardills roundabout and the A52 Brian Clough Way

Bardills roundabout joins the A52 Brian Clough Way to the B6003 at Stapleford, and is
named after the Bardills Garden Centre that accesses it.
(repo, centre-facts.md, from https://h2g2.com/edited_entry/A425927 and Wikipedia's list
of road junctions, unofficial)

"Bardills Island is a roundabout with an inner slip road in the centre that links traffic
from the A52 (Derby) to the B6003 (Toton/Long Eaton), to cut out the congestion of the
A52 (Nottingham) junction." A third lane appears on the approach, as does a set of
traffic lights on the large roundabout.
(repo, centre-facts.md, from https://h2g2.com/edited_entry/A425927, unofficial)

Three of the four approaches into this priority roundabout suffer significant queue and
delay problems throughout the peak periods, with queues in excess of 300 and 200 vehicles
commonly recorded in the morning and evening peaks on the A52 eastbound and Stapleford
Lane respectively.
(repo, centre-facts.md, from
https://www.jctconsultancy.co.uk/Home/docs/jctSymp_bardillsCuttingCorners.pdf, a traffic
engineering conference paper, figures undated in what that pass saw)

National Highways runs an A52 Nottingham junctions improvement programme covering
junctions on this corridor, so the layout may have changed or may be under works.
(repo, centre-facts.md, from
https://nationalhighways.co.uk/our-roads/east-midlands/a52-nottingham-junctions/,
primary source, not opened)

The layout description matters more than it looks. A roundabout with an inner slip road,
a third lane appearing on approach, and signals on the roundabout itself is three separate
demands at once: pick the right lane before the lane gains appear, read signals that are
not where a learner expects them, and hold a lane round a large island. This is the single
hardest feature named for this test area and deserves its own card in the app.
(reasoned)

The A52 here is dual carriageway. The speed limit on the A52 Brian Clough Way between
M1 Junction 25 and Nottingham is not established by this note. Dual carriageways carry a
national speed limit of 70 mph for cars unless signed lower, and stretches of the A52 in
this area have carried lower limits, commonly 50 mph, at various times.
(unverified, background knowledge, confidence low on the specific figure. This must be
checked. See Not found.)

If the test uses the A52 at all it will be for a short dual carriageway section with slip
road joins and exits, which on the marking sheet is about use of speed, mirrors, signalling,
joining safely at the speed of the traffic already there, and moving back left after
overtaking. (reasoned)

Whether a Chilwell test actually goes onto the A52 is not settled. One source says the
test is "primarily urban driving due to the lack of country roads within the vicinity",
which suggests the fast roads used are the A6005 dual carriageway and possibly the A52,
rather than rural national speed limit roads.
(repo, centre-facts.md, from
https://intensivelessons.co.uk/Practical-Test-Centres/Nottinghamshire/Nottingham-Chilwell,
unofficial)

The M1 Junction 25 roundabout is named as one of the multi lane busy roundabouts in the
test area.
(repo, centre-facts.md and common-faults.md, from Driving Lessons with Martin, unofficial)

Junction 25 is where the A52 meets the M1, with the A6005 and Sandiacre nearby. A
motorway junction roundabout means heavy goods traffic, multiple lanes, spiral or
concentric lane markings and traffic arriving fast off the slip roads. Learner drivers are
not tested on the motorway itself on the practical test, so the roundabout rather than the
motorway is the feature. (reasoned)

### Swiney Way, Chetwynd Road and the business park roads

Swiney Way is in Toton and carries a large Tesco Extra, listed by Tesco as Nottingham
Toton Extra, Swiney Way, Toton.
(repo, centre-facts.md, from
https://www.tesco.com/store-locator/nottingham/swiney-way-toton, primary for the store)

A supermarket of that size on a road means a busy signal controlled or roundabout access,
a service road, delivery lorries, and a large car park that instructors use for bay
parking practice out of hours. (reasoned)

Swiney Way is recalled as a distributor road through Toton, linking the Toton and
Chetwynd area towards Stapleford Lane and the Long Eaton direction, rather than a road
that meets the A52 directly.
(unverified, background knowledge, confidence low)

Warning about the existing app data. The stub in data/junctions.json currently records
Bardills roundabout with "where": "A52 at Swiney Way". The repository's own sourced
material describes Bardills as the junction of the A52 Brian Clough Way with the B6003 at
Stapleford. Those two descriptions do not obviously agree. Before the app ships, the arms
of Bardills roundabout must be established from a map and the "where" field corrected.
(reasoned, flagging a probable error in existing data)

Chetwynd Road, Chilwell, runs by the former Chetwynd Barracks site and carries Chilwell
MOT Centre at NG9 5GE.
(repo, centre-facts.md)

Chetwynd Barracks is a British Army installation at Chilwell, and the site is the subject
of a Broxtowe Borough Council neighbourhood plan and a Nottinghamshire County Council
strategic masterplan for Toton and Chetwynd Barracks, so this area is under
redevelopment and the road layout may change.
(repo, centre-facts.md, from
https://www.broxtowe.gov.uk/media/9603/chetwynd-the-toton-and-chilwell-neighbourhood-plan.pdf
and https://consult.nottinghamshire.gov.uk/planning/toton-and-chetwynd-barracks-plans,
both primary, neither opened)

For the app this matters in a practical way: a development site means temporary traffic
lights, road closures, mud on the road and changed priorities, none of which the app can
predict. The app should tell the user to drive the area in the week before the test rather
than rely on a static description. (reasoned)

Business park and industrial estate roads in this area, Eldon Business Park included, are
the natural place for a test to set a manoeuvre, because they are wide, quiet and have
long kerbs. Examiners at many centres use the roads immediately around the centre for the
pull up on the right and the reverse park. (reasoned, and consistent with the centre's
own setting, but no source names a specific manoeuvre street for Chilwell)

### Inham Nook and the Inham Road area

Inham Road has a tram stop on NET Line 1, opened 25 August 2015 with the rest of phase
two, and sits between Eskdale Drive and Toton Lane on the run towards the terminus.
(repo, centre-facts.md, from https://en.wikipedia.org/wiki/Inham_Road_tram_stop,
unofficial encyclopaedia, not opened)

Inham Nook is a residential estate in Chilwell off Inham Road, with a recreation ground.
Estate roads of this type are narrow, lined with parked cars on both sides, and have
frequent junctions and parked car obstructions requiring give and take.
(unverified, background knowledge, confidence medium on the estate existing and its
character, low on any detail)

Roads with parked cars on both sides are where the marking items for meeting traffic,
clearance to obstructions and forward planning are decided. A candidate who does not hold
back at a gap, or who squeezes through without clearance, loses marks here rather than on
the main road. (reasoned)

If the tram runs along or across Inham Road, the junction of Inham Road with the High
Road corridor will involve tram tracks, tram signals and possibly a restricted turn. This
is not established. (reasoned, flagged for checking)

### Beeston town centre, the one way system, bus lanes and the tram

The High Road through Beeston town centre is one of the busiest sections of the test
area, with bus lanes, bus stops, cyclists, pedestrians crossing between shops and
frequent signal controlled junctions.
(repo, centre-facts.md and common-faults.md, from routebuddy.co.uk, unofficial)

Beeston High Road loads clearance and obstructions, pedestrian crossings, and use of
speed in a busy shopping street.
(repo, common-faults.md)

Beeston town centre is recalled as having a one way circulation for general traffic
around the central shopping streets, with the tram running through the centre on street
and with sections of High Road restricted or pedestrianised. Streets recalled as part of
that circulation include Station Road, Styring Street, Wollaton Road, Chilwell Road and
Middle Street.
(unverified, background knowledge, confidence low. The existence of a one way system is
medium confidence; the street names in it are low and should not be printed in the app
without checking.)

The test area includes one way roads, no entry roads and traffic lights with left filter
arrows.
(repo, centre-facts.md and common-faults.md, from Driving Lessons with Martin,
unofficial)

Left filter arrows are worth a note of their own. A green left filter arrow means you may
go left even when the main signal is red, but only if the way is clear, and a candidate
who sits at a green filter holding up traffic loses a mark for undue hesitation, while a
candidate who takes it without looking for pedestrians on the crossing risks worse.
(reasoned, from Highway Code signal rules)

Bus lanes are the other Beeston specific risk. A bus lane in operation must not be
entered by a car. Driving in a bus lane during its hours of operation is both a marking
sheet fault and a traffic offence, and the hours are on a sign at the entry to the lane.
Outside those hours the lane may be used. Candidates lose marks both ways: by using a
live bus lane, and by refusing to use a lane that is not in operation and so sitting in a
queue unnecessarily. (reasoned, from Highway Code rule 141)

The specific bus lanes on Beeston High Road, their locations, their direction and their
hours of operation are not established. This is a high value item to verify, because it
is exactly the kind of local knowledge an app can supply and a national source cannot.
(not found)

### The tram, and where it meets the road

NET Line 1 runs through the Chilwell and Toton corridor. Stops in order towards the
terminus include Bramcote Lane, Eskdale Drive, Inham Road and Toton Lane.
(repo, centre-facts.md, from the Wikipedia pages for Eskdale Drive, Inham Road, Bramcote
Lane and Toton Lane tram stops, not opened)

Eskdale Drive and Inham Road both opened on 25 August 2015 with the rest of phase two.
(repo, centre-facts.md)

Trams run at frequencies varying between 4 and 8 trams per hour depending on the day and
time.
(repo, centre-facts.md, from the Inham Road tram stop page)

The test area includes roads shared with tram lines.
(repo, centre-facts.md and common-faults.md, from Driving Lessons with Martin,
unofficial)

Roads shared with tram lines load positioning during normal driving, because the correct
position is dictated by the rails and by tram priority rather than by instinct.
(repo, common-faults.md)

What a candidate must actually do around trams, from the Highway Code. Trams have
priority. Do not drive on a tram reserved section marked by white line, yellow dotted
lines or a different road surface. Take extra care where the track crosses the road,
especially at a shallow angle, because rails are slippery when wet and can catch a
motorcycle or a bicycle wheel. Give way at tram signals, which are white bar signals and
not the same as ordinary traffic lights. Do not park where you would block a tram. Watch
for passengers getting on and off where there is no separate platform.
(reasoned, from Highway Code rules 300 to 307. The rule numbers are from memory and
should be checked on GOV.UK before the app quotes them.)

The tram is the feature of this test area a candidate from outside Nottingham will never
have met. If there is one thing to practise deliberately before a Chilwell test, it is
driving the High Road corridor where the tram runs, at the same time of day as the test.
(reasoned)

The data/junctions.json stub already has a "High Road tram crossing" entry at 52.9195,
-1.2205 marked approximate, with a 30 mph speed. Neither the coordinate nor the speed has
a source. (repo, data/junctions.json)

### Queens Road and Station Road, Beeston

Queens Road, Beeston, is recalled as part of the A6005 through Beeston, and Station Road
as the road serving Beeston railway station. There is also a Queens Road West and a
Queens Road East in the Chilwell and Beeston area, which are different roads from the
A6005 Queens Road, and the names are easily confused.
(unverified, background knowledge, confidence low. Do not print street by street detail
from this paragraph without checking a map.)

Beeston railway station sits south of the town centre on the Midland Main Line corridor
that also serves Attenborough.
(unverified, background knowledge, confidence medium)

A road serving a railway station brings station approach traffic, taxis, drop off
stopping, a bus interchange and pedestrians crossing without looking. If the test passes a
station it is a good place for the examiner to set a pull up on the left, because there
is a reason to judge a safe and convenient place to stop. (reasoned)

### Attenborough and Chilwell Lane

Attenborough railway station lies on a spur of the Midland Main Line and is about 1.1 km
from the Eldon Road postcode.
(repo, centre-facts.md, from
https://en.wikipedia.org/wiki/Attenborough_railway_station and postcode data, not opened)

Attenborough Nature Reserve is close to the business park.
(repo, centre-facts.md, from Logicor)

Attenborough is a village south of the A6005 on the floodplain of the River Trent,
reached from the A6005 by Attenborough Lane, with the nature reserve and its car park
beyond. Roads down into the village are narrower, residential, and end in the reserve
rather than going anywhere, so through traffic is light.
(unverified, background knowledge, confidence medium)

Chilwell Lane is recalled as being in Bramcote rather than Chilwell, running between
Bramcote and the Chilwell High Road corridor.
(unverified, background knowledge, confidence low)

A quiet village approach that does not lead anywhere is a very likely place for a
manoeuvre and for the independent driving section, because it is calm enough to set a
reverse and has few enough signs to make following directions the real test. (reasoned)

Whether there is a level crossing on any of the roads into Attenborough, or near Beeston
station, is not established. This matters, because the marking sheet and DT1 treat level
crossings as their own hazard and the app's Roads tab should either show one or say there
is none. (not found)

### Toton, Stapleford, Sandiacre and Long Eaton approaches

Routes from the test centre go towards Long Eaton, Breaston, Toton, Stapleford, Sandiacre
and Risley, or towards Attenborough, Beeston, Bramcote, Dunkirk, Lenton and Wollaton.
(repo, centre-facts.md, from Driving Lessons with Martin, unofficial)

Chilwell is described as the natural test centre for Beeston, Chilwell, Toton, Stapleford
and Long Eaton learners.
(repo, centre-facts.md, from
https://www.goroadie.com/guides/learners/nottingham/driving-test-centres-in-nottingham
and https://lessonplus.co.uk/chilwell-and-colwick-driving-test-centres-uk/, unofficial)

Toton Lane carries the tram terminus and park and ride, at NG9 7JA, with free parking for
tram ticket holders and eight electric vehicle charging points, and parking restricted to
tram passengers.
(repo, centre-facts.md, from https://www.thetram.net/park-and-ride and
https://support.thetram.net/support/solutions/articles/15000057252-my-tram-stop-toton-lane,
primary sources, not opened)

A park and ride site on a test route means a large signal controlled or roundabout
access, buses, and a steady flow of cars turning across traffic at the times of day when
commuters arrive and leave. (reasoned)

Stapleford is reached from Bardills via the B6003 and Stapleford Lane, which the traffic
study names as one of the congested approaches to Bardills.
(repo, centre-facts.md, from the JCT Consultancy paper)

Long Eaton is reached along the A6005 Bye Pass Road, the dual carriageway section.
(repo, centre-facts.md, from routebuddy.co.uk, unofficial)

Sandiacre and Risley lie west towards the M1 and the Derbyshire boundary. Sandiacre sits
by M1 Junction 25 and the A52.
(unverified, background knowledge, confidence medium)

The practical consequence of this geography is that the test area is bounded by the River
Trent and the railway to the south, the M1 to the west, the A52 to the north and
Nottingham to the east. Within that box the roads are suburban and busy. There are very
few national speed limit single carriageway country roads, which is why one source
describes the test as primarily urban. A candidate who has only practised on fast open
roads is the wrong way round for this centre. (reasoned)

### Bramcote, Coventry Lane and Bramcote Island

Bramcote Island is named as one of the multiple lane and busy roundabouts of the test
area, alongside Bardills and M1 Junction 25.
(repo, centre-facts.md and common-faults.md, from Driving Lessons with Martin,
unofficial)

Bramcote Island is recalled as being on the A52 at Bramcote, where the A52 meets the
roads towards Ilkeston and Nottingham, near the Sherwin Arms. The trentbarton i4 route is
recorded in this repository as running via The Nurseryman, Bramcote (Sherwin Arms) and
Stapleford, which places the Sherwin Arms on a main route through Bramcote.
(repo, centre-facts.md for the bus route, from
https://bustimes.org/services/i4-nottingham-stapleford-sandiacre-derby; the location of
Bramcote Island is unverified background knowledge, confidence low)

Coventry Lane, Bramcote, is recalled as running north from the Bramcote area across or
towards the A52, with a more open and undulating character than the suburban roads to the
south, and with Bramcote Hills nearby.
(unverified, background knowledge, confidence low)

Bramcote and Stapleford sit on higher ground than Beeston, Chilwell and Attenborough,
which are on or near the Trent floodplain. So the gradients, and therefore the hill
starts, are to the north and west of the A52 corridor rather than near the test centre.
(unverified, background knowledge, confidence medium)

### Residential estates suitable for manoeuvres

No source consulted for this note names a street where a Chilwell examiner sets a
manoeuvre, and DVSA does not publish routes. Anything the app says about manoeuvre
streets must be presented as likely rather than known. (reasoned)

DVSA stopped publishing test routes in 2010, and test routes are updated from time to
time and are not published.
(repo, centre-facts.md and docs/validation.md, the latter from Driving Lessons with
Martin, unofficial, and matching DVSA's long standing position)

What an examiner needs for each manoeuvre, which is what to look for when choosing
practice streets. (reasoned, from the manoeuvre requirements)

- Pull up on the right, reverse two car lengths, rejoin: a straight, reasonably quiet road
  wide enough that stopping on the right does not block it, with a clear view both ways.
- Reverse park at the kerb: a real gap behind a parked car on a street with a run of
  parked cars, not a car park.
- Reverse park in a bay: a car park, or the test centre's own bays, which at Chilwell are
  seven in number, unequally sized, with two of them contained by a kerb.
- Forward park in a bay and reverse out: the same car park.
- Emergency stop: a straight road clear of traffic behind, which the examiner chooses.

The test centre's own bays are recorded as seven, five directly opposite the entrance on
the right as you drive in and two more on the left, the two on their own contained by a
kerb so that parking must be very accurate, and the widest bay almost ten per cent wider
than the narrowest.
(repo, centre-facts.md, from Driving Lessons with Martin, unofficial)

Candidate estates for manoeuvre practice, on character rather than on any source: the
Inham Nook estate off Inham Road; the residential streets between the A6005 and the
railway at Chilwell and Attenborough; the estate roads of Eldon Business Park and the
neighbouring industrial estate, out of working hours; and the Chilwell Retail Park and
Toton Tesco car parks for bay parking. All of these are inferences from the kind of place
they are, not from any source that says an examiner uses them.
(reasoned)

Practical caution for the app: practising a manoeuvre outside somebody's house, repeatedly,
annoys residents and can draw complaints. Vary the street, do not block driveways, and do
not practise in the test centre car park while tests are running. (reasoned)

### Speed limits, and what is honestly established

Nothing. No speed limit on any road in this note has been confirmed against
Nottinghamshire County Council, Broxtowe Borough Council, a Traffic Regulation Order or a
mapping source, because no source could be reached. (observed in this session)

That includes the two figures already sitting in the repository's stub data, 40 mph for
Bardills roundabout and 30 mph for the High Road tram crossing, both of which are marked
in the data as "(reasoned)" and neither of which should be shown to a user as fact.
(repo, data/junctions.json)

The rules the app can safely state, because they are national and not local. A road with
street lighting is subject to a 30 mph limit unless signs show otherwise. A single
carriageway road without street lighting and without repeater signs is national speed
limit, 60 mph for a car. A dual carriageway without a lower signed limit is 70 mph for a
car. Repeater signs confirm a limit other than 30 within a lit area. A 20 mph zone is
signed at entry and usually has traffic calming, and 20 mph limits are signed with
repeaters.
(reasoned, from Highway Code rule 124 and the speed limit signing rules. The rule number
is from memory. Check on GOV.UK before printing it.)

On 20 mph zones specifically, the brief asked for every one that could be confirmed. None
could be confirmed. What is reasonable to expect, and must be checked: Nottingham City
Council has rolled out 20 mph widely across the city, but Chilwell, Beeston, Toton and
Stapleford are in Broxtowe and are the responsibility of Nottinghamshire County Council
as highway authority, whose 20 mph coverage is patchier and tends to be concentrated
around schools and in town centres. Beeston town centre and the streets around schools
are the places most likely to be 20 mph.
(unverified, background knowledge, confidence medium on the authorities, low on the
coverage. See Not found for exactly what to look up.)

The honest thing for the app to do is to show, for each road card, either a limit with a
source, or the words "limit not confirmed, read the signs", and to teach the candidate the
default rules so they can work it out from the street furniture. A driving test is passed
by reading the signs on the day, not by memorising a list. (reasoned)

### Schools

Schools matter for two reasons: 20 mph limits and part time 20 mph signs around them, and
the pedestrian risk at the start and end of the school day, which is also when many tests
are booked.
(reasoned)

Schools recalled in the area include Chilwell School, Alderman White School in Bramcote,
Bramcote College and College House Junior School in Chilwell. These names are recollection
only and at least one may be out of date, because several Nottinghamshire secondary
schools have merged or been renamed in recent years.
(unverified, background knowledge, confidence low. Do not print these names without
checking.)

The app should tell the user to check the time of their test against local school start
and finish times, roughly 08:30 to 09:00 and 15:00 to 15:30 on weekdays in term time, and
to practise the route at that time if the test falls then.
(reasoned)

### Level crossings, hill starts and other single features

Level crossings: not established. The railway through Attenborough and Beeston runs close
to and roughly parallel with the A6005 to its south, so any crossing would be on a road
running south from the A6005 towards the river. Whether any such road carries a level
crossing rather than a bridge is not known.
(not found)

Hill starts: the ground rises north and west towards Bramcote and Stapleford, and is flat
near the Trent at Attenborough, Beeston Rylands and the business park. So a hill start on
this test is most likely on a residential side road in Bramcote or Stapleford rather than
near the centre.
(unverified, background knowledge, confidence medium)

Box junctions: the repository's sources do not name a box junction in the test area. Busy
signal controlled crossroads on the A6005 corridor and in Beeston town centre are where
one would be. Not established.
(not found)

Narrow roads with parked cars: confirmed in general terms for Beeston High Road, which has
bus stops, cyclists and pedestrians crossing between shops, and expected on the
residential estates. Specific streets not established.
(repo, common-faults.md for High Road; the rest reasoned)

Roadworks: the A52 Nottingham junctions improvement programme and the Chetwynd Barracks
redevelopment both mean the layout may differ from any description. The app should carry a
standing note that temporary lights and lane closures are likely somewhere on the route.
(reasoned, from the two sources above)

### What this road network loads onto the marking sheet

Pulling the above together, the faults this particular environment is most likely to
produce, which is what the app's Roads tab should link to on the marking sheet.
(reasoned)

- Positioning and lane discipline, from the multi lane roundabouts at Bardills, Bramcote
  Island and M1 Junction 25, from the third lane appearing on the Bardills approach, and
  from unnecessary right hand lane use on the A6005 dual carriageway.
- Observation at junctions, from the emergence onto the A6005 at the test centre lights
  and from the repeated signal controlled junctions along the corridor.
- Use of speed, from the repeated change between a 70 or 50 dual carriageway, a 30 main
  road and a possible 20 town centre.
- Move off and control, from the cold start out of the business park.
- Clearance to obstructions and meeting traffic, from Beeston High Road and the parked up
  residential estates.
- Response to signs and road markings, from the bus lanes, the one way streets, the no
  entry roads, the left filter arrows and the tram signals.
- Awareness and planning, from trams, cyclists and pedestrians in a shopping street.
- Following traffic signs and independent driving, on a road network dense with
  destinations that sound alike, Beeston, Bramcote, Stapleford, Sandiacre, Toton, Long
  Eaton.

## Quotes worth using

Every quotation below is reproduced from this repository's earlier research note, which
itself took them from search result summaries rather than from the page. None was read on
the source page by this pass or by the earlier one. The app author should reopen each URL
and confirm the wording before showing any of them to a user as a quotation. (reasoned)

"The test area includes many multiple lane and busy roundabouts (notably Bramcote Island,
Bardills Roundabout and the roundabout at M1 J25) as well as several quirky
roads/junctions (including roads that are shared with tram lines, one way roads, no entry
roads and traffic lights with left filter arrows)."
[Driving Lessons with Martin](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
(unofficial, a local approved driving instructor)

"Bardills Island is a roundabout with an inner slip road in the centre that links traffic
from the A52 (Derby) to the B6003 (Toton/Long Eaton), to cut out the congestion of the
A52 (Nottingham) junction."
[h2g2](https://h2g2.com/edited_entry/A425927)
(unofficial, an enthusiast encyclopaedia)

"Chilwell is a suburban area in the borough of Broxtowe in Nottinghamshire, England. It
lies on the west side of the town of Beeston and is 4 miles (6.4 km) south-west of the
centre of Nottingham."
[Wikipedia, Chilwell](https://en.wikipedia.org/wiki/Chilwell)

Two further passages are quoted in centre-facts.md as paraphrase rather than as exact
wording, and are reproduced here only as the sense of the source, not as quotations: that
Bye Pass Road, the A6005, is a major route connecting Beeston and Long Eaton with dual
carriageway driving and merging
([routebuddy.co.uk](https://routebuddy.co.uk/chilwell-driving-test-routes/)); and that the
High Road through Beeston town centre is one of the busiest sections, with bus lanes, bus
stops, cyclists, pedestrians crossing between shops and frequent signal controlled
junctions
([routebuddy.co.uk](https://routebuddy.co.uk/nottingham-chilwell-driving-test-routes/)).
Both are unofficial driving route sites.

No primary source quotation could be added by this pass, because no primary source could
be opened. (observed in this session)

## Not found

This section is longer than usual because almost everything in the brief falls into it.
Read it as the verification checklist for the Roads tab and the Map tab. Nothing was
searched for this topic, because the search budget was exhausted before this pass began,
so "searched" below means "could not be searched" unless it says otherwise.

1. Every speed limit in the test area. Could not be searched or fetched. Settle from
   Nottinghamshire County Council's highways pages and Traffic Regulation Orders, from
   the council's online speed limit map if one exists, or from OpenStreetMap, which
   carries maxspeed tags for most roads in this area. Priority: the A52 Brian Clough Way
   between M1 Junction 25 and Bramcote, the A6005 in each of its named sections, Beeston
   High Road and the town centre streets.
2. Every 20 mph zone or limit. Could not be searched or fetched. The brief asked for each
   one that could be confirmed and none could. Check Nottinghamshire County Council for
   20 mph schemes in Broxtowe, and Broxtowe Borough Council for town centre schemes.
3. The arms of Bardills roundabout and its exact layout, including where the inner slip
   road starts and ends, where the signals on the roundabout are, and which lane leads
   where. The existing app data says "A52 at Swiney Way", which may be wrong. Settle from
   a map and, ideally, from a drive.
4. The A52 speed limit at Bardills and between Bardills and M1 Junction 25. Unknown
   whether 70, 50 or something else, and whether it varies. This is the single most
   important unresolved number in the file, because a candidate who does 50 in a 70 or 70
   in a 50 fails on use of speed either way.
5. Whether a Chilwell test uses the A52 at all, or stays on the A6005 and the suburban
   roads. Sources describe the test as primarily urban but also name A52 roundabouts as
   test area features, which is not the same as saying the A52 carriageway is driven.
6. The junction type where Eldon Road or the business park access meets the A6005. One
   unofficial source implies traffic lights. Needs confirming, along with which turns are
   permitted and whether there is a filter.
7. The Beeston town centre one way system: which streets, which direction, where the no
   entry points are, and which parts are closed to general traffic. Street names given in
   this note are low confidence recollection and must not be printed unchecked.
8. The bus lanes on and around Beeston High Road: where they start and end, their
   direction, and their hours of operation. High value for the app, and not available
   from any national source.
9. Where the tram runs on street, where it runs on reserved track, and every point where
   it crosses a road a test might use. Settle from thetram.net's route map and from
   Nottingham Express Transit's own material.
10. Whether any tram crossing on the route has its own signals, and what they look like,
    so the app can draw the right diagram. The existing tram diagram in the app is generic.
11. Level crossings anywhere in the test area, on the Attenborough and Beeston railway
    corridor or elsewhere. Either find one or establish there is none, and say which in
    the app.
12. Box junctions anywhere in the test area.
13. School locations, current names, and any part time 20 mph or school street
    restrictions around them. The school names in this note are recollection and at least
    one is likely out of date.
14. Which residential streets are actually used for manoeuvres. DVSA does not publish
    routes, so the best available evidence would be local instructor accounts, which
    would need searching for and would remain unofficial.
15. Gradients steep enough to matter for a hill start, and where. The claim that the
    ground rises towards Bramcote and Stapleford is recollection.
16. Current roadworks on the A52 corridor and at the Chetwynd Barracks site. These change,
    so the app should link to a live source rather than state a position.
17. Coventry Lane and Chilwell Lane: which parish each is in, where each runs, and their
    character. Both are low confidence in this note.
18. Whether Inham Road carries or crosses the tram, and what the junction of Inham Road
    with the High Road corridor looks like.
19. Swiney Way: its actual route, its junctions, and whether it meets the A52.
20. The order and names of NET Line 1 stops along the corridor, to confirm the sequence
    carried over from the earlier pass.

Two further things were not attempted and should be, because they would answer many of
the items above at once. A single OpenStreetMap extract of the area, fetched as data
rather than as a page, would give road names, classifications, maxspeed tags, junction
types, bus lane tags, tram tracks, level crossings and school locations in one go. And
the Nottinghamshire County Council highways pages would give the authority's own position
on speed limits and schemes. Neither was reachable from this sandbox.

## Sources

No URL was opened by this pass. The page fetching tool was blocked by the network egress
proxy for every domain tried, and the web search budget for the session was already spent,
so no search result was returned either. This section therefore has two parts: what was
attempted and refused, and what was carried across second hand from elsewhere in this
repository.

### Attempted in this pass and blocked

1. https://www.gov.uk/find-driving-test-centre/nottingham-chilwell . EGRESS_BLOCKED.
   Wanted the test centre's official record.
2. https://en.wikipedia.org/wiki/Chilwell . EGRESS_BLOCKED. Wanted the geography, roads
   and transport summary.
3. https://www.nottinghamshire.gov.uk/transport/roads/speed-limits . EGRESS_BLOCKED.
   Wanted the highway authority's speed limit policy and any 20 mph schemes.
4. https://www.thetram.net/routes-and-maps . EGRESS_BLOCKED. Wanted the tram route,
   the stops and where the tram shares road space.
5. https://www.openstreetmap.org/search?query=Chilwell%20driving%20test%20centre .
   EGRESS_BLOCKED. Wanted road names, classifications and maxspeed tags.
6. https://despatch.blog.gov.uk/ . EGRESS_BLOCKED. Wanted DVSA's own commentary on test
   routes and local conditions.

Two WebSearch calls were also made and refused for budget, for "Chilwell driving test
centre Nottingham DVSA test routes roads" and "A6005 Nottingham Road Chilwell High Road
Beeston speed limit".

### Carried across from elsewhere in this repository

These URLs were gathered by an earlier research pass in this project, from search result
summaries. That pass did not open them either, because page fetching was blocked for it
too. They are listed here because the claims attributed to them appear above, and because
they are the obvious places for the app author to start when the network allows it.

7. https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/ (unofficial, a
   local approved driving instructor). The richest local source: the named roundabouts of
   the test area, roads shared with tram lines, one way and no entry roads, left filter
   arrows, the directions routes take from the centre, the traffic lights at the centre,
   and the car park bay layout.
8. https://routebuddy.co.uk/chilwell-driving-test-routes/ and
   https://routebuddy.co.uk/nottingham-chilwell-driving-test-routes/ (unofficial, a
   driving route site). The A6005 Bye Pass Road dual carriageway and merging, and the
   character of Beeston High Road including its bus lanes.
9. https://h2g2.com/edited_entry/A425927 (unofficial, an enthusiast encyclopaedia).
   Bardills Island layout, the inner slip road, the third lane on approach and the
   traffic lights on the roundabout.
10. https://www.jctconsultancy.co.uk/Home/docs/jctSymp_bardillsCuttingCorners.pdf (a
    traffic engineering conference paper). Bardills queue and delay figures, undated in
    what the earlier pass saw.
11. https://nationalhighways.co.uk/our-roads/east-midlands/a52-nottingham-junctions/
    (National Highways, primary). The A52 Nottingham junctions improvement programme.
12. https://www.logicor.eu/en/uk/properties/nottinghamshire-eldon-business-park-nottingham/nottinghamshire-eldon-road-trading-estate-nottingham
    (the landlord, unofficial but authoritative on the estate). Eldon Business Park on the
    A6005 Nottingham Road, adjacent to Chilwell Retail Park, near Attenborough Nature
    Reserve, access to M1 Junction 25.
13. https://www.passmefast.co.uk/test-centres/practical/nottinghamshire/nottingham-chilwell
    (unofficial, a driving school). The centre's setting on Eldon Road and its neighbours.
14. https://intensivelessons.co.uk/Practical-Test-Centres/Nottinghamshire/Nottingham-Chilwell
    (unofficial). The test being primarily urban for lack of country roads nearby.
15. https://en.wikipedia.org/wiki/Inham_Road_tram_stop ,
    https://en.wikipedia.org/wiki/Eskdale_Drive_tram_stop ,
    https://en.wikipedia.org/wiki/Bramcote_Lane_tram_stop ,
    https://en.wikipedia.org/wiki/Toton_Lane_tram_stop (unofficial encyclopaedia). NET
    Line 1 stop order along the corridor, the 25 August 2015 phase two opening, and tram
    frequencies of 4 to 8 per hour.
16. https://www.thetram.net/park-and-ride and
    https://support.thetram.net/support/solutions/articles/15000057252-my-tram-stop-toton-lane
    (NET, primary). Toton Lane park and ride, NG9 7JA, free for tram ticket holders,
    eight charging points.
17. https://www.tesco.com/store-locator/nottingham/swiney-way-toton (Tesco, primary for
    the store). Nottingham Toton Extra on Swiney Way, Toton.
18. https://bustimes.org/services/i4-nottingham-stapleford-sandiacre-derby (unofficial).
    The i4 route via The Nurseryman, Bramcote (Sherwin Arms), Stapleford and Sandiacre.
19. https://en.wikipedia.org/wiki/Attenborough_railway_station (unofficial encyclopaedia).
    Attenborough station on a spur of the Midland Main Line.
20. https://www.broxtowe.gov.uk/media/9603/chetwynd-the-toton-and-chilwell-neighbourhood-plan.pdf
    and https://consult.nottinghamshire.gov.uk/planning/toton-and-chetwynd-barracks-plans
    (Broxtowe Borough Council and Nottinghamshire County Council, both primary). The
    Chetwynd Barracks and Toton redevelopment, which may change the road layout.
21. https://www.goroadie.com/guides/learners/nottingham/driving-test-centres-in-nottingham
    and https://lessonplus.co.uk/chilwell-and-colwick-driving-test-centres-uk/
    (unofficial). Chilwell as the natural centre for Beeston, Chilwell, Toton, Stapleford
    and Long Eaton learners.

### Files in this repository used as sources

22. /home/user/annual_plan/chilwell-test/research/centre-facts.md . The bulk of the
    sourced local road material above.
23. /home/user/annual_plan/chilwell-test/research/common-faults.md . What each local
    hazard loads onto the marking sheet.
24. /home/user/annual_plan/chilwell-test/docs/validation.md . The project's record of the
    sandbox limitation.
25. /home/user/annual_plan/chilwell-test/data/junctions.json . The existing stub data,
    including the two unsourced speed figures flagged above.
