const babelConfig = require('./babel.config');

module.exports = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: [
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        'lib/**/*.{js,jsx,ts,tsx}',
      ],
      babelConfig: {
        babelrc: false,
        parserOpts: {plugins: ['typescript', 'jsx']},
        plugins: babelConfig.plugins,
      },
      // Product StyleX layers come after Astryx's precompiled reset, base, and theme layers.
      useCSSLayers: {
        before: ['reset', 'astryx-base', 'astryx-theme'],
      },
    },
    autoprefixer: {},
  },
};
