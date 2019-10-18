const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./base.config');

function cssnanoDevPreset(opts) {
  const options = Object.assign({
    autoprefixer: {},
  }, opts);

  const plugins = [
    [autoprefixer, options.autoprefixer],
  ];

  return {  plugins }
}

module.exports = merge.smart(baseConfig, {
  mode: "development",
  devtool: 'cheap-module-source-map',
});
