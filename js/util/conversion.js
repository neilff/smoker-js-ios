function leftPad(number, targetLength) {
  var output = number + '';

  while (output.length < targetLength) {
   output = '0' + output;
  }

  return output;
}

function convertMsToTime(s) {
  var time = {
    hrs: 0,
    mins: 0,
    secs: 0
  };

  if (!s) {
    return time;
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;

  time.secs = s % 60;
  s = (s - time.secs) / 60;

  time.mins = s % 60;
  time.hrs = (s - time.mins) / 60;

  return time;
}

function msToTime(s) {
  var time = convertMsToTime(s);
  return leftPad(time.hrs, 2) + ':' + leftPad(time.mins, 2) + ':' + leftPad(time.secs, 2);
}

function msToTimeShort(s) {
  var time = convertMsToTime(s);
  return leftPad(time.hrs, 2) + ':' + leftPad(time.mins, 2);
}

function timeToMs(time) {
  var minAsMs = time.min * 60000;
  var hrAsMs = time.hr * 3600000;
  return minAsMs + hrAsMs;
}

module.exports = {
  leftPad,
  convertMsToTime,
  msToTime,
  msToTimeShort,
  timeToMs,
};
