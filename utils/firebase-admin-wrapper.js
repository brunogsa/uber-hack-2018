const admin = require('firebase-admin');

const {
  firebaseCredentials,
  firebaseDb,

} = require('./api-configs');

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: firebaseDb.url,
});

module.exports = admin;
