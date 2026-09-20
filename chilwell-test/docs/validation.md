# Validation record

What is in this app, where it came from, how it was checked, and what is not verified.
Written in the same spirit as the kart coach's validation record: never present an
estimate as measured, and say plainly when something could not be confirmed.

## How the content was gathered

Sixteen research passes were planned, one per topic, each writing a sourced note into
`research/` with its own "Not found" list. Eight were written. The other eight, and the
adversarial fact checks that were to follow them, never ran, for the reason below.

### The two limits that shape everything here

**Pages could not be opened.** The sandbox's egress policy blocked the page fetching tool
for every domain tried, GOV.UK included. A direct request to `https://www.gov.uk/`
returned a 403 from the proxy. So no page behind any URL in this app was opened and read.

**Web search ran out.** The session has a budget of 200 web searches and the first six
research passes used all of them. Everything written after that point, in the research
notes and in the app, rests either on what those six passes had already gathered or on the
writer's own knowledge, and the notes say which at the top of each file.

So the app has three tiers of content, and it tries to keep them visibly apart:

1. Gathered while search worked, from several sources agreeing: the test structure, the
   marking rules, the fault definitions, the test centre's address, the pass rates, the
   safety questions. Every one of these carries a URL that a search engine returned as its
   source, and none of those pages was opened.
2. Reasoned from tier one: how the rules play out, what to do about them, what a fault
   costs you.
3. Knowledge, with no source behind it: the local roads, the coordinates, the taught
   method for each manoeuvre, the general advice. These carry (reasoned) or (unverified)
   in the app, and the honesty panel on the Start tab lists them.

What that means in practice:

- A claim marked in the notes as "cited by search, page not opened" has a real URL behind
  it, and that URL was returned by a search engine as the source of the wording, but no
  one in this process read the page.
- A note written after the search budget ran out says so in its first paragraph. Treat any
  claim in those notes that is not attached to a URL as knowledge, not as fact.
- Wording presented as a quotation came through a search summary. It is probably right and
  may be paraphrased.
- Numbers that several independent sources agree on are treated as solid. Numbers that
  sources disagree on are given with the disagreement stated, and the safer figure is the
  one the app shows.
- Nothing in the app should be treated as DVSA material. GOV.UK is the authority.

The first item in the project backlog is to open the primary sources on a machine with
normal network access and settle every line below.

## How the app itself was checked

`tests/test_app.py` runs the built page in a real browser at phone size and drives it:
every tab opens with content, the countdown works, a ticked checklist survives a reload,
the map draws markers and responds to zoom, drag, tap and a layer switch, every road card
fills in and draws its diagram, every manoeuvre steps through its frames, the quiz asks,
reveals and marks, and the mock test counts driving faults, applies the limit, judges a
serious fault as a fail, and keeps its history across a reload. It also checks the page
does not overflow at 320 px wide, and that no JavaScript error is thrown at any point.

The same file checks the content: ids unique, every marking item in a real group, every
junction carrying a coordinate and a statement of how precise that coordinate is, every
manoeuvre with one step note per diagram frame, every question with an answer, every
junction link pointing at a marking item that exists, and no placeholder text left behind.

`build/build.py` refuses to build if it finds an em dash or an en dash anywhere in the
data or the page, which is the house style in this repository.

What the tests do not cover: the map's tile images, because the sandbox has no network to
OpenStreetMap, so tile loading and the fallback message were reasoned rather than
observed; the geolocation paths, because there is no receiver; speech, because there is no
voice; and printing, because there is no printer. All four need a hand test on a phone.

## What was checked, and against what

