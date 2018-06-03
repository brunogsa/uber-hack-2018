const db = require('../utils/firebase-database-wrapper');

const USER_STATUS = {
  WAITING_GROUP_PROPOSAL: 'WAITING_GROUP_PROPOSAL',
  ANALYZING_PROPOSAL: 'ANALYZING_PROPOSAL',
  WAITING_OTHERS: 'WAITING_OTHERS',
  ON_OPERATING_GROUP: 'ON_OPERATING_GROUP',
};

const storeUser = ({ name, homeLocation, workLocation, workStartAt, leaveWorkAt, deviceToken }) => {
  return db.storeData({
    sectionName: 'users',

    data: {
      name,
      homeLocation,
      workLocation,
      workStartAt,
      leaveWorkAt,
      deviceToken,
      status: USER_STATUS.WAITING_GROUP_PROPOSAL,
    },
  });
};

const getUser = userId => {
  return db.getData({
    sectionName: 'users',
    dataUid: userId,
  });
};

module.exports = {
  storeUser,
  getUser,
};
