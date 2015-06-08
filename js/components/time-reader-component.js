'use strict';

var React = require('react-native');
var {
  AlertIOS,
  AppRegistry,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;
var R = require('ramda');
var moment = require('moment');
var util = require('../util/conversion');

var actions = require('../actions/alarm-actions');
var AlarmStore = require('../stores/alarm-store');
var TimeSettingBtn = require('./time-setting-btn-component');

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');
var ROUTES = require('../constants/routes');

function getStateFromStores() {
  return {
    alarm: AlarmStore.getAll(),
    isStarted: AlarmStore.isCounting(),
    isComplete: AlarmStore.isComplete()
  };
}

var TimeReader = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    // TemperatureStore.addChangeListener(this._onChange);
    AlarmStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    // TemperatureStore.removeChangeListener(this._onChange);
    AlarmStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  _onTimerStart: function() {
    actions.onAlarmStart(this.state.alarm.get('alarm'));
  },


  _onTimerStop: function() {
    actions.onAlarmStop();
  },

  _onTimerReset: function() {
    actions.onAlarmReset();
  },

  render: function() {
    var clockTime = util.msToTime(this.state.alarm.get('clock'));
    var timeRemaining = this.state.alarm.get('timeRemaining');
    var isStarted = this.state.isStarted;
    var isComplete = this.state.isComplete;
    var startBtn = null;
    var remaining = null;

    if (!isStarted) {
      startBtn = (
        <TouchableOpacity
          activeOpacity="0.5"
          onPress={ this._onTimerStart }>
          <View style={[ styles.btn, styles.btnLeft ]}>
            <Text style={ styles.btnText }>Start</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      startBtn = (
        <TouchableOpacity
          activeOpacity="0.5"
          onPress={ this._onTimerReset }>
          <View style={[ styles.btn, styles.btnLeft ]}>
            <Text style={ styles.btnText }>Reset</Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (timeRemaining) {
      var timeLeft = util.convertMsToTime(timeRemaining);

      remaining = (
        <View style={ styles.remaining }>
          <Text style={ styles.remainingText }>
            { timeLeft.hrs > 0 ? timeLeft.hrs + ' hours, ' : null  }
            { timeLeft.mins > 0 ? timeLeft.mins + ' minutes, ' : null  }
            { timeLeft.secs + ' seconds ' }
            remaining
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={ styles.container }>
        <View style={ styles.body }>
          <View style={ styles.time }>
            <Text style={ styles.primaryTimerText }>
              { clockTime }
            </Text>
          </View>
          <View style={ styles.actionBtns }>
            { startBtn }
            <TouchableOpacity
              activeOpacity={ !isStarted ? 0.75 : 0.5 }
              onPress={ this._onTimerStop }>
              <View style={[ styles.btn, styles.btnRight, !isStarted ? styles.btnDisabled : '' ]}>
                <Text style={ styles.btnText }>Pause</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={ styles.alarmTimeWrapper }>
            <TimeSettingBtn
              topLevelNav={ this.props.topLevelNav }
              alarmTime={ this.state.alarm.get('alarm') }
              isStarted={ isStarted } />
          </View>
          { remaining }
        </View>
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  time: {
    top: 84,
    height: 225,
    alignItems: 'center',
    justifyContent: 'center',
  },
  remaining: {
    top: 100,
  },
  remainingText: {
    fontFamily: FONTS.PRIMARY,
    color: COLORS.WHITE,
    textAlign: 'center',
    fontWeight: '100',
    width: 225,
    fontSize: 18,
  },
  primaryTimerText: {
    fontFamily: FONTS.PRIMARY,
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: 84,
    top: -2,
    letterSpacing: -6,
    fontWeight: '100',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  alarmTimeWrapper: {
    top: 0,
    flexDirection: 'row',
  },
  timeReadText: {
    fontSize: 12,
    fontFamily: FONTS.SECONDARY,
    color: COLORS.LIGHTGRAY,
    fontWeight: '300',
    top: 2,
  },
  text: {
    fontFamily: FONTS.PRIMARY,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  btn: {
    borderWidth: 2,
    borderColor: 'red',
    padding: 10,
    borderRadius: 100,
    height: 75,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'red',
    fontSize: 16,
    fontFamily: FONTS.PRIMARY,
  },
  actionBtns: {
    flex: 1,
    flexDirection: 'row',
    top: 125,
  },
  btnLeft: {
    left: -90,
    flex: 1,
  },
  btnRight: {
    right: -90,
    flex: 1,
  },
  btnDisabled: {
    opacity: 0.75,
  },
  body: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  circle: {
    top: 84,
    borderWidth: 2,
    width: 225,
    height: 225,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = TimeReader;
