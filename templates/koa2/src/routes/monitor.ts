const router = require('koa-router')();
const { getList: apiGetList, insertLog: apiInsertLog } = require('../controller/monitor');
const { SuccessModal: Success } = require('../model/resModal');

router.prefix('/log/monitor');

router.get('/list', async function (ctx: any) {
  const { offset, limit, email, env, locale, startTime, endTime } = ctx.query;

  const result = await apiGetList({
    offset: Number(offset),
    limit: Number(limit),
    email,
    env,
    locale,
    startTime,
    endTime,
  });

  ctx.body = new Success(result, 'get list success');
});

router.post('/insert', async function (ctx: any) {
  const { body } = ctx.request;

  const result = await apiInsertLog(body);

  ctx.body = new Success(result, 'insert blog success');
});

module.exports = router;
