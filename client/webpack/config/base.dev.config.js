const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
  // optimization: {
  //   minimizer: [
  //     new OptimizeCSSAssetsPlugin({
  //       cssProcessorOptions: {
  //         map: {
  //           inline: false,
  //         }
  //       },
  //       cssProcessorPluginOptions: {
  //         preset: cssnanoDevPreset
  //       }
  //     })
  //   ]
  // }
});
