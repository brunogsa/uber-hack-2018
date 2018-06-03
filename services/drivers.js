const db = require('../utils/firebase-database-wrapper');

const storeDriver = ({ name, deviceToken }) => {
  return db.storeData({
    sectionName: 'users',

    data: {
      name,
    },
  });
};

const getDriver = driverId => {
  return db.getData({
    sectionName: 'drivers',
    dataUid: driverId,
  });
};

module.exports = {
  storeDriver,
  getDriver,
};
