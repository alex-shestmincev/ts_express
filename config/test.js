module.exports = {
  isTest: true,
  port: process.env.PORT || 3333,
  mongoose: {
    uri: 'mongodb://localhost/ts_express_test',
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
