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

/*
 * Resource /proposals
 */
app.get('/proposals/:proposalId', (request, response) => {
  const params = request.params || {};
  const proposalId = params.proposalId;

  db.getData({ sectionName: 'proposals', dataUid: proposalId }).then(data => {
    response.status(200).json(data);

  }).catch(error => {

    response.status(500).json({ error: error.message });
  });
});

app.patch('/proposals/:proposalId', (request, response) => {
  // const params = request.params || {};
  // const proposalId = params.proposalId;
  // const body = request.body || {};
  // const userId = body.userId;
  // const accept= body.accept === 'true' || body.accept === true;

  // TODO

  response.status(200).json();
});

app.listen(
  PORT,
  () => console.log(`API is listening on port ${ PORT } ..`)
);
