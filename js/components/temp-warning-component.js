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

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');

function getStateFromStores() {
  return {
    isTooLow: TemperatureStore.isTooLow(),
    isTooHigh: TemperatureStore.isTooHigh(),
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

  clearWarning: function() {
    LayoutAnimation.configureNext(animations.layout.spring);

    this.setState({
      height: 10,
    });
  },

  render: function() {
    var isTooHigh = this.state.isTooHigh;
    var isTooLow = this.state.isTooLow;

    LayoutAnimation.configureNext(animations.layout.spring);

    return (
      <TouchableHighlight
        onPress={ this.clearWarning }>
        <View style={[ styles.warningWrapper, {
          height: isTooHigh || isTooLow ? 50 : 0,
          backgroundColor: isTooHigh ? COLORS.RED : COLORS.BLUE
        }]}>
          <Text style={{
            color: isTooHigh ? COLORS.GRAY : COLORS.WHITE
          }}>{ isTooHigh ? 'High Temperature Warning' : 'Low Temperature Warning' }</Text>
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
});

var animations = {
  layout: {
    spring: {
      duration: 750,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
      },
    },
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};

var layoutAnimationConfigs = [
  animations.layout.spring,
  animations.layout.easeInEaseOut,
];

module.exports = TempWarning;
