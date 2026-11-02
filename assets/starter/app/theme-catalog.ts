import type {DefinedTheme} from '@astryxdesign/core/theme';
import {butterTheme} from '@astryxdesign/theme-butter/built';
import {gothicTheme} from '@astryxdesign/theme-gothic/built';
import {matchaTheme} from '@astryxdesign/theme-matcha/built';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {stoneTheme} from '@astryxdesign/theme-stone/built';
import {y2kTheme} from '@astryxdesign/theme-y2k/built';

// Same themes, same order as astryx.atmeta.com/themes.
export const themeCatalog = {
  neutral: neutralTheme,
  gothic: gothicTheme,
  matcha: matchaTheme,
  y2k: y2kTheme,
  butter: butterTheme,
  stone: stoneTheme,
} satisfies Record<string, DefinedTheme>;

export type ThemeName = keyof typeof themeCatalog;

export function formatThemeName(name: string) {
  return name === 'y2k' ? 'Y2K' : name[0].toUpperCase() + name.slice(1);
}
