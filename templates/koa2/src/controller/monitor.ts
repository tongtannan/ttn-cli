// const xss = require('xss');
const ModelBlog = require('../db/models/Monitor');

const getList = async ({ offset, limit, email, env, locale, startTime, endTime }: any) => {
  const whereOpt: any = {};
  if (email) whereOpt.email = new RegExp(email);
  if (env) whereOpt.env = env;
  if (locale) whereOpt.locale = locale;
  if (startTime && endTime) {
    whereOpt.time = {
      $gt: startTime,
      $lt: endTime,
    };
  }
  const total = await ModelBlog.count();
  const res = await ModelBlog.find(whereOpt).skip(offset).limit(limit).sort({ _id: -1 });

  return {
    list: res,
    total,
  };
};

const insertLog = async (body: any) => {
  const { authInfo, breadcrumb, deviceInfo } = body;
  const postData = breadcrumb.map((item: any) => {
    return Object.assign({}, item, authInfo, deviceInfo);
  });

  const result = await ModelBlog.insertMany(postData);

  return result.length;
};

module.exports = {
  getList,
  insertLog,
};
