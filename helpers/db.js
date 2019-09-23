import config from '../config.json';
import mongoose from 'mongoose';

export default function connectToDb() {
  if (process.env.NODE_ENV === 'test') {
    return
    // connectToTestDb()
  } else {
    mongoose.connect(process.env.MONGO_URL || config.mongo.uri, { useNewUrlParser: true, useCreateIndex: true }, (err, succ) => {
      if (err) {
        console.log(err);
        logger.info(err);
      } else {
        console.log("connected", succ);
        logger.info("connected", succ);
      }
    });
  }
}

