# What happens in the test, start to finish

## Summary

1. The car practical driving test in Great Britain runs in a fixed order: meet the examiner, document and identity check, sign a declaration, the question about who sits in, the eyesight check, one "tell me" safety question, then the drive. [source](https://www.gov.uk/driving-test/what-happens-during-test)
2. GOV.UK currently states the driving part lasts "around 35 minutes", or around 65 minutes for an extended test taken after a driving ban. [source](https://www.gov.uk/driving-test/what-happens-during-test)
3. The whole appointment, from signing the declaration to switching the engine off at the end, has been described in DVSA guidance as 38 to 40 minutes, so the app should tell the user to allow about an hour at the centre. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/01-the-practical-driving-test-and-extended-test-for-cars)
4. Three permanent changes took effect at every test centre on 24 November 2025, and they are the single most important thing for a 2026 app to get right. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)
5. Those changes were: stops during the test cut from 4 to 3, emergency stop frequency cut from 1 in 3 tests to 1 in 7, and the independent driving section given the flexibility to use a sat nav, traffic signs or both and to run for the full length of the test. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)
6. The eyesight check is read at 20 metres for a new style number plate and 20.5 metres for an old style plate, and a candidate must never be asked to read a plate at less than 20 metres. [source](https://www.gov.uk/driving-test/what-happens-during-test)
7. If the first plate is not read, the examiner tries a second, then measures the exact distance with a tape and tries a third. Failing the third ends the test before any driving happens. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters)
8. Two vehicle safety questions are asked: one "tell me" question before the drive starts and one "show me" question while driving. Getting one or both wrong is a single driving fault. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)
9. One reversing manoeuvre is set, drawn from parallel parking, forward bay park and reverse out, reverse bay park and drive out, or pull up on the right and reverse about two car lengths. [source](https://www.gov.uk/driving-test/what-happens-during-test)
10. The emergency stop is now asked in roughly 1 test in 7, and it is only ever asked after a normal stop, so the car is already stationary when the instruction is given. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)
11. GOV.UK says independent driving lasts 20 to 35 minutes, and that the examiner sets up the sat nav for the candidate, who may not use their own. [source](https://www.gov.uk/driving-test/what-happens-during-test)
12. The sat nav used is the TomTom Start 52, supplied and programmed by the examiner. (unverified for 2026, see Not found) [source](https://despatch.blog.gov.uk/2017/07/06/making-the-driving-test-more-reflective-of-real-life-driving/)
13. Going the wrong way is not itself a fault. The examiner does not mark a wrong turning and helps the candidate back on route. [source](https://www.gov.uk/driving-test/what-happens-during-test)
14. The result is given at the end, in the car, back at the test centre, and the candidate is asked whether they want their instructor present for it. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)
15. The pass mark is no more than 15 driving faults and no serious or dangerous faults. A 16th driving fault, or any single serious or dangerous fault, is a fail. [source](https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test)
16. The test report is completed on a tablet and emailed. The examiner asks at the start of the test which email address to send it to. [source](https://despatch.blog.gov.uk/2019/10/14/improving-the-driving-test-experience-for-candidates/)
17. GOV.UK tells candidates to arrive 5 minutes before the appointment, and DVSA guidance tells examiners to allow a minimum of 5 minutes grace for a late candidate. [source](https://www.gov.uk/driving-test/what-to-take)
18. The examiner only stops a test early if the driving becomes a danger to other road users. [source](https://www.gov.uk/driving-test/what-happens-during-test)
19. One person aged 16 or over may sit in and observe, usually the instructor, and they may take no part in the test. [source](https://www.gov.uk/guidance/rules-for-observing-driving-tests)
20. Important warning for the app author: I could not open a single web page in this session, so everything below came through search summaries. Read the section "How this research was done" before writing any screen.

## Findings

### How this research was done, and how much to trust it

Every direct page fetch in this session was refused. WebFetch returned "blocked by the network egress proxy" for www.gov.uk, readytopass.campaign.gov.uk, despatch.blog.gov.uk and assets.publishing.service.gov.uk, and a direct curl to www.gov.uk returned "CONNECT tunnel failed, response 403". The proxy documentation states that a 403 is an organisation egress policy denial, not a site fault, and says not to route around it. A previous agent working on this same project recorded exactly the same block in centre-facts.md. (reasoned, from the tool behaviour in this session)

What did work was the WebSearch tool, which reads the pages itself and returns a written summary with the URLs it drew from. So in this document:

- A claim followed by [source](url) means: the WebSearch tool attributed that content to that URL. I did not open the page myself. The URL is real and appeared in search results, but the exact wording on the live page has not been checked by me. (reasoned)
- (reasoned) means my own inference from the sources.
- (unverified) means I believe it is true but no source in this session confirmed it.

One concrete reason for caution. On one search the summariser asserted that the pass mark had changed from 15 driving faults to 12. A follow up search contradicted this flatly and confirmed 15, with 16 being an automatic fail. The "12" figure was wrong. The app author should treat any single figure in this document as needing a five second check against the live GOV.UK page before it is printed in the app. (reasoned)

Where two sources disagree in this document, I have said so rather than picking one.

### The 2026 shape of the test in one paragraph

A car practical test in Great Britain is one appointment at a test centre. The candidate meets an examiner, has documents checked, signs a declaration, answers a question about who may sit in, reads a number plate, answers one spoken safety question, then drives for around 35 minutes over a route the examiner chooses. Inside that drive sit one reversing manoeuvre, one "show me" safety question, a stretch of independent driving following a sat nav or traffic signs, and, in about one test in seven, an emergency stop. The car returns to the test centre, the examiner gives the result in the car, then explains the faults. [source](https://www.gov.uk/driving-test/what-happens-during-test)

### What changed on 24 November 2025, and why it matters for a 2026 app

DVSA ran a trial from April 2025 at 20 driving test centres across Great Britain. The trial was originally planned for 3 months, was extended by 2 months to cover the busy summer, and finished in October 2025. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)

The three adjustments trialled, and then made permanent at every centre from 24 November 2025, were:

1. Reducing the number of stops during the test from 4 to 3. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)
2. Lowering the frequency of emergency stop exercises from 1 in 3 tests to 1 in 7. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)
3. Adding flexibility to the independent driving segment, which can be following a sat nav, traffic signs or both, so that it can run for the full duration of the test. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)

DVSA's stated reason was to improve the flow of the test and make it better reflect real world driving conditions, and to let examiners build routes that reach more high speed and higher risk roads where location allows. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)

The practical consequences for an app aimed at a 2026 candidate:

- Do not tell the user the emergency stop happens in one test in three. That figure is out of date by roughly a year. It is one in seven. (reasoned, from the source above)
- Do not tell the user independent driving is exactly 20 minutes. It may now be longer, up to the whole test. GOV.UK's own current figure is a range, 20 to 35 minutes. [source](https://www.gov.uk/driving-test/what-happens-during-test)
- Do not promise four pull ups on the left. Three stops is the current shape. (reasoned)

A separate set of 2026 changes affects booking rather than the test itself. From 8 April 2026 learners became solely responsible for booking and managing their own practical tests, with third party booking firms, cancellation finder apps and instructors no longer permitted to book on a learner's behalf. Since 31 March 2026 a booking can be changed only twice before it must be cancelled and rebooked. From 9 June 2026 a test can only be moved to one of the candidate's three nearest test centres. These are booking rules, not test content, but they belong in an app because they change what a user can do if they want to move the appointment. [source](https://www.carwow.co.uk/news/10823/dvsa-driving-test-booking-changes-2026) (unofficial, published by Carwow, a car buying website; the underlying DVSA notice is at content.govdelivery.com/accounts/UKDVSA/bulletins/4074775, which I could not open)

### Before the test: what to bring and when to arrive

GOV.UK tells candidates to arrive at the driving test centre 5 minutes before the appointment, and warns that if you are late the test will be cancelled and you will lose your money. [source](https://www.gov.uk/driving-test/what-to-take)

DVSA guidance to examiners is more forgiving than that warning sounds. Examiners must allow a minimum of 5 minutes grace after the scheduled start time before refusing to take a candidate out, and more than 5 minutes may be allowed at the examiner's discretion provided it does not affect the quality of that test and later tests. [source](https://www.gov.uk/government/publications/candidates-arriving-late-for-a-driving-test/information-and-guidance-given-to-examiners-when-candidates-are-late-for-a-driving-test)

The app should still tell the user to arrive earlier than 5 minutes. Five minutes of grace is the examiner's discretion, not the candidate's right, and arriving flustered is a poor start. (reasoned)

What to take:

- The UK photocard driving licence. A test is cancelled and the fee lost if the right documents are not brought. [source](https://www.gov.uk/driving-test/what-to-take)
- The theory test pass certificate is not needed as a document. The examiner checks that the theory test has been passed before the driving test starts, and a replacement certificate does not need to be obtained. [source](https://www.gov.uk/driving-test/what-to-take)
- A car that meets the rules. Most people use their instructor's car. [source](https://www.gov.uk/driving-test/using-your-own-car)

Car requirements that bear on the test going ahead at all: L plates on front and back, not blocking the view; a rear view mirror for the candidate and a second one fitted for the examiner; no warning lights lit on the dashboard; working headlights, brake lights and indicators; legal tread depth and no damaged tyres; a working driver seat belt and passenger seat belt. [source](https://readytopass.campaign.gov.uk/driving-test/what-to-take/)

The scale of avoidable losses: 2,281 driving tests were cancelled in July 2026 because people brought an unsuitable car, forgot their driving licence or were late, and a further 2,201 car tests could not go ahead because the candidate arrived late. [source](https://readytopass.campaign.gov.uk/driving-test/what-to-take/) These two figures came from the same search summary and appear to overlap or double count. Treat the exact numbers as unverified and use them only as an order of magnitude. (reasoned)

Test fees at the time of writing are £62 on a weekday and £75 in the evening, at a weekend or on a bank holiday. [source](https://www.gov.uk/driving-test-cost)

### Step 1: meeting the examiner in the waiting room

The examiner comes into the waiting room, asks for the candidate by name and greets them. DVSA guidance tells examiners that a pleasant outgoing approach, not only in the waiting room and on the way to the vehicle but throughout the test, is particularly important to help candidates relax, and notes that many candidates will be more nervous during the test than when driving with their instructor or a friend. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test)

The same guidance tells examiners that if a candidate is in difficulties and clearly suffering from nervousness, the examiner should offer a few words of reassurance to help them settle down. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test)

This is worth putting in the app verbatim. A nervous candidate who knows the examiner is instructed to try to settle them will read the examiner's friendliness correctly rather than as a trap. (reasoned)

### Step 2: the identity and licence check

The examiner compares the photograph on the photographic identity document against the candidate, and compares the signature on the photocard licence with the signature on the digital test report. All documents must be returned to the candidate once checked. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test)

The examiner also checks that the theory test has been passed. [source](https://www.gov.uk/driving-test/what-to-take)

### Step 3: the insurance and residency declaration

The examiner asks the candidate to read, confirm and sign an insurance and residency declaration, and must check the name and driver number on the licence against the information on the declaration page. In the paper era this was the DL25MC form; the test report itself is now completed digitally. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test)

The examiner's wording is: "read, confirm and sign this insurance and residency declaration". [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

This is the moment the clock on the test effectively starts. DVSA guidance describes the test as lasting 38 to 40 minutes from signing the DL25 to stopping the engine at the end. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/01-the-practical-driving-test-and-extended-test-for-cars)

### Step 4: the question about your instructor sitting in

This is the "are you happy for your instructor to sit in" question the brief asks about. In DVSA's own wording it is asked as an offer to the candidate, not a request from the instructor.

The examiner's wording is: "Would you like your instructor/accompanying driver to accompany you on test?" [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

The rules on who may come:

- The observer will usually be the driving instructor, but a relative or friend may come instead. [source](https://www.gov.uk/guidance/rules-for-observing-driving-tests)
- The observer must be 16 or over. [source](https://www.gov.uk/guidance/rules-for-observing-driving-tests)
- The observer may take no part in the test. [source](https://www.gov.uk/guidance/rules-for-observing-driving-tests)
- Normally only one person may sit in and observe. Two people may be allowed as a reasonable adjustment to meet a specific need. [source](https://www.gov.uk/guidance/rules-for-observing-driving-tests)
- DVSA's advice on where to sit: it is usually least intrusive to sit behind the candidate, but the best position is wherever is most comfortable provided the observer can sit upright with the seat belt correctly fitted. [source](https://www.gov.uk/guidance/rules-for-observing-driving-tests)

DVSA's Ready to Pass campaign has a dedicated page encouraging candidates to take their instructor on the test. [source](https://readytopass.campaign.gov.uk/driving-test/taking-your-instructor-on-your-test/)

There is a second, separate question at the end of the test about whether the instructor may hear the result. It is covered under the debrief below. The app should not merge the two questions, because the candidate can say yes to one and no to the other. (reasoned)

I could not establish with certainty whether the accompaniment question is asked in the waiting room, at the car, or at the point where the eyesight check happens. The DT1 test wordings page lists it among the opening wordings, which suggests it comes early, before walking to the car. (reasoned, ordering not directly confirmed)

### Step 5: the email address for your result

At the start of the test the examiner asks the candidate whether they would like their report sent to the email address the booking was made from. If the candidate is not happy with that address, for example because the instructor made the booking, they can change it to their own email address. Candidates can also ask for the summary by post. [source](https://despatch.blog.gov.uk/2019/10/14/improving-the-driving-test-experience-for-candidates/)

This is a small moment that catches people out. If the instructor booked the test, the instructor's inbox is the default. A candidate who wants their own copy has to say so at the start, not at the end. (reasoned)

### Step 6: the eyesight check

The eyesight check happens before any driving, in the test centre car park or on the approach to it.

Distances:

- 20 metres for a vehicle with a new style number plate. [source](https://www.gov.uk/driving-test/what-happens-during-test)
- 20.5 metres for a vehicle with an old style number plate. [source](https://www.gov.uk/driving-test/what-happens-during-test)
- The letters and figures on the plate are 79.4 millimetres high, and the reading must be in good daylight, with glasses or contact lenses if worn. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters)

Examiner wording, from the DVSA prompt cards: "I'll point to a number plate. Please tell me the number plate number. Or you can write it down if you prefer." [source](https://assets.publishing.service.gov.uk/media/624d5879d3bf7f32b5aa072b/driving-test-prompt-cards.pdf)

The option to write it down is worth surfacing in an app. A candidate who cannot speak the registration clearly, or who is deaf, or who simply freezes, has an alternative. (reasoned)

What happens if the first plate is not read:

1. The examiner asks the candidate to read a second number plate, and if necessary takes them a little closer. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters)
2. If there is still a problem, the examiner measures the exact distance with the official tape and tries a third plate. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters)
3. If the third plate is not read correctly and the examiner is satisfied beyond doubt that the candidate cannot meet the eyesight requirement, the candidate is told they have not reached the required eyesight standard, which means they have not passed, and the remainder of the test is not carried out. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters)
4. A candidate must never be asked to read a number plate at a distance of less than 20 metres. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters)

GOV.UK states plainly that you will fail your driving test if you fail the eyesight check. [source](https://www.gov.uk/driving-test/what-happens-during-test)

A failed eyesight check is recorded on the marking sheet and no driving takes place, and the candidate must wait at least 10 working days before rebooking and should see an optician before the next attempt. [source](https://www.learnerdriving.com/driving-test/marking/eyesight) (unofficial, published by LearnerDriving, a driving school network; the 10 working day rule is the same rule that applies to any failed test, see Step 15)

Whether DVSA notifies DVLA after a failed eyesight check, and whether a provisional licence can be revoked as a result: not found, see the Not found section.

### Step 7: the tell me question

Before the drive starts, at the car, the examiner asks one "tell me" question: a spoken explanation of how the candidate would carry out a safety check. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)

Examiner wording reported from DT1: "I would like to ask you two safety questions about your vehicle, the second question will be a show me question on the move, please make yourself comfortable in the car and I will join you in a moment." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

And, introducing the questions themselves: "Now I should like to ask 2 questions relating to appropriate safety checks you should routinely make before starting a journey." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

Marking: one driving fault if one or both of the two safety questions is answered wrongly. It is a single fault, not one per question. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)

A candidate who does not know the answer loses one minor. It is not worth panicking over. (reasoned)

Verified "tell me" questions and the answers DVSA gives:

- Tell me how you would check that the brakes are working before starting a journey. Answer: brakes should not feel spongy or slack, brakes should be tested as you set off, and the vehicle should not pull to one side. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)
- Tell me where you would find the information for the recommended tyre pressures for this car and how tyre pressures should be checked. Answer: manufacturer's guide, use a reliable pressure gauge, check and adjust pressures when tyres are cold, do not forget the spare tyre, remember to refit the valve caps. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)
- Tell me how you make sure your head restraint is correctly adjusted so it provides the best protection in the event of a crash. Answer: the rigid part of the head restraint should be at least as high as the eye or the top of the ears, and as close to the back of the head as is comfortable. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)
- Tell me how you would check the tyres to ensure that they have sufficient tread depth and that their general condition is safe to use on the road. Answer: no cuts and bulges, 1.6mm of tread depth across the central three quarters of the breadth of the tyre and around the entire outer circumference. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)
- Tell me how you would check that the headlights and tail lights are working. Answer: operate the switch, turning on the ignition if necessary, then walk round the vehicle. No need to leave the vehicle to answer, because this is a tell me question. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)
- Tell me how you would know if there was a problem with your anti lock braking system. Answer: a warning light should illuminate if there is a fault with the anti lock braking system. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)
- Tell me how you would check the direction indicators are working. Answer: apply the indicators or hazard warning switch and check the functioning of all the indicators. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars)
- Tell me how you would check the brake lights are working. Answer: operate the brake pedal and make use of reflections in windows, garage doors and similar, or ask someone to help. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars)
- Tell me how you would check the power assisted steering is working before starting a journey. Answer: if the steering becomes heavy the system may not be working properly. Gentle pressure on the steering wheel, maintained while the engine is started, should result in a slight but noticeable movement as the system begins to operate. Alternatively, turning the steering wheel just after moving off will give an immediate indication that the power assistance is functioning. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars)
- Tell me how you would switch on the rear fog lights and explain when you would use them. Answer: operate the switch, turning on dipped headlights and the ignition if necessary, and check the warning light is on. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars)
- Tell me how you would switch your headlight from dipped to main beam and explain how you would know the main beam is on. Answer: operate the switch, with the ignition or engine on if necessary, and check with the main beam warning light. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars)
- Open the bonnet and tell me how you would check that the engine has sufficient oil. Answer: identify the dipstick or oil level indicator and describe checking the oil level against the minimum and maximum markers. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars)
- Open the bonnet and tell me how you would check that the engine has sufficient coolant. Answer: identify the high and low level markings on the header tank where fitted, or the radiator filler cap, and describe how to top up to the correct level. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars)
- Open the bonnet and tell me how you would check that you have a safe level of hydraulic brake fluid. Answer: identify the reservoir and check the level against the high and low markings. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars)

