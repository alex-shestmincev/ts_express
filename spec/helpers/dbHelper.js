process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const config = require('config');
let _db = null;

exports.connect = () => {
  if (_db) {
    return Promise.resolve(true);
  }
  mongoose.Promise = global.Promise;
  return new Promise((resolve, reject) => {
    mongoose.connect(config.mongoose.uri, config.mongoose.options, (err) => {
      if (err) return reject(err);
      _db = true;
      return resolve(true);
    });
  });
}
