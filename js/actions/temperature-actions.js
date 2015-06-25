var dispatch = require('../dispatcher/dispatcher').dispatch;

window.navigator.userAgent = 'react-native';

var io = require('../../node_modules/socket.io/node_modules/socket.io-client/socket.io');

var socket = io('http://localhost:8080', {
  'jsonp': false,
});

socket.on('connect_error', function() {
  console.log('Connection Error');
});

socket.on('connect', function() {
  console.log('Connected');
});

socket.on('disconnect', function() {
  console.log('Disconnected');
});

socket.on('error', function() {
  console.log('Error');
});

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
 * Clear any current temperature warning
 */
function onClearTempWarning() {
  dispatch(onClearTempWarning, null);
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

/**
 * Goto the next temperature display mode
 */
function onNextTempDisplay() {
  dispatch(onNextTempDisplay, null);
}

/**
 * Goto the previous temperature display mode
 */
function onPrevTempDisplay() {
  dispatch(onPrevTempDisplay, null);
}

module.exports = {
  onTemperatureUpdated,
  onTemperatureReadStart,
  onToggleTempWarning,
  onClearTempWarning,
  onSetLowTemp,
  onSetHighTemp,
  onNextTempDisplay,
  onPrevTempDisplay,
};
