const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const defaultPreset = require('cssnano-preset-default');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./base.prod.config');
const ResourceConfigGeneratePlugin = require('../plugins/webpack-resource-config-generate-plugin');

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  devtool: 'none',
  optimization: {
    namedModules: true,
    moduleIds: 'hashed',

    namedChunks: true,
    chunkIds: 'named',
    minimizer: [
      new CleanWebpackPlugin(),
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
      }),
  
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: cssnanoProdPreset,
        }
      }),
    ]
  },
  plugins: [
    new ResourceConfigGeneratePlugin()
  ]
});

function cssnanoProdPreset(opt = {}) {
  const options = Object.assign({
      autoprefixer: {
        cascade: false,
      }
    },
    opt
  );

  const plugins = [...defaultPreset(options).plugins, [autoprefixer, options.autoprefixer]]

  return {
    plugins
  }
}
