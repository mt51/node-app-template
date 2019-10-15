const path = require('path');
function isDev() {
  return process.env.NODE_ENV !== 'production';
}

function getAppRoot() {
  return path.resolve(__dirname, '../../pages');
}

module.exports = {
  isDev,
  getAppRoot
};
