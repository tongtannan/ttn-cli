import Koa from 'koa';

import getIn from './getIn';
import { errorCode } from './errorCode';

export * from './log';
export * from './errorCode';
export { getIn };

export interface RespError {
  name: string;
  message: string;
  stack?: string;
}

export const notAllowedReq = (ctx: Koa.Context) => {
  ctx.status = 400;
  ctx.body = {
    code: errorCode.REQUEST_NOT_ALLOWED.code,
    message: errorCode.REQUEST_NOT_ALLOWED.msg,
    data: null,
  };
};

export const safeParse = (target: string) => {
  try {
    return JSON.parse(target);
  } catch (e) {
    return '';
  }
};

// prettier-ignore
export const awaitTo = <T>(promise: Promise<T>): Promise<{ err: RespError, resp: T, }> =>
  promise.then((res: T) => ({ err: null as any, resp: res })).catch((e: RespError) => ({ err: e, resp: null as any }));
