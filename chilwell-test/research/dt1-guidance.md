# DT1: the examiner guidance, what they are actually looking for

## Summary

1. This file could not be researched as briefed. Every outbound page fetch was refused by the network egress proxy, and the session's web search budget was already exhausted (200 of 200 calls) by the sibling research agents before this task started. **I opened no web page and ran no search.** (reasoned, from the tool errors recorded below)
2. What follows is therefore a consolidation, reorganised around the DT1 topic, of DT1 material already captured in this repository by the sibling research agents, plus my own labelled subject knowledge and inference. Every line says which it is.
3. DT1 is real, is published openly on gov.uk as HTML guidance, and is the examiners' own operational manual. Landing page: [gov.uk DT1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1) (relayed, page not opened)
4. The single most important thing DT1 says that the public pages do not: a serious fault is one that is potentially dangerous **or entails a breach of the law**. An act can be marked serious with nobody endangered. [gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking) (relayed, page not opened)
5. The second most important: repetition upgrades a fault. DT1 states that a candidate who habitually commits a driving fault in one aspect of driving throughout the test cannot be regarded as competent, and the repeated fault can then be assessed as potentially dangerous. Same source. (relayed, page not opened)
6. So the 15 driving fault allowance is a ceiling, not a licence. Four faults in four different boxes is a pass. Four faults all in one box is at risk of becoming a serious fault and a fail. (reasoned)
7. DVSA publishes **no number** for how many repeats trigger the upgrade. It is examiner judgement. Any app that prints "three in a box is a serious" would be inventing a rule. (reasoned, and recorded as searched-for-and-not-found in the sibling file research/marking-dl25.md)
8. DT1 is explicit that examiners are to put candidates at ease: a pleasant outgoing approach throughout the test is described as particularly important to help candidates relax, and an examiner should offer a few words of reassurance to a candidate clearly suffering from nervousness. [gov.uk DT1 section 1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test) (relayed, page not opened)
9. DT1 settles the question candidates most worry about: asking the examiner to repeat or confirm a direction is fine, the examiner should respond in a friendly positive manner, and it is expressly **not** counted as a prompt, because the candidate instigated it. Same source. (relayed, page not opened)
10. On stopping a test early, DT1 sets a high bar: the driving must become so dangerous that the safety of the public, the examiner or the candidate is threatened. The examiner then ends it as soon as it is safe, directs the candidate to a safe stopping place, and explains why. Same source. (relayed, page not opened)
11. "Examiner took action" (ETA) is a record of an intervention, verbal or physical, not a fault category in itself. The fault is still marked in its own competency box. (relayed from unofficial sources only, see Findings)
12. A dangerous fault is marked dangerous whether or not the examiner had to intervene. The absence of an intervention does not downgrade it. (relayed from an unofficial source only)
13. The per competency assessment criteria in DT1 Annex 6 are the heart of this topic and **I could not obtain them**. What this file gives instead, item by item, is the competency list with descriptions drawn from instructor sites, each labelled unofficial, plus a precise extraction list for whoever opens the real page.
14. Do not print anything in this file as a DVSA quotation until the URL beside it has been opened and the wording checked character by character. Several entries carry an explicit paraphrase risk. (reasoned)
15. Nothing in this topic is Chilwell specific. DT1, the fault definitions and the marking rules are national and identical at every DVSA test centre in England, Scotland and Wales. Only the roads change. (reasoned)

## Findings

### How this file was researched, and how much to trust it

This section is the most important one in the file. Read it before using anything below.

**No page was opened.** `WebFetch` returned `EGRESS_BLOCKED` for every domain attempted in this session: `www.gov.uk`, `assets.publishing.service.gov.uk`, `despatch.blog.gov.uk`, `www.safedrivingforlife.info`, `en.wikipedia.org` and `webarchive.nationalarchives.gov.uk`. A direct `curl` to the DT1 landing page returned `CONNECT tunnel failed, response 403`. The proxy documentation describes a 403 as an organisation policy denial, so I did not attempt to route around it. (reasoned, from the recorded tool output)

**No search was run.** The first two `WebSearch` calls returned: "Web search was not performed: this session has used its web search budget (200 of 200 WebSearch calls)." The budget is shared across the sibling research agents and was already spent. (reasoned, from the recorded tool output)

This is the same blockage recorded in the sibling files research/marking-dl25.md and research/test-structure.md, and it is already logged as backlog item 1 in chilwell-test/CLAUDE.md: "Open the primary sources on a machine without the egress restriction and settle every line in docs/validation.md marked 'search result only': the DVSA DT1 wording..." This file does not discharge that backlog item. It sharpens it. (reasoned)

Three provenance labels are used throughout, and they mean different things:

- **(relayed, page not opened)**: the claim and its URL come from the sibling research files in this same folder, which obtained them from web search result summaries. Two removes from the source. Corroborated across sibling files where noted, but never verified against the page.
- **(unofficial)**: the source is a driving school, instructor body or commercial site, named in the citation, not DVSA.
- **(unverified)**: my own subject knowledge, not checked against any source in this session. Useful as a checklist of what to look for. Not evidence.
- **(reasoned)**: my inference from the material above it.

Anything without one of those labels and without a URL should be treated as an error in this file. (reasoned)

### What DT1 is, and where it lives

DT1 is "the examiner's guide to carrying out driving tests", DVSA's internal operational manual for driving examiners, published openly on gov.uk as HTML guidance rather than as a single PDF. It tells examiners how to run the test, what to say, what to assess and how to mark it. [gov.uk DT1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1) (relayed, page not opened)

Two URL generations appear to be in circulation for the same material, an older set using `annex-N-...` and a newer set using plain chapter numbers. Both were returned by the sibling agents' searches. If one path 404s, try the other. (relayed, and reasoned from the two paths both appearing)

The chapter and annex URLs established in this repository are listed in full in the Sources section below. The ones that matter for this topic are section 1 (the car driving test), section 11 or annex 6 (guide to assessment and marking), section 14 or annex 7 (test wordings), section 6 (general technical matters) and section 13 or annex 1 (vehicle safety check questions). (reasoned)

