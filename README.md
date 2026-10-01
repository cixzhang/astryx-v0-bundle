# Astryx for v0

A public [v0 Design Systems 2.0](https://v0.app/docs/design-systems-2) bundle for [Astryx](https://github.com/facebook/astryx), pinned to the public `0.6.3` release.

It gives v0 a verified Next.js starter, exact package and provider setup, all seven public themes, a custom-theme workflow, all 54 public page templates, all 646 public block templates, and representative component examples. It consumes public `@astryxdesign/*` packages instead of forking component implementations.

## Import into v0

1. Open the [v0 Design Systems page](https://v0.app/design-systems) and start a new import.
2. Add `https://github.com/cixzhang/astryx-v0-bundle` as the GitHub source.
3. Submit the form, inspect the generated starter in light and dark mode, then approve and save the skill.
4. Attach the saved Astryx skill from the prompt toolbar in a new chat.

This is the current Design Systems 2.0 flow. No hosted shadcn registry or GitHub Pages deployment is required.

For a local skill-structure check:

```bash
npx --yes skills add cixzhang/astryx-v0-bundle --list --yes
```

## What is included

- `SKILL.md` — focused agent instructions and accessibility rules
- `v0.json` — schema version 1, a tag-pinned public source, and the starter
- `assets/starter/` — a clean-installable Next.js 15 and React 19 app
- `examples/templates/` — all 54 public page templates
- `examples/blocks/` — all 646 public block templates
- `examples/themes/` — every public preset plus runtime, built, media, and syntax theming
- `examples/components/` — curated official component showcases
- `catalog/astryx-0.6.3.json` — exhaustive source, dependency, rationale, status, and done-criteria ledger
- `evals/cases.json` — release-gating v0 prompt and review rubric

Generated examples use the public Astryx CLI's supported asset adaptation. Binary template assets are not copied; images use self-contained placeholders and videos use an empty source until product media is supplied.

## Verification

```bash
pnpm install --frozen-lockfile
pnpm validate
pnpm urls:check
pnpm skill:check
pnpm starter:clean
pnpm exec playwright install chromium
pnpm test:e2e
```

The checks validate the v0 contract, deterministic generation and hashes, all target paths, custom-theme artifacts, public-only hygiene, formatting, lint, types, unit tests, the verification gallery, the starter production build, concrete public URLs, a clean temporary starter install, and the skill parser. Linux Chromium mounts all 700 template entries and captures representative desktop/mobile light/dark pixels.

See [`docs/ledger.md`](docs/ledger.md) for locked scope and provenance, [`references/maintenance.md`](references/maintenance.md) for the update process, and [`evals/README.md`](evals/README.md) for v0 eval grading.

## Versioning

The bundle is `0.1.0`. Astryx package versions, the public Git tag and commit, catalog, generated examples, starter, and bundle hashes move together. Existing v0 projects do not update automatically; update or re-import the saved skill to adopt a later bundle revision.

## License

MIT. Generated Astryx examples retain their upstream copyright headers and come from Astryx's MIT-licensed public release.
