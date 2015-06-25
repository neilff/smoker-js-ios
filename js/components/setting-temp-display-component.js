'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableHighlight,
} = React;

var actions = require('../actions/temperature-actions');
var TemperatureStore = require('../stores/temperature-store');

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');

function getStateFromStores() {
  return {
    currentTempSetting: TemperatureStore.getCurrentTemperatureSetting(),
  };
}

var SetTempDisplay = React.createClass({
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

  onNextPress: function() {
    actions.onNextTempDisplay();
  },

  onPrevPress: function() {
    actions.onPrevTempDisplay();
  },

  render: function() {
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          style={ styles.button }
          onPress={ this.onPrevPress }>
          <Text style={[ styles.displayText, styles.btnText ]}>
            &lsaquo;
          </Text>
        </TouchableHighlight>

        <Text style={ styles.displayText }>
          { this.state.currentTempSetting.name }
        </Text>

        <TouchableHighlight
          style={ styles.button }
          onPress={ this.onNextPress }>
          <Text style={[ styles.displayText, styles.btnText ]}>
            &rsaquo;
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  displayText: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: FONTS.SECONDARY,
    color: COLORS.LIGHTGRAY,
    fontWeight: '300',
    textAlign: 'center',
  },
  btnText: {
    fontSize: 26,
    top: -2,
  }
})

module.exports = SetTempDisplay;
