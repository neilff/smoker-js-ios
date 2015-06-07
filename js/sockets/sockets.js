window.navigator.userAgent = 'react-native';

var onTemperatureUpdated = require('../actions/temperature-actions').onTemperatureUpdated;
// var io = require('../../node_modules/socket.io/node_modules/socket.io-client/socket.io');

// var socket = io('http://localhost:8080', {jsonp: false});

function init() {
  // onTemperatureUpdated({
  //   id: 1234
  // });
  // socket.on('onTempUpdate', onTemperatureUpdated);
}

module.exports = {
  init,
};
