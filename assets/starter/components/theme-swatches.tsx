'use client';

import {Avatar} from '@astryxdesign/core/Avatar';
import {HStack} from '@astryxdesign/core/Layout';
import {ToggleButton} from '@astryxdesign/core/ToggleButton';
import {formatThemeName, themeCatalog, type ThemeName} from '@/app/theme-catalog';
import {useThemeSettings} from './app-providers';
import {HERO_SLOT, imageSlots} from './home/shops';

const themeNames = Object.keys(themeCatalog) as ThemeName[];

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
              <Avatar
                src={`/products/${name}/${imageSlots[HERO_SLOT]}.png`}
                alt=""
                size={24}
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
