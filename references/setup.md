# Setup and imports

## Supported stack

The starter uses Node 22+, pnpm 11, React 19, Next.js 15, and Astryx 0.6.3. All public Astryx packages stay on the same version.

Install the minimum runtime:

```bash
pnpm add @astryxdesign/core@0.6.3 \
  @astryxdesign/theme-neutral@0.6.3 \
  @stylexjs/stylex@0.19.1 react@19.2.7 react-dom@19.2.7
```

Install another public theme at the same version only when the app uses it.

## CSS order

Import these once, in this order:

```css
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';
```

The reset is optional only when the app already owns an equivalent reset. The component stylesheet is required. A built preset theme needs its matching `theme.css` import.

## Next.js provider boundary

```tsx
'use client';

import NextLink from 'next/link';
import {LinkProvider} from '@astryxdesign/core/Link';
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <Theme theme={neutralTheme} mode="system">
      <LinkProvider component={NextLink}>{children}</LinkProvider>
    </Theme>
  );
}
```

`LinkProvider` keeps Astryx link-based components on Next.js client navigation. The provider file must be a client component. Set an initial `data-theme` on `<html>` when an app pins light or dark mode during SSR; `system` can omit it.

## Imports

Prefer public component subpaths:

```tsx
import {Button} from '@astryxdesign/core/Button';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading, Text} from '@astryxdesign/core/Text';
```

Subpath imports make the component contract obvious and keep generated code focused. Check installed declaration files or the pinned public source before using a prop.

## StyleX in copied templates

Some official templates use StyleX for product-local layout. The starter includes the Babel and PostCSS setup for those files. Astryx itself is consumed from its prebuilt distribution; do not alias the package to source.

Required layer order:

```text
reset < astryx-base < astryx-theme < application StyleX layers
```

Do not add Tailwind merely because v0 commonly starts with it. Astryx components, tokens, and layout primitives own the design-system layer.
