const app = require('./utils/express-app-factory').createApp();
const PORT = 5000;

const db = require('./utils/firebase-database-wrapper');

/*
 * Resource /users
 */
app.post('/users', (request, response) => {
  const body = request.body || {};

  const dataToStore = {
    name: body.name,
    homeLocation: body.homeLocation,
    workLocation: body.workLocation,
    workStartAt: body.workStartAt,
    leaveWorkAt: body.leaveWorkAt,
    deviceToken: body.deviceToken,
  };

  db.storeData({ sectionName: 'users', data: dataToStore }).then(uid => {
    response.status(201).json({ uid });

  }).catch(error => {

    response.status(500).json({ error: error.message });
  });
});

app.listen(
  PORT,
  () => console.log(`API is listening on port ${ PORT } ..`) // eslint-disable-line
);
