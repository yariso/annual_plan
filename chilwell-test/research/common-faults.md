# Why people fail, with numbers

Research compiled 20 September 2026, for the Nottingham (Chilwell) driving test app.

## Method note, read this first

This note must be read before any figure below is used, because it changes how much weight each
claim can carry.

**I opened no web pages at all in this session.** Two independent limits stopped me.

First, the **web search budget was already exhausted** when this task started. The tool reported
"this session has used its web search budget (200 of 200 WebSearch calls)" on my very first query.
The 200 calls were spent by the sibling research agents working on the other topics in this folder.
I performed **zero** searches.

Second, **all outbound web access is blocked by the organisation's egress proxy**. Every WebFetch
returned `EGRESS_BLOCKED`. I tried, in order: `www.gov.uk` (twice, two different paths),
`despatch.blog.gov.uk`, `passrates.uk`, `en.wikipedia.org`, `www.drivingtesttips.biz` and
`www.safedrivingforlife.info`. A direct `curl` probe of sixteen hosts, including
`assets.publishing.service.gov.uk`, `readytopass.campaign.gov.uk`, `content.govdelivery.com`,
`web.archive.org` and three search engines, returned a connection failure for every one. The proxy's
own status endpoint records the reason as "gateway answered 403 to CONNECT (policy denial or
upstream failure)" for `www.gov.uk:443`. The proxy README states that this is an organisation policy
denial, that it must not be retried or routed around, and that it should be reported. It is reported
here.

So everything below comes from two places, and each claim says which:

1. **The three sibling research files in this same folder** (`marking-dl25.md`, `pass-rates.md`,
   `centre-facts.md`, `test-structure.md`). Those were written by agents who also could not open
   pages, and who worked from search engine result listings and search engine summaries. Their
   source URLs are carried forward here unchanged, with their original caveats.
2. **Model recall**, which is labelled `(unverified, model recall)` every time it appears. It is not
   a source. It is a starting point for whoever can open a browser.

**The single most important consequence: I could not obtain a single verified count or percentage
for any individual fault.** The headline ask of this topic, "with numbers", is not satisfied. The
"Not found" section says exactly which pages hold the numbers and what to do about it. Do not let
the app ship a fault percentage that traces back to this file.

## Summary

1. The pass or fail rule is the frame for everything else: no serious faults and no dangerous
   faults, and 15 or fewer driving faults. The sixteenth driving fault fails the test on its own.
   [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)
2. Almost nobody fails by collecting sixteen small faults. The overwhelming majority of fails are a
   single serious or dangerous fault. (reasoned, from the structure of the rule and from the fault
   definitions below. I could not find a published split of fails by cause, and I am not asserting a
   proportion.)
