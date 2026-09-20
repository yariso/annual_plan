# What was checked, and against what

| Claim | Status | Sources |
|---|---|---|
| Corner order, both layouts | Agreed | BUKC National guide, NRDD International lap, KCL Motorsport 2013 guide, Club100 venue page and race report, circuit map |
| Track shape | Checked against the owner's copy of the circuit map (19 September 2026) | tools/check_map.py: the drawn loop and the app's centreline agree to 0.5 m RMS and 1.6 m at worst after alignment; every corner apex within 1.3 m. The two are the same drawing, so this confirms the shape, not the scale or the length |
| Direction of travel: clockwise | Derived | Every centreline in data.json closes clockwise and each corner's hand matches the guides; no page states the word |
| Turn numbers | Convention | International numbers follow BUKC and NRDD (Fine Lady unnumbered, Christmas T3, Pit Bend T11); the BUKC National guide numbers only Turns 1 and 2, so the National count here follows the same pattern. Other listings count 12, 13 or 14 turns |
| Alternative names: Chapmans for the left into The Boot (KCL 2013), Osiers before the short straight to The Boot (Club100 venue page), Championship Bend for the last corner (Kart Directory) | Single sources each | Search excerpts only. The earlier claim that a Club100 race report calls Parker Wilkins was not reproduced in the September 2026 card check: the only Wilkins excerpt found is in a Club100 report from Shenington, so it is withdrawn |
| Lap length: 1054 m with the chicane | Settled by the regulations and the lap times | WMKC 2025 and BKC 2025 supplementary regulations both state 1054 m. Real laps agree: Senior X30 45.28 s and Senior Rotax 45.54 s at WMKC Round 3, May 2025 (Alpha Timing); a quick hire driver 1:04.537 in a 20-minute International arrive-and-drive practice, 18 February 2025 (Alpha Timing); Sodi RT8 hire records 56.99 and 56.19 s before the chicane (video titles); Rotax Max 44.8 s, June 2021 (Karting Track Guides). On a 1200 m lap those would be averages of 52 to 59 mph, impossible here. The venue's 1200 m and 960 m and the BKC page's 1190 m are treated as advertising figures. The map is now scaled to 1054 m; the National comes out at about 860 m (851 m without the chicane) |
| Marker positions on the map (22 m, 24 m and 14 m before turn-in) | Assumed | Set in build_data.py, not traced; the experienced braking points are drawn at them by definition |
| Chicane approach: 6 to 8 m of straight after The Boot on the trace | Unverified | Read from a small map; the designer says drivers follow the penultimate apex for longer and stay right |
| Start line position | Unchecked | Where the trace begins, 26 m before Oblivion; not checked against the venue's timing line |
| Hire fleet: BirelART N35 390cc, arrived autumn 2024, up to 50 mph; sessions on both layouts, 20-minute voucher on the National; 450 m Mill circuit for juniors; Sprint, Grand Prix and Endurance formats; age and height limits differ between pages | Venue pages, search excerpts | whiltonmill.co.uk arrive-and-drive, voucher, open races and Open Sprint pages; Facebook fleet post; Alpha Timing session titles |
| Chicane not always used at hire events; run-off a bog in the rain | Single report | CUAC October 2024: the old layout was kept that day because a cycle event had used it and the new tarmac was the only wet surface |
| Wet: turn in very late and turn quickly to full lock off the rubber | Two sources | Kart Directory notes on the Rich Tea Racing wet lap; UK Karting's wet-driving article, which uses The Boot at Whilton as its worked example (turn in very, very late, snap the wheel to full lock, the quick turn jacks the inside rear) http://www.karting.co.uk/KandK/Tech/WetDriving.html |
| Flags | General | UK karting guides (Team Karting, Jack Stedman Racing, Flow Racers); not Whilton's briefing |
| Radio or audio to the driver at race meetings | Club100 only | Club100 2021 rules say pit-to-kart radio is not permitted; Motorsport UK wording not checked; Whilton's hire rule on phones and earpieces not found |
| Phone behaviour (GPS stops when locked, wake lock support, silent switch, Bluetooth latency) | From memory, unverified | Could not be checked in this session |
| Oblivion and Crook as a pair, lift then flat | Agreed | BUKC, NRDD, KCL |
| Crook apex timing | Sources disagree | BUKC (turn in early) against KCL 2013 (late apex) |
| Christmas: marshal post on the left, hill shortens the stop, late apex | Agreed | BUKC, NRDD, KCL |
| National hairpin brake marker is the change in tarmac | Agreed | BUKC, KCL |
| Zulu: set up the last left, use its inside kerb | Agreed | BUKC, KCL |
| Zulu exit kerb onto the back straight: the race-kart line touches it | Single source | BUKC National; novice verdict is with care, outside front only, once seen flat |
| National hairpin: clip the kerb on the inside on the way out, astroturf outside | Single source | BUKC National |
| Crook and Ashby concrete run-offs | Single coach source, beyond the white line | BUKC and NRDD use them; Motorsport UK 2023 track-limit rule counts the contact patch beyond the line; no hire-session rule found, so the briefing decides |
| Chicane kerbs | Agreed by several that they are aggressive; no profile published | Alpha Live first-test-day slow motion of karts bouncing over the kerbs (March 2024), a photo of a damaged new kerb after one day, a TikTok topic page on karts flipping on the new kerbs; nothing says which kerb or whether they were softened since. Verdict: stay off |
| Chapmans exit kerb guarded by tyres | No source | The documented tyre stack is at Parker (BUKC); removed from the card |
| Pit Bend: skim the inside kerb | Out of date | The skim advice is the older BUKC International text, written before the 2019 to 2024 tall kerb; nothing describes the March 2024 replacement |
| Ashby, Parker, Chapmans lines and kerbs | Single coach source | NRDD (republished by Club100 and BUKC); Club100 report says Ashby and Chapmans are off camber |
| The Boot: marshal post on the right, give up the left | Agreed | BUKC, NRDD, KCL |
| Pit Bend without chicane | Agreed | BUKC, NRDD, KCL |
| Tall last-corner kerb removed in 2024 | Confirmed | CUAC race report, October 2024; Driven International |
| Chicane is the normal route | Confirmed | Whilton Mill, Driven International, CUAC report, 2025 Club100 onboard |
| How to drive the chicane | Researched September 2026: no written driver or coach line exists; the card rests on the designer's line, the shape, the model and the facts below | About 270 searches across four angles (guides and forums, video descriptions and comments, race reports, the venue and the designer). Designer's line: follow The Boot apex for longer, stay right, then the chicane blends into the final corner (Driven International, republished by the venue; single source). Shape: a tight left on new tarmac with new kerbs (EMR Racing, OverTake.gg). Braking zone with a bog beyond it, the chicane tarmac the only wet part of a drying lap, hire races sometimes on the old layout, resting a foot on the brake cuts the N35's throttle (CUAC, October 2024; single source). Kerbs aggressive: karts airborne on the first test day (Alpha Live), a kerb damaged after a day (photo post), clips of flips (TikTok topic page). The 390cc karts step out on the throttle (gokartracing.uk; single source). Pit Bend exit policed with a camera and timing loop (Kartingeverything 2019, BUKC, NRDD). Still unknown: any braking reference, the apex, whether any kerb can be clipped, the replacement Pit Bend kerb's profile, whether Pit Bend is still near flat, the wet line, the lap-time cost. The technique is in videos whose spoken content could not be read: Wolemid 2025 guide, the March 2024 analysis, Attaq's first runs, the venue's Monday Night Race Club clip, the BKC look at the new last corner. The widely indexed chicane advice (tarmac change, painted inside kerb) is the Zulu chicane's |
| Braking levels 1 to 5, zone lengths, lateral line | Estimates | Reading of the guides, not measured |
| Hire karts cut throttle when the brake is touched | Single report | CUAC race report, 2024 |
| Wet line | General technique | Only the Oblivion and Crook point is Whilton-specific (BUKC) |

