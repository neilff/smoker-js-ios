'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;
var R = require('ramda');

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');
var ROUTES = require('../constants/routes');

class TempSettingBtn extends React.Component {
  _onViewEdit(id, type) {
    this.props.topLevelNav.push({
      id: id,
      type: type
    });
  }

  render() {
    var componentType = this.props.type; // HIGH or LOW
    var circleType = componentType === 'HIGH' ?
      'tempSettingCircleHigh' : 'tempSettingCircleLow';

    return (
      <TouchableOpacity
        activeOpacity="0.5"
        onPress={ R.partial(this._onViewEdit, ROUTES.TEMP_EDITOR, componentType).bind(this) }>
        <View style={[ styles.tempSetting ]}>
          <View style={[ styles.tempSettingCircle, styles[circleType] ]}></View>
          <Text style={ styles.tempSettingText }>{ this.props.title }</Text>
          <Text style={ styles.tempSettingNum }>{ this.props.tempSettingNum }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  tempSettingsWrapper: {
    top: 150,
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
});

module.exports = TempSettingBtn;
