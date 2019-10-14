const view = require('koa-view');
const config = require('../../../config')

function loadJs(path, resource) {
  if (process.env.NODE_ENV === 'dev') {
    return `<script src="${config.resource_local_url}/${path}.js"></script>`
  } else {
    return `<script src="${resource.js[path]}" crossorigin="anonymous"></script>`;
  }
}

function loadCss(path, resource) {
  if (process.env.NODE_ENV === 'dev') {
    return `<link rel="stylesheet" type="text/css" href="${config.resource_local_url}/${path}.css">`
  } else {
    return `<link rel="stylesheet" type="text/css" href="${resource.css[path]}"></link>`;
  }
}

module.exports = function koaViewMiddleware (path, options) {
  return async (ctx, next) => {
    const koaView = view(path, {
      ...options,
      globals: {
        loadJs: path => loadJs(path, ctx.state.resource),
        loadCss: path => loadCss(path, ctx.state.resource)
      }
    });
    await koaView(ctx, next);
  }
}