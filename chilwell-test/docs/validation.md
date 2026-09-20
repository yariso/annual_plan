# Validation record

What is in this app, where it came from, how it was checked, and what is not verified.
Written in the same spirit as the kart coach's validation record: never present an
estimate as measured, and say plainly when something could not be confirmed.

## How the content was gathered

The content was written from sixteen research notes in `research/`, one per topic, each
produced by a separate pass over the web and each carrying its own sources and its own
"Not found" list. Sixteen further passes, ten of them adversarial checks of single facts
and one a completeness critique, were run over the same material.

### The limitation that shapes everything here

The research ran inside a sandbox whose egress policy blocked the page fetching tool for
every domain tried, GOV.UK included. A direct request to `https://www.gov.uk/` returned a
403 from the proxy. Web search still worked, and search returns both result listings and a
short summary of each page, so the research rests on those summaries rather than on pages
opened and read end to end.

What that means in practice:

- A claim marked in the notes as "cited by search, page not opened" has a real URL behind
  it, and that URL was returned by a search engine as the source of the wording, but no
  one in this process read the page.
- Wording presented as a quotation came through a search summary. It is probably right and
  may be paraphrased.
- Numbers that several independent sources agree on are treated as solid. Numbers that
  sources disagree on are given with the disagreement stated, and the safer figure is the
  one the app shows.
- Nothing in the app should be treated as DVSA material. GOV.UK is the authority.

The first item in the project backlog is to open the primary sources on a machine without
this restriction and settle every line below marked "search result only".

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

## Claim by claim

The per topic records live in `research/`, each with its own Sources and Not found
sections. The app's own honesty list is in `data/sources.json` and is shown to the reader
on the Start tab under "Where all of this comes from". The most important unresolved items
are collected here.

<!-- filled in from the research once the content files are written -->

## The local roads

No survey was done. Coordinates come from the sources named in `research/coords.md`, and
each junction in `data/junctions.json` carries a `precision` field which the app shows on
the card. Where that field says "approximate", the marker is somewhere on the right
junction, not on a surveyed point.

The route corridors drawn on the map are straight lines between junctions. They are not
roads and the app says so. DVSA has not published test routes since 2010.

## The diagrams

Every diagram in the app is a schematic drawn by the app from a description of the
junction, not a survey and not a map extract. A roundabout diagram shows the exits in
their compass directions and numbers them the way a driving instruction numbers them. The
manoeuvre diagrams are drawn roughly to scale in metres, with a car 4.2 m by 1.8 m, but
the reference points that matter in a real car depend on that car, and the app says so.
