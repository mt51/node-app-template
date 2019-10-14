const Koa = require('koa');
const view = require('koa-view');
const static = require('koa-static');
const minimist = require('minimist');
const resource = require('../config/resources');
const config = require('../config');
const koaViewMiddleware = require('./middlewares/koa-view-middleware');
require('./extends/context');

const argv = minimist(process.argv.slice(2));

process.env.NODE_ENV = argv.env;

const router = require('./routers');

const app = new Koa();

app.use(koaViewMiddleware(`${__dirname}/views/`, {
  ext: 'njk',
}));

// 设置一些全局变量
app.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    resource,
    _global: '{}',
  });
  await next();
})

app.use(static(__dirname + '/dist'));

app.use(router.routes()).use(router.allowedMethods())


app.listen(3000);