## Card check, September 2026

Every substantive sentence of every corner card (the pedal plan, marker, line, kerbs, mistake, passing and wet fields) was checked against the written guides by four independent readers, each running 45 to 60 searches for the guide text and classifying each sentence as supported by a quote, reasoned (no guide says it), or contradicted.

| | Count |
|---|---|
| Sentences supported by a quoted guide | 193 |
| Sentences that are reasoned, general technique or inference, and say so or are marked here | 141 |
| Sentences contradicted by a guide | 9 |

The nine contradictions, all applied: Chapmans' exit kerb is the sign of a good lap on the coach's line, not a hazard (NRDD), and the turn-in is from the far right; the hairpin's clip-on-exit advice is the 2013 KCL guide's, not BUKC's; on the N35 hire karts a foot on the brake cuts the throttle, not the engine (CUAC); the tall Pit Bend kerb was warned about by a drivers' petition, not by the older guides, which told you to skim its predecessor; a written Whilton-specific wet instruction for The Boot exists after all (UK Karting); and two "contradictions" from the Tarporley Karting Team page (Chapman running into Zulu One, The Boot entered as a right-hander) are that page's errors against BUKC, NRDD, KCL and the circuit map, so Tarporley is used only for corner descriptions, never for order. Guide points the cards left out were added where they change what a driver does: the two places the guides put the cautious driver's lift at Oblivion and Crook, brake later and harder each lap at Christmas and The Boot, the National kink trade-off, Ashby as a wet passing place, why the tyres sit on Parker's exit kerb, the short straight after the hairpin, the drift right after Pit Bend, and the Boot's late-apex left. The earlier claim that a Club100 report calls Parker Wilkins was withdrawn (see above).

