const mongooseBlog = require('../db');

const MonitorSchema = mongooseBlog.Schema(
  {
    type: String,
    category: String,
    level: String,
    id: String,
    time: Number,
    url: String,
    apikey: String,
    trackKey: String,
    sdkVersion: String,
    sdkName: String,
    userId: String,
    username: String,
    email: String,
    avatar: String,
    env: String,
    locale: String,
    operationSys: String,
    browerLang: String,
    browerName: String,
    clientWidth: Number,
    clientHeight: Number,
    data: Object,
    extraInfo: Array,
    // https://www.py4u.net/discuss/1475385
    expiresTime: { type: Date, expires: 0 },
    // time to live
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   index: {
    //     expires: '10m',
    //   },
    // },
  },
  // {
  //   timestamps: true,
  // },
);
// MonitorSchema.index({ expiresTime: 1 }, { expireAfterSeconds: 300 });
// MonitorSchema.index({ createdAt: 1 }, { expires: '10m' });
// log = logs
const Monitor = mongooseBlog.model('log', MonitorSchema);

module.exports = Monitor;