Note that some of these require the bonnet to be opened. The candidate should know where the bonnet release is in the test car. (reasoned)

Several secondary sources describe the list as 14 "tell me" questions and 7 "show me" questions, 21 in total. [source](https://www.drivethrul.co.uk/learn-to-drive/show-me-tell-me) (unofficial, published by DriveThruL, a driving school) I could confirm 14 distinct "tell me" questions from GOV.UK attributed material above, but I could not confirm the total count of 21 from an official page in this session. (unverified)

### Step 8: getting in the car and moving off

After the safety question the examiner invites the candidate to make themselves comfortable in the car and joins them. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

The examiner explains how directions will be given. The reported DT1 wording is: "Throughout the drive continue ahead, unless traffic signs direct you otherwise. When I want you to turn left or right, I will tell you in plenty of time." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

At roundabouts the examiner's wording includes the exit number, for example: "At the roundabout follow the road ahead (it is the second exit)." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

This is worth telling a Chilwell candidate specifically, because the roads around the centre are heavy with roundabouts. The examiner naming the exit removes a lot of guesswork. (reasoned)

### Step 9: the general driving section

GOV.UK describes this as driving in various road and traffic conditions, but not on motorways. [source](https://www.gov.uk/driving-test/what-happens-during-test)

Within the general driving section the examiner will ask the candidate to pull over and pull away several times. Since 24 November 2025 the number of stops in a test is 3 rather than 4. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)

DVSA guidance sets out the types of stop and start the test should include:

- Normal stops: pulling up at the side of the road, safely and under control, then moving off again. Examiner wordings include "Pull up on the left at a safe place, please", "Pull up along here, just before…please", and "Pull up on the left just before you get to the next parked car, please". [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)
- An angle start: moving off at an angle from behind a stationary vehicle. The guidance says the test must always include this. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test)
- A hill start: wherever possible, the ability to move off on a reasonably steep uphill gradient should be tested. If stopping on a hill is not possible, an additional designated stop must be conducted. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test)

