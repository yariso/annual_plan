# The marking sheet and how faults are counted

Research compiled 20 September 2026.

## Method note, read this first

Two hard limits shaped this file, and the app author needs to know both before using anything in it.

First, **WebFetch was blocked for every single domain tried**. Not just gov.uk. The egress proxy
refused `www.gov.uk`, `assets.publishing.service.gov.uk`, `www.nidirect.gov.uk`, `en.wikipedia.org`,
`diaryofanadi.co.uk`, `dodrive.uk`, `trainwithdrive.co.uk`, `badadia.co.uk`, `sdsdrivingschool.co.uk`,
`govdiff.njk.onl` and even `example.com`, each with `EGRESS_BLOCKED`. A `curl` to the gov.uk asset
server returned `CONNECT tunnel failed, response 403`. **I did not open a single web page.** Everything
below comes from web search result listings and the search engine's own summaries of pages it read.

Second, the session's **web search budget ran out** (200 of 200 calls, shared with the sibling
research agents) before I could resolve the last few numbering questions. Those are listed honestly
in the "Not found" section.

What this means in practice: the fault definitions and the 15 fault rule are strongly corroborated
across several independent sources including two official DVSA sites, and I would treat them as safe.
The **exact printed wording and box numbering of the DL25 is only partly established**, and the parts
marked as conflicting must not be printed in the app as fact. Somebody with an unblocked browser needs
to open the two gov.uk PDFs named in Sources and check the form against section "The sheet itself"
below before that section ships.

Nothing in this topic is Chilwell specific. The marking sheet and the fault rules are national and
identical at every DVSA test centre in England, Scotland and Wales. (reasoned)

## Summary

