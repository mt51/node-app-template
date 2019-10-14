const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./base.config');
const baseProdConfig = require('./base.prod.config');
const scanEntries = require('../utils/scan-entries');
const helpers = require('../utils/helper');
const ResourceConfigGeneratePlugin = require('../plugins/webpack-resource-config-generate-plugin');

const config = merge.smart(
  baseConfig,
  {
    entry: scanEntries(helpers.getAppRoot())
  },
  baseProdConfig,
);

module.exports = config;
