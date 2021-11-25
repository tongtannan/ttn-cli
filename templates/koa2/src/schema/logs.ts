import Mongo from '../Mongo';

const m = Mongo.getMongo();

const logsSchema = new m.Schema(
  {
    email: {
      type: String, // 当前登录用户的邮箱
      require: [true, 'the email is required'],
      trim: true,
    },
    request: {
      type: String,
      require: [true, 'the request is required'],
      trim: true,
    },
    response: {
      type: String,
      require: [true, 'the response is required'],
      trim: true,
    },
    env: {
      type: String,
      require: [true, 'the env is required'],
      trim: true,
    },
    locale: {
      type: String,
      require: [true, 'the locale is required'],
      trim: true,
    },
    url: String,
    method: String,
    mtime: Number,
    ctime: Number,
  },
  { minimize: false },
);

logsSchema.index({ email: 1, ctime: 1, env: 1, locale: 1 });

export { logsSchema };
