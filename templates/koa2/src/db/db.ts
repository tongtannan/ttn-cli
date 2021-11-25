const mongoose = require('mongoose');

const { DATABASE_URI, DATABASE_NAME } = require('../config');

mongoose.connect(`${DATABASE_URI}/${DATABASE_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', (err: any) => {
  console.log(err);
});

// db.once('open', () => {
//   console.log('mongoose connect success')
// })

module.exports = mongoose;
