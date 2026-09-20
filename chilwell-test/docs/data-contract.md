# The data contract

`src/app.src.html` renders from `data/*.json`. Every file below has a fixed shape.
Anything the renderer does not know about is ignored, and anything missing simply
does not appear. Keep to the shapes.

## Rules for every string in every file

- UK English. No em dashes or en dashes anywhere: `build/build.py` refuses to build if it finds one.
- Plain prose. No marketing tone, no exclamation marks, no second guessing the reader.
- Inline links are markdown: `[GOV.UK](https://www.gov.uk/...)`. Bold is `**like this**`. Nothing else is parsed.
- A claim that came from a source carries that source. A claim that is an inference carries the word `(reasoned)`.
  A claim that could not be checked carries `(unverified)`.
- Never write a number as if it were measured when it was estimated.
- `sources` on any object is an array of strings, each either a markdown link or the literal `(reasoned)`.

## data/centre.json

```json
{
  "name": "Nottingham (Chilwell) driving test centre",
  "short": "Test centre",
  "address": ["Unit 24, Eldon Business Park", "Eldon Road", "Beeston", "NG9 6DZ"],
  "lat": 52.9, "lon": -1.2, "precision": "approximate",
  "intro": "one or two paragraphs",
  "arrival": ["ordered steps from parking up to meeting the examiner"],
  "facts": [{"k": "Getting there", "v": "..."}],
  "sources": ["[name](url)"]
}
```

## data/test.json

```json
{
  "intro": "...",
  "steps": [
    {"id": "eyesight", "name": "The eyesight check", "time": "first two minutes",
     "what": "paragraphs", "says": "the wording the examiner uses, if known",
     "watch": ["what is assessed"], "tips": ["..."], "sources": ["..."]}
  ],
  "sources": ["..."]
}
```

## data/marking.json

```json
{
  "intro": "...",
  "faultTypes": [{"name": "Driving fault", "what": "...", "effect": "...", "example": "..."}],
  "limit": {"number": 15, "text": "..."},
  "sheet": "paragraphs about the sheet itself",
  "immediate": ["what ends a test there and then"],
  "notes": ["..."],
  "sources": ["..."]
}
```

## data/faults.json

The heart of the app. One item per line on the examiner's marking sheet.
The mock test sheet is built from the same list, so `short` must be short enough
to read at arm's length in a moving car.

```json
{
  "intro": "...",
  "groups": [{"id": "junctions", "name": "Junctions"}],
  "items": [
    {"id": "junctions-observation", "group": "junctions", "no": "16",
     "name": "Junctions: observation", "short": "Junction obs",
     "sheet": "how the line is worded on the sheet",
     "looking": "what the examiner is assessing, in plain words",
     "serious": "what turns it from a driving fault into a serious one",
     "do": ["what to do, in order"],
     "mistakes": ["what goes wrong"],
     "local": "where on the roads round Chilwell this one bites",
     "mock": true,
     "sources": ["..."]}
  ]
}
```

`mock: false` removes an item from the mock test sheet (use it for items that
cannot be marked from the passenger seat).

## data/manoeuvres.json

```json
{
  "intro": "...",
  "items": [
    {"id": "parallel", "name": "Parallel park at the side of the road",
     "diagram": "parallel",
     "asked": "when and where it is asked",
     "words": "the wording the examiner uses",
     "lede": "...",
     "steps": ["one line per step"],
     "watch": ["what the examiner marks"],
     "serious": "the line between a driving fault and a serious one",
     "mistakes": ["..."],
     "refs": "reference points, and why they differ by car",
     "sources": ["..."]}
  ]
}
```

`diagram` must be one of `parallel`, `bayreverse`, `bayforward`, `rightpull`, `stop`,
or be left out. The diagram has a fixed number of frames and the step buttons walk
through them, so `steps` should have the same number of entries as the diagram has
frames: parallel 5, bayreverse 5, bayforward 6, rightpull 7, stop 5.

## data/questions.json

```json
{
  "intro": "...",
  "items": [
    {"id": "tell-1", "type": "tell", "q": "the question as DVSA words it",
     "a": "a correct answer for a normal modern car",
     "extra": "what else the examiner accepts",
     "common": "the wrong answer people give",
     "sources": ["..."]}
  ],
  "sources": ["..."]
}
```

`type` is `tell` (asked before driving) or `show` (asked while driving).

