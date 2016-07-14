const appVersion = require('../package.json').version;

module.exports = {
  version: appVersion,
  mongoose: {
    uri: 'mongodb://localhost/ts_express_dev',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1,
        },
        poolSize: 5,
      },
    },
  },
}
