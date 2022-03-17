// @ts-nocheck
import { MongoClient, Db } from 'mongodb';
const Db = process.env.MONGO_ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db: Db;

export default {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db('directory');
        console.log('Successfully connected to MongoDB.');
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};
