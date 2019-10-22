const getBabelOptions = require('./babel-options');

function  getBabelRule() {
  const loader = [
    {
      loader: require.resolve('babel-loader'),
      options: getBabelOptions(),
    }
  ]

  return {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    use: loader,
  }
}

module.exports = getBabelRule;
