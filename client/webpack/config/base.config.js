const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const helper = require('../utils/helper');
const getBabelRule = require('../rules/babel');
const getTypeScriptRule = require('../rules/typescript');
const { getCssRule } = require('../rules/css');
const { getScssRule, getScssModuleRule } = require('../rules/scss');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const isDev = helper.isDev();

const baseConfig = {
  output: {
    path: path.resolve(__dirname, '../../../app/dist'),
    filename: isDev ? '[name].js' : '[name]_[chunkhash].js',
    chunkFilename: isDev ? '[name].js' : '[name]_[chunkhash].js'
  },
  module: {
    rules: [
      getBabelRule(),
      getTypeScriptRule(),
      getCssRule(),
      getScssRule(),
      getScssModuleRule()
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  bail: true,
  plugins: [
    new webpack.EnvironmentPlugin({
      'NODE_ENV': process.env.NODE_ENV,
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name]_[contenthash].css',
      chunkFilename: isDev ? '[name].css' : '[name]_[contenthash].css',
    }),
    new HardSourceWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  optimization: {
    noEmitOnErrors: true,
  },

  performance: {
    hints: false,
  },

  stats: {
    modules: false,
    children: false,
    performance: false,
    entrypoints: false,
    colors: true,
  },
}

module.exports = baseConfig;