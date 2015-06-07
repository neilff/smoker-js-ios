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
var util = require('../util/conversion');

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');
var ROUTES = require('../constants/routes');

var TimeSettingBtn = React.createClass({
  _onViewEdit: function(id, type) {
    if (this.props.isStarted) {
      return;
    }

    this.props.topLevelNav.push({
      id: id,
      type: type
    });
  },

  render: function() {
    var alarmTime = util.msToTimeShort(this.props.alarmTime);
    var isStarted = this.props.isStarted;
    var circleClasses = isStarted ?
      [ styles.timeCircle, styles.timeCircleFilled ] :
      [ styles.timeCircle ];

    return (
      <TouchableOpacity
        activeOpacity={ isStarted ? '1' : '0.5' }
        onPress={ R.partial(this._onViewEdit, ROUTES.TIME_EDITOR, 'ALARM') }>
        <View style={ styles.timeRead }>
          <View style={ circleClasses }></View>
          <Text style={ styles.timeReadText }>ALARM TIME</Text>
          <Text style={ styles.timeReadNum }>
            { alarmTime }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  timeReadText: {
    fontSize: 12,
    fontFamily: FONTS.SECONDARY,
    color: COLORS.LIGHTGRAY,
    fontWeight: '300',
    top: 2,
  },
  timeReadNum: {
    top: 5,
    fontSize: 32,
    color: COLORS.WHITE,
    fontWeight: '100',
    fontFamily: FONTS.ALT,
  },
  timeCircle: {
    borderWidth: 2,
    width: 10,
    height: 10,
    borderRadius: 100,
    borderColor: COLORS.BLUE,
  },
  timeCircleFilled: {
    backgroundColor: COLORS.BLUE,
  },
  timeRead: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = TimeSettingBtn;
