const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isDev } = require('../utils/helper');

function getCssRule() {
  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: {
      sourceMap: isDev(),
      importLoaders: 0,
    },
  };
  const loaders = [getMiniCssExtractPluginLoader(), cssLoader];
  return {
    test: /\.css$/,
    use: loaders
  };
}

function getMiniCssExtractPluginLoader() {
  return {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDev(),
      reloadAll: true,
    }
  }
}

module.exports = {
  getCssRule,
  getMiniCssExtractPluginLoader
};
