import Koa from 'koa';

import { getIn, errorCode } from '../utils';

function formatResponseBody() {
  return async function formatResponseBody(ctx: Koa.Context, next: Koa.Next) {
    await next();
    if (ctx.status > 200) {
      return;
    }

    const code = getIn(ctx.body, ['code']);
    let message = getIn(ctx.body, ['message']);

    if (!message && code) {
      Object.entries(errorCode).forEach(([, val]) => {
        if (val.code === code) {
          message = val['msg'];
        }
      });
    }

    ctx.body = {
      code: code || 0,
      message: message || 'success',
      data: code ? null : ctx.body,
    };
  };
}

export default formatResponseBody;
