import type {DefinedTheme} from '@astryxdesign/core/theme';
import {butterTheme} from '@astryxdesign/theme-butter/built';
import {chocolateTheme} from '@astryxdesign/theme-chocolate/built';
import {gothicTheme} from '@astryxdesign/theme-gothic/built';
import {matchaTheme} from '@astryxdesign/theme-matcha/built';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {stoneTheme} from '@astryxdesign/theme-stone/built';
import {y2kTheme} from '@astryxdesign/theme-y2k/built';
import {astryxV0Theme} from '../../examples/themes/custom/astryx-v0.theme';

export const themes = {
  neutral: neutralTheme,
  butter: butterTheme,
  chocolate: chocolateTheme,
  gothic: gothicTheme,
  matcha: matchaTheme,
  stone: stoneTheme,
  y2k: y2kTheme,
  custom: astryxV0Theme,
} satisfies Record<string, DefinedTheme>;

export type ThemeName = keyof typeof themes;
