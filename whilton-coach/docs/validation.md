# What was checked, and against what

| Claim | Status | Sources |
|---|---|---|
| Corner order, both layouts | Agreed | BUKC National guide, NRDD International lap, KCL Motorsport 2013 guide, Club100 venue page and race report, circuit map |
| Track shape | Checked against the owner's copy of the circuit map (19 September 2026) | tools/check_map.py: the drawn loop and the app's centreline agree to 0.5 m RMS and 1.6 m at worst after alignment; every corner apex within 1.3 m. The two are the same drawing, so this confirms the shape, not the scale or the length |
| Direction of travel: clockwise | Derived | Every centreline in data.json closes clockwise and each corner's hand matches the guides; no page states the word |
| Turn numbers | Convention | International numbers follow BUKC and NRDD (Fine Lady unnumbered, Christmas T3, Pit Bend T11); the BUKC National guide numbers only Turns 1 and 2, so the National count here follows the same pattern. Other listings count 12, 13 or 14 turns |
| Alternative names: Chapmans for the left into The Boot (KCL 2013), Wilkins and Osiers for Parker and Chapmans (Club100 race report), Osiers before the short straight to The Boot (Club100 venue page), Championship Bend for the last corner (Kart Directory) | Single sources each | Search excerpts only |
| Lap length: 1054 m with the chicane | Settled by the regulations and the lap times | WMKC 2025 and BKC 2025 supplementary regulations both state 1054 m. Real laps agree: Senior X30 45.28 s and Senior Rotax 45.54 s at WMKC Round 3, May 2025 (Alpha Timing); a quick hire driver 1:04.537 in a 20-minute International arrive-and-drive practice, 18 February 2025 (Alpha Timing); Sodi RT8 hire records 56.99 and 56.19 s before the chicane (video titles); Rotax Max 44.8 s, June 2021 (Karting Track Guides). On a 1200 m lap those would be averages of 52 to 59 mph, impossible here. The venue's 1200 m and 960 m and the BKC page's 1190 m are treated as advertising figures. The map is now scaled to 1054 m; the National comes out at about 860 m (851 m without the chicane) |
| Marker positions on the map (22 m, 24 m and 14 m before turn-in) | Assumed | Set in build_data.py, not traced; the experienced braking points are drawn at them by definition |
| Chicane approach: 6 to 8 m of straight after The Boot on the trace | Unverified | Read from a small map; the designer says drivers follow the penultimate apex for longer and stay right |
| Start line position | Unchecked | Where the trace begins, 26 m before Oblivion; not checked against the venue's timing line |
| Hire fleet: BirelART N35 390cc, arrived autumn 2024, up to 50 mph; sessions on both layouts, 20-minute voucher on the National; 450 m Mill circuit for juniors; Sprint, Grand Prix and Endurance formats; age and height limits differ between pages | Venue pages, search excerpts | whiltonmill.co.uk arrive-and-drive, voucher, open races and Open Sprint pages; Facebook fleet post; Alpha Timing session titles |
| Chicane not always used at hire events; run-off a bog in the rain | Single report | CUAC October 2024: the old layout was kept that day because a cycle event had used it and the new tarmac was the only wet surface |
| Wet: turn in very late and turn quickly to full lock off the rubber | Single source | Kart Directory notes on the Rich Tea Racing wet lap |
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
| Chicane kerbs | Caption only | Alpha Live first-test-day video title (March 2024) describes karts hopping the new final-sector kerbs; no profile published; default is stay off until seen |
| Chapmans exit kerb guarded by tyres | No source | The documented tyre stack is at Parker (BUKC); removed from the card |
| Pit Bend: skim the inside kerb | Out of date | The skim advice is the older BUKC International text, written before the 2019 to 2024 tall kerb; nothing describes the March 2024 replacement |
| Ashby, Parker, Chapmans lines and kerbs | Single coach source | NRDD (republished by Club100 and BUKC); Club100 report says Ashby and Chapmans are off camber |
| The Boot: marshal post on the right, give up the left | Agreed | BUKC, NRDD, KCL |
| Pit Bend without chicane | Agreed | BUKC, NRDD, KCL |
| Tall last-corner kerb removed in 2024 | Confirmed | CUAC race report, October 2024; Driven International |
| Chicane is the normal route | Confirmed | Whilton Mill, Driven International, CUAC report, 2025 Club100 onboard |
| How to drive the chicane | No written source | Reasoned from shape and general technique |
| Braking levels 1 to 5, zone lengths, lateral line | Estimates | Reading of the guides, not measured |
| Hire karts cut throttle when the brake is touched | Single report | CUAC race report, 2024 |
| Wet line | General technique | Only the Oblivion and Crook point is Whilton-specific (BUKC) |

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