What this check cannot do: it reads the guides through search excerpts, so a sentence marked reasoned may be supported by text that did not surface, and no human coach has signed the cards. The reasoned sentences are the novice progressions (a wheel's width off the kerb first, then the inside front), the kerb verdicts where no guide covers the kerb, the wet lines other than The Boot's, and the chicane.

## The model against the guide

docs/model-vs-guide.md compares the physics model with the guide at every corner: the pedal class, the brake point against the painted zone, and the side of the track at the approach, the apex and past the exit. On the calibrated model 32 of 96 readings agree on all three counts. The recurring differences: the model brakes at Crook where every guide says flat or a lift (the traced Crook is probably tighter than the real one, which a GPS survey will settle), it lifts at Inkermans where the guide says flat, and the guide's drawn line returns to the middle after an exit sooner than a kart running out to the edge. Every corner card carries its own line of this comparison.

## The race plan and the 25 Hz box, September 2026

A second research pass (five reports each) fed docs/not-last.md and docs/diy-box.md: the event's own pages, UK coaches and venues, the motor learning literature through Consensus and PubMed, WebKit source for the phone's sensors, and the parts market for a home-built receiver. The independent claim-by-claim verification pass planned for both ran out of session budget after the research phase, so each note lists its claims as unverified where only one or two sources were read, and the event facts (format, layout, start, pit rules, earpieces) are to be confirmed at the briefing. Two things the pass changed in the app: the motion sensor's brake timing (which the sensor literature supports for a phone in an unknown orientation, with about 71 to 97 per cent event accuracy in road studies) and the coaching delivery (the point three seconds after the lap time, the self-estimate question in the debrief, imagery guidance), which rest on small, replicated effects rather than large ones.

## Links
- https://bukc.co.uk/circuits/whilton-mill-national/
- https://bukc.co.uk/circuits/whilton-mill-international/
- https://www.club100.co.uk/circuit-listing/whilton-mill/
- https://club100.co.uk/race-report/newman-battles-through-to-take-title-with-another-whilton-triumph/
- https://kartdirectory.racing/uk/video/whilton-mill-international-wet-with-rich-tea-racing/
- https://www.whiltonmill.co.uk/individuals/arrive-drive/
- https://www.whiltonmill.co.uk/individuals/open-races/
- https://www.whiltonmillkc.co.uk/wp-content/uploads/sites/3/2025/10/WMKC-SRs-Club-Championship-Rounds-2025-V14-clean.pdf
- https://results.alphatiming.co.uk/whilton
- https://www.kartingeverything.com/2019/01/29/track-limits-has-it-gone-too-far/
- https://nrdd.racing/track-guide/whilton-mill-track-guide/
- https://kclmotorsport.wordpress.com/2013/06/23/whilton-mill-track-guide-club-100s/
- https://www.cuautomobileclub.org/post/varsity-2024
- https://driven-international.com/whilton-mill-kart-circuit-enhancements-announced
- https://www.whiltonmill.co.uk/blog/2024/02/22/whilton-mill-ltd-announce-track-enhancements/

## Videos: what could be read about each (titles, dates, descriptions and page notes via search; the spoken content could not be fetched)
- 2025 chicane guide by Wolemid, "2025 Whilton Mill Track Guide, The new Chicane", 22 April 2025, onboard with commentary on braking points, apex and kerb use at the chicane: https://www.youtube.com/watch?v=SCg5JWaubVo. Kart Directory's page adds only that it covers braking points and lines; no corner text.
- "Whilton Mill Circuit Changes | Explained", 26 February 2024, the designer's description of the new final sector: https://www.youtube.com/watch?v=0OREA7Ejbi0
- "Whilton Mill NEW Track Upgrade | TIPS & In Depth Analysis", 21 March 2024, the week the chicane opened: https://m.youtube.com/watch?v=OtTFytSbqvo (and a short: https://www.youtube.com/shorts/rLjQz588lgA)
- In-depth 2021 guide: Brad Philpot, Rotax Max, June 2021, dry, 44.8 s, voice-over hot lap with tips on extra tarmac and which kerbs help: https://www.youtube.com/watch?v=aenDbbbgKio. The Karting Track Guides page for it repeats the NRDD text (Oblivion and Crook as a pair, take some inside kerb, exit left; brake very late into Christmas because it is uphill, marshal post on the left; Christmas and Ashby the overtaking spots).
- "Whilton Mill Track Guide, Onboard in a GX-UK Kart", 14 April 2025, a flying lap: https://www.youtube.com/watch?v=7kLhkriwlRo
- "My First Time Racing the Controversial New Chicane", 2024: https://www.youtube.com/watch?v=WQZjTc8cU08; Attaq Motorsport, "First runs through the new Whilton chicane" (Facebook video, March 2024); the venue's Monday Night Race Club, "How the chicane should be taken" (Facebook video, hire karts). None has readable text.
- Dante Dhillon, Sodi RT8 hire kart, International before the chicane: "LAP RECORD 56.992" and "EX LAP RECORD 56.194" (CovKartSport National Series), plus a Club 100 Zulu hot lap (November 2019): https://www.youtube.com/watch?v=UuduhSd-Qx0
- Club 100 Karting, "A Beginners Guide to Whilton Mill" (8 October 2020) and "A Beginners Guide to Whilton Mill Zulu" (1 December 2020): https://www.youtube.com/watch?v=rGZjQR0BcAk, https://www.youtube.com/watch?v=iLVuuBcwkSk
- KartSim, "Mastering Whilton Mill, lap guide with Coach Jack" (simulator, 2025), page text says only braking zones, lines and techniques: https://www.kart-sim.com/blogs/lap-guides/mastering-whilton-mill-lap-guide-with-coach-jack
- Alpha Live, first-test-day footage of the new final sector (kerbs), March 2024: title only seen
- Rich Tea Racing wet and dry International laps (Kart Directory video pages)
- Chicane analysis from the week it opened, March 2024: https://m.youtube.com/watch?v=OtTFytSbqvo
- The venue's Monday Night Race Club on how to take the chicane in a hire kart: https://www.facebook.com/mondaynightraceclub/videos/how-the-chicane-should-be-taken-whilton-mill-go-karting-and-outdoor-activities/651790110561495/
- Alpha Live first-test-day footage of the new final sector (kerbs): title only seen
- The Whilton Mill Kart Club 2025 supplementary regulations PDF may hold circuit-specific track-limit notes
