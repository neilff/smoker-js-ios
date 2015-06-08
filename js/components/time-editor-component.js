'use strict';

var React = require('react-native');
var {
  Text,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  ScrollView,
  PickerIOS,
  View,
} = React;
var R = require('ramda');

var actions = require('../actions/alarm-actions');
var AlarmStore = require('../stores/alarm-store');
var NavButton = require('./nav-btn-component');

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');

var PickerItemIOS = PickerIOS.Item;

var HOURS = R.range(0, 24);
var MINUTES = R.range(0, 60);

function getStateFromStores() {
  return {
    alarm: AlarmStore.getAll(),
  };
}

var TimeEditor = React.createClass ({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    AlarmStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AlarmStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  onAlarmHourSet: function(val) {
    actions.onAlarmHourSet(val);
  },

  onAlarmMinSet: function(val) {
    actions.onAlarmMinSet(val);
  },

  render: function() {
    return (
      <ScrollView style={ styles.scene }>
        <View style={ styles.div }>
          <Text style={ styles.text }>Set Alarm</Text>
        </View>

        <View style={ styles.pickerWrapper }>
          <PickerIOS
            style={[ styles.picker, styles.pickerLeft ]}
            selectedValue={ this.state.alarm.get('hours') }
            onValueChange={ this.onAlarmHourSet }>
            {HOURS.map((hr) => {
              return (
                <PickerItemIOS
                  key={ hr }
                  value={ hr }
                  label={ hr + ' hours' }
                  />
              );
            })}
          </PickerIOS>

          <PickerIOS
            style={[ styles.picker, styles.pickerRight ]}
            selectedValue={ this.state.alarm.get('minutes') }
            onValueChange={ this.onAlarmMinSet }>
            {MINUTES.map((min) => {
              return (
                <PickerItemIOS
                  key={ min }
                  value={ min }
                  label={ min + ' mins' }
                  />
              );
            })}
          </PickerIOS>
        </View>

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
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  scene: {
    flex: 1,
    backgroundColor: COLORS.LIGHTERGRAY,
  },
});

module.exports = TimeEditor;
