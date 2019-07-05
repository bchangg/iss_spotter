const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Reponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.ipdata.co/${ip}?api-key=test`, (error, response, body) => {
    const data = JSON.parse(body);
    const coordinates = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordintes for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(error, coordinates);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};