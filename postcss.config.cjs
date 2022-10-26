// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 768,
      unitPrecision: 6,
      unitToConvert: 'px',
      propList: ['*'],
    },
  },
};
