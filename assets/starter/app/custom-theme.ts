import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export const customTheme = defineTheme({
  name: 'astryx-v0-custom',
  extends: neutralTheme,
  color: {
    accent: ['#075EBC', '#70B7FF'],
    neutralStyle: 'cool',
    contrast: 'standard',
  },
  typography: {
    scale: {base: 15, ratio: 1.2},
    body: {
      family: 'system-ui',
      fallbacks: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    heading: {weight: 'semibold'},
    code: {family: 'ui-monospace', fallbacks: 'monospace'},
  },
  radius: {base: 4, multiplier: 1.25},
  motion: {fast: 140, medium: 320, slow: 760, ratio: 0.75},
  components: {
    button: {
      'variant:primary': {fontWeight: '700'},
    },
    card: {
      base: {borderColor: 'var(--color-border-emphasized)'},
    },
  },
});
