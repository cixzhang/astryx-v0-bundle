'use client';

import * as stylex from '@stylexjs/stylex';
import {HStack} from '@astryxdesign/core/Layout';
import {ToggleButton} from '@astryxdesign/core/ToggleButton';
import {formatThemeName, themeCatalog, type ThemeName} from '@/app/theme-catalog';
import {useThemeSettings} from './app-providers';
import {HERO_SLOT, imageSlots} from './home/shops';

const themeNames = Object.keys(themeCatalog) as ThemeName[];

const styles = stylex.create({
  thumb: {
    display: 'block',
    boxSizing: 'border-box',
    flexShrink: 0,
    width: 28,
    height: 28,
    minWidth: 28,
    maxWidth: 'none',
    borderRadius: '50%',
    objectFit: 'cover',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'var(--color-border-emphasized)',
  },
});

export function ThemeSwatches() {
  const {themeName, setThemeName} = useThemeSettings();

  return (
    <HStack gap={1} vAlign="center">
      {themeNames.map((name) => {
        const label = `${formatThemeName(name)} theme`;
        return (
          <ToggleButton
              key={name}
              label={label}
              tooltip={formatThemeName(name)}
              isIconOnly
              icon={
                <img
                  src={`/products/${name}/${imageSlots[HERO_SLOT]}.png`}
                  alt=""
                  width={28}
                  height={28}
                  {...stylex.props(styles.thumb)}
                />
              }
              isPressed={themeName === name}
              onPressedChange={() => setThemeName(name)}
            />
        );
      })}
    </HStack>
  );
}
