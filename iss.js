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
  request('https://api.ipify.org?format=json', function(error, response, body) {
    
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const jsonOutput = JSON.parse(body); //response it what server responses with
    callback(null, jsonOutput.ip);// Null is passed as a first argument for the error parameter.
    //If null won't be provided, js will treat any first argument as an error.
    
  });
};




module.exports = { fetchMyIP };