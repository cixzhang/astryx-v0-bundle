# Templates and blocks

The bundle contains the complete Astryx 0.6.3 public template surface:

- 54 full-page templates under `examples/templates/<slug>/page.tsx`
- 646 component and pattern blocks under `examples/blocks/`

The exact source path, requirement metadata, dependencies, status, and target path for every entry are in `catalog/astryx-0.6.3.json`. `examples/manifest.json` is the generated lightweight runtime index.

## Choosing a starting point

Use a **page template** when the prompt asks for a complete route, such as a dashboard, settings surface, gallery, form, editor, or shell.

Use one or more **blocks** when the app already has a page structure and needs a component pattern, such as a table treatment, form section, dialog flow, or status surface.

Prefer the closest official entry over composing a lookalike from scratch. Read its metadata and source, then adapt content and domain data without changing the design-system ownership boundary.

## Page rules

- Most page templates are content-only and root in `Layout` or `Center`.
- Only `Shell -` templates use `AppShell` and global navigation.
- Keep page headers in `LayoutHeader` and in-page navigation in a `LayoutPanel` slot.
- Use `Grid` with `columns={{minWidth: 280}}` for layouts that reflow.
- Keep a page to one route. Navigation examples may be inert until the product supplies routing.

## Block rules

- Keep a block focused on one pattern.
- Preserve its accessible label, controlled state, and documented component composition.
- Blocks render inside a host surface; do not wrap them in `AppShell`.
- Treat block metadata as requirement context, not merely gallery copy.

## Assets and dependencies

The generated examples use the official Astryx CLI scaffold behavior: upstream `/template-assets/` images become a self-contained placeholder data URI and template videos become an empty source. Replace placeholders with product-owned media and meaningful alt text.

Template-local third-party dependencies are explicit in the catalog. The complete set for 0.6.3 is:

- `@heroicons/react@2.2.0`
- `@stylexjs/stylex@0.19.1`
- `lucide-react@1.18.0`
- `recharts@3.9.2`

Do not add a dependency that the chosen template does not use.

## Status

Three page templates are WIP upstream and stay labeled that way:

- `incident-console`
- `messaging-shell`
- `table`

They may be used as exploratory references, but do not present them as approved ready-made surfaces. Hidden upstream examples remain available for testing without being promoted in navigation.
