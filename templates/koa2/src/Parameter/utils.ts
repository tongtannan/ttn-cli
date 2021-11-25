import Koa from 'koa';

import { safeParse } from '../utils';

export const logCheck = (ctx: Koa.Context) => {
  const { email, env, locale, request, response } = ctx.request.body;
  return {
    data: {
      email,
      env,
      locale,
      request: safeParse(request),
      response: safeParse(response),
    },
    rules: {
      email: { type: 'email', trim: true },
      env: { type: 'enum', values: ['test', 'uat', 'live', 'staging'], trim: true },
      locale: { type: 'enum', values: ['MY', 'SG', 'TW', 'ID', 'VN', 'TH', 'PH', 'BR'], trim: true },
      request: { type: 'object' },
      response: { type: 'object' },
    },
  };
};
