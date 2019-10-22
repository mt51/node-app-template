const { getMiniCssExtractPluginLoader } = require('./css');
const helper = require('../utils/helper');
const isDev = helper.isDev();


function getScssRule(cssModuleMode) {
  const sassLoader = {
    loader: require.resolve('sass-loader'),
    options: {
      sourceMap: isDev,
    }
  }

  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: {
      modules: cssModuleMode ? {
        mode: true,
        localIdentName: isDev ? '[local]--[hash:base64:4]' : '[hash:base64:4]',
      } : false,
      sourceMap: isDev,
      importLoaders: 1,
      localsConvention: 'asIs',
    }
  }

  const loaders = [getMiniCssExtractPluginLoader(), cssLoader, sassLoader];

  let test;

  if (cssModuleMode === 'module') {
    test = mod => mod.endsWith('.m.scss');
  } else {
    test = mod => mod.endsWith('.scss');
  }

  return {
    test,
    use: loaders,
  }
}

getScssRule(false);

module.exports = {
  getScssRule: () => getScssRule(false),
  getScssModuleRule: () => getScssRule('module'),
}
