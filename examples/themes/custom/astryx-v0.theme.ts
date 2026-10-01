import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

/**
 * A deliberately small custom theme that exercises Astryx's public IR without
 * creating a parallel token vocabulary.
 */
export const astryxV0Theme = defineTheme({
  name: 'astryx-v0',
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
  onDark: {
    components: {
      button: {
        'variant:ghost': {
          borderColor: 'color-mix(in srgb, white 22%, transparent)',
        },
      },
    },
  },
  onLight: {
    components: {
      button: {
        'variant:ghost': {
          borderColor: 'color-mix(in srgb, black 14%, transparent)',
        },
      },
    },
  },
});

export default astryxV0Theme;