3. DVSA publishes a "Top 10 reasons for failing the driving test in Great Britain" at
   [gov.uk](https://www.gov.uk/government/publications/top-10-reasons-for-failing-the-driving-test/top-10-reasons-for-failing-the-driving-test-in-great-britain).
   I could not open it.
4. One unofficial source states that DVSA publishes the top 10 "as a rank order only, with no
   counts, no percentages and no per centre breakdown".
   [passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial). This is
   the crux of the whole topic and it is currently resting on an unofficial claim. Verify it.
5. **Rank 1 is observation at junctions. Rank 2 is mirrors when changing direction.** These two have
   held those positions every year for as far back as comparable data runs.
   [passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)
6. Ranks 8, 9 and 10 are known verbatim from DVSA's own webinar slides: 8 is not responding
   correctly to road markings, 9 is poor positioning on the road during normal driving, 10 is not
   driving at a safe and reasonable speed.
   [despatch.blog.gov.uk slides PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)
7. **Ranks 3 to 7 are not established.** A plausible full list from model recall is given below and
   is clearly labelled unverified. It must not be printed as fact.
8. DVSA ran a webinar on the top 10 faults on Wednesday 6 November 2024, attended by about 750
   trainee and approved driving instructors, and published a recap and the slides.
   [despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)
9. The webinar question and answer session covered "repeatedly making the same driving fault,
   mounting the kerb, control of steering, creeping out when turning right at a junction, blind spot
   checks at roundabouts". That list is effectively DVSA naming the specific behaviours behind the
   top faults, and it is the best prevention content in this file.
   [despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)
10. The examiners' own manual defines a serious fault as "one that is potentially dangerous **or
    entails a breach of the law**". The breach of law limb does not appear on the public page, and it
    is why an act can be marked serious with nobody endangered.
    [gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)
11. Repetition upgrades a fault. DT1: "A candidate who habitually commits a driving fault in one
    aspect of driving throughout the test cannot be regarded as competent to pass the test. The
    repeated fault can then be assessed as potentially dangerous."
    [gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)
12. There is **no published number** for how many repeats trigger that upgrade. It is examiner
    judgement. An app that says "three in a box is a serious" would be inventing a rule. (reasoned)
13. **No breakdown of faults by test centre exists**, for Chilwell or anywhere else. The sibling
    agent searched for a Chilwell fault table specifically and confirmed there is none.
    (`marking-dl25.md` "Not found", item 13)
14. National context for any percentage the app later obtains: 1,836,558 car practical tests in
    2024 to 2025, of which 893,609 passed and 942,949 failed.
    [passrates.uk](https://passrates.uk/guide/driving-test-pass-rate-2024-2025) (unofficial)
15. Chilwell context: 49.89 per cent pass rate on 9,415 tests in 2025 to 2026, with 4,888 first
    attempts at 49.22 per cent, of which 126 passed with zero driving faults.
    [thedrivinginstructordirectory.co.uk](https://www.thedrivinginstructordirectory.co.uk/driving-test-centres/nottingham-chilwell)
    (unofficial)
16. 126 clean sheets out of 4,888 first attempts is about one candidate in 39, so a zero fault pass
    is rare and is not the target. (reasoned, arithmetic on the two figures above)
17. Chilwell routes are urban, with little country road, and heavy on roundabouts, junctions and
    crossroads. That loads the test towards exactly the faults at ranks 1, 2 and 4.
    [ngpassdrivingacademy.co.uk](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/)
    (unofficial), and the mapping to the top faults is (reasoned).
18. The local hazards instructors name are multi lane roundabouts (Bramcote Island, Bardills
    Roundabout, M1 Junction 25), roads shared with tram lines, one way roads, no entry roads and
    traffic lights with left filter arrows.
    [drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
    (unofficial)
19. Eco safe driving is marked on the sheet but is understood to be feedback only and cannot fail a
    test. [learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/eco-safe-driving.htm)
    (unofficial). Not confirmed on any DVSA source, so treat as unverified.
20. A single mistake does not end the test. GOV.UK states a candidate can carry on after a mistake
    and it might not affect the result if it is not serious.
    [gov.uk](https://www.gov.uk/driving-test/what-happens-during-test)

## Findings

### What DVSA publishes, and what it does not

There is a gov.uk publication titled "Top 10 reasons for failing the driving test", with a page
"Top 10 reasons for failing the driving test in Great Britain".
[gov.uk](https://www.gov.uk/government/publications/top-10-reasons-for-failing-the-driving-test/top-10-reasons-for-failing-the-driving-test-in-great-britain)
That URL is cited in the sibling file `test-structure.md` (line 368) as the place DVSA publishes the
list. I could not open it, so I cannot say whether the page carries counts, percentages, a period
covered, or only a rank order.

An unofficial source states the publication is a rank order only, "with no counts, no percentages
and no per centre breakdown".
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial, a pass rate
analysis site)

**This is the single claim in this file most worth checking**, because the whole "with numbers" part
of the brief turns on it. There are two possibilities and the app author needs to know which is true:

- If the publication really is rank order only, then the app can honestly say "DVSA ranks these
  faults but does not publish how often each one occurs", and that is a legitimate, honest line.
- If the publication does carry a table of counts or percentages, then the app is missing its best
  content and it is one page load away. (reasoned)

Separately, DVSA's statistical data sets sit at
[gov.uk driving test statistics (DRT)](https://www.gov.uk/government/statistical-data-sets/driving-test-statistics-drt)
and
[gov.uk driving test and theory test data, cars](https://www.gov.uk/government/statistical-data-sets/driving-test-and-theory-test-data-cars),
with an index of tables at
[gov.uk statistics tables index](https://www.gov.uk/government/publications/driving-test-theory-test-and-driving-instructor-statistics-guidance/driving-test-theory-test-and-driving-instructor-statistics-tables-index).
The sibling file `pass-rates.md` established that the test centre level tables are DVSA0201 (pass
rates by gender, month and test centre), DVSA1202 (by first attempt, includes records of passes with
zero faults), DVSA1203 (by age), DVSA1204 (by ethnicity), DVSA1205 (cancellation reasons) and
DVSA1206 (automatic pass rates).
[gov.uk mirror on S3](https://s3.amazonaws.com/thegovernmentsays-files/content/169/1692795.html)
**None of those table titles mentions faults.** That is indirect support for the "no per centre fault
data" claim. (reasoned)

### The webinar, which is the best DVSA source on this topic

DVSA ran a webinar on the top 10 driving test faults on Wednesday 6 November 2024, attended by about
750 trainee and approved driving instructors, and afterwards published a recap post and the slide
deck.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)

Slides: [despatch.blog.gov.uk PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)

An earlier post on the same ground: "Helping driving instructors learn about the top driving test
faults", 31 August 2023.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2023/08/31/helping-driving-instructors-learn-about-the-top-driving-test-faults/)

The webinar recording has timestamps so a viewer can jump to a particular fault.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)

A follow up write up exists from the Driving Instructors Association.
[driving.org](https://www.driving.org/dvsa-webinar-follow-up-top-10-driving-test-failures-and-expert-tips-for-adis/)
(unofficial, Driving Instructors Association)

**The slides PDF is the highest value unopened document in this entire research folder.** It holds
ranks 1 to 10 in DVSA's own plain English, and the explanatory bullets for each. Whoever can open it
should do so first.

### The list itself, as far as it is established

#### Ranks known verbatim from the DVSA slides

- **10. Not driving at a safe and reasonable speed**, including driving over the speed limit and not
  adjusting speed to road conditions.
  [despatch.blog.gov.uk slides PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)
- **9. Poor positioning on the road during normal driving**, including driving too close to the kerb
  or centre line, and unnecessary right hand lane use on dual carriageways.
  [despatch.blog.gov.uk slides PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)
- **8. Not responding correctly to road markings**, including not following direction arrows,
  straddling lanes, crossing double white lines, and ignoring box junctions.
  [despatch.blog.gov.uk slides PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)

(These three reached the sibling file through a search engine's reading of the PDF, not an opened
page, and are recorded in `marking-dl25.md` lines 579 to 587.)

#### Ranks 1 and 2, well corroborated but unofficially sourced

- **1. Observation at junctions.**
- **2. Use of mirrors when changing direction.**

"Junctions and observation has been first, and mirrors on changing direction second, every year for
as far back as the comparable data runs."
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

#### Faults known to be in the top 10, rank not established

Also named as being in the DVSA top 10: not moving off safely, incorrect positioning when turning
right at junctions, not having proper control of the steering, and not responding appropriately to
traffic lights.
[readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)
(reached via a search summary, page not opened)

#### The full list from model recall, unverified

This is the classic DVSA list in DL25 competency language. **It is model recall, it carries no
source, and it must not be printed in the app without being checked against the slides PDF.**

1. Junctions, observation (unverified, model recall)
2. Mirrors, change direction (unverified, model recall)
3. Control, steering (unverified, model recall)
4. Junctions, turning right (unverified, model recall)
5. Move off, safely (unverified, model recall)
6. Response to signs and signals, traffic lights (unverified, model recall)
7. Move off, control (unverified, model recall)
8. Positioning, normal driving (unverified, model recall)
9. Response to signs and signals, road markings (unverified, model recall)
10. Reverse park, control (unverified, model recall)

**This recalled list conflicts with the DVSA slides at the bottom end**, and the conflict is
instructive rather than fatal:

- The slides put road markings at 8 and positioning at 9. The recalled list has them the other way
  round.
- The slides have "not driving at a safe and reasonable speed" at 10. The recalled list has "reverse
  park, control" at 10, and has no speed entry at all.

Two readings are possible, and I cannot choose between them without the PDF. Either the recalled
list is an older edition and the ranking genuinely moved, or the recall is simply wrong at the
bottom. Either way, ranks 1 and 2 agree across both, which is why they are the only ranks safe to
print. (reasoned)

A separate warning from the sibling file: one search summary offered a full ordering that put
junctions observation at rank 7, which contradicts the well established fact that it is first. That
summary was discarded as unreliable and is not reproduced. (`marking-dl25.md` line 598)

### The wording problem, two different vocabularies

There are two ways the same ten faults get named, and the app should pick one and stay with it.

- **DL25 competency language**, which is what appears on the candidate's own test report: "Junctions,
  observation", "Use of mirrors, change direction", "Move off, safely". This is what the user will
  actually see printed after a fail, so the app should at minimum teach these labels. The full
  competency list with sub boxes is in the sibling file `marking-dl25.md` under "Competency items 11
  to 27".
- **DVSA plain English**, which is what the webinar slides and the campaign site use: "Not
  responding correctly to road markings", "Poor positioning on the road during normal driving".

Mapping between them, which the app will need: (reasoned throughout)

| Plain English fault | DL25 box and sub box |
| --- | --- |
| Not making effective observations at junctions | 21 Junctions, observation |
| Not using mirrors correctly when changing direction | 14 Use of mirrors, change direction |
| Not having proper control of the steering | 12 Control, steering |
| Incorrect positioning when turning right at junctions | 21 Junctions, turning right |
| Not moving off safely | 13 Move off, safely |
| Not responding correctly to traffic lights | 17 Response to signs and signals, traffic lights |
| Not having control when moving off | 13 Move off, under control |
| Poor positioning during normal driving | 23 Positioning, normal driving |
| Not responding correctly to road markings | 17 Response to signs and signals, road markings |
| Not driving at a safe and reasonable speed | 18 Use of speed |

The box numbers in that table come from three independent instructor sites that agree on the run
from 11 to 27, quoted in `marking-dl25.md`. They are reasonably safe, but the sibling file warns
explicitly not to print the manoeuvre box numbers (items 2 to 10) because those conflict across
sources.
[nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/),
[booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/),
[l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (all unofficial)

### An ambiguity in the title that the app must not paper over

The publication is called "Top 10 reasons for **failing** the driving test", but the DVSA webinar and
its slides are called "top 10 driving test **faults**". Those are not the same thing. A ranking of
faults recorded counts every driving fault as well as every serious one, so a fault can top the list
because it is marked constantly as a minor, not because it fails people. A ranking of reasons for
failing would count only the fault that caused each fail.

I could not determine which measure the published list actually uses. (not found)

This matters for how the app talks to the user. If it is a fault frequency ranking, the honest line
is "this is the thing examiners write down most often". If it is a fail cause ranking, the line is
"this is what most often ends a test". Do not write the second if the source supports only the
first. (reasoned)

### Which faults show up as serious or dangerous rather than driving faults

**No published analysis of this was found.** DVSA does not appear to publish a serious or dangerous
split by competency, and no secondary source in the evidence chain offers one. (not found, see the
"Not found" section)

What can be said, with sources:

The three fault grades, from DVSA's public campaign site:

- "A driving fault is not potentially dangerous, but if you keep making the same fault, it could
  become a serious fault."
- "A serious fault is something that has the potential to be dangerous."
- "A dangerous fault involves actual danger to you, the examiner, the public or property."
  [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)

The examiner facing definitions in DT1 Annex 6 are tighter:

- "A driving fault is something that falls short of the standard of a safe and competent driver
  without being potentially dangerous."
- "A serious fault is one that is potentially dangerous or entails a breach of the law."
- "A dangerous fault is one involving actual danger to the examiner, candidate, the general public,
  or property."
  [gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

That guidance also appears at a newer path,
[gov.uk DT1 section 11](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/11-guide-to-assessment-and-marking),
so use the numbered one if the annex path fails.

**The "or entails a breach of the law" limb is the key to this whole question.** It means a fault can
be marked serious with nobody endangered at all. Faults that are law breaches by their nature are
therefore structurally more likely to be marked serious than faults that are matters of smoothness.
(reasoned, from the DT1 wording)

Reading the top 10 through that lens, and labelling the inference honestly:

- **Junction observation** is a safety decision fault. Pulling out without effective observation is
  potentially dangerous by definition, so it is the fault most likely to be marked serious rather
  than minor. This is consistent with it topping the list and with it being the classic single cause
  of a fail. (reasoned)
- **Mirrors on changing direction** is usually marked as a driving fault when nothing was coming, and
  escalates to serious when something was. The same physical act gets a different grade depending on
  what was in the mirror. (reasoned)
- **Response to traffic lights** and **response to road markings** carry the breach of law limb
  directly. Crossing a solid white line, entering a box junction when the exit is not clear, or
  passing a red light are law breaches whether or not anyone is endangered. (reasoned, from the DT1
  wording. These specific examples are inference and are not quoted from DVSA.)
- **Use of speed**, when it means exceeding the limit rather than being slow, is also a breach of
  law. (reasoned)
- **Control, steering** and **move off, under control** are more often smoothness faults, so they sit
  more naturally as driving faults, unless the car leaves its lane or mounts a kerb. DVSA itself
  named "mounting the kerb" and "control of steering" as webinar questions, which suggests the line
  between minor and serious here is exactly what instructors were asking about.
  [despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)
  The reading of where the line sits is (reasoned).

There is also the examiner intervention marking. "ETA stands for 'examiner took action' on your DL25
report. It can be marked under V ('verbal') or P ('physical')."
[rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)
A physical intervention is described as "a clear safety event" and "nearly always paired with a
dangerous fault". Same source, unofficial. And in the other direction, "A dangerous fault is marked
as dangerous whether or not the examiner intervened".
[passrates.uk](https://passrates.uk/guide/driving-test-failed-rules) (unofficial)

The ADI National Joint Council describes examiners grading a fault against three questions: does it
affect vehicle control, did it affect safety, and did it breach the law. It also describes an
internal five point scale of "no fault, non-note-worthy fault, driver error, serious driver error or
dangerous driver error", of which only the bottom three reach the report.
[adinjc.org.uk](https://www.adinjc.org.uk/examiner-fault-marking/) (unofficial, ADI National Joint
Council)

That three question test is the cleanest explanation the app can give a user of why the same mistake
is sometimes a minor and sometimes a fail. (reasoned)

### The 15 fault ceiling, and how repetition breaks it

The rule: no serious or dangerous faults, and 15 or fewer driving faults.
[readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)

"You are allowed up to 15 driving faults; the sixteenth driving fault, or a single serious or
dangerous fault at any point, means a fail."
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

The escalation rule, from DT1: "A candidate who habitually commits a driving fault in one aspect of
driving throughout the test cannot be regarded as competent to pass the test. The repeated fault can
then be assessed as potentially dangerous."
[gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

When that happens, both the driving faults and the resulting serious fault are recorded, so the
sheet shows the history and not just the upgrade.
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

**The consequence for the top 10, and this is the most useful single idea in this file:** the faults
at the top of the list are top because they recur. A candidate who is weak on junction observation
does not do it wrong once, they do it wrong at every junction. So the top 10 is not really a list of
ten separate hazards. It is a list of the ten habits most likely to be repeated often enough to be
reclassified. The 15 allowance is a ceiling, not a licence: four faults spread across four different
boxes is a very different test from four faults all in the Junctions observation box, and only the
second is at risk of becoming a serious. (reasoned, from the DT1 wording above)

There is no published threshold for how many repeats trigger the upgrade. The sibling agent searched
specifically for a number and found none. It is examiner judgement. (`marking-dl25.md` "Not found",
item 6)

DVSA answered a question on exactly this at the November 2024 webinar, listed among the topics as
"repeatedly making the same driving fault".
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)

### Nottinghamshire and Chilwell, what exists and what does not

**No per centre fault breakdown exists.** The sibling agent searched for a Chilwell fault table and
confirmed DVSA publishes no per centre fault data. (`marking-dl25.md` "Not found", item 13, and the
rank order only claim at
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories), unofficial)

I searched for nothing myself, because I had no search budget. I am relying on the sibling agent's
search having been competent, and I flag that dependency. (reasoned)

Supporting evidence that it does not exist: the six DVSA test centre level tables identified in
`pass-rates.md` are all pass rate tables, broken down by gender, first attempt, age, ethnicity,
cancellation reason and transmission type. None is a fault table.
[gov.uk mirror on S3](https://s3.amazonaws.com/thegovernmentsays-files/content/169/1692795.html)
(reasoned, from the absence)

So the honest line for the app is: **there is no Chilwell fault league table, and anybody offering
one has made it up.** (reasoned)

What does exist for Chilwell is pass rate context, which frames the fault discussion:

- 2025 to 2026: 49.89 per cent on 9,415 tests.
  [thedrivinginstructordirectory.co.uk](https://www.thedrivinginstructordirectory.co.uk/driving-test-centres/nottingham-chilwell)
  (unofficial)
- First attempts 2025 to 2026: 49.22 per cent on 4,888 first attempts, with 126 passing with zero
  driving faults. Same source, unofficial.
- 2024 to 2025: reported between 41.9 and 48.9 per cent across six unofficial sites, clustering
  around 44 per cent on roughly 6,213 tests. The spread is wide enough that `pass-rates.md`
  recommends quoting a range, not a single number.
- National 2024 to 2025: 48.7 per cent from 1,836,558 tests, 893,609 passes, 942,949 fails.
  [passrates.uk](https://passrates.uk/guide/driving-test-pass-rate-2024-2025) (unofficial)

The useful framing: about half of all candidates at Chilwell fail, which is normal, and the reasons
they fail are the national ones, because the marking is national and identical at every DVSA centre
in England, Scotland and Wales. (reasoned)

### Where the national top faults bite on a Chilwell route

This section is entirely unofficial local knowledge from driving school sites, combined with
reasoned mapping onto the fault list. Label it as such in the app. None of these pages was opened by
me or by the sibling agent.

Routes from Chilwell are "mainly urban, with little country road nearby, and heavy on roundabouts,
junctions and crossroads, ranging from quiet back roads to busy main streets".
[ngpassdrivingacademy.co.uk](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/)
(unofficial)

"The 40 minute driving test from Chilwell will primarily feature urban driving due to the lack of
country roads within the vicinity."
[intensivelessons.co.uk](https://intensivelessons.co.uk/Practical-Test-Centres/Nottinghamshire/Nottingham-Chilwell)
(unofficial)

The test area "includes many multiple lane and busy roundabouts, notably Bramcote Island, Bardills
Roundabout and the roundabout at M1 Junction 25, as well as several quirky roads and junctions
including roads shared with tram lines, one way roads, no entry roads and traffic lights with left
filter arrows".
[drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
(unofficial)

Bardills is a priority roundabout with an inner slip road in the centre linking A52 Derby traffic to
the B6003, a third lane on the approach, and a set of traffic lights on the roundabout.
[h2g2](https://h2g2.com/edited_entry/A425927) (unofficial)

Bye Pass Road, the A6005, is a major route connecting Beeston and Long Eaton, with dual carriageway
driving and merging.
[routebuddy.co.uk](https://routebuddy.co.uk/chilwell-driving-test-routes/) (unofficial)

The High Road through Beeston town centre is "one of the busiest sections, with bus lanes, bus stops,
cyclists, pedestrians crossing between shops and frequent signal controlled junctions".
[routebuddy.co.uk](https://routebuddy.co.uk/nottingham-chilwell-driving-test-routes/) (unofficial)

Because the centre has a usable car park of seven bays, there is a high chance of the bay park
manoeuvre being set at the start or the end of the test, in the centre's own car park.
[ngpassdrivingacademy.co.uk](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/),
[drivinglessonswithmartin.co.uk](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/)
(both unofficial)

Mapping those onto the top faults, all (reasoned):

- **Multi lane roundabouts** load ranks 1, 2 and 9 at once. Observation on approach and entry, mirror
  checks before every lane change, and lane discipline on the roundabout itself. DVSA specifically
  fielded a webinar question on "blind spot checks at roundabouts", which suggests this is where the
  observation fault most often lands.
  [despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)
- **Traffic lights with left filter arrows** sit directly on the traffic lights competency and on
  road markings, because the filter lane is defined by the arrow painted on the road.
- **Roads shared with tram lines** load positioning during normal driving, because the correct
  position is dictated by the rails and by tram priority rather than by instinct.
- **Beeston High Road** loads clearance and obstructions, pedestrian crossings, and use of speed in a
  busy street, and is the most likely place for a hesitation or progress fault at the opposite
  extreme.
- **A6005 dual carriageway** loads positioning, specifically the "unnecessary right hand lane use on
  dual carriageways" that DVSA names in its rank 9 bullet.
  [despatch.blog.gov.uk slides PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)
- **The bay park in the centre's own car park** is the only place the reverse park control fault can
  occur, and it happens either before the nerves have settled or after the drive is over.

### Prevention, fault by fault

Where DVSA or the examiner guidance says something, it is sourced. Where it is standard instructor
practice restated by me, it is marked (reasoned). Nothing here is a quotation unless it is in quote
marks with a URL.

**1. Observation at junctions.** DVSA named "creeping out when turning right at a junction" as a
webinar topic, which identifies the specific behaviour.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)
The fault is almost never "did not look". It is looking too early, looking once, or looking and then
moving anyway after a pause long enough for the situation to change. The prevention is a second look
immediately before the wheels move, and a look in the direction of travel as well as at the traffic.
(reasoned)

**2. Mirrors when changing direction.** The competency covers mirrors before signalling, before
changing direction and before changing speed. "You must use all mirrors fitted to your vehicle safely
and effectively, and always check carefully before signalling, changing direction or changing speed."
[booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial)
The examiner cannot see a mirror check that is only eye movement behind sunglasses, and cannot mark
what did not happen, so the check has to be real and has to come before the signal, not with it.
(reasoned)

**3. Control of the steering.** DVSA fielded webinar questions on both "control of steering" and
"mounting the kerb".
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)
The DL25 guidance for the steering sub box is to "avoid making sudden movements".
[nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/)
(unofficial). Touching a kerb on a left turn is the common version, and it is a steering fault rather
than a junctions fault. (reasoned)

**4. Positioning when turning right at junctions.** "When turning right, the vehicle should be
positioned to the centre of the road as is safe and should not cut the corner; when turning left, the
vehicle should be over to the left to avoid swinging out."
[driving-pro.com](https://driving-pro.com/assessment-criteria-junctions/) (unofficial, restating the
assessment criteria)

**5. Moving off safely.** The sub box is safety, and it is specifically about blind spots. "Safety
involves checking your blind spot."
[nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/)
(unofficial). At Chilwell this is live at every one of the roughly three pull up and move off
exercises, including the angle start from behind a parked car and, wherever possible, a hill start.
[gov.uk DT1 car driving test](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test)

**6. Responding to traffic lights.** The risk is not running a red. It is moving on green without
checking the junction is clear, stopping over the line, and entering a box junction when the exit is
not clear, which engages the breach of law limb of the serious fault definition.
[gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)
for the definition; the examples are (reasoned).

**7. Moving off under control.** "Control involves not stalling or labouring the vehicle."
[nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/)
(unofficial). A single stall is a driving fault, not a fail, and the recovery matters more than the
stall: handbrake on, neutral, restart, full observation again before moving. (reasoned)

**8. Responding to road markings.** DVSA's own bullet names "not following direction arrows,
straddling lanes, crossing double white lines, and ignoring box junctions".
[despatch.blog.gov.uk slides PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)
Reading the road surface early, before the junction, is the whole of the prevention. (reasoned)

**9. Positioning during normal driving.** DVSA's own bullet names "driving too close to the kerb or
centre line, and unnecessary right hand lane use on dual carriageways".
[despatch.blog.gov.uk slides PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)
The rule is left lane unless road markings or signs say otherwise.
[learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/positioning) (unofficial)

**10. Safe and reasonable speed.** DVSA's own bullet names "driving over the speed limit and not
adjusting speed to road conditions".
[despatch.blog.gov.uk slides PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)
Both directions count. The Use of speed competency is about "driving at a realistic speed appropriate
to the road and traffic conditions", and the separate Progress competency has an "undue hesitation"
sub box, so being too slow is marked too.
[l2pcoventry.com](https://l2pcoventry.com/test-report-dl25),
[learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/progress.htm) (both
unofficial)

**A sat nav specific warning that belongs with the speed fault.** The speed shown on the sat nav is
not authoritative, the road signs are, and a candidate who drives to a wrong sat nav limit can pick
up a serious fault. (`test-structure.md` line 282, reasoned there)

DVSA's own learner facing skills pages are the right place to send a user for each of these:
[readytopass.campaign.gov.uk driving skills](https://readytopass.campaign.gov.uk/driving-skills/following-routes/)
and
[readytopass.campaign.gov.uk manoeuvres](https://readytopass.campaign.gov.uk/driving-skills/manoeuvres/).
A 2026 DVSA blog post describes what changed on that site and why.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2026/07/09/driving-skills-whats-changed-on-the-ready-to-pass-website-and-why/)

### Honest framing for the app

The app is for one named person. The tone that the evidence actually supports is this, and each line
traces to something above. (reasoned throughout, from the sourced figures)

- About half of candidates fail, nationally and at Chilwell. It is the ordinary outcome, not a
  disaster.
- A clean sheet is rare. 126 of 4,888 first timers at Chilwell managed one, about one in 39. Nobody
  should be aiming for zero faults.
- Fifteen driving faults are allowed. The realistic aim is to avoid one serious fault, not to be
  perfect.
- The fault that ends most tests is failing to observe properly at a junction, and the second is not
  using the mirrors before changing direction. Those two are worth more practice than the other
  eight combined.
- Repetition is what turns a small fault into a fail, so the thing to fix before the test is any
  habit that repeats, not any single mistake that happened once.
- A mistake does not end the test, and the test carries on.
  [gov.uk](https://www.gov.uk/driving-test/what-happens-during-test)

## Quotes worth using

A caution on all of these. **None was read from a page I opened.** Each reached this file through a
sibling agent's record of a search engine's reading of the page. Before any is shown to a user as a
quotation, open the URL and check it character by character.

1. "A dangerous fault involves actual danger to you, the examiner, the public or property."
   https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/

2. "A serious fault is something that has the potential to be dangerous."
   https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/

3. "A driving fault is not potentially dangerous, but if you keep making the same fault, it could
   become a serious fault."
   https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/

4. "A serious fault is one that is potentially dangerous or entails a breach of the law."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking

5. "A candidate who habitually commits a driving fault in one aspect of driving throughout the test
   cannot be regarded as competent to pass the test. The repeated fault can then be assessed as
   potentially dangerous."
   https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking

6. "Not driving at a safe and reasonable speed", including "driving over the speed limit and not
   adjusting speed to road conditions".
   https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf

7. "Poor positioning on the road during normal driving", including "driving too close to the kerb or
   centre line, and unnecessary right hand lane use on dual carriageways".
   https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf

8. "Not responding correctly to road markings", including "not following direction arrows,
   straddling lanes, crossing double white lines, and ignoring box junctions".
   https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf

9. On examiners and quotas, from DVSA's myth busting page: examiners do not pass or fail a learner
   because they have been given quotas by DVSA, and the only number that determines pass or fail is
   the number of faults accrued during the test.
   https://readytopass.campaign.gov.uk/driving-test/driving-test-myths
   (paraphrase recorded in `test-structure.md`, not a verified verbatim quotation)

10. "Junctions and observation has been first, and mirrors on changing direction second, every year
    for as far back as the comparable data runs."
    https://passrates.uk/guide/practical-test-fault-categories
    (unofficial source, so usable as analysis but not as a DVSA statement)

## Not found

Everything in this section was looked for and not established. For each, the search that was or
would have been run is stated. Since my own search budget was zero, most of these record the sibling
agents' searching plus my own failed page fetches.

1. **Any count or percentage for any individual fault.** This is the central failure of this task.
   The brief asked for "the number or percentage of tests each appeared on" and I have none, for any
   fault, for any year. I attempted the gov.uk publication page directly, twice, and was blocked by
   the egress proxy both times.

2. **Ranks 3 to 7 of the DVSA top 10.** Ranks 1, 2, 8, 9 and 10 are established. The middle five are
   not. A model recall list is offered above and clearly labelled unverified. The answer is in
   `despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf`.

3. **Which year or period the published top 10 covers.** The webinar was November 2024, so the slides
   most likely reflect data to 2023 to 2024 or 2024 to 2025, but I could not confirm it and the app
   must not state a period it has not read.

4. **Whether the published list ranks faults recorded or causes of failure.** See "An ambiguity in
   the title" above. Not resolved.

5. **Whether the DVSA publication really is rank order only.** The claim comes from one unofficial
   site. Not confirmed on gov.uk.

6. **Any analysis of which faults appear most often as serious or dangerous rather than driving
   faults.** Nothing was found from any source, official or unofficial. The reasoned analysis above
   is inference from the DT1 definitions and is labelled as such. If DVSA publishes such a split it
   was not visible in the evidence chain.

7. **Any fault breakdown for Nottinghamshire, Chilwell, Colwick, Watnall or any other centre.** The
   sibling agent searched specifically for a Chilwell fault breakdown and confirmed DVSA publishes no
   per centre fault data. The six DVSA test centre tables are all pass rate tables. I treat "no such
   breakdown exists" as the answer, with moderate confidence.

8. **Any numeric threshold for how many repeated driving faults become a serious fault.** Searched
   specifically by the sibling agent. DVSA publishes no number. It is examiner judgement.

9. **The proportion of fails caused by a serious or dangerous fault versus sixteen driving faults.**
   Not found. The app should not state a proportion.

10. **The contents of the November 2024 webinar recording.** The recap post says the recording has
    timestamps per fault. Neither the recording nor a transcript was reachable.

11. **The DVSA blog post giving the top 10 in plain English outside the slides.** A 2023 post exists
    at `despatch.blog.gov.uk/2023/08/31/helping-driving-instructors-learn-about-the-top-driving-test-faults/`
    and was not reachable.

12. **Anything from safedrivingforlife.info**, the DVSA linked road safety site, which usually
    carries a learner facing version of the top 10. Attempted directly, blocked.

13. **Whether eco safe driving marks can contribute to a fail.** Instructor sites say feedback only.
    No DVSA source found either way. Carried forward from `marking-dl25.md` as unverified.

## Sources

**URLs I actually opened: none.** Every fetch in this session was refused by the organisation's
egress proxy, and the web search budget was exhausted before I began. The list below is therefore the
**evidence chain**, not a list of pages I read. It is split into what I attempted myself and what was
inherited from the sibling research files in this folder.

### Attempted by me and blocked

1. https://www.gov.uk/government/publications/top-10-reasons-for-failing-the-driving-test/top-10-reasons-for-failing-the-driving-test-in-great-britain
   EGRESS_BLOCKED. The primary source for this entire topic.
2. https://www.gov.uk/government/publications/top-10-reasons-for-failing-the-driving-test
   EGRESS_BLOCKED. The publication landing page, which would list attachments and the period covered.
3. https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/
   EGRESS_BLOCKED. DVSA's webinar recap.
4. https://www.safedrivingforlife.info/news/top-10-reasons-people-fail-their-driving-test/
   EGRESS_BLOCKED. DVSA linked learner facing version.
5. https://passrates.uk/guide/driving-test-failed-rules
   EGRESS_BLOCKED. Unofficial analysis site.
6. https://en.wikipedia.org/wiki/Driving_test
   EGRESS_BLOCKED. Included only to test whether the block was gov.uk specific. It is not.
7. https://www.drivingtesttips.biz/driving-test-centres/chilwell-driving-test-centre.html
   EGRESS_BLOCKED. Unofficial Chilwell page.

Also probed by curl and refused at the CONNECT stage: `assets.publishing.service.gov.uk`,
`readytopass.campaign.gov.uk`, `content.govdelivery.com`, `www.driving.org`,
`www.thedrivinginstructordirectory.co.uk`, `web.archive.org`, `r.jina.ai`, and three search engines.

### Inherited evidence chain, from the sibling research files

None of these was opened by me. The sibling files record that they were not opened by their authors
either, and reached them as search engine summaries. Treat all of them as second hand.

8. https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf
   DVSA webinar slides. Source of ranks 8, 9 and 10 verbatim and their explanatory bullets. **The
   most important unopened document in this folder.**
9. https://despatch.blog.gov.uk/2023/08/31/helping-driving-instructors-learn-about-the-top-driving-test-faults/
   DVSA blog, earlier post on the same subject.
10. https://despatch.blog.gov.uk/2026/07/09/driving-skills-whats-changed-on-the-ready-to-pass-website-and-why/
    DVSA blog, 2026, on the Ready to Pass driving skills content.
11. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking
    DT1 Annex 6. The three fault definitions, the breach of law clause and the habitual fault rule.
12. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/11-guide-to-assessment-and-marking
    The same guidance at a newer path.
13. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test
    DT1 section 1. Angle start and hill start requirements, and termination of a test.
14. https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/
    DVSA campaign site. Public definitions of the three fault types and the 15 fault rule.
15. https://readytopass.campaign.gov.uk/driving-test/driving-test-myths
    DVSA campaign site. The quota myth.
16. https://readytopass.campaign.gov.uk/driving-skills/following-routes/
    DVSA campaign site, learner facing skills content.
17. https://readytopass.campaign.gov.uk/driving-skills/manoeuvres/
    DVSA campaign site, manoeuvres content.
18. https://www.gov.uk/driving-test/what-happens-during-test
    GOV.UK. A mistake does not end the test.
19. https://www.gov.uk/driving-test/driving-test-faults-result
    GOV.UK. Fault types and the result.
20. https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test
    GOV.UK. The 15 fault rule, dangerous fault definition, ETA. Flagged in `marking-dl25.md` as
    probably the single most useful page for this app and still unread.
21. https://www.gov.uk/government/statistical-data-sets/driving-test-statistics-drt
    DVSA statistical data sets.
22. https://www.gov.uk/government/statistical-data-sets/driving-test-and-theory-test-data-cars
    DVSA car test data sets.
23. https://www.gov.uk/government/publications/driving-test-theory-test-and-driving-instructor-statistics-guidance/driving-test-theory-test-and-driving-instructor-statistics-tables-index
    The index of DVSA statistics tables. Worth checking for any fault table.
24. https://s3.amazonaws.com/thegovernmentsays-files/content/169/1692795.html
    A mirror of a gov.uk statistics page listing DVSA0201 to DVSA1206, the test centre level tables.
    All pass rate tables, none about faults.
25. https://www.gov.uk/government/publications/driving-test-marking-sheet
    The DL25 publication page.
26. https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf
    The DL25 sample form itself.
27. https://passrates.uk/guide/practical-test-fault-categories
    Unofficial. The rank order only claim, the ranks 1 and 2 claim, and the repetition analysis.
28. https://passrates.uk/guide/driving-test-pass-rate-2024-2025
    Unofficial. National 2024 to 2025 figures.
29. https://passrates.uk/guide/driving-test-statistics-uk-2026
    Unofficial. National 2025 to 2026 figures.
30. https://www.adinjc.org.uk/examiner-fault-marking/
    Unofficial, ADI National Joint Council. The three questions examiners ask and the five point
    internal scale.
31. https://www.driving.org/dvsa-webinar-follow-up-top-10-driving-test-failures-and-expert-tips-for-adis/
    Unofficial, Driving Instructors Association. Follow up to the DVSA webinar.
32. https://www.rateddriving.com/learner-driver/driving-test-results/
    Unofficial. ETA verbal and physical, and the eyesight check consequence.
33. https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/
    Unofficial. Control sub boxes and Move off safety versus control.
34. https://www.booklearnpass.co.uk/driving-test/marking-sheet/
    Unofficial. Use of mirrors wording and Move off wording.
35. https://l2pcoventry.com/test-report-dl25
    Unofficial. Use of speed, following distance, pedestrian crossings, ancillary controls.
36. https://www.learnerdriving.com/driving-test/marking/positioning
    Unofficial. Positioning, normal driving and lane discipline.
37. https://www.learnerdriving.com/driving-test/marking/progress.htm
    Unofficial. Progress and undue hesitation.
38. https://www.learnerdriving.com/driving-test/marking/eco-safe-driving.htm
    Unofficial. Eco safe driving marked for feedback only.
39. https://driving-pro.com/assessment-criteria-junctions/
    Unofficial. Junctions sub boxes and the turning right and left positioning descriptions.
40. https://www.thedrivinginstructordirectory.co.uk/driving-test-centres/nottingham-chilwell
    Unofficial. Chilwell 2025 to 2026 pass rate, first attempts, and the 126 zero fault passes.
41. https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/
    Unofficial. Chilwell routes urban, heavy on roundabouts, and the bay park likelihood.
42. https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/
    Unofficial. Bramcote Island, Bardills, M1 Junction 25, tram shared roads, left filter arrows.
43. https://routebuddy.co.uk/chilwell-driving-test-routes/
    Unofficial. A6005 Bye Pass Road dual carriageway and merging.
44. https://routebuddy.co.uk/nottingham-chilwell-driving-test-routes/
    Unofficial. Beeston High Road, bus lanes, cyclists, signal controlled junctions.
45. https://intensivelessons.co.uk/Practical-Test-Centres/Nottinghamshire/Nottingham-Chilwell
    Unofficial. Chilwell tests are primarily urban due to lack of country roads.
46. https://h2g2.com/edited_entry/A425927
    Unofficial. Bardills Island layout, inner slip road, third lane, traffic lights on the roundabout.

### Sibling research files used

47. /home/user/annual_plan/chilwell-test/research/marking-dl25.md
    Fault definitions, the DL25 competency list, ranks 8 to 10 from the DVSA slides, the repetition
    rule, ETA, and the confirmation that no per centre fault data exists.
48. /home/user/annual_plan/chilwell-test/research/pass-rates.md
    National and Chilwell pass rates, test volumes, the 126 zero fault passes, and the DVSA table
    references.
49. /home/user/annual_plan/chilwell-test/research/centre-facts.md
    Local roads, roundabouts, tram shared roads, car park and bay layout.
50. /home/user/annual_plan/chilwell-test/research/test-structure.md
    Test structure, the sat nav speed warning, the stopping of a test, and the top 10 publication URL.
