// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    return console.log("It didn't work!", error);
  }
  for(let pass of passTimes) {
    const datetime = new Date(8);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
});

