'use strict';

var React = require('react-native');
var {
  Text,
  PickerIOS,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  View,
  ScrollView,
} = React;
var R = require('ramda');

var TemperatureStore = require('../stores/temperature-store');
var actions = require('../actions/temperature-actions');
var NavButton = require('./nav-btn-component');

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');

var PickerItemIOS = PickerIOS.Item;

var MINIMUM_TEMPERATURES = R.range(1, 500);
var MAXIMUM_TEMPERATURES = R.range(1, 500);

function getStateFromStores() {
  return {
    tempReading: TemperatureStore.getAll()
  };
}

var TempEditor = React.createClass({
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

  onSetLowTemp: function(val) {
    actions.onSetLowTemp(val);
  },

  onSetHighTemp: function(val) {
    actions.onSetHighTemp(val);
  },

  render: function() {
    var type = this.props.type;
    var pickerComponent = null;

    switch (type) {
      case 'LOW':
        pickerComponent = (
          <View style={ styles.flexDiv }>
            <View style={ styles.div }>
              <Text style={ styles.text }>Minimum Temperature Alarm</Text>
            </View>

            <PickerIOS
              selectedValue={ this.state.tempReading.get('lowThreshold') }
              onValueChange={ this.onSetLowTemp }>
              {MINIMUM_TEMPERATURES.map((temp) => {
                return (
                  <PickerItemIOS
                    key={ temp }
                    value={ temp }
                    label={ temp + '℉' }
                    />
                );
              })}
            </PickerIOS>
          </View>
        );
        break;

      case 'HIGH':
        pickerComponent = (
          <View style={ styles.flexDiv }>
            <View style={ styles.div }>
              <Text style={ styles.text }>Maximum Temperature Alarm</Text>
            </View>

            <PickerIOS
              selectedValue={ this.state.tempReading.get('highThreshold') }
              onValueChange={ this.onSetHighTemp }>
              {MAXIMUM_TEMPERATURES.map((temp) => {
                return (
                  <PickerItemIOS
                    key={ temp }
                    value={ temp }
                    label={ temp + '℉' }
                    />
                );
              })}
            </PickerIOS>
          </View>
        );
        break;

      default:
        break;
    }

    return (
      <ScrollView style={ styles.scene }>
        { pickerComponent }

        <NavButton
          onPress={() => {
            this.props.topLevelNav.pop();
          }}
          text="Return"/>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  text: {
    color: COLORS.BLACK,
    fontFamily: FONTS.PRIMARY,
    fontSize: 18,
    textAlign: 'center',
  },
  div: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    backgroundColor: COLORS.LIGHTORANGE,
  },
});

module.exports = TempEditor;
