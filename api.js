const app = require('./utils/express-app-factory').createApp();
const PORT = 5000;

const { storeUser, getUser } = require('./services/users');
const { storeDriver, getDriver } = require('./services/drivers');
const { getProposal, updateProposal } = require('./services/proposals');

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

  storeUser(dataToStore).then(uid => {
    response.status(201).json({ uid });

  }).catch(error => {

    response.status(500).json({ error: error.message });
  });
});

app.get('/users/:userId', (request, response) => {
  const params = request.params || {};
  const userId = params.userId;

  getUser(userId).then(data => {
    response.status(200).json(data);

  }).catch(error => {

    response.status(500).json({ error: error.message });
  });
});

/*
 * Resource /drivers
 */
app.post('/drivers', (request, response) => {
  const body = request.body || {};

  const dataToStore = {
    name: body.name,
    carVacancies: body.carVacancies,
    deviceToken: body.deviceToken,
  };

  storeDriver(dataToStore).then(uid => {
    response.status(201).json({ uid });

  }).catch(error => {

    response.status(500).json({ error: error.message });
  });
});

app.get('/drivers/:driverId', (request, response) => {
  const params = request.params || {};
  const driverId = params.driverId;

  getDriver(driverId).then(data => {
    response.status(200).json(data);

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

  getProposal(proposalId).then(data => {
    response.status(200).json(data);

  }).catch(error => {

    response.status(500).json({ error: error.message });
  });
});

app.patch('/proposals/:proposalId', (request, response) => {
  const params = request.params || {};
  const proposalId = params.proposalId;

  const body = request.body || {};
  const userId = body.userId;
  const accept = body.accept === 'true' || body.accept === true;

  updateProposal({ proposalId, userId, accept }).then(() => {
    response.status(200).json();

  }).catch(error => {

    response.status(500).json({ error: error.message });
  });
});

app.listen(
  PORT,
  () => console.log(`API is listening on port ${ PORT } ..`)
);