| Claim | Status | Sources |
|---|---|---|
| Centre name Nottingham (Chilwell), Unit 24 Eldon Business Park, Eldon Road, NG9 6DZ | Agreed by every listing found, none opened | PassMeFast, drivingtest.co.uk, Intensive Lessons, Driving Lessons with Martin, getdriving.co.uk |
| Spelled Chilwell, one l in the middle | Agreed | Every source; the user's "Chillwell" will not match the booking service |
| Not on Chetwynd Business Park | Derived | No source places the centre there. Chetwynd is the barracks (Wikipedia, Broxtowe BC) and a road with an MOT garage on it |
| Not on Cator Lane | Contradicted and dropped | One driving school page says Cator Lane against every other source; treated as wrong |
| Next to EvoEnergy, Sheetfabs and NK Motors, off the A6005 by Chilwell Retail Park | Single local source, plus the landlord's own description | Driving Lessons with Martin; Logicor property listing |
| Seven bays in the car park, five opposite the entrance and two kerbed on the left, unequal widths | Single local source, unofficial | Driving Lessons with Martin |
| Whether candidates or instructors may park on site | Sources disagree | One says marked bays are available, another says no parking facilities but Eldon Road is permitted. App gives the cautious reading |
| Waiting room, seating, whether it opens for early or weekend tests | Not found | Searched; no source describes it |
| Opening hours Monday to Friday 8am to 4pm | Single aggregator, unverified | driving-test-centre.com |
| The order of the test, start to finish | Agreed | GOV.UK "what happens during your test", DT1 sections 1 and 14 |
| Three changes on 24 November 2025: stops 4 to 3, emergency stop 1 in 3 to 1 in 7, independent driving flexible and up to the whole test | Confirmed | DVSA Despatch, 19 November 2025 |
| Pass rule: no serious or dangerous faults, 15 or fewer driving faults | Agreed | Ready to Pass, GOV.UK understanding your result |
| A serious fault is potentially dangerous "or entails a breach of the law" | DT1 only, not on the public pages | DT1 annex 6 |
| A repeated driving fault in one item can be assessed as potentially dangerous | DT1 only | DT1 annex 6 |
| No published number of repeats that triggers it | Searched and not found | Examiner judgement |
| Eyesight at 20 m (current plate) and 20.5 m (old), three attempts, never closer than 20 m | Agreed | GOV.UK, DT1 section 6 |
| The examiner's wordings quoted through the app | Single source, through a search summary | DT1 section 14, test wordings. Not read on the page, so treat as close paraphrase |
| Fourteen tell me questions with DVSA's answers | Agreed | GOV.UK show me tell me, DT1 annex 1 |
| Six show me questions | Agreed | DT1 section 13 |
| A seventh show me question about the side window | Unverified | Widely reported, wording not confirmed on a GOV.UK page |
| Marking sheet items 11 to 27 and their sub boxes | Three instructor sites agree | Unofficial: Nolan, BookLearnPass, L2P Coventry |
| Box numbers for the manoeuvre items | Sources disagree, so the app omits them | Andrew Buckler against others |
| How many competencies there are | Reported as 24, 27 and 28; app says about 27 | Three unofficial sources |
| Top ten faults, ranks 1, 2, 8, 9 and 10 | Established | DVSA webinar slides for 8 to 10; passrates.uk for 1 and 2 |
| Top ten faults, ranks 3 to 7 | Not established, so no full ordered list is printed | The GOV.UK top ten page could not be opened |
| Eco safe driving marks cannot fail a test | Unverified | Instructor sites say so; no DVSA page found |
| Pass rate about 44 per cent (2024 to 2025) and about 49.9 per cent (2025 to 2026) | Republished figures, table not read | passrates.uk, The Driving Instructor Directory, bookdrivingtest.uk. Centre data is DRT122A, not DRT0201 |
| Test fees 62 pounds weekday, 75 pounds evening and weekend | Search result, and they change | GOV.UK driving test cost, via search |
| Sat nav is a TomTom Start 52 | Introduced by DVSA in 2017, no 2026 confirmation | DVSA Despatch 2017; secondary sources since |
| Local road features: Bramcote Island, Bardills, M1 J25 roundabout, A6005 dual carriageway, Beeston High Road, tram shared roads, filter arrows | Mostly one instructor's page, unofficial | Driving Lessons with Martin, RouteBuddy, NGPass, Intensive Lessons |
| Speed limits on any local road | Not one confirmed | No council or mapping source could be opened. The app does not print bare limits as fact |
| Test routes | DVSA does not publish them; no route detail found for this centre at all | The year the practice stopped, often given as 2010, came from this project's own brief and has no source behind it, so the app does not state a year |
| Every coordinate in the app | Placed from knowledge, not surveyed and not sourced | The coordinate research pass never ran. Each one is marked approximate and the reader can correct it |
| The taught method for each manoeuvre | Reasoned, standard instructor practice | DVSA publishes what is assessed, not a method |
| What helps with test nerves | The evidence pass never ran; no studies are cited | The app says what is broadly supported and does not name a paper |
| Phone behaviour: location needing https, permissions, the screen locking during a mock | From memory, unverified | Could not be tested in this sandbox |