## data/junctions.json

Every place on the map that has something to teach.

```json
{
  "intro": "...",
  "items": [
    {"id": "bardills", "name": "Bardills roundabout", "short": "Bardills",
     "kind": "roundabout",
     "lat": 52.9, "lon": -1.2, "precision": "approximate",
     "where": "A52 Brian Clough Way at Swiney Way",
     "speed": "40 mph on the approach",
     "why": "one or two sentences on why it matters",
     "drive": "paragraphs on how to drive it",
     "watch": ["what the examiner is watching here"],
     "mistakes": ["what goes wrong here"],
     "diagram": {"type": "roundabout", "title": "...", "enter": 180, "leave": 270,
                 "exits": [{"b": 180, "label": "Nottingham Road", "lanes": 2, "n": "you come in here"}]},
     "diagramCap": "caption under the diagram",
     "links": ["fault item ids this junction exercises"],
     "sources": ["..."]}
  ]
}
```

`kind` is one of `roundabout`, `lights`, `junction`, `tram`, `hazard`, `road`.
`precision` is `sourced` when a source gave the coordinate and `approximate` when it
was derived from a postcode or read off a map by eye. Say which; never imply accuracy
that is not there.

Diagram shapes:
- `{"type": "roundabout", "exits": [{"b": bearing 0 to 359, "label": "...", "lanes": 1 or 2, "n": "small note"}], "enter": bearing, "leave": bearing, "path": "inside" or omitted, "title": "...", "mini": true for a mini roundabout}`
  Bearings are compass bearings, 0 north, 90 east. `enter` is the bearing of the road you
  arrive on (the direction it lies in from the middle), `leave` the road you go out on.
- `{"type": "junction", "shape": "tjoin" or "crossroads", "turn": "left" or "right" or "ahead", "labels": [{"x": 0, "y": 0, "t": "..."}]}`
- `{"type": "tram", "angle": -22, "label": "...", "stopLabel": "..."}`

## data/routes.json

```json
{
  "intro": "...",
  "official": "the DVSA position on published routes, as a warning block",
  "corridors": [
    {"id": "east", "name": "Towards Beeston and the university",
     "note": "...", "roads": ["road names in order"],
     "colour": "#1558B0",
     "points": [[52.9, -1.2], [52.91, -1.21]]}
  ],
  "spots": [{"id": "retail", "name": "Chilwell Retail Park", "kind": "Practice spot",
             "lat": 52.9, "lon": -1.2, "precision": "approximate", "note": "...", "sources": ["..."]}],
  "notes": ["..."],
  "sources": ["..."]
}
```

`points` draws a straight line from one point to the next. It is a corridor, not the
road, and the app says so. Keep the points to junctions you have coordinates for.

## data/advice.json

Five sections, all the same shape.

```json
{
  "booking": {"id": "booking", "lede": "...", "body": "paragraphs",
              "points": ["..."], "blocks": [{"name": "...", "body": "...", "points": ["..."]}],
              "table": {"head": ["..."], "rows": [["..."]], "note": "..."},
              "checks": ["checklist lines the user can tick"],
              "warn": "a line that needs a red border",
              "sources": ["..."]},
  "car": {...}, "nerves": {...}, "after": {...}, "rates": {...}
}
```

## data/plan.json

```json
{
  "strap": "the line under the title",
  "mapIntro": "...", "mapAbout": "paragraphs on what the map is and is not",
  "roadsIntro": "...", "faultsIntro": "...", "qIntro": "...", "mockIntro": "...",
  "practiceEmpty": "what to show before any mock has been run",
  "journey": [
    {"n": "1", "name": "Before the day", "lede": "...", "body": "...",
     "checks": ["tickable lines"],
     "do": [{"t": "button text", "go": "roads"}],
     "sources": ["..."]}
  ]
}
```

`go` is a tab name (`start`, `map`, `roads`, `test`, `skills`, `mock`) or
`tab#elementid`.

## data/sources.json

```json
{
  "intro": "paragraphs on how the content was gathered and what that means",
  "limits": ["every claim that is not verified, said plainly"],
  "list": [{"n": 1, "name": "GOV.UK, Book your driving test", "url": "https://...",
            "use": "what it gave", "kind": "official"}]
}
```

`kind` is `official`, `unofficial`, `research` or `reasoned`.