### The three fault types, in the examiner's own words

DVSA's public wording, on the Ready to Pass campaign site:

- "A dangerous fault involves actual danger to you, the examiner, the public or property."
- "A serious fault is something that has the potential to be dangerous."
- "A driving fault is not potentially dangerous, but if you keep making the same fault, it could become a serious fault."

[readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/) (relayed, page not opened)

DT1's examiner facing wording, in the guide to assessment and marking, is tighter:

- "A driving fault is something that falls short of the standard of a safe and competent driver without being potentially dangerous."
- "A serious fault is one that is potentially dangerous or entails a breach of the law."
- "A dangerous fault is one involving actual danger to the examiner, candidate, the general public, or property."

[gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking) (relayed, page not opened)

DT1 Annex 6 states its own purpose as explaining the assessment criteria and the recording of faults under the outcome and competency headings on the driving test report, and says it outlines the requirements of a driving test, giving a brief explanation of the skills and abilities the candidate is expected to demonstrate in each aspect of their driving, including examples of the assessment criteria that serve as a guide to assessment. Same source. (relayed, page not opened, and flagged in the sibling file as a close paraphrase rather than certainly verbatim)

The same guidance describes the assessment as based on direct observation of the candidate's driving, assessed against a set of outcomes and competencies found in DT1 and the respective DVSA National Driving Standards, with competence judged on the making of safety decisions and vehicle control. Same source. (relayed, page not opened)

That last phrase is the clearest statement of what an examiner is actually doing: **safety decisions and vehicle control**. Everything on the sheet reduces to one or the other. (reasoned)

### The threshold between a driving fault and a serious fault

This is the question the app most needs to answer, so it is worth stating precisely what is and is not established.

**Established, from DT1 wording relayed through the sibling research:** the line is potential danger, or a breach of the law. If the act had the potential to be dangerous, it is serious. If it broke the law, it is serious, whether or not anybody was endangered. If it merely fell short of safe and competent driving, it is a driving fault. [gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking) (relayed, page not opened)

**The breach of law limb is the one candidates do not expect.** Acts that would qualify on that limb alone, with nothing else going wrong, plausibly include exceeding the speed limit, crossing a solid white line, entering a box junction when the exit is not clear, and ignoring a no entry sign. (reasoned. These specific examples are my inference from the wording and are **not** quoted from DVSA. Do not present them in the app as a DVSA list.)

**Not established:** DT1's own per competency examples of what tips each item from driving to serious. Annex 6 is described as containing "examples of the assessment criteria", which strongly implies the per item thresholds are written down in it, but I could not read them. See Not found. (reasoned)

A practical framing the app can use honestly, because it follows from the definitions rather than adding to them: three questions, in order. Did it break the law? Could it have been dangerous? Did it just fall short? The first yes you reach is the grade. (reasoned)

### Repetition: how driving faults become serious faults

DT1: "A candidate who habitually commits a driving fault in one aspect of driving throughout the test cannot be regarded as competent to pass the test. The repeated fault can then be assessed as potentially dangerous." [gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking) (relayed, page not opened)