## The review of the finished content

A separate pass read every data file against this contract and against the research, and
looked for contradictions between files, claims stated more firmly than their sources
allow, house style breaches, and driving advice that was wrong. What it found, and what
was done:

- Five pieces of advice were wrong and were corrected: the speed limit described as a
  target rather than a maximum; the emergency stop telling every driver to hold the pedal
  through a lock up, which is right with anti lock brakes and wrong without; one way
  described as a blue circle with a white arrow, which is a different sign meaning ahead
  only; another driver's wave treated as permission to go; and the room to give a cyclist
  put at the same as a car, against the card's own text.
- Eight places where the app disagreed with itself were reconciled, including the fault
  limit arithmetic in a calming line, the layout of the two kerbed bays at the centre, the
  waiting time, the second attempt pass rate, and the year routes stopped being published,
  which is now nowhere in the app because nothing supports it.
- Three measurements that were never measured are now labelled as such: the distance to
  Attenborough station, the tram frequency, and the queue figures at Bardills.
- The mock sheet's default list had no button for the manoeuvre, and eco safe driving was
  counted towards a verdict it probably cannot affect. Both fixed.

The review is not a guarantee. It read the content, not the roads.

## Claim by claim

The per topic records live in `research/`, each with its own Sources and Not found
sections. The app's own honesty list is in `data/sources.json` and is shown to the reader
on the Start tab under "Where all of this comes from". The most important unresolved items
are collected here.

### What is solid

These came through while web search was still working, from several sources agreeing, and
they are the backbone of the app.

- The test centre is Nottingham (Chilwell), Unit 24 Eldon Business Park, Eldon Road,
  NG9 6DZ, just off the A6005 Nottingham Road next to Chilwell Retail Park. Several
  independent driving school and test centre listings give the same address. The spelling
  is Chilwell with one l in the middle. It is not on Chetwynd Business Park: Chetwynd is
  the barracks and a separate road in Chilwell, and one driving school page that puts the
  centre on Cator Lane contradicts every other source and is wrong.
- The shape of the test, its order and the examiner's wordings, from GOV.UK and from DT1,
  the examiners' own guide.
- Three changes took effect at every test centre on 24 November 2025: stops cut from four
  to three, the emergency stop cut from one test in three to one in seven, and the
  independent driving section allowed to use a sat nav, signs or both and to run for the
  whole test. Anything written before that date is out of date on all three.
- The pass rule: no serious or dangerous faults, and fifteen or fewer driving faults.
- The three fault definitions, in DVSA's public wording and in DT1's tighter wording,
  which adds "or entails a breach of the law" to the definition of a serious fault.
- That a repeated driving fault in one item can be assessed as a serious fault, which is
  in DT1 and is not on the public pages.
- The eyesight check at 20 metres for a current plate and 20.5 metres for an old one, the
  three attempts, and that a candidate is never asked to read one closer than 20 metres.
- The fourteen tell me questions and six of the show me questions, with DVSA's answers.

