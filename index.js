// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP("162.245.144.188", (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned Coords:', data);
// });

// fetchISSFlyOverTimes({ latitude: 0, longitude: 0 }, (error, data) => {
//   if (error) {
//     console.log("It didn't work!\n", error);
//     return;
//   }
//   console.log('It worked!\nReturned Passover Information:\n', data);
// });