Older DVSA guidance says candidates must make at least 2 normal stops during the test. That sits alongside the newer "3 stops" figure rather than contradicting it, because the angle start and hill start are themselves stops and starts. (reasoned) The app should describe it as "around three times you will be asked to pull up and move off again, and at least one of those will be a trickier start, from behind a parked car or on a hill" rather than quoting a precise count. (reasoned)

Where the examiner asks the candidate to choose the spot, the point of the exercise is the candidate's own judgement about where it is safe and legal to stop. (reasoned)

### Step 10: the show me question

While driving, the examiner asks one "show me" question: the candidate physically demonstrates a safety task without stopping. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)

The known "show me" questions, in DVSA's phrasing:

- When it is safe to do so, can you show me how you wash and clean the rear windscreen. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/13-vehicle-safety-check-questions)
- When it is safe to do so, can you show me how you wash and clean the front windscreen. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/13-vehicle-safety-check-questions)
- When it is safe to do so, can you show me how you would switch on your dipped headlights. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/13-vehicle-safety-check-questions)
- When it is safe to do so, can you show me how you would set the rear demister. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/13-vehicle-safety-check-questions)
- When it is safe to do so, can you show me how you would operate the horn. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/13-vehicle-safety-check-questions)
- When it is safe to do so, can you show me how you would demist the front windscreen. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/13-vehicle-safety-check-questions)

