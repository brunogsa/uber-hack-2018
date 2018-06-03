module.exports = () => {

  const morgan = require('morgan');

  morgan.token('body', function getBody(request) {
    return JSON.stringify( request.body );
  });

  const timestamp = ':date[iso]';
  const requestInfo = 'Request: :method :url, Body: \':body\'';
  const responseInfo = 'Response: :status "X-Request-ID: :res[x-request-id]", Took: :response-time ms';
  const logFormat = morgan.compile(`${ timestamp } --- ${ requestInfo } --- ${ responseInfo }`);

  return morgan(logFormat);

};
