const path = require('path');
const merge = require('webpack-merge');
const baseDevConfig = require('./base.dev.config');
const scanEntries = require('../utils/scan-entries');
const helpers = require('../utils/helper');
const config = {
  devServer: {
    host: '127.0.0.1',
    compress: true,
    port: 3001,
  },
  watch: true,
}

config.entry = scanEntries(helpers.getAppRoot());

module.exports = merge.smart(baseDevConfig, config);
