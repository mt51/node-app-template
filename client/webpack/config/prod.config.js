const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const defaultPreset = require('cssnano-preset-default');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./base.config');
const helpers = require('../utils/helper');
const scanEntries = require('../utils/scan-entries');
const ResourceConfigGeneratePlugin = require('../plugins/webpack-resource-config-generate-plugin');

const isAnalyze = process.argv.indexOf('analyze') > -1;

const plugins = [new ResourceConfigGeneratePlugin(), new CleanWebpackPlugin()];

if (isAnalyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  entry: scanEntries(helpers.getAppRoot()),
  devtool: 'none',
  optimization: {
    minimizer: [
      new CleanWebpackPlugin(),
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: {
            plugins: [...defaultPreset().plugins, autoprefixer]
          },
        },
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
