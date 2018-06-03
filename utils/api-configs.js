const path = require('path');
const dotenv = require('dotenv-safe');

dotenv.load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env-sample'),
  allowEmptyValues: true,
});

const configs = {
  firebaseCredentials: {
    projectId: process.env.FIREBASE_CREDENTIAL_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CREDENTIAL_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_CREDENTIAL_PRIVATE_KEY,
  },

  firebaseDb: {
    url: process.env.FIREBASE_DATABASE_URL,
  },

  uberAccessToken: process.env.UBER_API_ACCESS_TOKEN,
  uberApiUrl: process.env.UBER_API_URL,
};

module.exports = configs;
