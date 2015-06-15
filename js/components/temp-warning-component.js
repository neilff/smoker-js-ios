'use strict';

var React = require('react-native');
var {
  Text,
  LayoutAnimation,
  StyleSheet,
  TouchableHighlight,
  View,
} = React;
var R = require('ramda');

var TemperatureStore = require('../stores/temperature-store');
var TemperatureActions = require('../actions/temperature-actions');

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');
var ANIMATIONS = require('../constants/animations');

function getStateFromStores() {
  return {
    isTooLow: TemperatureStore.isTooLow(),
    isTooHigh: TemperatureStore.isTooHigh(),
    isAlarmEnabled: TemperatureStore.isAlarmEnabled(),
  };
}

var TempWarning = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TemperatureStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TemperatureStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    var isTooHigh = this.state.isTooHigh;
    var isTooLow = this.state.isTooLow;
    var isAlarmEnabled = this.state.isAlarmEnabled;

    LayoutAnimation.configureNext(ANIMATIONS.layout.spring);

    return (
      <View style={ !isAlarmEnabled ? styles.hidden : styles.visible }>
        <HighWarning visible={ isTooHigh } />
        <LowWarning visible={ isTooLow } />
      </View>
    );
  }
});

var LowWarning = React.createClass({
  clearWarning: function() {
    LayoutAnimation.configureNext(ANIMATIONS.layout.spring);
    TemperatureActions.onClearTempWarning();
  },

  render: function() {
    var visible = this.props.visible;

    return(
      <TouchableHighlight
        onPress={ this.clearWarning }>
        <View style={[ styles.warningWrapper, {
          height: visible ? 50 : 0,
          backgroundColor: COLORS.BLUE,
        }]}>
          <Text style={{
            color: COLORS.WHITE,
            fontFamily: FONTS.PRIMARY,
          }}>Low Temperature Warning</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

var HighWarning = React.createClass({
  clearWarning: function() {
    LayoutAnimation.configureNext(ANIMATIONS.layout.spring);
    TemperatureActions.onClearTempWarning();
  },

  render: function() {
    var visible = this.props.visible;

    return(
      <TouchableHighlight
        onPress={ this.clearWarning }>
        <View style={[ styles.warningWrapper, {
          height: visible ? 50 : 0,
          backgroundColor: COLORS.RED,
        }]}>
          <Text style={{
            color: COLORS.GRAY,
            fontFamily: FONTS.PRIMARY,
          }}>High Temperature Warning</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  warningWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    height: 0,
  }
});

var layoutAnimationConfigs = [
  ANIMATIONS.layout.spring,
  ANIMATIONS.layout.easeInEaseOut,
];

module.exports = TempWarning;
