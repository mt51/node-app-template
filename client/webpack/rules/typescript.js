const getBabelOptions = require('./babel-options');

function getTypeScriptRule() {
  const loaders = [
    {
      loader: require.resolve('babel-loader'),
      options: getBabelOptions()
    },
    {
      loader: require.resolve('ts-loader'),
    }
  ]

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: loaders
  }
}

module.exports = getTypeScriptRule;
