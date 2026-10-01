---
name: astryx
description: Build React 19 and Next.js interfaces with Astryx 0.6.3 components, public themes, tokens, and official templates. Use when a user requests Astryx, wants a non-shadcn design-system starter, needs an official Astryx page or block template, or asks for Astryx custom theming.
license: MIT
metadata:
  v0.kind: design-system
  v0.design-system:
    appearance:
      light:
        background: '#F5F7FA'
        foreground: '#142033'
      dark:
        background: '#172033'
        foreground: '#F4F7FB'
---

# Astryx

Build on the verified app in `assets/starter`. It already has React 19, the Astryx CSS layers, public theme packages, a `Theme` provider, and framework-aware links. Do not replace that setup with shadcn/ui, Tailwind defaults, or a second component system.

## Source and version

- Use only public `@astryxdesign/*` packages pinned to `0.6.3`.
- Public component source and exact APIs live in the read-only Astryx reference at `/vercel/share/v0-reference-workspace-sources/facebook/astryx/v0.6.3`.
- The installed package declarations are the final authority for props and exports. Never invent a prop, token, target, or variant.
- Import components from public subpaths such as `@astryxdesign/core/Button`.

## Read the right reference

- Setup, CSS order, providers, and package imports: `references/setup.md`
- Theme presets and custom-theme workflow: `references/theming.md`
- Official page and block templates: `references/templates.md`
- Component selection, API rules, and accessibility: `references/components.md`
- Bundle versions, validation, and updates: `references/maintenance.md`

Load only the reference needed for the task. The full versioned catalog is `catalog/astryx-0.6.3.json`.

## Hard rules

- Compose with Astryx before using raw HTML or custom CSS. Keep native semantic elements only when Astryx has no equivalent.
- Use `Layout` or `Center` for page roots. Use `AppShell` only for shell-focused templates.
- Use `Grid` with `columns={{minWidth: 280}}` for responsive card/tile layouts; use stacks for fixed-direction relationships.
- Use controlled form values and accessible `label` props. Keep focus visible, preserve heading order, and never communicate status by color alone.
- Use logical `start`/`end` concepts, not left/right assumptions. Verify mobile and RTL-sensitive composition.
- Theme through `Theme`, `defineTheme`, tokens, and documented component targets. Do not fork component source for visual changes.
- Preserve upstream WIP status. `incident-console`, `messaging-shell`, and `table` are examples, not promoted recommendations.

## Before finishing

Run the app, inspect the requested state in Chromium, and verify light, dark, desktop, and mobile behavior. Check that there are no console errors, missing assets, or unsupported imports. Keep the no-custom-theme path working when adding a custom theme.