### What is not solid, and what the app does about it

- **The pass rate.** Reported as about 44 per cent for 2024 to 2025 and about 49.9 per cent
  for 2025 to 2026, on figures republished by driving sites rather than read from DVSA's
  own table. The table reference also changed: the centre level data is DRT122A, not the
  DRT0201 the brief assumed. The app gives both years, says where the numbers came from,
  and says that a centre's rate says very little about one person.
- **The marking sheet box numbers.** Sources agree on the competency numbers 11 to 27 but
  contradict each other on the numbers for the manoeuvre boxes. The app prints the numbers
  only where the sources agreed, and leaves them out otherwise.
- **How many competencies there are.** Reported as 24, 27 and 28 by different sources,
  probably because they count the manoeuvre, eyesight, eco and spare boxes differently.
  The app says about twenty seven.
- **The seventh show me question.** Widely reported as opening and closing the side window,
  but the wording could not be confirmed on a GOV.UK page. The app includes it and marks it
  unverified.
- **The top ten faults.** Ranks one and two (junction observation, and mirrors when
  changing direction) and ranks eight, nine and ten are established. Ranks three to seven
  are not, so the app does not print a full ordered list.
- **The test centre's car park, waiting room, toilets and opening hours.** Everything known
  comes from driving school pages and aggregator listings, and they contradict each other
  on whether candidates can park on site. The app gives the cautious reading: do not count
  on parking a second car there.
- **The sat nav model.** The TomTom Start 52 is what DVSA introduced and what secondary
  sources still report, with no 2026 confirmation found. The app says "usually a TomTom
  Start 52" rather than stating it.
- **Eco safe driving.** Instructor sites say eco marks cannot fail a test. No DVSA page
  confirming it was found, so the app says so.
- **The local roads.** Not one speed limit was confirmed against a council or mapping
  source. The app does not print bare speed limits as fact, and where it names one it is
  marked unverified.
- **The test routes.** No published route for this centre exists. Four unofficial
  publishers make route shaped claims, and they agree only that the routes are urban and
  heavy on roundabouts. The features they name (Bramcote Island, Bardills roundabout, the
  M1 Junction 25 roundabout, the A6005 dual carriageway, Beeston High Road, roads shared
  with trams, one way streets, filter arrows) mostly come from a single instructor's page.
  The app says all of this plainly and gives the roads any route has to use instead.
- **The coordinates.** None are surveyed and none are sourced. The web search budget ran
  out before a coordinate pass could run, so every position in the app was placed from
  knowledge of the area and is marked approximate. The app gives the reader two ways to
  correct each one: stand at the junction and take the position from the phone, or drag
  the map under a crosshair.
- **The nerves section.** The research pass on the evidence never ran, so the app describes
  what is broadly supported without citing studies. It does not name an author, a year or a
  journal, because inventing a citation would be worse than having none.
- **Booking, fees and waiting times.** The fees given (62 pounds on a weekday, 75 pounds in
  the evening or at a weekend) came from a search result and change. The app tells the
  reader to check the current figure on GOV.UK.

## The local roads

No survey was done. Coordinates come from the sources named in `research/coords.md`, and
each junction in `data/junctions.json` carries a `precision` field which the app shows on
the card. Where that field says "approximate", the marker is somewhere on the right
junction, not on a surveyed point.

The route corridors drawn on the map are straight lines between junctions. They are not
roads and the app says so. DVSA does not publish test routes, and no route detail for this
centre was found. The year the practice stopped is unverified, so the app does not give one.

## The diagrams

Every diagram in the app is a schematic drawn by the app from a description of the
junction, not a survey and not a map extract. A roundabout diagram shows the exits in
their compass directions and numbers them the way a driving instruction numbers them. The
manoeuvre diagrams are drawn roughly to scale in metres, with a car 4.2 m by 1.8 m, but
the reference points that matter in a real car depend on that car, and the app says so.
