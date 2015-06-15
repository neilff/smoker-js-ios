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

var TemperatureStore = require('../stores/temperature-store');
var TempSettingButton = require('./temp-setting-btn-component');
var TempEnabledBtn = require('./temp-enabled-btn-component');

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');
var ROUTES = require('../constants/routes');

function getStateFromStores() {
  return {
    currentColor: 'red',
    tempReading: TemperatureStore.getAll()
  };
}

var TempReader = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TemperatureStore.addChangeListener(this._onChange);
    // AlarmStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TemperatureStore.removeChangeListener(this._onChange);
    // AlarmStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    var topLevelNav = this.props.topLevelNav;

    return (
      <ScrollView style={ styles.container }>
        <View style={ styles.body }>
          <View style={[ styles.circle, {
              borderColor: this.state.currentColor,
            }]}>
            <Text style={ styles.primaryTempText }>
              { this.state.tempReading.get('tempF') + '℉' }
            </Text>
          </View>
          <View style={ styles.tempSettingsWrapper }>
            <View style={ styles.tempSettingLow }>
              <TempSettingButton
                topLevelNav={ topLevelNav }
                type="LOW"
                title="LOW TEMP"
                tempSettingNum={ this.state.tempReading.get('lowThreshold') + '℉' } />
            </View>
            <View style={ styles.tempWatchToggle }>
              <TempEnabledBtn
                isEnabled={ this.state.tempReading.get('alarmEnabled') } />
            </View>
            <View style={ styles.tempSettingHigh }>
              <TempSettingButton
                topLevelNav={ topLevelNav }
                type="HIGH"
                title="HIGH TEMP"
                tempSettingNum={ this.state.tempReading.get('highThreshold') + '℉' } />
            </View>
          </View>
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
  primaryTempText: {
    fontFamily: FONTS.PRIMARY,
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: 75,
    top: -2,
    letterSpacing: -5,
    fontWeight: '100',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  tempSettingsWrapper: {
    top: 125,
    flexDirection: 'row',
  },
  tempSettingText: {
    fontSize: 12,
    fontFamily: FONTS.SECONDARY,
    color: COLORS.LIGHTGRAY,
    fontWeight: '300',
    top: 2,
  },
  tempSettingNum: {
    top: 5,
    fontSize: 32,
    color: COLORS.WHITE,
    fontWeight: '100',
    fontFamily: FONTS.ALT,
  },
  tempSettingLow: {
    left: -48,
  },
  tempSettingHigh: {
    left: 48,
  },
  tempWatchToggle: {
    top: 64,
  },
  tempSettingCircle: {
    borderWidth: 2,
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  tempSettingCircleHigh: {
    borderColor: COLORS.RED,
  },
  tempSettingCircleLow: {
    borderColor: COLORS.BLUE,
  },
  tempSetting: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.PRIMARY,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: 'red',
  },
  body: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  circle: {
    top: 84,
    borderWidth: 2,
    width: 250,
    height: 250,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = TempReader;
