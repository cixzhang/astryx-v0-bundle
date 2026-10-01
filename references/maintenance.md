# Versioning, validation, and maintenance

## Pinned inputs

- Bundle version: `0.1.0`
- v0 schema: `1`
- Astryx packages: `0.6.3`
- Astryx source ref: `v0.6.3`
- Astryx source commit: `8492ddeee2aab94cfc715384beb305d70bf9e5a6`
- pnpm: `11.10.0`

The Git tag in `v0.json`, the package versions, the catalog provenance, and generated examples must move together. A mutable `main` reference is not used for a released bundle.

## v0 update behavior

v0 saves a design system as a revisioned skill. Updating the public repository does not rewrite existing v0 apps. Re-import or update the saved skill with the new package version, source ref, release notes, and migration guidance. Existing apps adopt it only when explicitly updated.

Git-connected v0 templates are commit-pinned when published or synchronized. Branch changes do not silently replace an existing template revision.

## Local checks

```bash
pnpm install --frozen-lockfile
pnpm generate:check
pnpm theme:check
pnpm validate
```

The validation pipeline checks the documented v0 schema, all 700 generated entries, exact package alignment, lint, formatting, type safety, unit tests, production builds, public-reference hygiene, and deterministic generated files.

Chromium verification is separate:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

It mounts every page and block entry, checks assets and runtime errors, runs accessibility smoke tests, and captures representative desktop/mobile light/dark screenshots.

## Updating Astryx

1. Read the new public release notes and migration guidance.
2. Change the version, tag, and commit in the catalog source and `v0.json` together.
3. Align every public `@astryxdesign/*` dependency to the same release.
4. Run `pnpm generate` to regenerate examples and manifests from the installed CLI package.
5. Rebuild custom-theme artifacts with `pnpm theme:build`.
6. Run clean-install, static, browser, URL, and hygiene checks.
7. Import the repository through the current v0 Design Systems flow and verify the saved starter before marking the update complete.

Do not hand-edit generated page or block examples. Change the pinned source or the generator, then regenerate.
