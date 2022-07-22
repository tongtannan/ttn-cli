const env = process.env.NODE_ENV;
const isDev = env !== 'production';

module.exports = {
  env,
  isDev,
};
