# Theming

Astryx themes are typed values created by `defineTheme` and applied by `Theme`. They customize public tokens, stable component targets, icons, indicators, syntax colors, and inverted media surfaces without copying component source.

## Public presets

All public presets are pinned to 0.6.3:

- `@astryxdesign/theme-neutral`
- `@astryxdesign/theme-butter`
- `@astryxdesign/theme-chocolate`
- `@astryxdesign/theme-gothic`
- `@astryxdesign/theme-matcha`
- `@astryxdesign/theme-stone`
- `@astryxdesign/theme-y2k`

For production, import the built value and matching stylesheet:

```tsx
import '@astryxdesign/theme-stone/theme.css';
import {stoneTheme} from '@astryxdesign/theme-stone/built';

<Theme theme={stoneTheme} mode="system">
  {children}
</Theme>;
```

Never mix a built value from one preset with another preset's CSS.

## Custom themes

Start from a public source theme and override only the intended axes:

```ts
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export const productTheme = defineTheme({
  name: 'product',
  extends: neutralTheme,
  color: {
    accent: ['#0A66C2', '#73B7FF'],
    neutralStyle: 'cool',
    contrast: 'standard',
  },
  typography: {
    scale: {base: 15, ratio: 1.2},
    body: {family: 'system-ui', fallbacks: '-apple-system, sans-serif'},
    heading: {weight: 'semibold'},
    code: {family: 'ui-monospace', fallbacks: 'monospace'},
  },
  radius: {base: 4, multiplier: 1.25},
  motion: {fast: 140, medium: 320, slow: 760, ratio: 0.75},
  components: {
    button: {
      'variant:primary': {fontWeight: '700'},
    },
  },
});
```

Explicit `tokens` override generated scale values. Use documented token names only. Component keys omit the `astryx-` prefix and follow the stable target name.

## Runtime and built paths

Runtime use is ideal while editing:

```tsx
<Theme theme={productTheme} mode="dark">
  {children}
</Theme>
```

Build the production artifacts when the theme is stable:

```bash
pnpm exec astryx theme build examples/themes/custom/astryx-v0.theme.ts \
  --out examples/themes/custom/built/astryx-v0.css
```

Commit the generated CSS, JavaScript, and declarations. Run the same command with `--check` in CI.

## Custom visual values

A `prop:value` component key that introduces a supported custom visual value is emitted with type augmentation by `astryx theme build`. Do not open behavioral, structural, placement, or state-machine axes. Keep a safe baseline when no matching theme rule is present.

## Light, dark, and inverted surfaces

`Theme` accepts `light`, `dark`, or `system`. Use `MediaTheme` for content on an explicitly dark or light media surface. Put surface-specific token or component overrides in `onDark` and `onLight`; do not hard-code foreground colors in the component.

## Syntax, fonts, and icons

- Code components inherit the public `--color-syntax-*` token contract. `SyntaxTheme` can override a subtree.
- Font files are loaded by the app or framework. A theme names families but does not download them.
- Preset icon registries come from their public theme packages. Use semantic Astryx icon APIs rather than inline SVG.

The complete runnable examples are under `examples/themes/` and the starter's theme switcher exercises every public preset plus the custom theme.
