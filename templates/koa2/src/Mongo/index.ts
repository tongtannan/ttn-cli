import mongoose, { Mongoose } from 'mongoose';

import { DATABASE_URI } from '../config';

let timer: NodeJS.Timeout;
class Mongo {
  static mongo: Mongoose = mongoose;
  private static times = 8;

  public static initMongo() {
    Mongo.initConnection();
    Mongo.connnectDB();
  }

  public static getMongo(): Mongoose {
    return Mongo.mongo;
  }

  private static initConnection() {
    Mongo.mongo.connection.on('open', () => {
      console.log('mongodb connects sucess');
      global.clearInterval(timer as NodeJS.Timeout);
    });

    Mongo.mongo.connection.once('error', () => {
      console.error('mongodb connects failed');
      timer = global.setInterval(() => {
        if (Mongo.times > 0) {
          Mongo.times--;
          Mongo.connnectDB();
        } else {
          console.error('mongodb reconnects failed');
          global.clearInterval(timer as NodeJS.Timeout);
        }
      }, 8000);
    });
  }

  private static async connnectDB() {
    await Mongo.mongo.connect(DATABASE_URI, {
      bufferCommands: false,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

function closeConnection(e: any) {
  console.error('----eeeeeee-----', e);
  global.clearInterval(timer as NodeJS.Timeout);
  Mongo.mongo.connection.close(true);
}

process.on('exit', closeConnection);
process.on('SIGINT', closeConnection);
process.on('uncaughtException', closeConnection);

export default Mongo;
