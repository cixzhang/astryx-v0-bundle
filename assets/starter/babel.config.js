const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev,
        runtimeInjection: false,
        enableInlinedConditionalMerge: true,
        treeshakeCompensation: true,
        // Astryx's precompiled astryx.css uses StyleX's default `x` prefix; `p` keeps product classes from colliding with it.
        classNamePrefix: 'p',
        aliases: {'@/*': [path.join(__dirname, '*')]},
        unstable_moduleResolution: {type: 'commonJS'},
      },
    ],
  ],
};
