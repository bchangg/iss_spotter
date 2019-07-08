const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.ipdata.co/${ip}?api-key=test`);
}

const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body);
  const coords = {
    latitude: data.latitude,
    longitude: data.longitude
  }
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      console.log(data);
      const { response } = JSON.parse(data);
      return response;
    });
}

module.exports = { nextISSTimesForMyLocation };