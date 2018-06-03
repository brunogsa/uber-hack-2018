const Promise = require('bluebird');
const firebaseDb = require('./firebase-admin-wrapper').database();

const getData = ({ sectionName, dataUid }) => {
  return firebaseDb.ref(sectionName).child(dataUid).once('value').then(snapshot => {
    const snapshotData = snapshot.val();
    if (snapshotData === null || snapshotData === undefined) return Promise.resolve(null);

    return Promise.resolve(snapshotData);
  });
};

const storeData = ({ sectionName, dataUid, data }) => {
  let dbNode;

  if (dataUid) {
    dbNode = firebaseDb.ref(sectionName).child(dataUid);

  } else {

    dbNode = firebaseDb.ref(sectionName).push();
    dataUid = dbNode.key;
  }

  return dbNode.set(data).then(
    () => Promise.resolve(dataUid)
  );
};

module.exports = {
  getData,
  storeData,
};
