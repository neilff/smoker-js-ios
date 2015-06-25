var actions = require('../actions/temperature-actions');
var Map = require('immutable').Map;
var EventEmitter = require('eventemitter3');
var register = require('../dispatcher/dispatcher').register;
var assign = require('object-assign');
var util = require('../util/conversion');

var _temperatureState = Map({
  tempK: 0,
  tempC: 0,
  tempF: 0,
  lowThreshold: 220,
  highThreshold: 280,
  alarmEnabled: false,
  lowAlarm: false,
  highAlarm: false,
  tempSettings: [
    {
      name: 'Fahrenheit',
      value: 'tempF',
      symbol: '℉',
    },
    {
      name: 'Celcius',
      value: 'tempC',
      symbol: '℃',
    },
  ],
  currentTempSettingIdx: 0,
});

const CHANGE_EVENT = 'onTemperatureStoreChange';

function getCurrentTemperatureSetting() {
  var idx = _temperatureState.get('currentTempSettingIdx');

  return _temperatureState.get('tempSettings')[idx];
}

function recalibrateThresholds(prevId, currId) {
  var currLowThresh = _temperatureState.get('lowThreshold');
  var currHighThresh = _temperatureState.get('highThreshold');
  var newLowThresh = currLowThresh;
  var newHighThresh = currHighThresh;

  // Convert C to F
  if (prevId === 'tempC' && currId === 'tempF') {
    newLowThresh = util.convertCtoF(currLowThresh);
    newHighThresh = util.convertCtoF(currHighThresh);
  }

  // Convert F to C
  if (prevId === 'tempF' && currId === 'tempC') {
    newLowThresh = util.convertFtoC(currLowThresh);
    newHighThresh = util.convertFtoC(currHighThresh);
  }

  _temperatureState = _temperatureState.merge({
    lowThreshold: newLowThresh,
    highThreshold: newHighThresh,
  });
}

var TemperatureStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _temperatureState;
  },

  isAlarmEnabled: function() {
    return _temperatureState.get('alarmEnabled');
  },

  isTooLow: function() {
    return _temperatureState.get('lowAlarm');
  },

  isTooHigh: function() {
    return _temperatureState.get('highAlarm');
  },

  getCurrentTemperatureSetting: getCurrentTemperatureSetting,

  getCurrentTemperatureReading: function() {
    var tempSetting = getCurrentTemperatureSetting();
    var temp = _temperatureState.get(tempSetting.value);
    var symbol = tempSetting.symbol;

    return temp + symbol;
  },

  getLowTempThreshDisplay: function() {
    var symbol = getCurrentTemperatureSetting().symbol;

    return _temperatureState.get('lowThreshold') + symbol;
  },

  getHighTempThreshDisplay: function() {
    var symbol = getCurrentTemperatureSetting().symbol;

    return _temperatureState.get('highThreshold') + symbol;
  },
});

TemperatureStore.dispatchToken = register(({action, data}) => {
  var val = getCurrentTemperatureSetting().value;

  switch (action) {

    /**
     * When temperature updates arrive in the application
     */
    case actions.onTemperatureUpdated:
      var isTooLow = data[val] < _temperatureState.get('lowThreshold');
      var isTooHigh = data[val] > _temperatureState.get('highThreshold');

      _temperatureState = _temperatureState.merge({
        tempK: data.tempK,
        tempC: data.tempC,
        tempF: data.tempF,
        lowAlarm: isTooLow,
        highAlarm: isTooHigh
      });

      TemperatureStore.emitChange();
      break;

    /**
     * When low temp is modified
     */
    case actions.onSetLowTemp:
      _temperatureState = _temperatureState.set('lowThreshold', data);

      TemperatureStore.emitChange();
      break;

    /**
     * When high temp is modified
     */
    case actions.onSetHighTemp:
      _temperatureState = _temperatureState.set('highThreshold', data);

      TemperatureStore.emitChange();
      break;

    /**
     * When temp warning is toggled
     */
    case actions.onToggleTempWarning:
      var currTempAlarm = _temperatureState.get('alarmEnabled');
      _temperatureState = _temperatureState.set('alarmEnabled', !currTempAlarm);

      TemperatureStore.emitChange();
      break;

    /**
     * Clears the temperature warning
     */
    case actions.onClearTempWarning:
      _temperatureState = _temperatureState.merge({
        lowAlarm: false,
        highAlarm: false,
      });

      TemperatureStore.emitChange();
      break;

    /**
     * Select next temperature setting
     */
    case actions.onNextTempDisplay:
      var prevSettingId = getCurrentTemperatureSetting().value;
      var idx = _temperatureState.get('currentTempSettingIdx');
      var totalOptions = _temperatureState.get('tempSettings').length;
      var inc = idx + 1;

      if (inc >= totalOptions) {
        _temperatureState = _temperatureState.set('currentTempSettingIdx', 0);
      } else {
        _temperatureState = _temperatureState.set('currentTempSettingIdx', inc);
      }

      recalibrateThresholds(prevSettingId, getCurrentTemperatureSetting().value);

      TemperatureStore.emitChange();
      break;

    /**
     * Select previous temperature setting
     */
    case actions.onPrevTempDisplay:
      var prevSettingId = getCurrentTemperatureSetting().value;
      var idx = _temperatureState.get('currentTempSettingIdx');
      var totalOptions = _temperatureState.get('tempSettings').length;
      var dec = idx - 1;

      if (dec < 0) {
        _temperatureState = _temperatureState.set('currentTempSettingIdx', totalOptions - 1);
      } else {
        _temperatureState = _temperatureState.set('currentTempSettingIdx', dec);
      }

      recalibrateThresholds(prevSettingId, getCurrentTemperatureSetting().value);

      TemperatureStore.emitChange();
      break;
  }
});

module.exports = TemperatureStore;
