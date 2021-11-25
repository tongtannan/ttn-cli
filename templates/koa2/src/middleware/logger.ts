import Koa from 'koa';
import chalk from 'chalk';

import { log } from '../utils';

function logger() {
  return async function logger(ctx: Koa.Context, next: Koa.Next) {
    ctx.log = log;
    const start = Date.now();
    const { path, querystring, origin, method } = ctx;
    console.log(chalk.green(`----- ${new Date()} -----`));
    const reqLog = `
      [${chalk.blueBright('Request')}] 
        origin: ${origin}
        method: ${method}
        path: ${path}
        query: ${querystring}
    `;

    console.log(reqLog);

    try {
      await next();
    } catch (err) {
      log.error(err.message || JSON.stringify(err || {}));
      throw err;
    }

    const spent = Date.now() - start;
    const { length, body, status } = ctx;
    ctx.set('x-response-time', `${spent}`);

    const resLog = `
      [${chalk.blueBright('Response')}]
        res body: ${JSON.stringify(body)}
        req body: ${JSON.stringify(ctx.request.body)}
        req params: ${JSON.stringify(ctx.params)}
        status: ${status}
        size: ${length}
        time: ${spent}
    `;
    console.log(resLog);
  };
}

export default logger;