Restated by a secondary source: if a candidate accumulates several driving faults in the same category, the examiner may consider the fault habitual and mark a serious fault in that category, and repetition is what changes its grade. [passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

When that happens, both the driving faults and the resulting serious fault are recorded, so the sheet shows the history, not just the upgrade. [passrates.uk](https://passrates.uk/guide/driving-test-failed-rules) (unofficial)

There is **no published threshold** for how many repeats trigger the upgrade. The sibling agent searched specifically for a number and found none. It is examiner judgement. (reasoned, and recorded as not found in research/marking-dl25.md)

DVSA took a question on exactly this at its November 2024 instructor webinar, listed among the topics as "repeatedly making the same driving fault". [despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/) (relayed, page not opened). The webinar recording is the most likely place to find how examiners actually apply it. (reasoned)

The consequence for a candidate, and the thing the app's mock test should surface: **where** the faults cluster matters more than how many there are. A mock that returns "six driving faults" is far less useful than one that returns "four of your six were mirrors on changing direction". (reasoned)

### The examiner's grading method

Unofficial, but from an instructors' national body rather than a driving school. The ADI National Joint Council describes examiners using a method called "deviation from desired outcome", and grading against three questions: does it affect vehicle control, did it affect safety, and did it breach the law. It also describes an internal five point scale of "no fault, non-note-worthy fault, driver error, serious driver error or dangerous driver error", of which only the bottom three reach the report. [adinjc.org.uk](https://www.adinjc.org.uk/examiner-fault-marking/) (unofficial, ADI National Joint Council)

Note how closely the three questions track the DT1 definitions (control, safety, law). That is corroboration of a sort, though it is still an unofficial gloss. (reasoned)

The five point scale is worth telling a candidate about, because it explains the common experience of seeing the examiner write something that never appears on the sheet. A "non-note-worthy fault" is observed and discarded. (reasoned)

### The pass mark

No serious faults, no dangerous faults, and 15 or fewer driving faults. The sixteenth driving fault fails the test on its own. [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/), [gov.uk understanding your result](https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test) (both relayed, pages not opened)

gov.uk is explicit that a mistake does not end the test: you can carry on if you make a mistake, and it might not affect the result if it is not serious. [gov.uk](https://www.gov.uk/driving-test/what-happens-during-test) (relayed, page not opened)

### Item by item: what the examiner assesses

**Read this caveat first.** DT1 Annex 6 contains DVSA's own assessment criteria for each competency. **I could not obtain that text.** The descriptions below come from instructor sites, via the sibling research file research/marking-dl25.md, and are labelled unofficial throughout. They are a reasonable guide to what each box covers. They are **not** DVSA's wording, and the driving-to-serious threshold given for each item is my reasoning unless stated otherwise. (reasoned)

The competency numbering below follows the run that three independent instructor sites agreed on. The sibling file records that the pre drive and manoeuvre boxes, numbers 1 to 10, are **not** reliably established and sources conflict on them. (relayed from research/marking-dl25.md)

#### 11 Precautions

Precautions before starting the engine: doors, seat, mirrors, seatbelt, handbrake on, gear in neutral. [booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial)

Where the line plausibly sits: forgetting a mirror adjustment is a driving fault. Starting the engine in gear so the car lurches is control, and potentially serious. (reasoned, unverified)

#### 12 Control: accelerator, clutch, gears, footbrake, parking brake, steering

Six sub boxes. "Accelerator (smooth use of the gas pedal), Clutch (not allowing the vehicle to go into a stall when slowing down or stopping), Gears (choosing the correct gear for the driving conditions), Footbrake (harsh braking or sudden braking needs to be avoided), Handbrake (do not use the handbrake to stop the vehicle), Steering (avoid making sudden movements)." [nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/) (unofficial)

Steering appears in DVSA's own published top 10 faults list as "not having proper control of the steering". [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/) (relayed, page not opened)

Where the line plausibly sits: a single stall in a safe place, restarted calmly, is a driving fault. A stall that blocks a junction or a roundabout exit, or mounting the kerb, moves towards serious. Mounting the kerb was specifically raised in DVSA's 2024 webinar Q and A. (reasoned for the threshold; the webinar topic list is [despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/), relayed)

#### 13 Move off: safely, under control

Two sub boxes. "moving off in control (without stalling) and safely (looking all around, including your blind spots, and signalling if necessary)". [booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial) "Safety involves checking your blind spot, and Control involves not stalling or labouring the vehicle." [nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/) (unofficial)

"Not moving off safely" is named among DVSA's published top 10 faults. [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/) (relayed, page not opened)

DT1 requires the test to include specific varieties of moving off. The test must always include an **angle start**, moving off at an angle from behind a stationary vehicle. Wherever possible the ability to move off on a reasonably steep **uphill gradient** should be tested, and if stopping on a hill is not possible an additional designated stop must be conducted. [gov.uk DT1 section 1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test) (relayed, page not opened)

Since 24 November 2025 the number of stops in a test is 3 rather than 4. [despatch.blog.gov.uk](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/) (relayed, page not opened). Older DT1 wording requiring at least 2 normal stops sits alongside that rather than contradicting it, because the angle start and hill start are themselves stops and starts. (reasoned)

Where the line plausibly sits: omitting the blind spot check with nothing coming is a driving fault. Omitting it when a cyclist or car has to alter course is serious. (reasoned, unverified)

#### 14 Use of mirrors: signalling, change direction, change speed

Printed on the form as "Use of mirrors, M/C rear observation" because the same sheet serves motorcycle tests. Three sub boxes. "You must use all mirrors fitted to your vehicle safely and effectively, and always check carefully before signalling, changing direction or changing speed." [booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial)

This is the **second most recorded fault nationally**, every year, behind junctions observation. [passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial, citing DVSA's published rank order)

Where the line plausibly sits: the mirror check that is late is a driving fault. The mirror check that is missing before a change of direction that affects somebody behind is serious. Repetition across the test is the classic route to an upgrade here, because mirrors are checked dozens of times in 35 minutes. (reasoned)

#### 15 Signals: necessary, correctly, timed

Three sub boxes. [dodrive.uk](https://dodrive.uk/driving-test-report-explained/) (unofficial)

Where the line plausibly sits: a signal left on after a turn is a driving fault unless it misleads somebody into pulling out, in which case it is serious. A signal that is never given where another road user needed it is serious. (reasoned, unverified)

#### 16 Clearance and obstructions

Adequate room when passing parked cars, roadworks and other obstructions. The heading "Clearance" is confirmed in the indexed text of the official form PDF. [gov.uk asset](https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf) (relayed from search index text, page not opened)

Where the line plausibly sits: passing a parked car with slightly less room than ideal is a driving fault. Passing close enough that an opening door would be struck is serious. (reasoned, unverified)

#### 17 Response to signs and signals: traffic signs, road markings, traffic lights, traffic controllers, other road users

Five sub boxes. [learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/responce) (unofficial)

Two entries in DVSA's own top 10 sit here. Rank 8 is "not responding correctly to road markings", including not following direction arrows, straddling lanes, crossing double white lines, and ignoring box junctions. [despatch.blog.gov.uk webinar slides](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf) (relayed, page not opened). "Not responding appropriately to traffic lights" is also named in the top 10. [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/) (relayed, page not opened)

Where the line plausibly sits: this box is where the "breach of the law" limb bites hardest. Crossing a double white line, entering a box junction when the exit is not clear, or passing a red light are law breaches, so they are available as serious faults without anybody being endangered. (reasoned, from the DT1 definition; the examples are my inference and are not a DVSA list)

#### 18 Use of speed

"Driving at a realistic speed appropriate to the road and traffic conditions, and approaching all hazards at a safe, controlled speed." [l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (unofficial)

DVSA's top 10 rank 10 is "not driving at a safe and reasonable speed", including driving over the speed limit and not adjusting speed to road conditions. [despatch.blog.gov.uk webinar slides](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf) (relayed, page not opened)

Where the line plausibly sits: exceeding the limit is a breach of the law and so is available as a serious fault on that limb alone. A brief drift a small amount over, corrected immediately, is commonly marked as a driving fault in practice. That practice is widely reported but I have no DVSA statement of it, so the app must not promise it. (reasoned, unverified)

#### 19 Following distance

"Keeping a safe distance between you and the vehicle in front, and being able to stop safely within the distance you can see to be clear." [l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (unofficial)

Where the line plausibly sits: closing up in slow traffic is a driving fault. Following close enough that an ordinary brake application by the car in front would require emergency braking is serious. (reasoned, unverified)

#### 20 Progress: appropriate speed, undue hesitation

Two sub boxes. "Making safe and reasonable progress along your route while keeping in mind the road, traffic and weather conditions." [learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/progress.htm) (unofficial)

**This is the box that catches nervous candidates, and it is the answer to "can I fail for driving too slowly?".** Yes. Undue hesitation is a marked competency in its own right. Driving well below a safe and reasonable speed for the conditions, or waiting at a junction when a safe gap has clearly been available, is marked here. (reasoned, from the sub box name and description above; I could not obtain DT1's own wording on undue hesitation, see Not found)

Where the line plausibly sits: one over cautious wait at an awkward junction is a driving fault. Repeatedly refusing safe gaps, or crawling on a clear road so that following traffic has to take action, moves towards serious both on the potential danger limb and on the habitual repetition rule. (reasoned, unverified)

The honest thing for the app to say to a nervous candidate: slow is not automatically safe. The examiner is assessing whether the speed suits the road, in both directions. (reasoned)

#### 21 Junctions, including roundabouts: approach speed, observation, turning right, turning left, cutting corners

Five sub boxes. [driving-pro.com](https://driving-pro.com/assessment-criteria-junctions/) (unofficial)

"When turning right, the vehicle should be positioned to the centre of the road as is safe and should not cut the corner; when turning left, the vehicle should be over to the left to avoid swinging out." [driving-pro.com](https://driving-pro.com/assessment-criteria-junctions/) (unofficial)

**Junctions observation is the single most recorded fault nationally, every year, for as far back as the comparable data runs.** [passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial, citing DVSA's published rank order). "Incorrect positioning when turning right at junctions" is separately named in DVSA's top 10. [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/) (relayed, page not opened)

DVSA's 2024 webinar Q and A covered "creeping out when turning right at a junction" and "blind spot checks at roundabouts" specifically. [despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/) (relayed, page not opened)

Where the line plausibly sits: an observation that is taken but taken late is a driving fault. Emerging without effective observation is serious whether or not anything was coming, because the potential for danger is the test, not the outcome. That reading follows directly from "potentially dangerous" in the DT1 definition. (reasoned)

This is the box the Chilwell app should weight most heavily, because the routes from the centre are described as heavy on roundabouts, junctions and crossroads. [ngpassdrivingacademy.co.uk](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/) (unofficial)

#### 22 Judgement: overtaking, meeting, crossing

Three sub boxes. "You will need to show sound judgment when overtaking, meeting or crossing the path of other road users." [driving-pro.com](https://driving-pro.com/assessment-criteria-junctions/) (unofficial)

Where the line plausibly sits: hesitating in a meeting situation on a narrow road is progress or judgement as a driving fault. Forcing an oncoming driver to brake or swerve is serious. Crossing the path of oncoming traffic when turning right without an adequate gap is the classic serious fault here. (reasoned, unverified)

#### 23 Positioning: normal driving, lane discipline

Two sub boxes. "Normal driving position is left lane unless road markings or traffic signs say different. Lane discipline faults include straddling lanes or not using the centre of your lane." [learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/positioning) (unofficial)

DVSA's top 10 rank 9 is "poor positioning on the road during normal driving", including driving too close to the kerb or centre line, and unnecessary right hand lane use on dual carriageways. [despatch.blog.gov.uk webinar slides](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf) (relayed, page not opened)

Where the line plausibly sits: sitting a little wide is a driving fault. Straddling lanes on a roundabout so that a vehicle alongside has to react is serious. (reasoned, unverified)

#### 24 Pedestrian crossings

"You should be able to identify the different types of pedestrian crossing (Puffin, Zebra, Toucan, Pelican, Pegasus and school crossing patrol) and approach each one in a correct way." [l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (unofficial)

Where the line plausibly sits: approaching too fast with nobody waiting is a driving fault. Failing to give way to a pedestrian who has stepped onto a zebra crossing is both a breach of the law and potentially dangerous, so it is serious on either limb. (reasoned, unverified)

#### 25 Position and normal stops

"You should choose a safe, legal and convenient place to stop, close to the edge of the road, where you will not block the road and create a hazard." [l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (unofficial)

Note the three words: safe, legal, convenient. Where the examiner leaves the choice of spot to the candidate, the candidate's own judgement about where it is safe and legal to stop is the thing being assessed. (reasoned)

Where the line plausibly sits: stopping somewhere slightly awkward is a driving fault. Stopping opposite a junction, on a crossing zigzag, or where the car obstructs a lane is serious, and the zigzag case is also a breach of the law. (reasoned, unverified)

#### 26 Awareness and planning

"The driving test examiner is looking to see that you plan ahead to judge what other road users are going to do ... you need to anticipate road and traffic conditions, and act in good time, rather than reacting to them at the last moment." [learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/planning.htm) (unofficial)

This is the least mechanical item on the sheet and the hardest to practise. It is about reading the road far enough ahead that nothing requires a sudden response. (reasoned)

Where the line plausibly sits: arriving at a hazard later than ideal and having to brake firmly is a driving fault. Failing to anticipate something obvious, so that another road user has to take avoiding action, is serious. (reasoned, unverified)

#### 27 Ancillary controls

The ability to operate all controls and switches bearing on road safety. "using demisters to clear the front windscreen, maintaining control of the vehicle while using one of the controls, and turning on the windscreen wipers when it starts to rain." [l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (unofficial)

Note the middle clause: **maintaining control of the vehicle while using one of the controls**. The assessment is as much about what the car does while you reach for the switch as about finding the switch. (reasoned)

Where the line plausibly sits: fumbling for the demister is a driving fault. Drifting out of lane or looking down for several seconds while doing it is where it turns serious. (reasoned, unverified)

#### Eco safe driving

A separate box with sub boxes for control and planning. "You should drive in an 'eco-friendly manner', considering your impact on the environment, planning well ahead and choosing appropriate gears, avoiding heavy braking and over-revving of the engine." [l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (unofficial)

Instructor sites state eco faults are recorded for feedback only and cannot fail a test. [learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/eco-safe-driving.htm) (unofficial). The sibling agent could not confirm this on any DVSA source. **Treat as unverified and do not state it as fact in the app.** (relayed from research/marking-dl25.md)

#### Vehicle safety questions

One "tell me" question before driving and one "show me" question on the move. Getting one or both wrong costs a single driving fault, recorded under vehicle checks. [rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)

But the driving during the show me question is marked under the ordinary competencies: you will fail if your driving is dangerous or potentially dangerous while you answer it. [gov.uk show me tell me](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions) (relayed, page not opened)

The phrase "when it is safe to do so" in the examiner's wording is the examiner handing the candidate the timing decision, and it is assessed. Doing it immediately, at a junction, while looking down, converts a one fault question into a possible serious fault. (reasoned)

DT1's own list of the questions sits at [gov.uk DT1 section 13](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/13-vehicle-safety-check-questions) and [gov.uk DT1 annex 1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars) (relayed, pages not opened). The sibling file research/test-structure.md has the six confirmed show me questions and notes that a seventh is reported but unconfirmed.

#### The manoeuvres

One reversing manoeuvre is set per test, chosen by the examiner from four: reverse bay park, forward bay park (drive in and reverse out), parallel park, and pull up on the right then reverse about two car lengths and rejoin. The controlled stop is a separate exercise that may also be asked. [gov.uk](https://www.gov.uk/driving-test/what-happens-during-test) (relayed, page not opened)

Reverse in and drive out is only done in a driving test centre car park, while drive in and reverse out can be done in any car park. Same source. (relayed, page not opened)

DT1's examiner wordings for each are in the test wordings chapter and are reproduced in the Quotes section below, carried across from research/test-structure.md. (relayed)

What is assessed in a manoeuvre, in the sibling material's terms, is control, observation and accuracy. I could not obtain DT1's own statement of the three, nor its tolerance for how far out of the bay or from the kerb is acceptable. See Not found. (reasoned)

Where the line plausibly sits: touching the kerb lightly, or finishing a little off line but within the bay, is a driving fault. Finishing across a bay line, mounting the kerb, or reversing without effective observation is serious. The observation limb is the one that most often turns a tidy manoeuvre into a fail, because accuracy is visible to the candidate and observation is not. (reasoned, unverified)

Because Chilwell has a usable car park with seven bays, there is a high chance of a bay park being set at the start or the end of the test, in the centre's own car park. [drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/), [ngpassdrivingacademy.co.uk](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/) (both unofficial)

### Examiner conduct

DT1 tells examiners how to behave, and it is more candidate friendly than most learners expect.

On putting candidates at ease: "A pleasant outgoing approach, not only in the waiting room and on the way to the vehicle, but throughout the test is particularly important to help candidates to relax." [gov.uk DT1 section 1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test) (relayed, page not opened)

On nerves: "If a candidate is in difficulties and clearly suffering from nervousness, the examiner should offer a few words of reassurance to help them settle down." Same source. (relayed, page not opened)

On directions, from the test wordings: "Throughout the drive continue ahead, unless traffic signs direct you otherwise. When I want you to turn left or right, I will tell you in plenty of time." [gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings) (relayed, page not opened)

At roundabouts the examiner's wording includes the exit number, for example "At the roundabout follow the road ahead (it is the second exit)." Same source. (relayed, page not opened). This matters a lot at Chilwell, where the routes are roundabout heavy: the examiner naming the exit removes most of the guesswork. (reasoned)

On quotas, from DVSA's public campaign site rather than DT1: "Examiners don't pass or fail a learner driver because they've been given quotas by the DVSA", and the only number that determines pass or fail is the number of faults accrued during the test. [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-myths) (relayed, page not opened)

**Not obtained:** DT1's fuller chapter on examiner conduct, which on the evidence of the fragments above exists and covers dress, manner, impartiality, conversation during the test, and what an examiner may and may not say. See Not found. (reasoned)

### Candidates asking questions during the test

This is one of the clearest and most useful things in DT1, and it directly contradicts a common learner belief.

"When the candidate asks for the direction to be repeated or confirmation of direction, the examiner should respond in a friendly, positive manner. This is not a 'prompt' as the candidate will have instigated the query themselves in confirming/planning for the junction ahead." [gov.uk DT1 section 1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test) (relayed, page not opened)

Three things follow. Asking "was that the second exit?" is free. It is not recorded. It is expressly distinguished from a prompt, which is a different thing (an examiner volunteering help the candidate did not ask for). (reasoned, from the wording above)

The practical advice for the app: if you did not hear the direction, ask. The cost of asking is zero and the cost of guessing wrong at a roundabout is a lane change under pressure. (reasoned)

On going the wrong way, from DVSA's campaign site: "Independent driving is not a test of how you follow directions." [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-skills/following-routes/) (relayed, page not opened). A wrong turn is not a fault in itself. What is marked is the reaction to it: a sudden U-turn, reversing dangerously, or ignoring a no entry sign. [thedtc.co.uk](https://www.thedtc.co.uk/ready_to_pass/independent-driving) (unofficial), [safedrivingforlife.info](https://www.safedrivingforlife.info/blog/cars/practical-driving-test-understanding-independent-drive/) (unofficial, DVSA's publishing partner)

**Not obtained:** whether DT1 says anything about candidates asking substantive questions during the test, for example "was that alright?", as distinct from asking for a direction to be repeated. The quote above covers directions only. See Not found. (reasoned)

### The examiner taking action (ETA)

ETA stands for "examiner took action". It is marked under V for verbal (the examiner spoke to prevent something) or P for physical (the examiner used the dual controls or took the wheel). [rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)

On verbal: it covers the examiner speaking to redirect the candidate, for example warning about a cyclist or telling the candidate to slow for a junction, where the prompt was necessary for safety. An ordinary route instruction is not an ETA. Same source. (unofficial)

On physical: the dual brake, the steering wheel, or any other physical control. Described as a clear safety event and as nearly always paired with a dangerous fault. Same source. (unofficial)

On the relationship to the fault: "An ETA is not itself the fault; it is a record of the intervention", and "The verbal ETA box should be marked when the examiner's intervention directly prevents a fault from becoming hazardous or serious". [passrates.uk](https://passrates.uk/guide/driving-test-failed-rules) (unofficial)

And in the other direction: "A dangerous fault is marked as dangerous whether or not the examiner had to act, the absence of an intervention does not downgrade it." Same source. (unofficial)

gov.uk's public page confirms the marking exists: if the examiner had to tell the candidate to do something, or take control of the car to avoid an incident, the result shows ETA. [gov.uk understanding your result](https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test) (relayed, page not opened)

**Caution for the app.** Several instructor sites flatten this to "you can assume an ETA is always a serious fault". That is a reasonable rule of thumb but it is not a DVSA statement and must be presented as a rule of thumb. (relayed from research/marking-dl25.md, reasoned)

The practical advice for a candidate: if the examiner touches a control or says something urgent, the test is probably already lost, but keep driving properly to the end. The examiner still has to get back to the centre, and there is nothing to be gained from giving up. Marks already recorded do not get worse, and a candidate who falls apart after one intervention can turn one serious fault into several. (reasoned)

**Not obtained:** DT1's own definition of ETA, the exact printed label of the box, and whether an ETA can ever be recorded without a serious or dangerous fault in the same test. All three were searched for by the sibling agent and not found on any DVSA source. See Not found. (relayed from research/marking-dl25.md)

### Test terminated

gov.uk, public facing: your driving examiner will only stop your test if they think your driving is a danger to other road users. [gov.uk](https://www.gov.uk/driving-test/what-happens-during-test) (relayed, page not opened)

DT1, examiner facing, is more detailed. There will be occasions when a candidate's driving on test becomes so dangerous that the safety of the public, the examiner or the candidate is threatened, and in those circumstances the examiner should stop the test. The examiner issues a statement of failure and tells the candidate the test has been stopped before completion for reasons of public safety. Once the examiner decides a test must be terminated, they bring it to an end as soon as it is safe, direct the learner to stop in a safe location and explain why the test has been terminated. [gov.uk DT1 section 1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test) (relayed, page not opened)

Four things worth drawing out of that for the app. The bar is genuine danger, not a bad manoeuvre. The test does not stop at the instant of the fault, it stops as soon as it is safe to stop. The candidate is told why. And a terminated test is still a failed test with a statement of failure, not a void one. (reasoned)

A test can also end early for reasons that are nobody's fault, such as a mechanical problem with the car. A new test has to be booked and paid for if the test cannot be completed because of a problem with the candidate or the car. DVSA also sometimes cancels tests, for example if the examiner is unwell. [gov.uk](https://www.gov.uk/driving-test/test-cancelled-bad-weather) (relayed, page not opened)

A separate early ending: the eyesight check. "If the candidate fails to read the third plate, and the examiner is satisfied beyond doubt of their inability to comply with the eyesight requirement, they should be informed they have not reached the required eyesight standard, this means they have not passed and the remainder of the test will not be carried out." [gov.uk DT1 section 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters) (relayed, page not opened)

The honest framing for a nervous candidate: a test being stopped early is rare, requires real danger, and is not what happens when you stall or clip a kerb. (reasoned)

### What this means for a candidate at Chilwell

Nothing in DT1 is Chilwell specific. The manual, the fault definitions and the marking are national. (reasoned)

What is local is which competencies get exercised most. Chilwell routes are described as mainly urban, with little country road nearby, and heavy on roundabouts, junctions and crossroads, ranging from quiet back roads to busy main streets. [ngpassdrivingacademy.co.uk](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/) (unofficial)

So the DT1 items that will be exercised hardest at Chilwell are junctions observation, mirrors on changing direction, positioning and lane discipline on roundabouts, and response to road markings. Those are also four of DVSA's national top 10. Progress and undue hesitation will matter more than on a rural route, because urban roundabouts punish a candidate who will not take a gap. (reasoned)

The manoeuvre is most likely to be a bay park in the centre's own car park, given the seven bay car park. (reasoned, from the unofficial local sources cited above)

## Quotes worth using

**Every quote in this section is relayed.** Each came to a sibling research agent through a search engine's reading of the page at the given URL, and no page was opened by me or by them. **Each must be opened and checked character by character before the app prints it as a quotation.** Two entries carry an explicit paraphrase risk and are marked. (reasoned)

1. "A driving fault is something that falls short of the standard of a safe and competent driver without being potentially dangerous."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking

2. "A serious fault is one that is potentially dangerous or entails a breach of the law."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking

3. "A dangerous fault is one involving actual danger to the examiner, candidate, the general public, or property."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking

4. "A candidate who habitually commits a driving fault in one aspect of driving throughout the test cannot be regarded as competent to pass the test. The repeated fault can then be assessed as potentially dangerous."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking

5. "The purpose of this annex is to explain the assessment criteria and recording of faults under the outcome/competency headings on the driving test report."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking
   (paraphrase risk: the search summary gave this as a close paraphrase, not certainly verbatim. Verify before quoting.)

6. "A pleasant outgoing approach, not only in the waiting room and on the way to the vehicle, but throughout the test is particularly important to help candidates to relax."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test

7. "If a candidate is in difficulties and clearly suffering from nervousness, the examiner should offer a few words of reassurance to help them settle down."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test

8. "When the candidate asks for the direction to be repeated or confirmation of direction, the examiner should respond in a friendly, positive manner. This is not a 'prompt' as the candidate will have instigated the query themselves in confirming/planning for the junction ahead."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test

9. "If the candidate fails to read the third plate, and the examiner is satisfied beyond doubt of their inability to comply with the eyesight requirement, they should be informed they have not reached the required eyesight standard, this means they have not passed and the remainder of the test will not be carried out."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters

10. "Throughout the drive continue ahead, unless traffic signs direct you otherwise, When I want you to turn left or right, I will tell you in plenty of time."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

11. "I would like to ask you two safety questions about your vehicle, the second question will be a show me question on the move, please make yourself comfortable in the car and I will join you in a moment."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

12. "Would you like your instructor/accompanying driver to accompany you on test?"
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

13. "Now I would like you to drive independently, following the directions from the Satnav until I tell you otherwise. Please don't rely on the speeds shown on the Satnav, as they may not be accurate. Drive on when you are ready."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

14. "Now I would like you to drive independently following the traffic signs for ……., continue to follow the signs until I tell you otherwise. Drive on when you are ready."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

15. "Thank you, that's the end of the independent driving. I will direct you from now on."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

16. "Shortly I shall ask you to carry out an emergency stop."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

17. "When I give this signal, (simultaneously demonstrate, and say) 'Stop,' I'd like you to stop as quickly and as safely as possible."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

18. "Would you pull forward either to the left or the right so that your wheels are straight, then reverse into a convenient parking bay."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

19. "Would you drive forward and stop alongside the car ahead. Then reverse in and park reasonably close to and parallel with the kerb. Try to complete the exercise within about two car lengths."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

20. "Pull up on the right when it is safe to do so, please. I would now like you to reverse for about two car lengths, keeping reasonably close to the kerb."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

21. "That's the end of the test and I'm pleased to say you've passed."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

22. "That's the end of the test and I'm sorry you haven't passed. To help you I'll explain why."
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

23. "Would you like your instructor/accompanying driver to listen to the result and debrief?"
    https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

24. "You can carry on if you make a mistake. It might not affect your test result if it's not serious. Your driving examiner will only stop your test if they think your driving is a danger to other road users."
    https://www.gov.uk/driving-test/what-happens-during-test

25. "Examiners don't pass or fail a learner driver because they've been given quotas by the DVSA."
    https://readytopass.campaign.gov.uk/driving-test/driving-test-myths

26. "Independent driving is not a test of how you follow directions."
    https://readytopass.campaign.gov.uk/driving-skills/following-routes/

## Not found

Everything in this list was required by the brief and could not be established. In every case the blocker was the same and is not recoverable in this session: no page could be opened (`EGRESS_BLOCKED` on every domain, `CONNECT tunnel failed, response 403` on direct curl) and the web search budget was exhausted at 200 of 200 calls before this task began. **I ran zero searches.** The list below is therefore written as an extraction brief for whoever next has an unrestricted browser.

1. **The text of DT1 Annex 6 (or section 11), "Guide to assessment and marking".** This is the single biggest gap and the core of the assigned topic. I have four sentences from it, all relayed. What is needed: the per competency assessment criteria, item by item, and DVSA's own examples of what makes each item a driving fault rather than a serious one. Open https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking and, if it 404s, https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/11-guide-to-assessment-and-marking

2. **DT1's own wording on observation at junctions.** The brief asked for it specifically. Not obtained. What I have on junctions is from instructor sites only.

3. **DT1's own wording on use of mirrors**, including whether it states a required sequence or timing. Not obtained.

4. **DT1's own wording on signals**, including the "necessary, correctly, timed" sub headings. Not obtained beyond the three sub box names from an instructor site.

5. **DT1's own wording on moving off.** I have the angle start and hill start requirements from section 1, relayed. I do not have the assessment criteria for the "safely" and "under control" sub boxes.

6. **DT1's own wording on control**, covering steering, gears, clutch, handbrake, accelerator and footbrake separately. Not obtained.

7. **DT1's own wording on positioning and lane discipline.** Not obtained.

8. **DT1's own wording on use of speed and on progress, including undue hesitation.** This matters most for a nervous candidate and I could not get it. The brief asked specifically about driving too slowly. What I have is the sub box name "undue hesitation" from an instructor site plus reasoning.

9. **DT1's own wording on following distance.** Not obtained.

10. **DT1's own wording on response to signs and signals.** Not obtained beyond the five sub box names.

11. **DT1's own wording on pedestrian crossings**, including whether it distinguishes the crossing types for assessment purposes. Not obtained.

12. **DT1's own wording on awareness and planning.** Not obtained.

13. **DT1's own wording on ancillary controls.** Not obtained.

14. **DT1's own assessment criteria for each manoeuvre**, including any stated tolerance for distance from the kerb, finishing within the bay lines, or the number of corrective shunts permitted. Not obtained. This is a frequently asked question and the app should not guess at a tolerance.

15. **DT1's chapter on examiner conduct.** I have two sentences from section 1 about manner and reassurance. The fuller guidance on impartiality, conversation during the test, and what an examiner may and may not say was not obtained.

16. **DT1's definition of "examiner took action"**, the exact printed label of the ETA box, and whether an ETA can be recorded without a serious or dangerous fault in the same test. The sibling agent searched for all three and found nothing on a DVSA source. Everything in this file about ETA comes from unofficial sites.

17. **DT1's distinction between a "prompt" and an ETA.** The candidate question quote refers to a prompt as a defined thing, which implies DT1 defines it elsewhere. Not obtained.

18. **Whether DT1 addresses candidates asking substantive questions during the test** ("was that alright?", "did I do that correctly?") as distinct from asking for a direction to be repeated. Only the directions case was obtained.

19. **Any numeric threshold for how many repeated driving faults in one competency become a serious fault.** Recorded in research/marking-dl25.md as searched for and not published by DVSA. It is examiner judgement.

20. **Which DT1 section 1 URL is current.** Two are in circulation, `/1-car-driving-test` and `/01-the-practical-driving-test-and-extended-test-for-cars`, and the sibling agent could not establish which is live. Both are cited in this file as relayed.

21. **Whether DT1 has been updated since the 24 November 2025 test changes.** The "38 to 40 minutes" and "at least 2 normal stops" figures attributed to DT1 predate them. The change history on the DT1 landing page would settle it.

22. **Whether eco safe driving faults can contribute to a fail.** No DVSA source found either way.

23. **The DVSA top 10 faults at ranks 3 to 7 in published order.** Ranks 8, 9 and 10 are relayed verbatim from the DVSA webinar slides and ranks 1 and 2 are well corroborated. The slides PDF has the rest: https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf

24. **The gov.uk page "Understanding your driving test result".** Flagged in research/marking-dl25.md as probably the single most useful page for this app. Not opened by anyone in this session. https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test

25. **Anything Chilwell specific in DT1.** There is nothing to find. DT1 is national. This is the one item on this list that does not need chasing. (reasoned)

## Sources

**No URL in this list was opened by me.** Every fetch attempt returned `EGRESS_BLOCKED` and a direct curl returned a 403 from the egress proxy. Entries 1 to 12 are DT1 chapter URLs established by the sibling research agents in this repository from search results. Entries 13 onward are the other sources whose content this file relays. Each note says what the source gave.

DT1 chapters and annexes:

1. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1
   The DT1 landing page. Not opened. Would give the chapter list and the change history.
2. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking
   The fault definitions, the habitual fault rule, and the statement of the annex's purpose. The core source for this topic and the one most needing to be opened.
3. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/11-guide-to-assessment-and-marking
   The newer URL for the same material. Use if the annex path 404s.
4. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test
   Examiner conduct and nerves, the candidate asking for a direction to be repeated, the angle start and hill start requirements, and the test termination guidance.
5. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/01-the-practical-driving-test-and-extended-test-for-cars
   The other section 1 URL. The 38 to 40 minute duration figure.
6. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings
   Every scripted examiner wording used in this file.
7. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-7-test-wordings-all-categories
   The older URL for the test wordings.
8. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters
   The eyesight check failure procedure and the test not continuing.
9. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/13-vehicle-safety-check-questions
   The show me and tell me question wordings.
10. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars
    The older URL for the car safety check questions.
11. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/8-candidates-with-a-disability-health-condition-or-learning-difficulty
    Adjustments, including extra time for instructions and two test periods for profoundly deaf candidates.
12. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/04-the-taxi-test
    Not relevant to a car test. Listed because it was found, and it confirms the chapter URL pattern.

Other DVSA and gov.uk sources relayed in this file:

13. https://www.gov.uk/driving-test/what-happens-during-test
    The test structure, the manoeuvre list, and the statement that a mistake does not end the test.
14. https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test
    The 15 fault pass mark, the dangerous fault definition, and the ETA marking.
15. https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/
    DVSA's public wording of the three fault types and the pass mark, and several of the top 10 fault names.
16. https://readytopass.campaign.gov.uk/driving-test/driving-test-myths
    The examiner quota myth.
17. https://readytopass.campaign.gov.uk/driving-skills/following-routes/
    Independent driving is not a test of how you follow directions.
18. https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions
    That dangerous or potentially dangerous driving while answering the show me question fails the test.
19. https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/
    The 24 November 2025 changes: 3 stops rather than 4, emergency stop at 1 in 7, flexible independent driving.
20. https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/
    The November 2024 webinar recap and its Q and A topic list, including repeated driving faults.
21. https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf
    The webinar slides. Ranks 8, 9 and 10 of the top 10 faults.
22. https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf
    The DL25 form itself. Only its indexed text was ever seen, confirming the "Clearance" heading and the ECO, Control, Planning, Physical and Verbal labels.
23. https://www.gov.uk/government/publications/driving-test-marking-sheet
    The publication page for the DL25, and the statement that examiners now record results on a tablet.

Unofficial sources relayed in this file, all named:

24. https://www.adinjc.org.uk/examiner-fault-marking/
    ADI National Joint Council. The "deviation from desired outcome" method and the five point internal scale.
25. https://passrates.uk/guide/practical-test-fault-categories
    The repetition rule restated, junctions observation as the top fault every year, and that DVSA publishes rank order only.
26. https://passrates.uk/guide/driving-test-failed-rules
    That an ETA records the intervention not the fault, and that a dangerous fault is not downgraded by the absence of an intervention.
27. https://www.rateddriving.com/learner-driver/driving-test-results/
    The V and P meanings of the ETA box, and the vehicle checks fault costing one driving fault.
28. https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/
    The six control sub boxes and their descriptions, and the move off sub boxes.
29. https://www.booklearnpass.co.uk/driving-test/marking-sheet/
    Precautions, move off and use of mirrors descriptions.
30. https://l2pcoventry.com/test-report-dl25
    Use of speed, following distance, pedestrian crossings, normal stops, ancillary controls and eco safe driving descriptions.
31. https://www.learnerdriving.com/driving-test/marking/progress.htm
    The progress competency description.
32. https://www.learnerdriving.com/driving-test/marking/positioning
    The positioning and lane discipline description.
33. https://www.learnerdriving.com/driving-test/marking/planning.htm
    The awareness and planning description.
34. https://www.learnerdriving.com/driving-test/marking/responce
    The five response to signs and signals sub boxes.
35. https://www.learnerdriving.com/driving-test/marking/eco-safe-driving.htm
    The claim that eco faults are feedback only, which is unverified.
36. https://driving-pro.com/assessment-criteria-junctions/
    The junctions sub boxes, the turning right and turning left positioning descriptions, and the judgement sub boxes.
37. https://dodrive.uk/driving-test-report-explained/
    The three signals sub boxes.
38. https://www.thedtc.co.uk/ready_to_pass/independent-driving
    That a wrong turn is not a fault and what is marked is the reaction.
39. https://www.safedrivingforlife.info/blog/cars/practical-driving-test-understanding-independent-drive/
    DVSA's publishing partner, on independent driving and wrong turns.
40. https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/
    That Chilwell routes are urban and roundabout heavy, and the likelihood of a bay park in the centre car park.
41. https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/
    The seven bay car park at Chilwell.

Sibling research files in this repository, which are where the relayed material above actually came from:

42. /home/user/annual_plan/chilwell-test/research/marking-dl25.md
    The DT1 fault definitions, the habitual fault rule, the ETA material, the competency item list, and the record of what was searched for and not found.
43. /home/user/annual_plan/chilwell-test/research/test-structure.md
    The DT1 test wordings, the examiner conduct and nerves quotes, the candidate asking for directions quote, the test termination guidance, and the angle start and hill start requirements.
44. /home/user/annual_plan/chilwell-test/CLAUDE.md
    Records the same egress blockage as a known limit, and lists opening the DT1 primary sources as backlog item 1.
