function createCustomizedExpressApp() {
  const app = require('express')();

  const middlewares = {
    requestId: require('express-request-id'),
    cors: require('cors'),
    bodyParser: require('body-parser'),
    log: require('./express-log-middleware'),
  };

  app.use( middlewares.requestId() );
  app.use( middlewares.cors({ origin: true }) );
  app.use( middlewares.bodyParser.json() );
  app.use( middlewares.log() );

  return app;
}

module.exports = {
  createApp: createCustomizedExpressApp,
};
