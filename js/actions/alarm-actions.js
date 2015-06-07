var dispatch = require('../dispatcher/dispatcher').dispatch;
var timer = require('../util/timer');

/**
 * Set alarm hours
 */
function onAlarmHourSet(hr) {
  dispatch(onAlarmHourSet, hr);
}

/**
 * Set alarm minutes
 */
function onAlarmMinSet(min) {
  dispatch(onAlarmMinSet, min);
}

/**
 * Start alarm
 */
function onAlarmStart(alarm) {
  timer.startAlarm(alarm);
  dispatch(onAlarmStart, alarm);
}

/**
 * Stop alarm
 */
function onAlarmStop() {
  timer.stopAlarm();
  dispatch(onAlarmStop, true);
}

/**
 * Cancel alarm
 */
function onAlarmReset() {
  timer.resetAlarm();
  dispatch(onAlarmReset, true);
}

module.exports = {
  onAlarmHourSet,
  onAlarmMinSet,
  onAlarmStart,
  onAlarmReset,
  onAlarmStop,
};
