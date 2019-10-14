const fs = require('fs');
const path = require('path');

class ResourceConfigGeneratePlugin {
  constructor(options) {
    this.options = options;
  }

  async saveResourceConfig(resourceConfig) {
    const resourceConfigFile = path.resolve(__dirname, '../../../../config/resources.json');
    const keys = Object.keys(resourceConfig);
    let resourceConfigStr = '';
    for (let i= 0; i < keys.length; i++) {
      const key = keys[i];
      resourceConfigStr += `    "${resourceConfig[key]}": "${resourceConfig[key]}"${i < keys.length - 1 ? ',\n' : '' }`;
    }
    resourceConfigStr = `{\n  "js": {\n${resourceConfigStr}\n  }\n}`;
    fs.writeFileSync(resourceConfigFile, resourceConfigStr);
  }

  apply(compiler) {
    compiler.hooks.done.tap('done', compiler => {
      const filenames = Object.keys(compiler.compilation.assets);
      const resourceConfig = {};
      filenames.forEach(filename => {
        const index = filename.indexOf('_');
        if (index > -1) {
          const key = filename.substr(0, index);
          resourceConfig[key] = filename;
        }
      });
      try {
        this.saveResourceConfig(resourceConfig);
      } catch (e) {
        throw new Error('生成资源配置文件出错', e)
      }
    })
  }
}

module.exports = ResourceConfigGeneratePlugin;
