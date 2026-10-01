# Astryx v0 bundle ledger

This ledger locks the bundle scope before implementation. The machine-readable authority is [`catalog/astryx-0.6.3.json`](../catalog/astryx-0.6.3.json), which records source requirement, target entry, rationale, dependencies, done criteria, and exclusion for every entry.

- Astryx source: [v0.6.3](https://github.com/facebook/astryx/releases/tag/v0.6.3) at `8492ddeee2aab94cfc715384beb305d70bf9e5a6`
- Public npm version: `0.6.3` (all stable packages aligned)
- v0 contract: Design Systems 2.0, `v0.json` schema `1`
- Scope: **54 page templates**, **646 block templates**, **7 preset themes**, **8 custom-theme capabilities**, and **8 curated component examples**

All 646 public block templates are individually recorded in the machine ledger and generated under `examples/blocks/`; the human table below lists pages because they are the reusable full-surface starters.

## Page templates

| Slug | Public name | Requirement/source | Bundle target | Dependencies | Status |
|---|---|---|---|---|---|
| `ai-chat` | AI Chat Conversation | `packages/cli/assets/templates/pages/ai-chat/page.tsx` | `examples/templates/ai-chat/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `ai-chat-landing` | AI Chat Landing | `packages/cli/assets/templates/pages/ai-chat-landing/page.tsx` | `examples/templates/ai-chat-landing/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `blank` | Blank | `packages/cli/assets/templates/pages/blank/page.tsx` | `examples/templates/blank/page.tsx` | `@astryxdesign/core` | ready |
| `canvas-editor` | Canvas Editor | `packages/cli/assets/templates/pages/canvas-editor/page.tsx` | `examples/templates/canvas-editor/page.tsx` | `@astryxdesign/core`, `@astryxdesign/theme-neutral`, `@stylexjs/stylex`, `lucide-react` | ready |
| `centered-hero` | Centered Hero | `packages/cli/assets/templates/pages/centered-hero/page.tsx` | `examples/templates/centered-hero/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `checkout-wizard` | Checkout Wizard | `packages/cli/assets/templates/pages/checkout-wizard/page.tsx` | `examples/templates/checkout-wizard/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `classic-gallery` | Classic Gallery | `packages/cli/assets/templates/pages/classic-gallery/page.tsx` | `examples/templates/classic-gallery/page.tsx` | `@astryxdesign/core` | ready |
| `contact-form` | Contact Form | `packages/cli/assets/templates/pages/contact-form/page.tsx` | `examples/templates/contact-form/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `dashboard` | Analytics Dashboard | `packages/cli/assets/templates/pages/dashboard/page.tsx` | `examples/templates/dashboard/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `recharts` | ready |
| `dashboard-alert-rail` | Service Monitoring Dashboard | `packages/cli/assets/templates/pages/dashboard-alert-rail/page.tsx` | `examples/templates/dashboard-alert-rail/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `@stylexjs/stylex`, `recharts` | ready |
| `dashboard-cohort-funnel` | Funnel & Cohort Dashboard | `packages/cli/assets/templates/pages/dashboard-cohort-funnel/page.tsx` | `examples/templates/dashboard-cohort-funnel/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `@stylexjs/stylex`, `recharts` | ready |
| `dashboard-comparison` | Data Dashboard | `packages/cli/assets/templates/pages/dashboard-comparison/page.tsx` | `examples/templates/dashboard-comparison/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `@stylexjs/stylex`, `recharts` | ready |
| `dashboard-composition` | Portfolio Dashboard | `packages/cli/assets/templates/pages/dashboard-composition/page.tsx` | `examples/templates/dashboard-composition/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `recharts` | ready |
| `dashboard-progress` | Project Status Dashboard | `packages/cli/assets/templates/pages/dashboard-progress/page.tsx` | `examples/templates/dashboard-progress/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `@stylexjs/stylex`, `recharts` | ready |
| `dashboard-scorecard` | Executive Summary Dashboard | `packages/cli/assets/templates/pages/dashboard-scorecard/page.tsx` | `examples/templates/dashboard-scorecard/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `@stylexjs/stylex`, `recharts` | ready |
| `detail-page` | Order Detail | `packages/cli/assets/templates/pages/detail-page/page.tsx` | `examples/templates/detail-page/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `documentation` | Documentation Catalog | `packages/cli/assets/templates/pages/documentation/page.tsx` | `examples/templates/documentation/page.tsx` | `@astryxdesign/core` | ready |
| `documentation-design` | Documentation Design | `packages/cli/assets/templates/pages/documentation-design/page.tsx` | `examples/templates/documentation-design/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `documentation-technical` | Documentation Technical | `packages/cli/assets/templates/pages/documentation-technical/page.tsx` | `examples/templates/documentation-technical/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `editor` | Page Editor | `packages/cli/assets/templates/pages/editor/page.tsx` | `examples/templates/editor/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `file-explorer` | File Explorer | `packages/cli/assets/templates/pages/file-explorer/page.tsx` | `examples/templates/file-explorer/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `form-two-column` | Two-column Form | `packages/cli/assets/templates/pages/form-two-column/page.tsx` | `examples/templates/form-two-column/page.tsx` | `@astryxdesign/core` | ready |
| `form-wizard` | Form Wizard | `packages/cli/assets/templates/pages/form-wizard/page.tsx` | `examples/templates/form-wizard/page.tsx` | `@astryxdesign/core` | ready |
| `form-wizard-dialog` | Dialog Wizard | `packages/cli/assets/templates/pages/form-wizard-dialog/page.tsx` | `examples/templates/form-wizard-dialog/page.tsx` | `@astryxdesign/core` | ready |
| `form-wizard-inline` | Inline Wizard | `packages/cli/assets/templates/pages/form-wizard-inline/page.tsx` | `examples/templates/form-wizard-inline/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `form-wizard-vertical` | Vertical Wizard | `packages/cli/assets/templates/pages/form-wizard-vertical/page.tsx` | `examples/templates/form-wizard-vertical/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `gallery-hero` | Gallery Hero | `packages/cli/assets/templates/pages/gallery-hero/page.tsx` | `examples/templates/gallery-hero/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `ide` | IDE | `packages/cli/assets/templates/pages/ide/page.tsx` | `examples/templates/ide/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `incident-console` | Incident Console | `packages/cli/assets/templates/pages/incident-console/page.tsx` | `examples/templates/incident-console/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | WIP upstream |
| `kanban-board` | Kanban Board | `packages/cli/assets/templates/pages/kanban-board/page.tsx` | `examples/templates/kanban-board/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `@stylexjs/stylex` | ready |
| `library` | Card Grid | `packages/cli/assets/templates/pages/library/page.tsx` | `examples/templates/library/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `login` | Basic Login | `packages/cli/assets/templates/pages/login/page.tsx` | `examples/templates/login/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready; hidden upstream |
| `login-card` | Login Card | `packages/cli/assets/templates/pages/login-card/page.tsx` | `examples/templates/login-card/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `login-split` | Login Split | `packages/cli/assets/templates/pages/login-split/page.tsx` | `examples/templates/login-split/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `login-sso` | Login SSO | `packages/cli/assets/templates/pages/login-sso/page.tsx` | `examples/templates/login-sso/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `messaging-shell` | Messaging Shell | `packages/cli/assets/templates/pages/messaging-shell/page.tsx` | `examples/templates/messaging-shell/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | WIP upstream |
| `mixed-gallery` | Mixed Gallery | `packages/cli/assets/templates/pages/mixed-gallery/page.tsx` | `examples/templates/mixed-gallery/page.tsx` | `@astryxdesign/core` | ready |
| `payment-form` | Checkout Form | `packages/cli/assets/templates/pages/payment-form/page.tsx` | `examples/templates/payment-form/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `product-detail` | Product Detail | `packages/cli/assets/templates/pages/product-detail/page.tsx` | `examples/templates/product-detail/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `product-gallery` | Product Gallery | `packages/cli/assets/templates/pages/product-gallery/page.tsx` | `examples/templates/product-gallery/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `settings` | Settings Form | `packages/cli/assets/templates/pages/settings/page.tsx` | `examples/templates/settings/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `settings-dialog` | Settings Dialog | `packages/cli/assets/templates/pages/settings-dialog/page.tsx` | `examples/templates/settings-dialog/page.tsx` | `@astryxdesign/core`, `@astryxdesign/theme-neutral`, `@heroicons/react`, `@stylexjs/stylex` | ready |
| `settings-sidebar` | Settings Panels | `packages/cli/assets/templates/pages/settings-sidebar/page.tsx` | `examples/templates/settings-sidebar/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `shell-nav` | Shell Nav | `packages/cli/assets/templates/pages/shell-nav/page.tsx` | `examples/templates/shell-nav/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `shell-side-nav` | Side Nav | `packages/cli/assets/templates/pages/shell-side-nav/page.tsx` | `examples/templates/shell-side-nav/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `shell-top-nav` | Top Nav | `packages/cli/assets/templates/pages/shell-top-nav/page.tsx` | `examples/templates/shell-top-nav/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `@stylexjs/stylex` | ready |
| `side-gallery` | Side Gallery | `packages/cli/assets/templates/pages/side-gallery/page.tsx` | `examples/templates/side-gallery/page.tsx` | `@astryxdesign/core` | ready |
| `table` | Simple Table | `packages/cli/assets/templates/pages/table/page.tsx` | `examples/templates/table/page.tsx` | `@astryxdesign/core` | WIP upstream |
| `table-filter` | Filterable Table | `packages/cli/assets/templates/pages/table-filter/page.tsx` | `examples/templates/table-filter/page.tsx` | `@astryxdesign/core`, `@stylexjs/stylex`, `lucide-react` | ready |
| `table-grouped` | Grouped Table | `packages/cli/assets/templates/pages/table-grouped/page.tsx` | `examples/templates/table-grouped/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `table-inbox` | Inbox Table | `packages/cli/assets/templates/pages/table-inbox/page.tsx` | `examples/templates/table-inbox/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `@stylexjs/stylex` | ready |
| `table-page` | Searchable Table | `packages/cli/assets/templates/pages/table-page/page.tsx` | `examples/templates/table-page/page.tsx` | `@astryxdesign/core`, `@heroicons/react` | ready |
| `theme-showcase` | Theme Showcase | `packages/cli/assets/templates/pages/theme-showcase/page.tsx` | `examples/templates/theme-showcase/page.tsx` | `@astryxdesign/core`, `lucide-react` | ready; hidden upstream |
| `work-item-detail` | Work Item Detail | `packages/cli/assets/templates/pages/work-item-detail/page.tsx` | `examples/templates/work-item-detail/page.tsx` | `@astryxdesign/core`, `@heroicons/react`, `@stylexjs/stylex` | ready |

Each page is done only when its generated source preserves upstream attribution, type-checks against pinned public packages, and mounts in Chromium without uncaught errors or missing assets. WIP status is preserved, never promoted.

## Themes and theming capabilities

| ID | Capability | Source | Bundle target | Scope decision |
|---|---|---|---|---|
| `preset:neutral` | neutral | `packages/themes/neutral/src/source.ts` | `examples/themes/presets/neutral.tsx` | Included |
| `preset:butter` | butter | `packages/themes/butter/src/source.ts` | `examples/themes/presets/butter.tsx` | Included |
| `preset:chocolate` | chocolate | `packages/themes/chocolate/src/source.ts` | `examples/themes/presets/chocolate.tsx` | Included |
| `preset:gothic` | gothic | `packages/themes/gothic/src/source.ts` | `examples/themes/presets/gothic.tsx` | Included |
| `preset:matcha` | matcha | `packages/themes/matcha/src/source.ts` | `examples/themes/presets/matcha.tsx` | Included |
| `preset:stone` | stone | `packages/themes/stone/src/source.ts` | `examples/themes/presets/stone.tsx` | Included |
| `preset:y2k` | y2k | `packages/themes/y2k/src/source.ts` | `examples/themes/presets/y2k.tsx` | Included |
| `capability:runtime-custom-theme` | Runtime custom theme | `packages/core/src/theme/defineTheme.ts` | `examples/themes/custom/runtime-theme.ts` | Included |
| `capability:token-scales` | Color, typography, radius, and motion scales | `packages/core/src/theme/defineTheme.ts` | `examples/themes/custom/runtime-theme.ts` | Included |
| `capability:component-overrides` | Component targets, variants, and states | `packages/core/src/theme/mergeComponents.ts` | `examples/themes/custom/runtime-theme.ts` | Included |
| `capability:built-theme` | Build-time CSS and type generation | `packages/cli/api/theme/build/build.mjs` | `examples/themes/custom/built/` | Included |
| `capability:mode-switching` | Light, dark, and system mode | `packages/core/src/theme/Theme.tsx` | `assets/starter/app/providers.tsx` | Included |
| `capability:on-media` | MediaTheme and onDark/onLight overrides | `packages/core/src/theme/MediaTheme.tsx` | `examples/themes/custom/media-theme.tsx` | Included |
| `capability:syntax` | Syntax token theming | `packages/core/src/theme/syntax/index.ts` | `examples/themes/custom/syntax-theme.tsx` | Community syntax preset packages are not part of the stable public release set; only the public core API is demonstrated. |
| `capability:fonts-icons` | Font declarations and theme icon registries | `packages/core/src/theme/types.ts` | `references/theming.md` | No remote font is bundled; consumers opt in to font URLs or framework font loading. |

## Representative component examples

| Area | Components | Bundle target | Why it belongs |
|---|---|---|---|
| `actions` | `Button`, `ButtonGroup`, `IconButton`, `ToggleButton` | `examples/components/actions.tsx` | Primary, destructive, loading, and icon-only actions with preserved accessible names. |
| `forms` | `FormLayout`, `TextInput`, `Selector`, `CheckboxInput`, `Switch` | `examples/components/forms.tsx` | Controlled form fields, labels, validation status, and disabled explanations. |
| `layout` | `Layout`, `Grid`, `Card`, `Stack`, `Text` | `examples/components/layout.tsx` | Token-driven responsive composition without raw layout CSS. |
| `data` | `Table`, `Pagination`, `Badge`, `StatusDot` | `examples/components/data.tsx` | Sortable data, status, and pagination using stable public APIs. |
| `overlays` | `Dialog`, `AlertDialog`, `Popover`, `Tooltip` | `examples/components/overlays.tsx` | Keyboard-accessible layered interactions and focus return. |
| `navigation` | `AppShell`, `TopNav`, `SideNav`, `Breadcrumbs` | `examples/components/navigation.tsx` | Composed app chrome using child-owned slots and logical direction. |
| `feedback` | `Banner`, `Toast`, `ProgressBar`, `Skeleton` | `examples/components/feedback.tsx` | Persistent, transient, loading, and progress states with non-color signifiers. |
| `content` | `Heading`, `Text`, `CodeBlock`, `Markdown`, `Link` | `examples/components/content.tsx` | Semantic content hierarchy, code, and framework-aware links. |

The complete component-usage surface is covered by the 646 generated public block examples; these curated examples are the small starter-facing set.

## Explicit exclusions

| ID | Decision | Reason |
|---|---|---|
| `private-packages` | Exclude @astryxdesign/lab, @astryxdesign/vega, and every unpublished package. | The bundle must depend only on public @astryxdesign/* packages. |
| `non-public-source` | Exclude all non-public implementation source, links, identifiers, screenshots, and terminology. | Astryx public source and npm packages are the only implementation authority for this repository. |
| `legacy-registry` | Do not make the legacy shadcn registry the primary distribution contract. | Current v0 Design Systems 2.0 uses a skill, v0.json, GitHub references, and a starter; copying shadcn components would fork Astryx. |
| `hosted-site` | Do not deploy GitHub Pages unless real v0 validation proves a hosted URL is required. | The current Design Systems 2.0 contract imports public GitHub sources directly and documents no hosted-registry requirement. |
| `source-build-starter` | Use prebuilt Astryx package output plus StyleX only for example-local styles. | The dist path is the smallest consumer setup; compiling Astryx source is an advanced path and unnecessary for v0. |
| `template-assets` | Do not copy the upstream binary template-asset library. | The public CLI intentionally rewrites template asset references to self-contained placeholders when scaffolding. |
