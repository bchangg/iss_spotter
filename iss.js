const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Reponse: ${body}`), null);
    }
    const ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.ipdata.co/${ip}?api-key=test`, (error, response, body) => {
    const data = JSON.parse(body);
    const coordinates = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
    }
    callback(error, coordinates);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
    }
    const passoverInfo = JSON.parse(body).response;
    callback(error, passoverInfo);
  });
};


const nextISSTimesForMyLocation = () => {
  // empty for now
  let promiseToFetchMyIP = () => {
    return new Promise((resolve, reject) => {
      fetchMyIP((error, ip) => {
        if (error) {
          reject(error);
        } else {
          resolve(ip);
        }
      });
    });
  }
  let promiseToFetchCoordsByIP = (ip) => {
    return new Promise((resolve, reject) => {
      fetchCoordsByIP(ip, (error, coordinates) => {
        if (error) {
          reject(error);
        } else {
          resolve(coordinates);
        }
      });
    });
  }
  let promiseToFetchISSFlyOverTimes = (coordinates) => {
    return new Promise((resolve, reject) => {
      fetchISSFlyOverTimes(coordinates, (error, passoverInfo) => {
        if (error) {
          reject(error);
        } else {
          resolve(passoverInfo);
        }
      });
    });
  }
  return [promiseToFetchMyIP, promiseToFetchCoordsByIP, promiseToFetchISSFlyOverTimes];
}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};