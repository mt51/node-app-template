const fs = require('fs');
const path = require('path');

class ResourceConfigGeneratePlugin {
  constructor(options) {
    this.options = options;
  }

  async saveResourceConfig(jsResource, cssResource) {
    const resourceConfigFile = path.resolve(__dirname, '../../../../config/resources.json');
    // const keys = Object.keys(jsResource);
    // let resourceConfigStr = '';
    // for (let i= 0; i < keys.length; i++) {
    //   const key = keys[i];
    //   resourceConfigStr += `    "${resourceConfig[key]}": "${resourceConfig[key]}"${i < keys.length - 1 ? ',\n' : '' }`;
    // }
    // resourceConfigStr = `{\n  "js": {\n${resourceConfigStr}\n  }\n}`;
    const jsResourceStr = this.getResourceStr(jsResource, 'js');
    const cssResourceStr = this.getResourceStr(cssResource, 'css');
    const resourceConfigStr = `{\n  ${jsResourceStr}, \n  ${cssResourceStr}\n}`
    fs.writeFileSync(resourceConfigFile, resourceConfigStr);
  }

  getResourceStr(resource, type) {
    const keys = Object.keys(resource);
    let resourceStr = '';
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      resourceStr += `    "${key}": "${resource[key]}"${i < keys.length - 1 ? ',\n' : '' }`;
    }
    return `"${type}": {\n${resourceStr}\n  }`
  }

  apply(compiler) {
    compiler.hooks.done.tap('done', compiler => {
      const filenames = Object.keys(compiler.compilation.assets);
      const jsResource = {};
      const cssResource = {};
      filenames.forEach(filename => {
        if (filename.endsWith('.js') || filename.endsWith('.css')) {
          const index = filename.indexOf('_');
          if (index > -1) {
            const key = filename.substr(0, index);
            if (filename.indexOf('.css') === -1) {
              jsResource[key] = filename;
            } else {
              cssResource[key] = filename;
            }
          }
        }
      });
      try {
        this.saveResourceConfig(jsResource, cssResource);
      } catch (e) {
        throw new Error(e)
      }
    })
  }
}

module.exports = ResourceConfigGeneratePlugin;
