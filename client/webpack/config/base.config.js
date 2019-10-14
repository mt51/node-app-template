const webpack = require('webpack');
const path = require('path');
const helper = require('../utils/helper');
const getBabelRule = require('../rules/babel');
const getTypeScriptRule = require('../rules/typescript');
const baseConfig = {
  output: {
    path: path.resolve(__dirname, '../../../app/dist'),
    filename: helper.isDev() ? '[name].js' : '[name]_[chunkhash].js',
    chunkFilename: helper.isDev() ? '[name].js' : '[name]_[chunkhash].js'
  },
  module: {
    rules: [
      getBabelRule(),
      getTypeScriptRule(),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  bail: true,
  plugins: [
    new webpack.EnvironmentPlugin({
      'NODE_ENV': process.env.NODE_ENV,
    })
  ]
}

module.exports = baseConfig;