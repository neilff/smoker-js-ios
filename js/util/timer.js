var dispatch = require('../dispatcher/dispatcher').dispatch;

var clock = 0;
var offset = 0;
var alarm = null;
var interval = null;

/**
 * When clock ticks
 */
function onTimerTick(clock) {
  dispatch(onTimerTick, clock);
}

/**
 * When the alarm is completed
 */
function onTimerComplete() {
  dispatch(onTimerComplete, true);
}

function calcDelta() {
  var now = Date.now();
  var d = now - offset;
  offset = now;

  return d;
}

function alarmTick() {
  clock = clock + calcDelta();

  if (alarm && clock >= alarm) {
    resetAlarm();
    onTimerTick(clock);
    onTimerComplete();
  } else {
    onTimerTick(clock);
  }
}

function startAlarm(alarmTime) {
  alarm = alarmTime;

  if (!interval) {
    offset = Date.now();
    interval = setInterval(alarmTick, 1);
  }
}

function stopAlarm() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

function resetAlarm() {
  stopAlarm();

  clock = 0;
  offset = 0;
  alarm = null;
  interval = null;
}

module.exports = {
  startAlarm,
  stopAlarm,
  alarmTick,
  resetAlarm,
  onTimerTick,
  onTimerComplete,
};
