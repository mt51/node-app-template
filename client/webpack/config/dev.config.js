const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugins = require('friendly-errors-webpack-plugin');
const scanEntries = require('../utils/scan-entries');
const helpers = require('../utils/helper');
const baseConfig = require('./base.config');
const config = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '127.0.0.1',
    compress: true,
    port: 3001,
    stats: {
      modules: false,
      children: false,
      performance: false,
      entrypoints: false,
      colors: true,
    },
    quiet: true,
  },
  watch: true,
  plugins: [
    new FriendlyErrorsWebpackPlugins(),
  ]
}

config.entry = scanEntries(helpers.getAppRoot());

module.exports = merge.smart(baseConfig, config);
