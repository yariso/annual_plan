# A 25 Hz box: buy, build a logger, or build a live box

Written 20 September 2026 from a research pass (five reports: modules, off-the-shelf units, the iPhone link, firmware, and the app's own code). The independent verification pass that was meant to check every load-bearing claim did not run: the session hit its usage limit after the research phase. So every price and rate below is what one researcher read in a search excerpt, and is marked unverified unless the app's own code or a datasheet quotation backs it. Prices are UK, inc VAT where the shop shows it, as of September 2026.

## 1. The short answer

Yes, a 25 Hz GNSS box can be built for roughly £90 to £120 in parts, against £206 to £254 for a RaceBox Mini or Mini S (ClubRacingUK sale prices, unverified). The receiver is not the hard part. The hard part is that nothing built or bought can feed the app live in Safari on an iPhone:

- Safari on iOS has no Web Bluetooth in any version, and every iOS browser uses WebKit, so a Bluetooth box (RaceBox, Dragy, Qstarz, or a home-built one) cannot reach the page at all (caniuse.com/web-bluetooth). The RaceBox Mini S recommended earlier would not have solved this either; that advice was wrong for Safari.
- An HTTPS page cannot open a plain ws:// WebSocket or fetch http:// from a box at 192.168.4.1: every browser blocks it as mixed content, with no exception for private addresses (websocket.org, MDN mixed content). WebKit has no local-network permission prompt.
- The MFi receivers that feed Location Services (Garmin GLO 2 about £105, Dual XGPS160 about £173) reach Safari's geolocation, but native lap-timer developers report 3 to 4 Hz from them on older iOS and RaceChrono's FAQ says 1 Hz since iOS 18.6, so they would improve accuracy, not rate (unverified for Safari specifically; a five-minute test with a borrowed unit would settle it).

So the phone-only step comes first (the motion sensor in the app now times braking from a pocket at any GPS rate), and a box is worth building for one of two uses: a logger whose file the app reads after each stint, or a live box that serves the app itself over its own Wi-Fi.

## 2. Three options

| | Cost | In the race the driver hears | After the stint the team gets | Build effort | Risk |
|---|---|---|---|---|---|
| A. Buy: RaceBox Micro or Dragy DRG70-C | Micro about £120 (one classified; UK retail not found), Dragy £159.99 (Pro-Race Engineering) | The phone coach as now (the box cannot reach Safari) | A 25 Hz log from the maker's app, exported as CSV and loaded into the app's Load a CSV | None | The export format has to be mapped to the app's CSV; the maker's app must be installed on the same phone |
| B. Build a logger (microSD) | About £90 to £120 | The phone coach as now | A 25 Hz CSV in the app's own format, downloaded from the box's Wi-Fi page into Files and loaded with Load a CSV | A weekend | Antenna view from a pocket or seat back; file transfer by hand after each stint |
| C. Build a live box (serves the app over Wi-Fi) | Same parts as B | Corner calls timed from 25 Hz fixes, lead calibration live | Everything in B, plus the live laps | Two weekends and hand tests on the iPhone | The page runs on plain http, so no wake lock (use Auto-Lock Never) and no phone GPS; iOS may drop a Wi-Fi with no internet; the shared store sync depends on cellular fallback; a separate localStorage from the GitHub Pages copy |

Recommendation: B first. It keeps the current HTTPS app, its saved lock, team file and cloud sign-in untouched, and still gives every stint a 25 Hz brake-onset and apex analysis. C is the same hardware with more firmware and more iPhone unknowns; build it after B works.

## 3. Bill of materials (route B, and C on the same board)

| Part | Price | Source | Status |
|---|---|---|---|
| Adafruit ESP32 Feather V2 (8 MB flash, 2 MB PSRAM, LiPo charger on board) | £19.20 | The Pi Hut | unverified |
| Adalogger FeatherWing (microSD plus RTC) | £8.60 | The Pi Hut | unverified |
| 2000 mAh 3.7 V LiPo, JST-PH | £12.80 (PKCell alternative £10) | The Pi Hut | unverified |
| GNSS receiver, one of: SparkFun MAX-M10S breakout (Qwiic) | £21.10 in one report, £47.70 in another (two Pi Hut listings, one may be the active-antenna variant) | The Pi Hut | unverified, check which board |
| or a NEO-M9N board: Matek M9N-5883 about £43.90, Holybro Micro M9N £49.99, SparkFun MicroMod NEO-M9N £41.30 on sale | £41 to £50 | UK drone shops, 3DXR, The Pi Hut | unverified |
| Active patch antenna if the board has a chip antenna | about £10 | various | unverified |
| microSD card, IP65 box about 100 x 68 x 50 mm with a clear lid, a strap | about £15 to £20 | various | unverified |

Totals: about £90 to £120 with an M10 board, £110 to £140 with an M9N board.

Which receiver:

- u-blox NEO-M9N: the datasheet gives a maximum navigation rate of 25 Hz with four concurrent constellations (UBX-19014285; the researcher quotes retailer copy of the datasheet). Velocity accuracy 0.05 m/s, 4 g dynamics. Default output 1 Hz until configured. This is the like-for-like part; resellers say the RaceBox Mini uses it (second hand).
- u-blox M10 (MAX-M10S, SAM-M10Q): u-blox information note UBX-23006557 says every M10 product can be configured to 25 Hz with GPS only, 20 Hz with two constellations, 16 Hz with three and 10 Hz with four. One report says this needs firmware SPG 5.10 and that the ROM cannot be reflashed, so a board's firmware version must be checked before buying it for 25 Hz. The open-source ESP32 RaceBox emulator reaches 25 Hz on an M10 with GPS only.
- u-blox M8N boards (BN-220 £16.99, BN-880, GY-GPSV3 about £11): 10 Hz concurrent, 18 Hz single constellation per the datasheet, and the firmware 3.01 release notes recommend at most 5 Hz multi-GNSS. 10 Hz is the practical ceiling, which is enough for the app's lead calibration but not 25 Hz. Many cheap M8N boards are counterfeit or locked to old firmware.
- Quectel LC29H (Waveshare HAT £17.30), LC76G, L76: 10 Hz maximum. LG290P does 20 Hz but the module alone is about $81. Allystar TAU1113 and TAU1201 datasheets say 5 Hz.

Antenna placement: the driver's body blocks satellites, so the patch antenna should face the sky from the top of the seat back behind the head or the top of the helmet on a short cable, not from a pocket. Reasoned, not tested on a kart. Power the box on with sky view two minutes before the stint (cold start about 24 s, hot start about 2 s with a backup battery).

## 4. The link to the iPhone

What the research established (each from one or two sources, unverified by a second pass):

- Mixed content: an https page cannot open ws:// or http:// to a LAN address in Safari, Chrome, Firefox or Edge; only localhost is exempt.
- Served from the box over plain http, the app keeps speechSynthesis (no secure context needed, per the W3C speech API discussion), WebSocket, localStorage and file inputs. It loses geolocation (Safari requires https since iOS 10) and the Screen Wake Lock (secure contexts only; Safari iOS 16.4 and up on https). localStorage is per origin, so the http copy has its own team table, lock and cloud session; export the team file to move laps across.
- An iPhone on a Wi-Fi with no internet keeps cellular for internet when Wi-Fi Assist is on (Apple support 109323), but some models drop such networks, iOS does not auto-join an open network not joined by hand in the last two weeks, and an ESP32 that fails Apple's captive-portal probe can be dropped (arduino-esp32 issue 2536). Expect a manual rejoin before each stint.
- A self-signed or private-CA certificate for an IP address on the box is impractical on iOS; not a novice path.
- Safari saves plain http downloads into Files (iOS 13 download manager), and a file input on an https page opens Files, so the logger's CSV reaches the GitHub Pages app with no browser trick. The app's own export header is `time_ms,latitude,longitude,speed_mps,heading_deg,accuracy_m,fix_age_s`; a box that writes exactly that loads through Load a CSV with no code change (`parseCsv` and `replay` in src/app.src.html).
- Bluefy (free) and WebBLE (about £2, last updated 2023) are App Store browsers with their own Bluetooth stack; Bluefy needs https pages and offers a non-standard screen-dim control. Reviews report connection instability and nobody has published 25 Hz notification throughput for them. A Bluetooth route through one of them is a possible experiment, not a race-day plan.

## 5. Firmware and app changes in outline

Firmware (ESP32 Feather, Arduino):

- SparkFun u-blox GNSS v3 library: `setNavigationFrequency(25)` (CFG-RATE measurement period 40 ms), `setAutoPVTcallback` on UBX-NAV-PVT, UBX only on the UART (no NMEA), dynamic model automotive, serial 115200 or 230400. NAV-PVT is 100 bytes, so 25 Hz is about 2.5 kB/s and fits 115200 with margin; the default full NMEA set from four constellations does not.
- Logging: one file per power-up named from a counter in non-volatile storage, rows buffered to 512 bytes and synced once a second, a stop button that closes the file. Columns as the app's CSV header above, time from the GNSS clock in ms.
- Live (route C): Wi-Fi access point, the 470 kB dist/index.html served from flash (about 130 kB gzipped), one WebSocket pushing a JSON line per fix `{t, lat, lon, spd, hdg, acc}`. ESPAsyncWebServer's release notes claim 20 to 60 messages a second to several clients without overflowing; guard with the queue-full check so a slow phone drops frames rather than disconnecting. GNSS parsing and SD writes on one core, Wi-Fi on the other; no shared SPI. Answer Apple's captive-portal probe with "Success" to keep the phone attached (untested).
- Power: about 200 to 300 mA at the cell for ESP32 with Wi-Fi plus a 43 mA receiver (reasoned), so a 2000 mAh cell gives roughly five to seven hours. A USB power bank may switch off at low draw; use it as a charger between stints.

App changes (from the code report):

- Every fix source enters through `lapFix({ t, lat, lon, spd, acc })` and `lapTick(now)`. A WebSocket client is a refactor of the geolocation callback into a `liveFix(coords, timestampMs)` function called from `ws.onmessage`, with reconnection on close and on visibilitychange (Safari closes sockets when the page is hidden).
- The box should stamp each fix with GNSS time so the app's fix-age logic (`lagKnown`) measures the Wi-Fi delay as it does the phone's.
- Above about 10 Hz two places difference consecutive samples and would read speed jitter as braking: the per-fix acceleration in `lapFix` and the brake-onset scan in `lapMetrics` (its decel threshold of 1.6 m/s/s over a 0.05 s floor). Smooth over about a quarter of a second when the rate is above 5 Hz before a box feed or log is trusted. Not yet done.
- `replay` does not log laps to the team table or the cloud (only live laps do). An after-stint import should be able to log under a driver's name. Not yet done.
- A 25 Hz stint is about 30,000 rows; thin the stored recording to 5 Hz before saving it to localStorage.

## 6. Risks and unknowns

- All prices and the M10 firmware question are unverified (see the top of this note).
- Antenna sky view with a driver in the way; nothing here was tested on a kart.
- Whether the venue allows a battery box strapped to the driver or seat in a hire session: no written rule found.
- Route C's iPhone behaviour on a Wi-Fi with no internet, and speech from an http page with Bluetooth earphones, need a hand test at home before anything is built on them.
- The ESP32 toolchain could not be fetched in this sandbox (the PlatformIO registry is blocked), so no firmware has been compiled here; the outline above is a plan, not code.

## 7. What to test at home, in order

1. Motion sensor (already in the app): Check GPS here on the Coach tab and confirm the readout says the motion sensor works; then a walk test with the phone in the pocket you will race with.
2. If buying: load one lap of the maker's CSV export into Load a CSV and confirm laps, brake points and the debrief appear.
3. If building B: log a drive to the shops at 25 Hz, download the file from the box's page into Files, load it, and confirm the fix rate readout shows 25 and the brake points look right.
4. Only then C: join the box's Wi-Fi, open http://192.168.4.1, confirm speech and the socket run for twenty minutes with the screen on.

## Sources named by the researchers

caniuse.com/web-bluetooth; websocket.org/reference/wss-vs-ws; developer.mozilla.org mixed content and Service Worker pages; support.apple.com/en-us/109323 (Wi-Fi Assist); support.apple.com/en-us/103769 (certificate rules); github.com/espressif/arduino-esp32/issues/2536; github.com/w3c/speech-api/pull/31; webkit.org/blog/10218; racechrono.com FAQ pages on external GPS and Garmin GLO; developer.apple.com/forums threads 722855, 129845 and 696310; clubracinguk.co.uk RaceBox pages; prorace-engineering.co.uk Dragy page; hackster.io RaceBox Micro article; racebox.pro protocol documentation; github.com/anchit92/ESP32-RaceBox-mini-Emulator; github.com/renatobo/bonogps; content.u-blox.com NEO-M9N datasheet UBX-19014285, integration manual UBX-19014286, M10 information note UBX-23006557, firmware 3.01 release notes; thepihut.com product pages (Feather V2, Adalogger, LiPo, MAX-M10S, MicroMod M9N, LC29H HAT); 3dxr.co.uk Holybro M9N; ardupilot.org Beitian page; github.com/sparkfun/SparkFun_u-blox_GNSS_v3; github.com/ESP32Async/ESPAsyncWebServer releases; esp32.com forum threads on SD logging and SPI sharing; learn.sparkfun.com NEO-M9N hookup guide.
