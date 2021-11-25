import Koa from 'koa';
import { ParameterRules } from 'parameter';

import { LIMIT, APIRouter } from '../config';
import { logCheck } from './utils';

interface Resp {
  rules: ParameterRules;
  data: Record<string, any>;
}

interface RuleConfig {
  [key: string]: (ctx: Koa.Context) => Resp;
}

interface ParamsConfig {
  [key: string]: RuleConfig;
}

const paramsConfig: ParamsConfig = {
  [APIRouter.LOG]: {
    GET: (ctx: Koa.Context) => {
      const { limit, offset, env, locale, email, time } = ctx.query;
      return {
        data: {
          limit: parseInt(limit as any, 10),
          offset: parseInt(offset as any, 10),
          env,
          locale,
          email,
          time,
        },
        rules: {
          limit: { type: 'int', max: 100, min: LIMIT },
          offset: { type: 'int', min: 0 },
          email: { type: 'email', trim: true, required: false },
          env: { type: 'enum', values: ['test', 'uat', 'live', 'staging'], required: false },
          time: { type: 'id', required: false },
          locale: { type: 'enum', values: ['MY', 'SG', 'TW', 'ID', 'VN', 'TH', 'PH', 'BR'], required: false },
        },
      };
    },
    POST: logCheck,
  },
};

export const getParamsConfig = (ctx: Koa.Context): Resp | undefined => {
  const router = Object.values(APIRouter).find((p) => ctx.path.includes(p));
  const config = paramsConfig[router || ''];
  if (config && typeof config[ctx.method] === 'function') {
    return config[ctx.method](ctx);
  }
};