A seventh "show me" question exists according to the count of 21 questions in total, and is widely reported as "show me how you would open and close the side window", but I could not confirm the seventh question's wording from a GOV.UK attributed source in this session. (unverified, see Not found)

The critical point for the app: the phrase "when it is safe to do so" is the examiner handing the candidate the timing decision. You will fail your driving test if your driving is dangerous or potentially dangerous while you answer the "show me" question. [source](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions)

So the safe behaviour is to wait for a straight, clear stretch, keep looking at the road, and operate the control by feel. Doing it immediately, at a junction, while looking down, converts a one minor question into a possible serious fault. (reasoned)

### Step 11: the manoeuvre

One reversing manoeuvre is set per test. GOV.UK describes the exercises as: park in a parking bay, either by driving in and reversing out or reversing in and driving out, with the examiner saying which; parallel park at the side of the road; or pull up on the right hand side of the road, reverse for around 2 car lengths, and rejoin the traffic. [source](https://www.gov.uk/driving-test/what-happens-during-test)

A constraint worth knowing: reverse in and drive out is only done in a driving test centre car park, while drive in and reverse out can be done in any car park. [source](https://www.gov.uk/driving-test/what-happens-during-test)

Examiner wordings reported from DT1:

- Reverse bay park: "Would you pull forward either to the left or the right so that your wheels are straight, then reverse into a convenient parking bay." Followed by: "Finish within one of the bays." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)
- Forward bay park: "I'd like you to drive forward into a convenient parking bay finishing within the lines, either to the left or the right (if the car park allows it)." Then, later: "Now, I'd like you to reverse out either to the left or the right (if the car park allows it)." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)
- Parallel park: "Would you drive forward and stop alongside the car ahead. Then reverse in and park reasonably close to and parallel with the kerb. Try to complete the exercise within about two car lengths." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)
- Pull up on the right: "Pull up on the right when it is safe to do so, please. I would now like you to reverse for about two car lengths, keeping reasonably close to the kerb." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

The three or four manoeuvre count. GOV.UK lists three exercise types, but bay parking splits into two different exercises, which is why driving schools usually speak of four manoeuvres. Both descriptions are defensible. The app should list four, because the candidate has to practise four different movements. (reasoned)

