# v0 evals

`cases.json` is the release-gating prompt set for this bundle. Each case names the closest official starting entry, expected theme, observable success criteria, and regressions that fail the case.

Run each case in a fresh v0 project with the saved Astryx skill attached. Grade every `expected` and `forbidden` item as pass or fail against the generated source and live Chromium result. A release passes only when every item passes and the project has no console error, missing asset, or unsupported import.

The static bundle validator checks that all named entries and themes exist at the pinned version. The browser suite separately mounts all 700 generated entries and covers representative accessibility and visual states.
