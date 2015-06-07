var dispatch = require('../dispatcher/dispatcher').dispatch;

window.navigator.userAgent = 'react-native';

var io = require('../../node_modules/socket.io/node_modules/socket.io-client/socket.io');
var socket = io('http://192.168.0.17:8080', {jsonp: false});

/**
 * Initializes the temperature read from the websocket service
 */
function onTemperatureReadStart() {
  socket.on('onTempUpdate', onTemperatureUpdated);
}

/**
 * Updates the temperature store when a new reading arrives in the application
 */
function onTemperatureUpdated(tempReading) {
  dispatch(onTemperatureUpdated, tempReading);
}

/**
 * Toggles the temperature warning on / off
 */
function onToggleTempWarning() {
  dispatch(onToggleTempWarning, null);
}

/**
 * Sets the warning low temperature
 */
function onSetLowTemp(temp) {
  dispatch(onSetLowTemp, temp);
}

/**
 * Sets the warning high temperature
 */
function onSetHighTemp(temp) {
  dispatch(onSetHighTemp, temp);
}

module.exports = {
  onTemperatureUpdated,
  onTemperatureReadStart,
  onToggleTempWarning,
  onSetLowTemp,
  onSetHighTemp,
};
