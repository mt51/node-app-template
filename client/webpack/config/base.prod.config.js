const webpack = require('webpack');
const merge = require('webpack-merge');
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
  },
  plugins: [
    new ResourceConfigGeneratePlugin()
  ]
});
