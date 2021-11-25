/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/ban-types */
const Koa = require('koa');
const cors = require('koa2-cors');
const app = new Koa();
const json = require('koa-json');
const error = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const path = require('path');
const fs = require('fs');
const morgan = require('koa-morgan');
const { isDev } = require('./config');

const monitor = require('./routes/monitor');

// error handler
error(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(json());
app.use(logger());
app.use(
  cors({
    origin: function () {
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }),
);

// logger
// @ts-ignore
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 日志
if (isDev) {
  app.use(morgan('dev'));
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a',
  });
  app.use(
    morgan('combined', {
      stream: writeStream,
    }),
  );
}

// routes
app.use(monitor.routes(), monitor.allowedMethods());

// error-handling
// @ts-ignore
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
