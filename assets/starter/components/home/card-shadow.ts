import * as stylex from '@stylexjs/stylex';

// A soft, layered lift for the feature cards, replacing the theme's heavier `high` elevation.
export const cardShadow = stylex.create({
  raised: {
    boxShadow:
      '0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 12px -2px rgba(16, 24, 40, 0.06), 0 16px 32px -12px rgba(16, 24, 40, 0.12)',
  },
});
