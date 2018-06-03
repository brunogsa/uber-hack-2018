## Development Dependencies

Before starting, ensure you have `Node` and `NPM` installed:

```
$ node -v
v8.9.4

$ npm -v
6.1.0
```

## Starting the Dev Server

1. Set the `.env` file using `cp -f .env-sample .env`
2. Run `npm install`
3. Start the dev server using `npm start`. You need to restart the server on changes

## Environment Variables

### `FIREBASE_CREDENTIAL_PROJECT_ID`
- **Mandatory**: Yes.
- **Type**: `string`

The Firebase Project ID, that can found in your Account Service JSON, downloaded from Firebase.

### `FIREBASE_CREDENTIAL_CLIENT_EMAIL`
- **Mandatory**: Yes.
- **Type**: `string`

The Firebase Client Email, that can found in your Account Service JSON, downloaded from Firebase.

### `FIREBASE_CREDENTIAL_PRIVATE_KEY`
- **Mandatory**: Yes.
- **Type**: `string`

The Firebase Private Key, that can found in your Account Service JSON, downloaded from Firebase.

### `FIREBASE_DATABASE_URL`
- **Mandatory**: Yes.
- **Type**: `string`

The Firebase Realtime Database URL.  
Ensure the last character is NOT a slash!

### `UBER_API_ACCESS_TOKEN`
- **Mandatory**: Yes.
- **Type**: `string`

The Token to access Uber API.

### `UBER_API_URL`
- **Mandatory**: Yes.
- **Type**: `string`

The Uber API URL.
