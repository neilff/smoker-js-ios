var actions = require('../actions/alarm-actions');
var Map = require('immutable').Map;
var EventEmitter = require('eventemitter3');
var register = require('../dispatcher/dispatcher').register;
var assign = require('object-assign');
var util = require('../util/conversion');
var timer = require('../util/timer');

function setDefaultState() {
  return {
    isCounting: false,
    clock: null,
    hours: 0,
    minutes: 0,
    alarm: null,
    timeRemaining: null,
    isComplete: false,
  };
}

var _state = Map(setDefaultState());

const CHANGE_EVENT = 'onAlarmStoreChange';

var AlarmStore = assign({}, EventEmitter.prototype, {
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
    return _state;
  },

  isCounting: function() {
    return _state.get('isCounting');
  },

  isComplete: function() {
    return _state.get('isComplete');
  }
});

AlarmStore.dispatchToken = register(({action, data}) => {

  switch (action) {

    case actions.onAlarmStart:
      _state = _state.set('isCounting', true);

      AlarmStore.emitChange();
      break;

    case actions.onAlarmStop:
      _state = _state.set('isCounting', false);

      AlarmStore.emitChange();
      break;

    /**
     * When alarm is reset, set the alarm to null
     */
    case actions.onAlarmReset:
      _state = _state.merge(setDefaultState());

      AlarmStore.emitChange();
      break;

    /**
     * Set alarm hours
     */
    case actions.onAlarmHourSet:
      _state = _state.set('hours', data);
      var minutes = _state.get('minutes');

      _state = _state.set('alarm', util.timeToMs({
        min: minutes,
        hr: data
      }));

      AlarmStore.emitChange();
      break;

    /**
     * Set alarm minutes
     */
    case actions.onAlarmMinSet:
      _state = _state.set('minutes', data);
      var hours = _state.get('hours');

      _state = _state.set('alarm', util.timeToMs({
        min: data,
        hr: hours
      }));

      AlarmStore.emitChange();
      break;

    case timer.onTimerTick:
      var alarmTime = _state.get('alarm');
      var d = alarmTime ? alarmTime - data + 1000 : null;

      _state = _state.merge({
        clock: data,
        timeRemaining: d,
      });

      AlarmStore.emitChange();
      break;

    case timer.onTimerComplete:
      _state = _state.merge(setDefaultState());
      _state = _state.set('isComplete', true);

      AlarmStore.emitChange();
      break;
  }
});

module.exports = AlarmStore;