Note that the "turn in the road", sometimes called the three point turn, and reversing around a corner were removed from the test in December 2017 and are not tested. They may still be asked for as part of an emergency manoeuvre in a real world situation, but they are not on the test. [source](https://www.gov.uk/government/news/driving-test-changes-4-december-2017)

### Step 12: the emergency stop

GOV.UK says you might also be asked to carry out an emergency stop. [source](https://www.gov.uk/driving-test/what-happens-during-test)

Frequency: 1 test in 7, from 24 November 2025. It was 1 in 3 before that date. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/)

How it is set up. The candidate is never expected to do an emergency stop without stopping normally beforehand, and the examiner gives the instructions once the car is stationary. [source](https://assets.publishing.service.gov.uk/media/624d5879d3bf7f32b5aa072b/driving-test-prompt-cards.pdf)

The examiner's warning wording, given when the car is pulled up: "Shortly I shall ask you to carry out an emergency stop." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

Then the instruction and demonstration: "When I give this signal, (simultaneously demonstrate, and say) 'Stop,' I'd like you to stop as quickly and as safely as possible." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

So the sequence is: pull up normally, be told it is coming, see the hand signal demonstrated in advance, move off again, then stop when the signal and the word "Stop" are given. There is no surprise. The candidate knows the emergency stop is happening before it happens. This is the single most reassuring fact about the emergency stop and the app should lead with it. (reasoned)

A practical consequence of the 1 in 7 change: six candidates in seven will never be asked. The app should still teach it, because the candidate cannot know in advance which test they are in, but it should not be presented as the centrepiece of the test. (reasoned)

### Step 13: the independent driving section

Duration. GOV.UK currently states you will drive independently for 20 to 35 minutes. [source](https://www.gov.uk/driving-test/what-happens-during-test) Since 24 November 2025 this section has been allowed to run for the full duration of the test. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/) Before December 2017 it was about 10 minutes, and it was then increased to around 20 minutes, roughly half of the test. [source](https://despatch.blog.gov.uk/2017/07/06/making-the-driving-test-more-reflective-of-real-life-driving/)

Sat nav or traffic signs. The candidate follows either a sat nav or traffic signs, and the examiner says which. [source](https://www.gov.uk/driving-test/what-happens-during-test) Historically 1 in 5 tests used traffic signs rather than a sat nav, which means about 80 percent used a sat nav. [source](https://despatch.blog.gov.uk/2017/07/06/making-the-driving-test-more-reflective-of-real-life-driving/) Since November 2025 the section may use a sat nav, traffic signs or both. [source](https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/) Whether the 1 in 5 split still holds after that change: not found, see Not found.

The sat nav itself. The examiner provides the sat nav and sets it up. The candidate cannot use their own sat nav. [source](https://www.gov.uk/driving-test/what-happens-during-test) The device DVSA introduced for this was the TomTom Start 52. [source](https://despatch.blog.gov.uk/2017/07/06/making-the-driving-test-more-reflective-of-real-life-driving/) Secondary sources state the TomTom Start 52 is still the standard device in 2026, mounted on the windscreen or dashboard and set up the same way in every car. [source](https://getmypass.co.uk/sat-nav-on-driving-test/) (unofficial, published by GetMyPass, a driving test booking site) I found no official 2026 confirmation of the model, so the app should say "a sat nav provided by the examiner, usually a TomTom Start 52" rather than stating it flatly. (reasoned)

Examiner wording for the sat nav version: "Now I would like you to drive independently, following the directions from the Satnav until I tell you otherwise. Please don't rely on the speeds shown on the Satnav, as they may not be accurate. Drive on when you are ready." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

The warning about the speeds is important content for an app. The speed shown on the sat nav is not authoritative. The road signs are. A candidate who drives to a wrong sat nav speed limit can pick up a serious fault. (reasoned)

Examiner wording for the traffic signs version: "Now I would like you to drive independently following the traffic signs for ……., continue to follow the signs until I tell you otherwise. Drive on when you are ready." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

Ending the section: "Thank you, that's the end of the independent driving. I will direct you from now on." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

If you go the wrong way:

- The examiner will not give you a fault for taking a wrong turning, and will help you get back on the route. [source](https://www.gov.uk/driving-test/what-happens-during-test)
- It will not matter if you go the wrong way unless you make a fault while doing it. [source](https://www.gov.uk/driving-test/what-happens-during-test)
- Going off route, or needing reminders of where to go, are not in themselves faults. [source](https://readytopass.campaign.gov.uk/driving-skills/following-routes/)
- Independent driving is not a test of how you follow directions. Driving independently means making your own decisions, and that includes deciding when it is safe and appropriate to ask for confirmation about where you are going. [source](https://readytopass.campaign.gov.uk/driving-skills/following-routes/)

If you cannot see a traffic sign, for example because it is covered by trees, the examiner will give directions until the next one is visible. [source](https://www.gov.uk/driving-test/what-happens-during-test)

Asking the examiner to repeat a direction is explicitly fine. DVSA guidance tells examiners that when the candidate asks for a direction to be repeated or confirmed, the examiner should respond in a friendly, positive manner, and that this is not a prompt, because the candidate instigated the query themselves in confirming or planning for the junction ahead. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test)

That last point is the most useful single fact in this whole section for a nervous candidate, and it is the kind of thing almost no app says. Asking "is it the second exit?" is not marked against you. (reasoned)

At any time when the candidate is not following a sat nav or traffic signs, the examiner gives turn by turn directions. [source](https://www.gov.uk/driving-test/what-happens-during-test)

GOV.UK publishes an example diagram of an independent driving route. [source](https://www.gov.uk/government/publications/independent-driving-route-diagram-example)

### Step 14: the return to the test centre

The examiner directs the candidate back to the test centre. The car is parked, usually in the centre's car park, and the engine switched off. DVSA guidance measures the test from signing the declaration to stopping the engine at the end. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/01-the-practical-driving-test-and-extended-test-for-cars)

At some centres, including Chilwell, the manoeuvre may be the bay park done on returning to the centre car park, so the last thing a candidate does can be the manoeuvre rather than an ordinary park. [source](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/) (unofficial, published by NGPass Driving Academy, a Nottingham driving school)

The result is given in the car, not in the building. (reasoned, from the debrief wordings which are addressed to a candidate still in the vehicle)

### Step 15: the result and the debrief

The result wording, pass: "That's the end of the test and I'm pleased to say you've passed." For car tests the examiner adds: "Now that you will be driving on your own, I'd like you to be aware of/that….." followed by feedback as appropriate. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

The result wording, fail: "That's the end of the test and I'm sorry you haven't passed. To help you I'll explain why." [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

The instructor question, asked after the result is given: "Would you like your instructor/accompanying driver to listen to the result and debrief?" [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

Where the instructor was already in the car for the test, the examiner asks: "would you like your (instructor/trainer/accompanying driver) to be present for the conclusion of the test?" [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

If the instructor was not present the question is not asked at all. If the instructor comes over to the car to listen to the conclusion and a debrief is to be given, the examiner must ask the candidate whether they want the instructor present. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings)

The candidate can say no. That is the point of the question being asked. An app aimed at a nervous candidate should say so plainly, and should also say that having the instructor hear the debrief is usually the more useful choice, because the instructor can then work on the specific faults. (reasoned)

The debrief itself: the examiner tells the candidate what faults they made. [source](https://www.gov.uk/driving-test/driving-test-faults-result) The email sent after the test shows what driving, serious or dangerous faults were made. [source](https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test)

The report is completed on a tablet, and DVSA stopped using the paper DL25 form in favour of an iPad app, with the test summary sent nearly instantaneously after the debrief is given. [source](https://despatch.blog.gov.uk/2019/09/04/developing-an-app-to-electronically-record-driving-tests/)

If the candidate passes:

- The licence is issued automatically where appropriate, for candidates who gave an email address and whose test was conducted on a tablet. [source](https://despatch.blog.gov.uk/2019/10/14/improving-the-driving-test-experience-for-candidates/)
- DVLA will usually send the full licence automatically, and the driving test pass certificate can be used to prove the pass while waiting. [source](https://www.gov.uk/apply-for-your-full-driving-licence)
- The candidate can start driving as soon as they pass, provided they have an insurance policy that allows them to drive without supervision. [source](https://www.gov.uk/apply-for-your-full-driving-licence)

If the candidate fails:

- Another test must be booked for a date at least 10 working days away. [source](https://www.gov.uk/driving-test/driving-test-faults-result)
- The candidate can drive home only as a learner, supervised and with L plates, because the provisional licence rules still apply. (reasoned, not directly sourced in this session)
- A result can be appealed only on the ground that the examiner did not follow the law. If DVSA agrees with the complaint the result still cannot be changed, but a refund or a free retest may be given. [source](https://www.gov.uk/driving-test/driving-test-faults-result)

### Total duration

The figures in circulation, and what each one actually measures:

- Around 35 minutes: GOV.UK's figure for the driving part of the test. [source](https://www.gov.uk/driving-test/what-happens-during-test)
- Around 65 minutes: GOV.UK's figure for the driving part of an extended test. [source](https://www.gov.uk/driving-test/what-happens-during-test)
- 38 to 40 minutes: DVSA examiner guidance, measured from signing the declaration to stopping the engine at the end, which includes the manoeuvres and the test content but not the waiting room and document checks. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/01-the-practical-driving-test-and-extended-test-for-cars) This figure predates the November 2025 changes and may not have been updated. (reasoned)
- About 40 minutes: the figure most driving schools use, which matches the 38 to 40 minute guidance. [source](https://www.drivingtesttips.biz/driving-test-centres/chilwell-driving-test-centre.html) (unofficial, published by DrivingTestTips.biz)

The honest thing for the app to say is: the drive is around 35 to 40 minutes, and the whole appointment, including meeting the examiner, the checks, the eyesight test, the safety question and the debrief, takes about an hour. A user should not book anything immediately afterwards. (reasoned)

### Marking and what counts as a fault

Three categories of fault:

- A driving fault, sometimes called a minor, is not potentially dangerous, but if the same fault is repeated it could become a serious fault. [source](https://www.gov.uk/driving-test/driving-test-faults-result)
- A serious fault is something that has the potential to be dangerous. Any serious fault is a fail. [source](https://www.gov.uk/driving-test/driving-test-faults-result)
- A dangerous fault involves actual danger to the candidate, the examiner, the public or property. Any dangerous fault is a fail. [source](https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test)

The pass mark: no more than 15 driving faults, and no serious or dangerous faults. A 16th driving fault is an automatic fail. [source](https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test)

There is also an "examiner took action" marking. If the examiner had to tell the candidate to do something, or take control of the car to avoid an incident, the result shows ETA. [source](https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test)

A mistake does not end the test. GOV.UK states you can carry on if you make a mistake, and it might not affect the result if it is not serious. [source](https://www.gov.uk/driving-test/what-happens-during-test)

DVSA publishes the top 10 reasons for failing the driving test in Great Britain, which the app could use for targeted advice. [source](https://www.gov.uk/government/publications/top-10-reasons-for-failing-the-driving-test/top-10-reasons-for-failing-the-driving-test-in-great-britain)

### If the examiner stops the test early

GOV.UK: your driving examiner will only stop your test if they think your driving is a danger to other road users. [source](https://www.gov.uk/driving-test/what-happens-during-test)

DVSA guidance to examiners is more detailed. There will be occasions when a candidate's driving on test becomes so dangerous that the safety of the public, the examiner or the candidate is threatened, and in those circumstances the examiner should stop the test. The examiner issues a statement of failure and tells the candidate the test has been stopped before completion for reasons of public safety. Once the examiner decides a test must be terminated, they bring it to an end as soon as it is safe, direct the learner to stop in a safe location and explain why the test has been terminated. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test)

The bar is high. An app should say that a test being stopped early is rare and requires genuine danger, not just a bad manoeuvre. (reasoned)

Separately, the examiner may stop the test for reasons that are nobody's fault, such as a mechanical problem with the car, and a new test has to be booked and paid for if the test cannot be completed because of a problem with the candidate or the car. DVSA also sometimes cancels tests, for example if the examiner is unwell. [source](https://www.gov.uk/driving-test/test-cancelled-bad-weather)

### Special cases and variations

The extended driving test. Taken by drivers disqualified by a court and ordered to take an extended test before getting a full licence back. The court decides whether this applies. [source](https://www.gov.uk/driving-disqualifications/disqualification-until-test-pass-or-extended-test-pass) GOV.UK gives the driving time as around 65 minutes. [source](https://www.gov.uk/driving-test/what-happens-during-test) Secondary sources describe it as around 70 minutes and say it may include all the manoeuvres rather than one, and that the theory test including hazard perception has to be retaken first. [source](https://dodrive.uk/the-extended-driving-test/) (unofficial, published by DoDrive, a driving school) Secondary sources give the fee as £124 on weekdays and £150 in the evening, at weekends or on bank holidays. [source](https://scarsdalesolicitors.com/extended-driving-test/) (unofficial, published by Scarsdale Solicitors) The fault allowance is reported as the same, up to 15 driving faults with no serious or dangerous faults. [source](https://dodrive.uk/the-extended-driving-test/) (unofficial) The extended test almost certainly does not apply to the person this app is for, but it explains why the GOV.UK page mentions 65 minutes. (reasoned)

Disability, health condition or learning difficulty. The candidate should tell DVSA when booking. [source](https://www.gov.uk/driving-test/disability-health-condition-or-learning-difficulty) Adjustments include more time for instructions and directions. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/8-candidates-with-a-disability-health-condition-or-learning-difficulty) If the booking records that a candidate is profoundly deaf in both ears, two test periods are allocated rather than one. [source](https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/8-candidates-with-a-disability-health-condition-or-learning-difficulty)

Deaf candidates specifically. The examiner uses written notes at the start of the test to explain what will happen, looks at the candidate if they lip read, and usually gives directions as hand signals. A British Sign Language interpreter may be taken, must be at least 16, and can be the candidate's driving instructor. The candidate arranges and pays the interpreter, and can claim the cost back after the test. [source](https://www.gov.uk/driving-test/disability-health-condition-or-learning-difficulty) DVSA publishes a deaf customer support pack with prompt cards for the practical test. [source](https://www.disabilitydrivinginstructors.com/wp-content/uploads/2023/11/DVSA-Deaf-Candidate-Pack-5.pdf) (unofficial host, Disability Driving Instructors, reproducing a DVSA document)

Two observers. Normally only one person may sit in, but two may be allowed as a reasonable adjustment to meet a specific need. [source](https://www.gov.uk/guidance/rules-for-observing-driving-tests)

Automatic cars. A test passed in an automatic gives an automatic only licence. (unverified, not confirmed by a source in this session, but it is the long standing rule and the app should check it on GOV.UK)

Bad weather. GOV.UK has a page on tests cancelled for bad weather, which covers what happens if the test cannot safely go ahead. [source](https://www.gov.uk/driving-test/test-cancelled-bad-weather)

Myths worth debunking in the app. DVSA's Ready to Pass campaign has a driving test myths page. On quotas it says examiners do not pass or fail a learner because they have been given quotas by DVSA, and that the only number that determines pass or fail is the number of faults accrued during the test. [source](https://readytopass.campaign.gov.uk/driving-test/driving-test-myths)

### How the structure plays out at Nottingham (Chilwell)

Everything in this section is unofficial local knowledge from driving schools, not DVSA material. It should be labelled as such in the app.

The test centre is in Eldon Business Park off Eldon Road, Chilwell, next to EvoEnergy, Sheetfabs and NK Motors. [source](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/) (unofficial, published by Driving Lessons With Martin, a Nottingham instructor)

The car park has seven bays: five directly opposite the entrance, on the right as you drive in, and two on the left. The bays are not equally sized, with the widest almost 10 percent wider than the narrowest. [source](https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/) (unofficial)

Because the centre has a usable car park, there is a high chance of the bay park manoeuvre being set either at the very start or at the very end of the test, in the centre's own car park. [source](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/) (unofficial, published by NGPass Driving Academy)

Routes from Chilwell are described as mainly urban, with little country road nearby, and heavy on roundabouts, junctions and crossroads, ranging from quiet back roads to busy main streets. [source](https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/) (unofficial)

The implication for how the generic structure lands at Chilwell: the reverse bay park is the most likely manoeuvre, roundabout observation and lane discipline matter more than rural national speed limit work, and the independent driving section will mostly be sat nav guided through built up roads. (reasoned, from the unofficial sources above)

The parallel research file centre-facts.md in this same folder covers the centre itself in detail and should be the source for anything about the building, opening hours and parking. (reasoned)

## Quotes worth using

A caution on all of these. Each quote below was returned to me by the WebSearch tool as an extract from the page at the given URL. I could not open any page directly to verify character by character. Before any of these is printed in the app as a quotation, the app author should open the URL and check it. (reasoned)

1. On the eyesight check, the examiner's own words:
"I'll point to a number plate. Please tell me the number plate number. Or you can write it down if you prefer."
https://assets.publishing.service.gov.uk/media/624d5879d3bf7f32b5aa072b/driving-test-prompt-cards.pdf

2. On failing the eyesight check:
"If the candidate fails to read the third plate, and the examiner is satisfied beyond doubt of their inability to comply with the eyesight requirement, they should be informed they have not reached the required eyesight standard, this means they have not passed and the remainder of the test will not be carried out."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters

3. On who sits in, the examiner's own words:
"Would you like your instructor/accompanying driver to accompany you on test?"
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

4. On the safety questions, the examiner's own words:
"I would like to ask you two safety questions about your vehicle, the second question will be a show me question on the move, please make yourself comfortable in the car and I will join you in a moment."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

5. On how directions are given:
"Throughout the drive continue ahead, unless traffic signs direct you otherwise, When I want you to turn left or right, I will tell you in plenty of time."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

6. On independent driving with the sat nav, the examiner's own words:
"Now I would like you to drive independently, following the directions from the Satnav until I tell you otherwise. Please don't rely on the speeds shown on the Satnav, as they may not be accurate. Drive on when you are ready."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

7. On independent driving with traffic signs:
"Now I would like you to drive independently following the traffic signs for ……., continue to follow the signs until I tell you otherwise. Drive on when you are ready."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

8. On the end of the independent driving section:
"Thank you, that's the end of the independent driving. I will direct you from now on."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

9. On the emergency stop warning:
"Shortly I shall ask you to carry out an emergency stop."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

10. On the emergency stop instruction:
"When I give this signal, (simultaneously demonstrate, and say) 'Stop,' I'd like you to stop as quickly and as safely as possible."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

11. On the parallel park:
"Would you drive forward and stop alongside the car ahead. Then reverse in and park reasonably close to and parallel with the kerb. Try to complete the exercise within about two car lengths."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

12. On the reverse bay park:
"Would you pull forward either to the left or the right so that your wheels are straight, then reverse into a convenient parking bay."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

13. On pulling up on the right:
"Pull up on the right when it is safe to do so, please. I would now like you to reverse for about two car lengths, keeping reasonably close to the kerb."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

14. On the result, if you pass:
"That's the end of the test and I'm pleased to say you've passed."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

15. On the result, if you do not pass:
"That's the end of the test and I'm sorry you haven't passed. To help you I'll explain why."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

16. On the debrief:
"Would you like your instructor/accompanying driver to listen to the result and debrief?"
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings

17. On examiners and nerves, from the guidance examiners are trained on:
"A pleasant outgoing approach, not only in the waiting room and on the way to the vehicle, but throughout the test is particularly important to help candidates to relax."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test

18. On reassurance:
"If a candidate is in difficulties and clearly suffering from nervousness, the examiner should offer a few words of reassurance to help them settle down."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test

19. On asking the examiner to repeat a direction:
"When the candidate asks for the direction to be repeated or confirmation of direction, the examiner should respond in a friendly, positive manner. This is not a 'prompt' as the candidate will have instigated the query themselves in confirming/planning for the junction ahead."
https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test

20. On going the wrong way, from DVSA's Ready to Pass campaign:
"Independent driving is not a test of how you follow directions."
https://readytopass.campaign.gov.uk/driving-skills/following-routes/

21. On making a mistake, from GOV.UK:
"You can carry on if you make a mistake. It might not affect your test result if it's not serious. Your driving examiner will only stop your test if they think your driving is a danger to other road users."
https://www.gov.uk/driving-test/what-happens-during-test

22. On examiner quotas, from DVSA's Ready to Pass campaign:
"Examiners don't pass or fail a learner driver because they've been given quotas by the DVSA."
https://readytopass.campaign.gov.uk/driving-test/driving-test-myths

## Not found

1. The live text of every GOV.UK page cited. I could not open a single page. WebFetch returned "blocked by the network egress proxy" for www.gov.uk, readytopass.campaign.gov.uk, despatch.blog.gov.uk and assets.publishing.service.gov.uk, and curl to www.gov.uk/driving-test/what-happens-during-test returned "CONNECT tunnel failed, response 403". I did not retry beyond confirming the block, because the proxy documentation says a 403 is an organisation policy denial and must not be routed around. Everything here came through WebSearch summaries of those pages.

2. Whether the 1 in 5 traffic signs split still holds after 24 November 2025. Searched for the current sat nav versus traffic signs proportion. The 1 in 5 figure traces to DVSA's 2017 announcements, and the November 2025 change explicitly allows sat nav, traffic signs or both, which may have changed the split. No 2026 DVSA statement of the proportion was found.

3. Official 2026 confirmation of the sat nav model. Searched for whether the TomTom Start 52 has been replaced. Only driving school and retailer sources say it is still in use in 2026. No DVSA page from 2025 or 2026 naming the current device was found.

4. The exact wording of the seventh "show me" question. Six "show me" questions were confirmed via GOV.UK attributed search results. Widely reported lists give 21 questions in total, implying a seventh, commonly stated as opening and closing the side window, but I could not confirm it from an official source in this session.

5. Whether DVSA notifies DVLA after a failed eyesight check, and whether a provisional licence can be revoked as a result. I searched for this and the search budget was exhausted before a result returned. The app author should check the GOV.UK page on driving eyesight rules.

6. The exact position of the "would you like your instructor to accompany you" question in the sequence. It appears in the DT1 opening wordings, which places it early, but no source I saw stated explicitly whether it is asked in the waiting room, on the walk to the car, or at the car.

7. Whether the DT1 "38 to 40 minutes" figure has been updated since the November 2025 changes. The page cited appears to be an older version of DT1 section 1. There are two DT1 section 1 URLs in circulation, /1-car-driving-test and /01-the-practical-driving-test-and-extended-test-for-cars, and I could not establish which is current.

8. Whether the "at least 2 normal stops" requirement in DT1 has been rewritten to match the new "3 stops" figure. Searched for the current stops wording; only the despatch blog gave a post November 2025 figure.

9. The exact appointment slot length at Nottingham (Chilwell) and the start times used there. Not attempted here, because the parallel research file centre-facts.md records that this was already searched for and not found.

10. Confirmation of the July 2026 cancellation figures (2,281 tests cancelled for an unsuitable car, wrong documents or lateness, and 2,201 for lateness). These came from one search summary of a single Ready to Pass page and appear to overlap. Treat as indicative only.

11. Whether an automatic only test still produces an automatic only licence. This is long standing and almost certainly unchanged, but no source in this session confirmed it and the search budget ran out.

12. Whether a candidate who fails may drive home. Reasoned as no, other than as a supervised learner, but not directly sourced.

## Sources

Because every direct fetch was blocked, I opened none of these pages myself. Each entry records the URL that the WebSearch tool attributed its summarised content to, and what that content gave me.

1. https://www.gov.uk/driving-test/what-happens-during-test
   The core structure page. Test duration around 35 minutes and 65 minutes extended, eyesight distances of 20 and 20.5 metres, the two safety questions, the manoeuvre list, independent driving 20 to 35 minutes, the sat nav being supplied by the examiner, wrong turnings not being faults, and the examiner only stopping the test for danger.

2. https://www.gov.uk/driving-test
   The booking overview page in the same GOV.UK guide. Confirmed the guide's structure and its sub pages.

3. https://www.gov.uk/driving-test/what-to-take
   Arrive 5 minutes before the appointment, the licence requirement, the theory test being checked by the examiner rather than presented as a certificate, and the test being cancelled with loss of fee if the right things are not brought.

4. https://www.gov.uk/driving-test/using-your-own-car
   Most people use the instructor's car, and own cars must meet the rules.

5. https://www.gov.uk/driving-test/driving-test-faults-result
   Fault categories, the examiner telling you the faults, the 10 working day rule before rebooking, and the appeal grounds.

6. https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test
   The pass mark of no more than 15 driving faults with 16 being a fail, the definitions of serious and dangerous faults, the result email showing the faults, and the examiner took action marking.

7. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/14-test-wordings
   The single richest source in this research. The examiner's exact wordings for the declaration, the accompanying driver question, the safety questions, the opening directions, normal stops, all four manoeuvres, independent driving with sat nav and with traffic signs, the end of independent driving, the emergency stop warning and instruction, the pass and fail results, and the debrief question.

8. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-7-test-wordings-all-categories
   The all categories version of the test wordings, returned alongside the page above for most wording searches.

9. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/1-car-driving-test
   The examiner's conduct in the waiting room, the identity and signature checks, the declaration, reassurance for nervous candidates, the angle start and hill start requirements, at least two normal stops, responding to a candidate asking for a direction to be repeated, and stopping a test for public safety.

10. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/01-the-practical-driving-test-and-extended-test-for-cars
    An apparently newer or parallel version of DT1 section 1. The 38 to 40 minute figure from signing the DL25 to stopping the engine, and the one manoeuvre plus possible emergency stop structure.

11. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/6-general-technical-matters
    The eyesight check procedure in full: the 79.4 millimetre character height, good daylight, glasses or contacts, second plate, tape measurement, third plate, the consequence of failing the third, and the rule that a plate is never read at under 20 metres.

12. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/13-vehicle-safety-check-questions
    The show me question wordings and the framing of the two safety questions.

13. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/annex-1-safety-check-questions-cars
    The car specific safety question annex. Direction indicators, brake lights, power assisted steering, rear fog lights, main beam, engine oil, coolant and brake fluid answers.

14. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/8-candidates-with-a-disability-health-condition-or-learning-difficulty
    Extra time for instructions and directions, and two test periods allocated for a candidate recorded as profoundly deaf in both ears.

15. https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1/11-guide-to-assessment-and-marking
    Returned repeatedly for fault and marking searches, supporting the fault category definitions.

16. https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions
    The public facing show me tell me page. The structure of one tell me before driving and one show me while driving, the one driving fault for getting one or both wrong, the fail if driving is dangerous while answering the show me, and several full question and answer pairs.

17. https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions
    The parent publication page for the above.

18. https://www.gov.uk/guidance/rules-for-observing-driving-tests
    Who may sit in: instructor or relative or friend, 16 or over, no part in the test, normally one person with two possible as a reasonable adjustment, and the advice on where to sit.

19. https://www.gov.uk/driving-test/disability-health-condition-or-learning-difficulty
    Telling DVSA when booking, written notes and lip reading and hand signals for deaf candidates, and the BSL interpreter rules including reclaiming the cost.

20. https://www.gov.uk/government/publications/candidates-arriving-late-for-a-driving-test/information-and-guidance-given-to-examiners-when-candidates-are-late-for-a-driving-test
    The minimum 5 minutes grace and the examiner's discretion to allow more.

21. https://www.gov.uk/driving-test/test-cancelled-bad-weather
    Tests that cannot go ahead, including DVSA cancelling for reasons such as an unwell examiner, and having to book and pay again for a problem with the candidate or car.

22. https://www.gov.uk/driving-disqualifications/disqualification-until-test-pass-or-extended-test-pass
    The court ordered extended test requirement.

23. https://www.gov.uk/driving-test-cost
    Test fees of £62 on weekdays and £75 in the evening, at weekends and on bank holidays.

24. https://www.gov.uk/apply-for-your-full-driving-licence
    DVLA usually sending the full licence automatically, the pass certificate as interim proof, and being able to drive as soon as you pass if insured to drive unsupervised.

25. https://www.gov.uk/government/news/driving-test-changes-4-december-2017
    The December 2017 test changes, including the removal of the turn in the road and reversing around a corner.

26. https://www.gov.uk/government/publications/independent-driving-route-diagram-example
    An example independent driving route diagram published by DVSA.

27. https://www.gov.uk/government/publications/top-10-reasons-for-failing-the-driving-test/top-10-reasons-for-failing-the-driving-test-in-great-britain
    DVSA's published list of the most common reasons for failing.

28. https://despatch.blog.gov.uk/2025/11/19/making-adjustments-to-the-driving-test/
    The most important source for a 2026 app. The April 2025 trial at 20 test centres, its extension by 2 months and conclusion in October 2025, and the three permanent changes from 24 November 2025: stops 4 to 3, emergency stop 1 in 3 to 1 in 7, and independent driving flexibility to run for the full test using sat nav, traffic signs or both.

29. https://despatch.blog.gov.uk/2017/07/06/making-the-driving-test-more-reflective-of-real-life-driving/
    The 2017 changes. Independent driving increased from about 10 minutes to around 20, the TomTom Start 52 named as the device, and 1 in 5 tests using traffic signs rather than a sat nav.

30. https://despatch.blog.gov.uk/2017/08/07/driving-test-changes-the-new-instructions-examiners-will-give/
    The new examiner instructions published ahead of the December 2017 changes, supporting several of the wordings above.

31. https://despatch.blog.gov.uk/2019/09/04/developing-an-app-to-electronically-record-driving-tests/
    The move from the paper DL25 to a tablet app, and the test summary being sent nearly instantaneously after the debrief.

32. https://despatch.blog.gov.uk/2019/10/14/improving-the-driving-test-experience-for-candidates/
    The examiner asking at the start of the test which email address the report should go to, the option of a postal summary, and the licence being issued automatically where appropriate.

33. https://readytopass.campaign.gov.uk/driving-test/what-happens-during-driving-test/
    DVSA's own learner facing walkthrough of the test, used to cross check the order of the steps.

34. https://readytopass.campaign.gov.uk/driving-test/what-to-take/
    The car condition requirements: L plates, the examiner's mirror, no dashboard warning lights, working lights and indicators, legal tyres, working seat belts. Also the July 2026 cancellation figures.

35. https://readytopass.campaign.gov.uk/driving-test/taking-your-instructor-on-your-test/
    DVSA's page encouraging candidates to take their instructor on the test.

36. https://readytopass.campaign.gov.uk/driving-skills/following-routes/
    Independent driving not being a test of following directions, going off route not being a fault in itself, and asking for confirmation being part of driving independently.

37. https://readytopass.campaign.gov.uk/driving-test/driving-test-myths
    DVSA debunking the examiner quota myth.

38. https://readytopass.campaign.gov.uk/driving-skills/manoeuvres/
    DVSA's learner facing manoeuvres pages, returned in the manoeuvre searches.

39. https://assets.publishing.service.gov.uk/media/624d5879d3bf7f32b5aa072b/driving-test-prompt-cards.pdf
    The DVSA driving test prompt cards. The eyesight wording including the option to write the registration down, and the rule that the emergency stop is only asked after a normal stop.

40. https://assets.publishing.service.gov.uk/media/62c822d3e90e077480fd3ce6/instructions-and-wording-to-use-during-mock-driving-tests__5_.odt
    DVSA's mock test wording document, returned repeatedly in wording searches as a corroborating source.

41. https://www.disabilitydrivinginstructors.com/wp-content/uploads/2023/11/DVSA-Deaf-Candidate-Pack-5.pdf
    Unofficial host. A copy of DVSA's deaf customer support pack with prompt cards for the practical test.

42. https://www.learnerdriving.com/driving-test/marking/eyesight
    Unofficial, LearnerDriving. The eyesight failure being recorded on the marking sheet with no drive taking place.

43. https://getmypass.co.uk/sat-nav-on-driving-test/
    Unofficial, GetMyPass. The TomTom Start 52 still being the device in 2026 and how it is mounted and set up.

44. https://dodrive.uk/the-extended-driving-test/
    Unofficial, DoDrive driving school. Extended test content, around 65 minutes, possibly all manoeuvres, theory test retake, and the same 15 fault allowance.

45. https://scarsdalesolicitors.com/extended-driving-test/
    Unofficial, Scarsdale Solicitors. Extended test fees of £124 and £150.

46. https://www.carwow.co.uk/news/10823/dvsa-driving-test-booking-changes-2026
    Unofficial, Carwow. The 2026 booking rule changes of 31 March, 8 April and 9 June 2026.

47. https://www.drivethrul.co.uk/learn-to-drive/show-me-tell-me
    Unofficial, DriveThruL. The count of 21 show me tell me questions, 14 tell me and 7 show me.

48. https://ngpassdrivingacademy.co.uk/chilwell-driving-test-route-a-complete-guide-for-learners/
    Unofficial, NGPass Driving Academy, Nottingham. Bay parking likely at the start or end of a Chilwell test in the centre car park, and the urban and roundabout heavy character of the routes.

49. https://www.drivinglessonswithmartin.co.uk/451/chilwell-test-centre/
    Unofficial, Driving Lessons With Martin, Nottingham. The Eldon Business Park location, the seven bays and their uneven widths.

50. https://www.drivingtesttips.biz/driving-test-centres/chilwell-driving-test-centre.html
    Unofficial, DrivingTestTips.biz. The commonly quoted 40 minute test length.

51. https://passrates.uk/guide/driving-test-faults-explained
    Unofficial, PassRates. Used only to cross check and reject the false claim that the pass mark had changed from 15 to 12. Confirms 15 driving faults with the 16th being an automatic fail.

52. https://examroutes.co.uk/27305/pulling-up-on-the-left-2026-normal-stop-driving-test/
    Unofficial, Exam Routes. The reduction of routine pull up and move off exercises from 4 to 3 for 2026, described from a learner's point of view.
