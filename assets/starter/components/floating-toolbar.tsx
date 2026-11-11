'use client';

import * as stylex from '@stylexjs/stylex';
import {MoonIcon, SunIcon} from '@heroicons/react/24/outline';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Toolbar} from '@astryxdesign/core/Toolbar';
import {useThemeSettings} from './app-providers';
import {ThemeSwatches} from './theme-swatches';

// The dock pins the pill to the bottom of the viewport. It ignores clicks so
// the page stays usable around the pill; the pill opts back in.
const styles = stylex.create({
  dock: {
    position: 'fixed',
    insetInline: 0,
    bottom: 'var(--spacing-6)',
    zIndex: 10,
    pointerEvents: 'none',
  },
  pill: {
    pointerEvents: 'auto',
  },
});

export function FloatingToolbar() {
  const {mode, setMode} = useThemeSettings();
  const isDark = mode === 'dark';

  return (
    <>
      {/* Holds room at the end of the page so the fixed pill never covers the last content. */}
      <VStack aria-hidden paddingBlock={10} />
      <HStack hAlign="center" paddingInline={4} xstyle={styles.dock}>
        <Card padding={0} maxWidth="100%" elevation="high" xstyle={styles.pill}>
          <Toolbar
            label="Theme controls"
            gap={2}
            startContent={<ThemeSwatches />}
            endContent={
              <HStack gap={2} vAlign="center" height={32}>
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
    </>
  );
}
