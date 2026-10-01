'use client';

import type {ReactNode} from 'react';
import NextLink from 'next/link';
import {LinkProvider} from '@astryxdesign/core/Link';
import {Theme, type DefinedTheme, type ThemeMode} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

export function Providers({
  children,
  theme = neutralTheme,
  mode = 'system',
}: {
  children: ReactNode;
  theme?: DefinedTheme;
  mode?: ThemeMode;
}) {
  return (
    <Theme theme={theme} mode={mode}>
      <LinkProvider component={NextLink}>{children}</LinkProvider>
    </Theme>
  );
}
