const webpackMerge = require('webpack-merge');

const baseConfig = require('./baseConfig');

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
});
