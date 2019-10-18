const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const defaultPreset = require('cssnano-preset-default');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./base.prod.config');
const helpers = require('../utils/helper');
const ResourceConfigGeneratePlugin = require('../plugins/webpack-resource-config-generate-plugin');

const isAnalyze = process.argv.indexOf('analyze') > -1;

const plugins = [new ResourceConfigGeneratePlugin()];

if (isAnalyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  entry: scanEntries(helpers.getAppRoot()),
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
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: "commons",
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          chunks: 'initial',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins,
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
