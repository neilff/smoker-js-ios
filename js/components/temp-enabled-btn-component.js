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
var actions = require('../actions/temperature-actions');

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');

var TempEnabledBtn = React.createClass({
  onToggle: function() {
    actions.onClearTempWarning();
    actions.onToggleTempWarning();
  },

  render: function() {
    var isEnabled = this.props.isEnabled;
    var circleType = isEnabled ? 'tempCircleOn' : 'tempCircleOff';

    return (
      <TouchableOpacity
        activeOpacity="0.5"
        onPress={ this.onToggle }>
        <View style={ styles.tempEnabled }>
          <View style={[ styles.tempSettingCircle, styles[circleType] ]}></View>
          <Text style={ styles.text }>
            ALARM
          </Text>
          <Text style={ styles.largeText }>
            {  isEnabled ? 'ON' : 'OFF' }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontFamily: FONTS.SECONDARY,
    color: COLORS.LIGHTGRAY,
    fontWeight: '300',
    top: 2,
  },
  largeText: {
    top: 5,
    fontSize: 28,
    color: COLORS.WHITE,
    fontWeight: '100',
    fontFamily: FONTS.ALT,
  },
  tempSettingCircle: {
    borderWidth: 2,
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  tempCircleOn: {
    borderColor: COLORS.LIGHTGRAY,
    backgroundColor: COLORS.LIGHTGRAY,
  },
  tempCircleOff: {
    borderColor: COLORS.LIGHTGRAY,
  },
  tempEnabled: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = TempEnabledBtn;
