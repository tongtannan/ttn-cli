import Koa from 'koa';

import { errorCode } from '../utils';
import parameter, { getParamsConfig } from '../Parameter';

function checkParameter() {
  return async function checkParameter(ctx: Koa.Context, next: Koa.Next) {
    const config = getParamsConfig(ctx);
    let errors: any;
    if (config) {
      const { data, rules } = config;
      try {
        errors = parameter.validate(rules, data);
      } catch (err) {
        errors = [{ ...err }];
      }
    }

    if (errors && errors.length) {
      ctx.body = {
        code: errorCode.PARAMETER.code,
      };
      return;
    }

    await next();
  };
}

export default checkParameter;
