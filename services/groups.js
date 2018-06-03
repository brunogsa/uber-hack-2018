const openHttpRequest = require('axios');
const { uberApiAccessKey, uberApiUrl } = require('../utils/api-configs');
const db = require('../utils/firebase-database-wrapper');

const computeRegions = () => {
  // TODO: get all users available
  // TODO: Create clusters based on the Home Location, from 13 to 7 people
};

const getDrivers = () => {
  // TODO
};

const getNearestDriver = (region, drivers) => {
  // TODO
};

const computeTimeEstimate = (locationA, locationB) => {
  return openHttpRequest({
    method: 'get',
    headers: { 'Authorizarion': `Bearer ${ uberApiAccessKey }` },
    url: `${ uberApiUrl }/estimates/time?start_latitude=${ locationA.lat }&start_longitude=${ locationA.lng }&end_latitude=${ locationB.lat }&end_longitude=${ locationB.lng }`,

  }).then(data => {
    return data.times.find(obj => obj.localized_display_name === 'uberX').estimate;
  });
};

const computePriceEstimate = (locationA, locationB) => {
  return openHttpRequest({
    method: 'get',
    headers: { 'Authorizarion': `Bearer ${ uberApiAccessKey }` },
    url: `${ uberApiUrl }/estimates/price?start_latitude=${ locationA.lat }&start_longitude=${ locationA.lng }&end_latitude=${ locationB.lat }&end_longitude=${ locationB.lng }`,

  }).then(data => {
    return data.prices.find(obj => obj.localized_display_name === 'uberX').estimate;
  });
};

const generateRoutePiece = (locationA, locationB, type) => {
  // TODO
};

const sortDataByTime = distanceData => {
  // TODO
};

const computeProposals = (region, drivers) => {
  let proposal = {}; // TODO Build complete object

  const routes = {
    going: [],
    returning: [],
  };

  return getNearestDriver(region, drivers).then(nearestDriver => {

    return Promise.all(region.users.map(user => {
      return Promise.props({
        userId: user.id,
        driverId: nearestDriver.id,
        userHomeLocation: user.homeLocation,
        timeEstimate: computeTimeEstimate(user.homeLocation, nearestDriver.homeLocation),
        priceEstimate: computePriceEstimate(user.homeLocation, nearestDriver.homeLocation),
      });

    })).then(distanceDataToHome => {
      const distanceDataToHomeSortedByTime = sortDataByTime(distanceDataToHome);

      routes.going.push(
        generateRoutePiece(nearestDriver.homeLocation, distanceDataToHomeSortedByTime[0].userHomeLocation, 'pickup')
      );

      for (let i = 0; i < distanceDataToHomeSortedByTime.length - 1; i++) {
        routes.going.push(
          generateRoutePiece(distanceDataToHomeSortedByTime[i].userHomeLocation, distanceDataToHomeSortedByTime[i + 1].userHomeLocation, 'pickup')
        );
      }

      const lastUserToPickupId = distanceDataToHomeSortedByTime[ distanceDataToHomeSortedByTime.length - 1 ].userId;
      const lastUserToPickupLocation = distanceDataToHomeSortedByTime[ distanceDataToHomeSortedByTime.length - 1 ].userHomeLocation;

      return Promise.all(region.users.map(user => {

        return Promise.props({
          userId: lastUserToPickupId,
          driverId: nearestDriver.id,
          userWorkLocation: user.workLocation,
          timeEstimate: computeTimeEstimate(lastUserToPickupLocation, user.workLocation),
          priceEstimate: computePriceEstimate(lastUserToPickupLocation, user.workLocation),
        });

      })).then(distanceDataToWork => {
        const distanceDataToWorkSortedByTime = sortDataByTime(distanceDataToHome);

        routes.going.push(
          generateRoutePiece(lastUserToPickupLocation, distanceDataToWorkSortedByTime[0].userWorkLocation, 'dropoff')
        );

        for (let i = 0; i < distanceDataToWorkSortedByTime.length - 1; i++) {
          routes.going.push(
            generateRoutePiece(distanceDataToWorkSortedByTime[i].userWorkLocation, distanceDataToWorkSortedByTime[i + 1].userWorkLocation, 'dropoff')
          );
        }

        const lastUserToDropoffLocation = distanceDataToWorkSortedByTime[ distanceDataToWorkSortedByTime.length - 1 ].userWorkLocation;

        routes.going.push(
          generateRoutePiece(lastUserToDropoffLocation, distanceDataToWorkSortedByTime[0].userWorkLocation, null)
        );
      });

    }).then(() => {
      // TODO Compute routes.returning
    });

  }).then(
    () => Promise.resolve(proposal)
  );
};

const storeProposalOnDb = proposal => {
  return db.storeData({ sectionName: 'proposals', data: proposal });
};

const notifyUsersAboutTheProposal = proposal => {
  // TODO: Send a Push Notification for all proposal.users
};

const computeGroups = () => {
  return computeRegions().then(regions => {
    return getDrivers().then(drivers => {

      return Promise.map(regions, region => {
        return computeProposals(region, drivers);

      }).then(proposals => {

        return Promise.all([
          Promise.map(proposals, storeProposalOnDb),
          Promise.map(proposals, notifyUsersAboutTheProposal),
        ]);

      });

    });
  });
};

module.exports = {
  computeGroups,
};
