'use client';

import * as stylex from '@stylexjs/stylex';
import {MoonIcon, SunIcon} from '@heroicons/react/24/outline';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack} from '@astryxdesign/core/Layout';
import {Toolbar} from '@astryxdesign/core/Toolbar';
import {useThemeSettings} from './app-providers';
import {ThemeSwatches} from './theme-swatches';

// The dock pins the pill to the bottom of the viewport; pixel values keep it in place across themes.
const styles = stylex.create({
  dock: {
    position: 'fixed',
    insetInline: 0,
    bottom: 24,
    zIndex: 10,
    paddingInline: 16,
    pointerEvents: 'none',
  },
  pill: {
    pointerEvents: 'auto',
    maxWidth: '100%',
    paddingInline: 8,
  },
  end: {
    alignSelf: 'stretch',
    paddingBlock: 8,
  },
});

export function FloatingToolbar() {
  const {mode, setMode} = useThemeSettings();
  const isDark = mode === 'dark';

  return (
    <HStack hAlign="center" xstyle={styles.dock}>
      <Card padding={0} elevation="high" xstyle={styles.pill}>
        <Toolbar
          label="Theme controls"
          gap={4}
          startContent={<ThemeSwatches />}
          endContent={
            <HStack gap={4} vAlign="center" xstyle={styles.end}>
              <Divider orientation="vertical" />
              <IconButton
                label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                variant="secondary"
                icon={<Icon icon={isDark ? SunIcon : MoonIcon} />}
                onClick={() => setMode(isDark ? 'light' : 'dark')}
              />
            </HStack>
          }
        />
      </Card>
    </HStack>
  );
}