1. The form is the **DL25, the driving test report**. DVSA publishes a sample of it on gov.uk at the
   "Driving test marking sheet" publication page, for instructors to use in mock tests.
   [gov.uk](https://www.gov.uk/government/publications/driving-test-marking-sheet)
2. Examiners **no longer normally use paper**. They record the test digitally on a tablet, and use the
   paper DL25 only if there is a problem with the tablet.
   [gov.uk](https://www.gov.uk/government/publications/driving-test-marking-sheet)
3. There are **three fault types**: driving fault (commonly "minor"), serious fault and dangerous fault.
   Serious and dangerous together are commonly called "majors", which is not a DVSA term.
   [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)
4. DVSA's public definition: "A dangerous fault involves actual danger to you, the examiner, the public
   or property." [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)
5. DVSA's public definition: "A serious fault is something that has the potential to be dangerous."
   [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)
6. DVSA's public definition: "A driving fault is not potentially dangerous, but if you keep making the
   same fault, it could become a serious fault."
   [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)
7. The **pass rule**: no serious and no dangerous faults, and 15 or fewer driving faults. The sixteenth
   driving fault fails the test on its own.
   [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/),
   [passrates.uk](https://passrates.uk/guide/practical-test-fault-categories)
8. The examiners' own manual (DT1) words it more tightly than the public site. A driving fault is
   "something that falls short of the standard of a safe and competent driver without being potentially
   dangerous"; a serious fault is "one that is potentially dangerous **or entails a breach of the law**";
   a dangerous fault is "one involving actual danger to the examiner, candidate, the general public, or
   property". The breach of law clause does not appear on the public page.
   [gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)
9. **Repetition upgrades a fault.** DT1: "A candidate who habitually commits a driving fault in one
   aspect of driving throughout the test cannot be regarded as competent to pass the test. The repeated
   fault can then be assessed as potentially dangerous."
   [gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)
10. So the 15 limit is a ceiling, not a licence. Four driving faults spread across four different boxes
    is a very different result from four driving faults all in the Junctions observation box, and only
    the second is at risk of becoming a serious fault. (reasoned, from the DT1 wording above)
11. **ETA means "examiner took action"**, marked V for verbal (the examiner spoke to prevent something)
    or P for physical (the examiner used the dual controls or took the wheel).
    [rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)
12. The ETA mark is a record of the intervention, not the fault itself. The fault is still marked in its
    own competency box, and in practice an ETA sits alongside a serious or dangerous fault.
    [passrates.uk](https://passrates.uk/guide/driving-test-failed-rules) (unofficial)
13. A dangerous fault is marked dangerous whether or not the examiner intervened. Not having to grab the
    wheel does not downgrade it. [passrates.uk](https://passrates.uk/guide/driving-test-failed-rules) (unofficial)
14. Each competency box takes **multiple driving fault marks but only one S and one D**.
    [lpodacademy.co.uk](https://www.lpodacademy.co.uk/understanding-codes-and-markings-on-your-driving-test-report/) (unofficial)
15. At the end the examiner gives the result, a debrief, and the driving test report. On a pass the
    candidate also gets a **pass certificate** on the spot, and can hand over the provisional licence for
    DVLA to issue the full one. [gov.uk driving test](https://www.gov.uk/driving-test/driving-test-faults-result)
16. The examiner's scripted words on a pass are "That's the end of the test and I'm pleased to say you've
    passed." On a fail, "That's the end of the test and I'm sorry you haven't passed. To help you I'll
    explain why." [gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)
17. The examiner asks "Would you like your instructor/accompanying driver to listen to the result and
    debrief?" and there is a **debrief box on the form** that is marked only if the accompanying driver
    actually stays for it. [gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)
18. The debrief is short. Several sources note the emailed or printed result says how many faults and
    which competency, but not where on the route they happened, which is why having the instructor in the
    car is worth doing. [rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)
19. The single most recorded fault nationally, every year, is **observation at junctions**, with mirrors
    on changing direction second. [passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial,
    citing DVSA's published rank order)
20. DVSA publishes the top 10 faults as a **rank order only**, with no counts, no percentages and no
    per centre breakdown, so no Chilwell specific fault league table exists.
    [passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

## Findings

### Where the official sample form lives

The DVSA publication page is "Driving test marking sheet".
[gov.uk](https://www.gov.uk/government/publications/driving-test-marking-sheet)

The page says the sheet "applies to England, Scotland and Wales", that "You can use the driving test
marking sheet (DL25) if you're a driving instructor carrying out a mock driving test", and that "the
forms include guidance notes about how to use them".
[gov.uk](https://www.gov.uk/government/publications/driving-test-marking-sheet)

The attachment itself is at
`https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf`
[gov.uk asset](https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf)

An older path for what appears to be the same file is
`https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1082390/dl25-driving-test-report.pdf`
[gov.uk asset](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1082390/dl25-driving-test-report.pdf)

There is a **second, separate official sheet** for instructors, the "mock driving test marking sheet", at
`https://assets.publishing.service.gov.uk/media/6290d38de90e07039ae3eb97/mock-driving-test-marking-sheet.pdf`
[gov.uk asset](https://assets.publishing.service.gov.uk/media/6290d38de90e07039ae3eb97/mock-driving-test-marking-sheet.pdf)

Useful corroborating detail: the search index shows **both** of those PDFs with the same extracted first
line of text, "Vehicle reg Instructor reg number Eyesight test S S D Clearance S D". That tells us the
two documents share a layout, and that "Vehicle reg", "Instructor reg number" and "Eyesight test" are
genuinely printed header fields on the sheet, with "S" and "D" column headers and "Clearance" among the
competencies. [search index of gov.uk assets](https://assets.publishing.service.gov.uk/media/6290d38de90e07039ae3eb97/mock-driving-test-marking-sheet.pdf)

Two further official companion documents exist for instructors running mock tests:
- "How to mark and assess faults during mock driving tests" (ODT)
  [gov.uk asset](https://assets.publishing.service.gov.uk/media/632d9fdbe90e0711d903e0b4/how-to-mark-and-assess-faults-during-mock-driving-test.odt)
- "Instructions and wording to use during a mock driving test" (ODT)
  [gov.uk asset](https://assets.publishing.service.gov.uk/media/62c822d3e90e077480fd3ce6/instructions-and-wording-to-use-during-mock-driving-tests__5_.odt)

Both are linked from the gov.uk guidance "Carry out mock driving tests for your pupils", which covers
"what needs to be in the test, assessing faults and recording the result".
[gov.uk](https://gov.uk/guidance/carry-out-mock-driving-tests-for-your-pupils)

The DL25 is **not** the same form as the ADI part 3 instructor test sheet, which is a different document
entirely. [gov.uk asset](https://assets.publishing.service.gov.uk/media/6390a78be90e071dfd1e6710/adi-part-3-test-report-form.pdf)

Northern Ireland uses a different authority (DVA) and its own explanatory notes, "Guidance and explanation
of your driving test report", published 15 February 2022. **Do not use the NI notes for a Chilwell
candidate.** [nidirect](https://nidirect.gov.uk/publications/guidance-and-explanation-your-driving-test-report),
[nidirect PDF](https://www.nidirect.gov.uk/sites/default/files/2025-05/cars-guidance-notes-report-explained-car-2022_0.pdf)

### Paper or tablet

DVSA moved to recording tests on a tablet. The gov.uk publication page states examiners "now record
driving test results digitally on a tablet" and "only use these paper forms if there's a problem with
their tablet". [gov.uk](https://www.gov.uk/government/publications/driving-test-marking-sheet)

The development of that app is documented on DVSA's own blog. "Developing an app to electronically
record driving tests", 4 September 2019.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2019/09/04/developing-an-app-to-electronically-record-driving-tests/)

And "Improving the driving test experience for candidates", 14 October 2019, by DVSA lead user
researcher Paul Bailey, which describes designing "the digital test summary report" to make results
easier for candidates to understand, and notes the team visited over 40 test centres.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2019/10/14/improving-the-driving-test-experience-for-candidates/)

Practical consequence for the app: a Chilwell candidate in 2026 should expect the examiner to be working
on a tablet, and should expect a printed or emailed summary rather than a carbon copy. (reasoned)

Historically the paper DL25 was a four part set, DL25A to DL25D, with "The top copy (DL25A) ... forwarded
for fast-keying" and "The second copy (DL25B) ... retained at the driving test centre for 2 years". That
is from an older DSA freedom of information release and describes the pre digital process, so treat it as
history, not current practice.
[gov.uk FOI asset](https://assets.publishing.service.gov.uk/media/5a79089840f0b676f4a7d578/dsa-ia0045812a.pdf)

An old paper form carried the reference "DL25 FCN177477/09", seen in mirrored copies.
[2pass.co.uk mirror](https://www.2pass.co.uk/download/dl25.pdf) (unofficial mirror of a superseded form)

### The three fault types, DVSA's own words

Public facing, on DVSA's Ready to Pass campaign site:

- "A dangerous fault involves actual danger to you, the examiner, the public or property."
- "A serious fault is something that has the potential to be dangerous."
- "A driving fault is not potentially dangerous, but if you keep making the same fault, it could become
  a serious fault."
- "To pass your test, you must have no serious or dangerous faults (sometimes called 'majors') and 15 or
  fewer driving faults (sometimes called 'minors')."

[readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)

Examiner facing, in DT1 Annex 6, the "Guide to assessment and marking":

- "A driving fault is something that falls short of the standard of a safe and competent driver without
  being potentially dangerous."
- "A serious fault is one that is potentially dangerous or entails a breach of the law."
- "A dangerous fault is one involving actual danger to the examiner, candidate, the general public, or
  property."

[gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

The **"or entails a breach of the law"** clause in the serious fault definition is the one that surprises
candidates, because it means an act can be marked serious without anybody being endangered. Crossing a
solid white line, entering a box junction when the exit is not clear, or exceeding the speed limit can
each qualify on the breach of law limb alone. (reasoned, from the DT1 wording; the specific examples are
my inference and are not quoted from DVSA)

DT1 Annex 6 states its own purpose as "to explain the assessment criteria and recording of faults under
the outcome/competency headings on the driving test report", and says it "outlines the requirements of a
driving test, providing a brief explanation of the skills and abilities the candidate is expected to
demonstrate in each aspect of their driving", including "examples of the assessment criteria which serve
as a guide to assessment".
[gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

The same guidance describes the assessment as based on "direct observation of the candidate's driving,
assessed against a set of outcomes/competencies found in the DT1 and the respective DVSA National Driving
Standards", with competence judged on "the making of safety decisions and vehicle control".
[gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

Note that the guidance appears under two gov.uk paths, an older `/annex-6-...` and a newer
`/11-guide-to-assessment-and-marking`, and both were returned by search. Use the numbered one if the
annex one 404s.
[gov.uk DT1 section 11](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/11-guide-to-assessment-and-marking)

### How examiners are trained to weigh a fault

Unofficial but from an instructors' national body. The ADI National Joint Council describes examiners
using a method called "deviation from desired outcome", and grading against three questions: does it
affect vehicle control, did it affect safety, and did it breach the law. It also describes an internal
five point scale of "no fault, non-note-worthy fault, driver error, serious driver error or dangerous
driver error", of which only the bottom three reach the report.
[adinjc.org.uk](https://www.adinjc.org.uk/examiner-fault-marking/) (unofficial, ADI National Joint Council)

That five point scale is worth telling a candidate about, because it explains the common experience of
seeing the examiner write something that never appears on the sheet. A "non-note-worthy fault" is
observed and discarded. (reasoned)

### The 15 driving fault limit, and how repetition breaks it

The rule as published: no serious or dangerous faults, and 15 or fewer driving faults.
[readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)

"You are allowed up to 15 driving faults; the sixteenth driving fault, or a single serious or dangerous
fault at any point, means a fail."
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

The escalation rule, from DT1: "A candidate who habitually commits a driving fault in one aspect of
driving throughout the test cannot be regarded as competent to pass the test. The repeated fault can
then be assessed as potentially dangerous."
[gov.uk DT1 annex 6](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

Restated by a secondary source: "If a candidate accumulates several driving faults in the same category,
the examiner may consider the fault habitual and mark a serious fault in that category", and "repetition
is what changes its grade".
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

When that happens, **both the driving faults and the resulting serious fault are recorded**, so the sheet
shows the history, not just the upgrade.
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

There is **no published threshold** for how many repeats trigger the upgrade. It is a judgement the
examiner makes. Any app that states "three in a box becomes a serious" would be inventing a rule.
(reasoned. I searched for a number and found none. See "Not found".)

DVSA answered a question on exactly this at its November 2024 webinar, listed among the topics as
"repeatedly making the same driving fault".
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)

### The ETA box, examiner took action

"ETA stands for 'examiner took action' on your DL25 report. It can be marked under V ('verbal', meaning
the examiner said something like 'STOP') or P ('physical', meaning the examiner used the dual controls or
grabbed the steering wheel)."
[rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)

On verbal: it covers the examiner speaking to redirect the candidate, for example warning about a cyclist
or telling the candidate to slow for a junction, **where the prompt was necessary for safety**. An
ordinary route instruction is not an ETA.
[rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)

On physical: the dual brake, the steering wheel, or any other physical control. Described as "a clear
safety event" and "nearly always paired with a dangerous fault".
[rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)

The relationship between ETA and the fault itself: "An ETA is not itself the fault; it is a record of the
intervention", and "The verbal ETA box should be marked when the examiner's intervention directly
prevents a fault from becoming hazardous or serious".
[passrates.uk](https://passrates.uk/guide/driving-test-failed-rules) (unofficial)

And importantly in the other direction: "A dangerous fault is marked as dangerous whether or not the
examiner had to act, the absence of an intervention does not downgrade it."
[passrates.uk](https://passrates.uk/guide/driving-test-failed-rules) (unofficial)

The practical advice for a candidate: if the examiner touches a control or says something urgent, the test
is almost certainly already lost, but **keep driving properly to the end**. The examiner still has to get
back to the centre, and there is nothing to be gained from giving up. (reasoned)

One caution for the app. Several instructor sites flatten this to "you can assume an ETA is always a
serious fault".
[rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)
That is a reasonable rule of thumb but it is not a DVSA statement, and it should be presented as a rule of
thumb. (reasoned)

Note also that "ECO", "Control", "Planning", "Physical" and "Verbal" all appear together in the extracted
text of the official form, which supports the ETA box sitting near the eco safe driving box rather than
in the main competency column.
[gov.uk asset](https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf) (inferred from search index text, unverified)

### The sheet itself, item by item

**Warning.** This is the weakest section in the file. I could not open the PDF. Numbering below is
assembled from several unofficial instructor sites that agree with each other for items 11 to 27, and
disagree for items 1 to 10. Treat 11 to 27 as probable, treat 1 to 10 as unresolved.

The form's overall shape, well corroborated: a column of competency headings, and against each one a
wide box for tally marks of driving faults, then a narrow **S** column for serious and a narrow **D**
column for dangerous. Driving faults appear as ticks or slashes, serious as "S", dangerous as "D".
[naylanddrivingschool.co.uk](https://naylanddrivingschool.co.uk/blog/the-driving-test-marking-sheet-explained/) (unofficial),
[rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)

"Across from these you will see three columns. The 1st and slightly wider boxes are where they will
record the driver faults, often referred to as minors. The column labelled 'S' stands for serious and the
column labelled 'D' is for dangerous."
[naylanddrivingschool.co.uk](https://naylanddrivingschool.co.uk/blog/the-driving-test-marking-sheet-explained/) (unofficial)

"Each competency box can receive multiple driver fault ticks, one serious fault mark, or one dangerous
fault mark."
[lpodacademy.co.uk](https://www.lpodacademy.co.uk/understanding-codes-and-markings-on-your-driving-test-report/) (unofficial)

#### Header and administrative fields

Confirmed present from the PDF's own indexed text: **Vehicle reg**, **Instructor reg number**,
**Eyesight test**.
[gov.uk asset](https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf)

Reported by instructor sites, unverified against the form: **Candidate**, **Date**, **Dr./No.** (driving
licence number), **Cat. Type** (vehicle category), **S** (ticked if a driving school car is used),
**D/C** (ticked if dual controls are fitted).
[dodrive.uk](https://dodrive.uk/driving-test-report-explained/) (unofficial)

There is an **insurance and residency declaration at the top of the DL25** that the candidate reads and
signs in the waiting room before the test.
[l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (unofficial)

There is a **debrief box**, marked only if the accompanying driver stays to hear the result.
[gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

#### Pre drive and manoeuvre items, numbers 1 to 10, unresolved

What is certainly on the sheet somewhere:

- **Eyesight test** (item 1a). Failing it ends the test before it starts. "If you do not meet the
  eyesight standard, your practical driving test will not go ahead."
  [rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)
  "If you can't read the licence plate, there is no option for carrying on with the test. You will be
  deemed unsafe to drive and your test will end at that point."
  [nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/) (unofficial)
  **The stated distance conflicts across sources**: 20 metres, 20.5 metres and 21 metres were all quoted.
  See "Not found".
- **Highway Code and safety questions** (item 1b). Used only for categories that do not require a
  separate theory test, such as tractors and specialist vehicles, so **not used on a car test**.
  [dodrive.uk](https://dodrive.uk/driving-test-report-explained/) (unofficial)
- **Controlled stop** (item 2), the emergency stop.
  [booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial)
- **Reverse left**, **reverse right**, **reverse park (road)**, **reverse park (car park)**,
  **forward park**, **turn in the road** all exist as boxes, because the DL25 is used for several test
  categories, not only cars. "The DL25 form is used for various DVSA driving tests, so some of the form
  won't be relevant to your test."
  [search summary of the gov.uk sample form](https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf)
- **Vehicle checks**, where the show me and tell me questions are recorded.
  [rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)
- **Uncouple and recouple**, for trailer tests only.
  [get-towing.co.uk](https://get-towing.co.uk/trailer-licence-training-the-dl25-trailer-driving-test-report-form/) (unofficial)
- **Taxi manoeuvre**, for taxi tests only.
  [gov.uk DT1 taxi test](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/04-the-taxi-test)

The numbering conflict, stated plainly:

- One instructor source gives **box 4 = pull up on the right and reverse, box 5 = reverse bay park,
  box 8 = forward bay park**, as changed on 4 December 2017.
  [andrewbuckler.co.uk](https://www.andrewbuckler.co.uk/the-updated-dl25-examiners-marking-form/) (unofficial, Worksop Driving School)
- A search engine summary of other sources instead put **forward park at item 10**.
  [search summary](https://dodrive.uk/driving-test-report-explained/) (unofficial)
- An older pre 2017 numbering circulating on driving school sites has **2 emergency stop, 3 and 4 reverse
  left and right, 5 reverse park, 6 turn in the road**.
  [booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial)

**Do not print box numbers for the manoeuvres in the app until somebody opens the PDF.** The headings are
safe, the numbers are not. (reasoned)

#### Competency items 11 to 27, with sub boxes

Three independent instructor sites agree on this run of numbers, which is why I am more confident here.
[nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/) (unofficial),
[booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial),
[l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (unofficial)

**11 Precautions**. Precautions before starting the engine. Doors, seat, mirrors, seatbelt, handbrake on,
gear in neutral. [booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial)

**12 Control**, with sub boxes for **accelerator, clutch, gears, footbrake, parking brake, steering**.
"Accelerator (smooth use of the gas pedal), Clutch (not allowing the vehicle to go into a stall when
slowing down or stopping), Gears (choosing the correct gear for the driving conditions), Footbrake (harsh
braking or sudden braking needs to be avoided), Handbrake (do not use the handbrake to stop the vehicle),
Steering (avoid making sudden movements)."
[nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/) (unofficial)

**13 Move off**, with sub boxes for **safely** and **under control**. "moving off in control (without
stalling) and safely (looking all around, including your blind spots, and signalling if necessary)".
[booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial)
"Safety involves checking your blind spot, and Control involves not stalling or labouring the vehicle."
[nolanschoolofmotoring.co.uk](https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/) (unofficial)

**14 Use of mirrors** (printed on the form as "Use of mirrors, M/C rear observation" because the same
sheet serves motorcycle tests), with sub boxes for **signalling, change direction, change speed**. "You
must use all mirrors fitted to your vehicle safely and effectively, and always check carefully before
signalling, changing direction or changing speed."
[booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/) (unofficial)

**15 Signals**, with sub boxes for **necessary, correctly, timed**.
[dodrive.uk](https://dodrive.uk/driving-test-report-explained/) (unofficial)

**16 Clearance / obstructions**. Adequate room when passing parked cars, roadworks and other obstructions.
The heading "Clearance" is confirmed in the gov.uk PDF's indexed text.
[gov.uk asset](https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf)

**17 Response to signs and signals**, with sub boxes for **traffic signs, road markings, traffic lights,
traffic controllers, other road users**.
[learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/responce) (unofficial)

**18 Use of speed**. "Driving at a realistic speed appropriate to the road and traffic conditions, and
approaching all hazards at a safe, controlled speed."
[search summary](https://l2pcoventry.com/test-report-dl25) (unofficial)

**19 Following distance**. "Keeping a safe distance between you and the vehicle in front, and being able
to stop safely within the distance you can see to be clear."
[search summary](https://l2pcoventry.com/test-report-dl25) (unofficial)

**20 Progress**, with sub boxes for **appropriate speed** and **undue hesitation**. "Making safe and
reasonable progress along your route while keeping in mind the road, traffic and weather conditions."
[learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/progress.htm) (unofficial)

**21 Junctions (including roundabouts)**, with sub boxes for **approach speed, observation, turning right,
turning left, cutting corners**.
[driving-pro.com](https://driving-pro.com/assessment-criteria-junctions/) (unofficial)
"When turning right, the vehicle should be positioned to the centre of the road as is safe and should not
cut the corner; when turning left, the vehicle should be over to the left to avoid swinging out."
[driving-pro.com](https://driving-pro.com/assessment-criteria-junctions/) (unofficial)

**22 Judgement**, with sub boxes for **overtaking, meeting, crossing**. "You will need to show sound
judgment when overtaking, meeting or crossing the path of other road users."
[driving-pro.com](https://driving-pro.com/assessment-criteria-junctions/) (unofficial)

**23 Positioning**, with sub boxes for **normal driving** and **lane discipline**. "Normal driving
position is left lane unless road markings or traffic signs say different. Lane discipline faults include
straddling lanes or not using the centre of your lane."
[learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/positioning) (unofficial)

**24 Pedestrian crossings**. "You should be able to identify the different types of pedestrian crossing
(Puffin, Zebra, Toucan, Pelican, Pegasus and school crossing patrol) and approach each one in a correct
way." [search summary](https://l2pcoventry.com/test-report-dl25) (unofficial)

**25 Position / normal stops**. "You should choose a safe, legal and convenient place to stop, close to
the edge of the road, where you will not block the road and create a hazard."
[search summary](https://l2pcoventry.com/test-report-dl25) (unofficial)

**26 Awareness and planning**. "The driving test examiner is looking to see that you plan ahead to judge
what other road users are going to do ... you need to anticipate road and traffic conditions, and act in
good time, rather than reacting to them at the last moment."
[learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/planning.htm) (unofficial)

**27 Ancillary controls**. The ability to operate all controls and switches bearing on road safety.
"using demisters to clear the front windscreen, maintaining control of the vehicle while using one of the
controls, and turning on the windscreen wipers when it starts to rain."
[search summary](https://l2pcoventry.com/test-report-dl25) (unofficial)

**Eco safe driving**, a separate box with sub boxes for **control** and **planning**. It is marked but it
**cannot fail a test**, because eco faults are recorded for feedback only.
[learnerdriving.com](https://www.learnerdriving.com/driving-test/marking/eco-safe-driving.htm) (unofficial)
Note: I could not confirm on a DVSA source that eco marks cannot fail a test. Treat that as unverified.
"You should drive in an 'eco-friendly manner', considering your impact on the environment, planning well
ahead and choosing appropriate gears, avoiding heavy braking and over-revving of the engine."
[l2pcoventry.com](https://l2pcoventry.com/test-report-dl25) (unofficial)

There are also one or more **spare** boxes. "The report has 27 different categories, plus a few spares."
[andrewbuckler.co.uk](https://www.andrewbuckler.co.uk/the-updated-dl25-examiners-marking-form/) (unofficial)

#### How many competencies, sources disagree

Reported counts found: **24**
[lpodacademy.co.uk](https://www.lpodacademy.co.uk/understanding-codes-and-markings-on-your-driving-test-report/),
**27**
[naylanddrivingschool.co.uk](https://naylanddrivingschool.co.uk/blog/the-driving-test-marking-sheet-explained/),
**28 marking sections**
[booklearnpass.co.uk](https://www.booklearnpass.co.uk/driving-test/marking-sheet/).

The disagreement is probably about whether the manoeuvre boxes, the eyesight box, the eco box and the
spares are counted. **27 is the figure most often given and the one I would use, hedged as "about 27".**
(reasoned)

### What counts where, points the app should make

**Show me, tell me.** One "tell me" question before driving, one "show me" question while driving. Getting
one or both wrong costs **a single driving fault**, recorded under **Vehicle checks**. But "You will fail
your driving test if your driving is dangerous or potentially dangerous while you answer the show me
question", which is marked under the driving competencies, not under vehicle checks.
[rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial),
[drivingtestsuccess.com](https://drivingtestsuccess.com/blog/what-are-show-me-tell-me-questions/) (unofficial)

**Independent driving.** About 20 minutes, following a sat nav or road signs. A wrong turn is **not a
fault**. "If you go the wrong way, you won't get a fault as long as you do it safely." What is marked is
the reaction: "a sudden U-turn, reversing dangerously, or ignoring a no-entry sign".
[thedtc.co.uk](https://www.thedtc.co.uk/ready_to_pass/independent-driving) (unofficial),
[safedrivingforlife.info](https://www.safedrivingforlife.info/blog/cars/practical-driving-test-understanding-independent-drive/) (unofficial, DVSA's publishing partner)

**Manoeuvres.** One is chosen by the examiner from four: reverse bay park, forward bay park (drive in,
reverse out), pull up on the right and reverse about two car lengths then rejoin, and reverse parallel
park. The controlled stop is a separate exercise that may also be asked.
[examroutes.co.uk](https://examroutes.co.uk/27303/parallel-parking-driving-test-2026-reverse-parallel-park-step-by-step/) (unofficial)

**The 4 December 2017 changes** that produced the current form: reverse around a corner and turn in the
road were removed, forward and reverse bay parking and pull up on the right were added, the independent
driving section went from 10 minutes to 20 minutes, and one of the show me tell me questions moved to
being asked on the move.
[andrewbuckler.co.uk](https://www.andrewbuckler.co.uk/the-updated-dl25-examiners-marking-form/) (unofficial)

### What happens at the end of the test

The scripted wordings, from DT1:

- Pass: "That's the end of the test and I'm pleased to say you've passed."
- Then feedback: "Now that you will be driving on your own, I'd like you to be aware of/that....."
- Fail: "That's the end of the test and I'm sorry you haven't passed. To help you I'll explain why."
- Before the debrief: "Would you like your instructor/accompanying driver to listen to the result and
  debrief?"

[gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

The guidance also states that "the debrief box should only be marked if the accompanying driver is
present for the debrief", which is the form level confirmation that having the instructor there is
recorded.
[gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

What the candidate receives:

- **The driving test report**, listing every fault by competency.
  [rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)
- **A pass certificate**, on the spot, if they passed. "You can get your full driving licence
  automatically by handing your provisional licence to the examiner after the test. They will give you a
  pass certificate and arrange for DVLA to send you your new, full driving licence."
  [gov.uk driving test](https://www.gov.uk/driving-test/driving-test-faults-result)
- **A spoken debrief**, in which "The examiner will tell you what faults you made".
  [gov.uk driving test](https://www.gov.uk/driving-test/driving-test-faults-result)
- Reportedly **an emailed copy of the result** the same day. This is widely stated by instructor sites
  but I could not confirm it on a DVSA page.
  [rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial)

Two limitations of the report worth telling the candidate:

- "your test result email will only tell you how many faults you made and what they were about, it will
  not tell you where you were when you made them".
  [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/taking-your-instructor-on-your-test/) (DVSA campaign site)
- "your driving examiner has a short amount of time to explain any mistakes you made", which is DVSA's
  own argument for having the instructor in the car.
  [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/taking-your-instructor-on-your-test/) (DVSA campaign site)

So DVSA's advice is to decide before the test whether the instructor sits in: "Before you go for your
driving test, make sure you've told your driving instructor whether or not you'd like them to sit in on
your test."
[readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/taking-your-instructor-on-your-test/) (DVSA campaign site)

One practical note that appears repeatedly on instructor sites: **photograph both sides of the paper sheet
straight away** if a paper form is issued, because the print fades.
[rateddriving.com](https://www.rateddriving.com/learner-driver/driving-test-results/) (unofficial). With
tablet recording this now rarely applies. (reasoned)

If the test is failed, there is a **10 working day minimum** before another test can be taken.
[passrates.uk](https://passrates.uk/guide/driving-test-failed-rules) (unofficial). I did not verify this
on gov.uk.

### What examiners most often mark, nationally

DVSA ran a webinar on the top 10 driving test faults on **Wednesday 6 November 2024**, attended by about
750 trainee and approved driving instructors, and published the slides and a recap.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)

Slides: [despatch.blog.gov.uk PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)

The bottom of the list, quoted from the slides via search:

- **10. Not driving at a safe and reasonable speed**, including driving over the speed limit and not
  adjusting speed to road conditions.
- **9. Poor positioning on the road during normal driving**, including driving too close to the kerb or
  centre line, and unnecessary right hand lane use on dual carriageways.
- **8. Not responding correctly to road markings**, including not following direction arrows, straddling
  lanes, crossing double white lines, and ignoring box junctions.

[despatch.blog.gov.uk PDF](https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf)

The top of the list: "Junctions and observation has been first, and mirrors on changing direction second,
every year for as far back as the comparable data runs."
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

The other faults commonly named in the DVSA top 10 are: not moving off safely, incorrect positioning when
turning right at junctions, not having proper control of the steering, and not responding appropriately to
traffic lights.
[readytopass.campaign.gov.uk via search summary](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)

**I could not establish the exact ranks 3 to 7.** One search summary offered an ordering that put
junctions observation at 7, which contradicts the well established fact that it is first, so that summary
is unreliable and I have not reproduced it. See "Not found".

DVSA publishes the top 10 as a rank order only, "with no counts, no percentages and no per-centre
breakdown", so there is no Chilwell fault table to build from.
[passrates.uk](https://passrates.uk/guide/practical-test-fault-categories) (unofficial)

The webinar Q and A covered, among other things, "repeatedly making the same driving fault, mounting the
kerb, control of steering, creeping out when turning right at a junction, blind spot checks at
roundabouts, and good coaching questions to analyse faults", and the recording has timestamps so a viewer
can jump to a particular fault.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/)

An earlier post covers the same ground: "Helping driving instructors learn about the top driving test
faults", 31 August 2023.
[despatch.blog.gov.uk](https://despatch.blog.gov.uk/2023/08/31/helping-driving-instructors-learn-about-the-top-driving-test-faults/)

### Mock tests, for the candidate's practice

DVSA guidance says a mock test "should take about 40 minutes and include checking the pupil's driving
licence, an eyesight check, 'show me, tell me' vehicle safety questions, general driving ability,
reversing the car, independent driving, emergency stop, and giving the test result and feedback".
[gov.uk](https://gov.uk/guidance/carry-out-mock-driving-tests-for-your-pupils)

The guidance "provides examples of driving faults, serious faults, and dangerous faults to help
instructors understand the difference between these fault categories".
[gov.uk](https://gov.uk/guidance/carry-out-mock-driving-tests-for-your-pupils)

In DVSA's 2023 survey, 73 per cent of ADIs recorded mock test results on a marking sheet, either the DL25,
their own, or their driving school's.
[gov.uk survey](https://www.gov.uk/government/publications/how-driving-instructors-view-and-use-mock-driving-tests-2023-survey-results/how-driving-instructors-view-and-use-mock-driving-tests-2023-survey-results)

Useful for the app: the candidate can ask their instructor for a mock test marked on the real DL25, and
the candidate can download the same sheet themselves from the gov.uk publication page. (reasoned)

## Quotes worth using

These are quotes the app can put in front of a user. Each is attributed, and each came to me through a
search engine's reading of the page, not from a page I opened, so **each should be checked against the
live page before it is shown as a quotation.**

1. "A dangerous fault involves actual danger to you, the examiner, the public or property."
   [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)

2. "A serious fault is something that has the potential to be dangerous."
   [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)

3. "A driving fault is not potentially dangerous, but if you keep making the same fault, it could become
   a serious fault."
   [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)

4. "To pass your test, you must have no serious or dangerous faults (sometimes called 'majors') and 15 or
   fewer driving faults (sometimes called 'minors')."
   [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/)

5. "A driving fault is something that falls short of the standard of a safe and competent driver without
   being potentially dangerous."
   [gov.uk DT1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

6. "A serious fault is one that is potentially dangerous or entails a breach of the law."
   [gov.uk DT1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

7. "A dangerous fault is one involving actual danger to the examiner, candidate, the general public, or
   property."
   [gov.uk DT1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

8. "A candidate who habitually commits a driving fault in one aspect of driving throughout the test
   cannot be regarded as competent to pass the test. The repeated fault can then be assessed as
   potentially dangerous."
   [gov.uk DT1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)

9. "That's the end of the test and I'm pleased to say you've passed."
   [gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

10. "That's the end of the test and I'm sorry you haven't passed. To help you I'll explain why."
    [gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

11. "Would you like your instructor/accompanying driver to listen to the result and debrief?"
    [gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

12. "Now that you will be driving on your own, I'd like you to be aware of/that....."
    [gov.uk DT1 test wordings](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

13. "You can use the driving test marking sheet (DL25) if you're a driving instructor carrying out a mock
    driving test."
    [gov.uk](https://www.gov.uk/government/publications/driving-test-marking-sheet)

14. "Driving examiners now record driving test results digitally on a tablet. They only use these paper
    forms if there's a problem with their tablet."
    [gov.uk](https://www.gov.uk/government/publications/driving-test-marking-sheet)

15. "your test result email will only tell you how many faults you made and what they were about, it will
    not tell you where you were when you made them."
    [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/taking-your-instructor-on-your-test/)

16. "your driving examiner has a short amount of time to explain any mistakes you made."
    [readytopass.campaign.gov.uk](https://readytopass.campaign.gov.uk/driving-test/taking-your-instructor-on-your-test/)

17. "You can get your full driving licence automatically by handing your provisional licence to the
    examiner after the test. They will give you a pass certificate and arrange for DVLA to send you your
    new, full driving licence."
    [gov.uk](https://www.gov.uk/driving-test/driving-test-faults-result)

18. "The purpose of this annex is to explain the assessment criteria and recording of faults under the
    outcome/competency headings on the driving test report."
    [gov.uk DT1](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking)
    (paraphrase risk: the search summary gave this as a close paraphrase, not certainly verbatim. Verify
    before quoting.)

## Not found

Everything in this list was searched for and not established. In every case the blocker was the same: I
could not open any page, and the search budget ran out.

1. **A verbatim, ordered transcription of the DL25 with the exact printed wording of every box.** This is
   the single biggest gap. I searched for it at least fifteen different ways, including keyword searches
   on distinctive form phrases, domain restricted searches on `assets.publishing.service.gov.uk`, and
   direct requests to the search summariser to transcribe the PDF. The PDF is at
   `assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf` and
   needs to be opened by hand.

2. **The box numbers for items 1 to 10, the pre drive and manoeuvre section.** Sources conflict: box 4 is
   given as both "reverse right" and "pull up on the right and reverse"; forward park is given as both box
   8 and box 10. Searched with explicit numbered phrase queries; the last two such searches were refused
   because the budget ran out.

3. **Whether the current car DL25 still prints the boxes for "turn in the road" and "reverse around a
   corner"**, which were dropped from the car test on 4 December 2017 but may remain on the form because
   the same sheet serves other categories.

4. **The exact printed label of the ETA box and its position on the sheet.** I established that it means
   "examiner took action" and carries V and P options, but only from unofficial sites. No DVSA page
   returned by search stated it.

5. **Whether an ETA can ever be recorded without a serious or dangerous fault in the same test.** Sources
   say it "almost always" and "nearly always" accompanies one, which implies it sometimes does not, but
   nothing states the rule.

6. **Any numeric threshold for how many repeated driving faults in one box become a serious fault.** I
   searched specifically for this. DVSA publishes no number. It is examiner judgement.

7. **The exact eyesight test distance.** Sources gave 20 metres, 20.5 metres and 21 metres. The genuine
   rule distinguishes old style and new style number plates. Get this from
   `gov.uk/driving-eyesight-rules` before publishing a figure.

8. **The DVSA top 10 faults at ranks 3 to 7, in their published order.** I have ranks 8, 9 and 10 verbatim
   from the DVSA slides, and ranks 1 and 2 well corroborated. One search summary gave a full ordering that
   was internally contradictory, so I discarded it. The slides PDF at
   `despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf`
   has the answer.

9. **Whether eco safe driving faults can contribute to a fail.** Instructor sites say they are feedback
   only. No DVSA source found either way.

10. **The text of the guidance notes printed with the DL25.** gov.uk says the forms "include guidance notes
    about how to use them", but I could not read them.

11. **Confirmation on a DVSA page that the result is emailed to the candidate.** Widely claimed by
    instructor sites, not found on gov.uk.

12. **The definitive count of competencies on the current form.** Found 24, 27 and 28 from different
    sources.

13. **Anything Chilwell specific about marking.** There is nothing to find, because the DL25 and the fault
    rules are national. I searched for a Chilwell fault breakdown and confirmed DVSA publishes no per
    centre fault data.

14. **The current wording of gov.uk "Understanding your driving test result".** The page exists at
    `gov.uk/guidance/understanding-your-driving-test-result` and covers "what was assessed, what sorts of
    things counted as faults, and how to improve in each area", but I could not read it. **This is
    probably the single most useful page for the app and should be read first by whoever has a browser.**

## Sources

None of these pages was opened by me. WebFetch returned `EGRESS_BLOCKED` for every domain attempted, and
`curl` to the gov.uk asset server returned a 403 from the egress proxy. Each entry below is a URL that a
web search result or search summary attributed a claim to. Ranked roughly by usefulness to the app.

**Primary, DVSA and gov.uk**

1. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-6-guide-to-assessment-and-marking
   DT1 Annex 6, "Guide to assessment and marking". The examiners' own manual. Source of the three verbatim
   fault definitions including the "breach of the law" clause, the purpose statement for the annex, and
   the habitual fault escalation rule. **The most important source in this file.**
2. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/11-guide-to-assessment-and-marking
   The same guidance under a newer numbered path. Use if the annex path 404s.
3. https://readytopass.campaign.gov.uk/driving-test/driving-test-marking-faults-results/
   DVSA's Ready to Pass campaign page. The plain English fault definitions and the 15 fault rule, in the
   form a candidate should be shown.
4. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings
   DT1 test wordings. The examiner's exact scripted sentences at the end of the test, the debrief question,
   and the note about the debrief box.
5. https://www.gov.uk/government/publications/driving-test-marking-sheet
   The publication page for the official sample DL25. Confirms tablet recording, paper as fallback, England
   Scotland and Wales scope, and that guidance notes are included.
6. https://assets.publishing.service.gov.uk/media/62a7437cd3bf7f03667c667a/dl25-driving-test-report.pdf
   The official sample DL25 PDF itself. Blocked. Its indexed text confirmed the header fields "Vehicle reg",
   "Instructor reg number", "Eyesight test", the "S" and "D" columns and the "Clearance" heading. **Needs
   opening by hand.**
7. https://assets.publishing.service.gov.uk/media/6290d38de90e07039ae3eb97/mock-driving-test-marking-sheet.pdf
   DVSA's mock test marking sheet. Same indexed first line as the DL25, so same layout.
8. https://www.gov.uk/guidance/understanding-your-driving-test-result
   Candidate facing gov.uk guidance on what was assessed and how to improve. Blocked. **Read this first.**
9. https://www.gov.uk/driving-test/driving-test-faults-result
   gov.uk "Driving test: cars: Driving test faults and your result". Source for the pass certificate and
   provisional licence handover, and for the examiner telling you what faults you made.
10. https://readytopass.campaign.gov.uk/driving-test/taking-your-instructor-on-your-test/
    DVSA campaign page. The two quotes about the short debrief and the email not saying where the faults
    happened.
11. https://gov.uk/guidance/carry-out-mock-driving-tests-for-your-pupils
    DVSA guidance on mock tests. The 40 minute structure and the fault examples.
12. https://assets.publishing.service.gov.uk/media/632d9fdbe90e0711d903e0b4/how-to-mark-and-assess-faults-during-mock-driving-test.odt
    DVSA's worked examples of driving, serious and dangerous faults. Blocked, but would be excellent app
    content if it can be read.
13. https://assets.publishing.service.gov.uk/media/62c822d3e90e077480fd3ce6/instructions-and-wording-to-use-during-mock-driving-tests__5_.odt
    DVSA's manoeuvre and emergency stop instruction wordings.
14. https://despatch.blog.gov.uk/2024/12/13/explaining-more-about-the-top-10-driving-test-faults-our-webinar-recap/
    DVSA blog, 13 December 2024. The 6 November 2024 webinar, 750 attendees, and the Q and A topic list
    including repeated faults.
15. https://despatch.blog.gov.uk/wp-content/uploads/sites/131/2024/12/top-10-driving-test-faults-2024-webinar-slides.pdf
    The webinar slides. Source of the verbatim ranks 8, 9 and 10. **Open this to get ranks 1 to 7.**
16. https://despatch.blog.gov.uk/2023/08/31/helping-driving-instructors-learn-about-the-top-driving-test-faults/
    Earlier DVSA blog on the same subject.
17. https://despatch.blog.gov.uk/2019/10/14/improving-the-driving-test-experience-for-candidates/
    DVSA blog on designing the digital test summary report, by lead user researcher Paul Bailey.
18. https://despatch.blog.gov.uk/2019/09/04/developing-an-app-to-electronically-record-driving-tests/
    DVSA blog on building the tablet app that replaced the paper DL25.
19. https://www.gov.uk/government/publications/how-driving-instructors-view-and-use-mock-driving-tests-2023-survey-results/how-driving-instructors-view-and-use-mock-driving-tests-2023-survey-results
    DVSA 2023 survey. The 73 per cent figure for ADIs using a marking sheet.
20. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/01-the-practical-driving-test-and-extended-test-for-cars
    DT1 section on the car test. Not mined, but relevant.
21. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1
    The DT1 contents page.
22. https://assets.publishing.service.gov.uk/media/5a79089840f0b676f4a7d578/dsa-ia0045812a.pdf
    Old DSA FOI release. The DL25A to DL25D four part form and the two year retention of DL25B. Historic.
23. https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/640646/transforming-the-practical-driving-test-research-report.pdf
    TRL report PPR828, "Transforming the practical driving test". Background to the 2017 changes. Not mined.
24. https://assets.publishing.service.gov.uk/media/6390a78be90e071dfd1e6710/adi-part-3-test-report-form.pdf
    The ADI part 3 marking sheet, a different form. Listed so it is not confused with the DL25.
25. https://nidirect.gov.uk/publications/guidance-and-explanation-your-driving-test-report
    Northern Ireland's equivalent guidance notes, published 15 February 2022. **Different jurisdiction, do
    not use for Chilwell.**
26. https://www.nidirect.gov.uk/sites/default/files/2025-05/cars-guidance-notes-report-explained-car-2022_0.pdf
    The NI car report explanatory notes PDF.
27. https://www.safedrivingforlife.info/blog/cars/practical-driving-test-understanding-independent-drive/
    Safe Driving for Life, DVSA's publishing partner. The independent drive.

**Unofficial, driving schools, instructor bodies and consumer sites**

28. https://passrates.uk/guide/practical-test-fault-categories
    Unofficial. The 15 limit and 16th fault rule, the habitual fault escalation restated, and the statement
    that junctions observation is first and mirrors second every year.
29. https://passrates.uk/guide/driving-test-failed-rules
    Unofficial. The clearest statement found on what an ETA is and is not, and that a dangerous fault stays
    dangerous without an intervention. Also the 10 working day rule.
30. https://www.rateddriving.com/learner-driver/driving-test-results/
    Unofficial. The fullest description found of the ETA box, V and P, and of what the candidate is given
    at the end.
31. https://www.adinjc.org.uk/examiner-fault-marking/
    Unofficial, ADI National Joint Council. "Deviation from desired outcome", the three fault weighting
    questions, and the five point internal scale.
32. https://www.andrewbuckler.co.uk/the-updated-dl25-examiners-marking-form/
    Unofficial, Worksop Driving School. Box numbers 4, 5 and 8 for the new manoeuvres, the 4 December 2017
    change list, and "27 different categories, plus a few spares". Conflicts with source 34 on numbering.
33. https://www.andrewbuckler.co.uk/2017/10/30/the-updated-dl25/
    Unofficial. The October 2017 version of the same post.
34. https://dodrive.uk/driving-test-report-explained/
    Unofficial. Header field explanations (S, D/C, Dr./No., Cat. Type), signals sub boxes, and the note that
    item 1b is only for categories without a theory test. Gave forward park as item 10.
35. https://l2pcoventry.com/test-report-dl25
    Unofficial. The insurance and residency declaration at the top of the DL25, eco driving wording,
    pedestrian crossing types, position and normal stops, ancillary controls.
36. https://nolanschoolofmotoring.co.uk/practical-test/driving-test-report-explained/
    Unofficial. The Control sub boxes described one by one, Move off safety and control, and the eyesight
    fail consequence. Supports numbering 12 Control, 13 Move off, 14 Use of mirrors.
37. https://www.booklearnpass.co.uk/driving-test/marking-sheet/
    Unofficial. Supports numbering 11 Precautions, 12 Control, 13 Move off. Also gives "28 marking sections"
    and the old pre 2017 manoeuvre numbering.
38. https://www.lpodacademy.co.uk/understanding-codes-and-markings-on-your-driving-test-report/
    Unofficial. Ticks, S and D marks, one S and one D maximum per box, and a count of 24 competency boxes.
39. https://naylanddrivingschool.co.uk/blog/the-driving-test-marking-sheet-explained/
    Unofficial. The three column layout described precisely, and a count of 27 competencies.
40. https://www.learnerdriving.com/driving-test/free-interactive-marking-system
    Unofficial. An interactive marking sheet with a page per competency. Useful model for the app.
41. https://www.learnerdriving.com/driving-test/marking/responce
    Unofficial. Response to signs and signals sub boxes.
42. https://www.learnerdriving.com/driving-test/marking/positioning
    Unofficial. Positioning, normal driving and lane discipline.
43. https://www.learnerdriving.com/driving-test/marking/progress.htm
    Unofficial. Progress, appropriate speed and undue hesitation.
44. https://www.learnerdriving.com/driving-test/marking/planning.htm
    Unofficial. Awareness and planning.
45. https://www.learnerdriving.com/driving-test/marking/eco-safe-driving.htm
    Unofficial. Eco safe driving.
46. https://driving-pro.com/assessment-criteria-junctions/
    Unofficial. Junctions sub boxes (approach speed, observation, turning right, turning left, cutting
    corners) and Judgement sub boxes (overtaking, meeting, crossing), with the turning right and left
    positioning descriptions.
47. https://drivingtestsuccess.com/blog/what-are-show-me-tell-me-questions/
    Unofficial. Show me and tell me, one driving fault for one or both wrong.
48. https://www.thedtc.co.uk/ready_to_pass/independent-driving
    Unofficial. Wrong turns during independent driving are not faults.
49. https://examroutes.co.uk/27303/parallel-parking-driving-test-2026-reverse-parallel-park-step-by-step/
    Unofficial. The current four manoeuvre set.
50. https://diaryofanadi.co.uk/?p=2752
    Unofficial, "Diary Of An ADI". Item by item report explanation. Blocked, appeared in results repeatedly.
51. https://diaryofanadi.co.uk/?p=5233
    Unofficial, "Diary Of An ADI". DL25 marking sheet piece. Blocked.
52. https://www.veygo.com/learner-driver-insurance/guides/the-secrets-of-the-dvsa-dl25-form/
    Unofficial. DL25 guide. Appeared repeatedly, not mined.
53. https://get-towing.co.uk/trailer-licence-training-the-dl25-trailer-driving-test-report-form/
    Unofficial. Confirms the DL25 also serves trailer tests, which is why the car form carries irrelevant
    boxes.
54. https://www.drivejohnsons.co.uk/learning-centre/driving-test/driving-test-marking-sheet/
    Unofficial. Marking sheet explanation, the S and D column behaviour.
55. https://www.driving.org/dvsa-webinar-follow-up-top-10-driving-test-failures-and-expert-tips-for-adis/
    Unofficial, Driving Instructors Association. Follow up to the DVSA top 10 webinar.
56. https://trainwithdrive.co.uk/driveonline/Part_One/PDFs/DL25.pdf
    Unofficial instructor training PDF, "Special Study, DL25". Blocked. Likely contains the full ordered
    item list if it can be opened.
57. https://badadia.co.uk/DT1-2017.pdf
    Unofficial mirror of the 2017 DT1 examiner manual. Blocked. Would settle the ETA and marking questions.
58. https://mydriving.co.uk/wp-content/uploads/2021/04/DT1.pdf
    Unofficial mirror of the DT1. Blocked.
59. https://xtdriving.com/wp-content/uploads/2016/06/DVSA-DT1-Manual-2016.pdf
    Unofficial mirror of the 2016 DT1. Blocked. Superseded, but useful for cross checking wording.
60. https://www.2pass.co.uk/download/dl25.pdf
    Unofficial mirror of a superseded paper DL25, form reference DL25 FCN177477/09.
