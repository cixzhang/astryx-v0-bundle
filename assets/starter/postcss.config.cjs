const babelConfig = require('./babel.config.js');

module.exports = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['app/**/*.{js,jsx,ts,tsx}', 'components/**/*.{js,jsx,ts,tsx}'],
      babelConfig: {
        babelrc: false,
        parserOpts: {plugins: ['typescript', 'jsx']},
        plugins: babelConfig.plugins,
      },
      useCSSLayers: {
        before: ['reset', 'astryx-base', 'astryx-theme'],
      },
    },
    autoprefixer: {},
  },
};
