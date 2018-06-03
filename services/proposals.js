const db = require('../utils/firebase-database-wrapper');

const getProposal = proposalId => {
  return db.getData({
    sectionName: 'proposals',
    dataUid: proposalId,
  });
};

const updateProposal = ({ proposalId, userId, accept }) => {
  // TODO: Retrieve data
  // TODO: Update routes
  // TODO: Update usersToApprove
  // TODO: If there's no more users to approve, create group
  // TODO: Move logic to a service
};

module.exports = {
  getProposal,
};
