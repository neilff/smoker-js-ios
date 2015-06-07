'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = React;

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');

class RouteTitle extends React.Component {
  render() {
    var backgroundColor = this.props.backgroundColor || COLORS.BLACK;

    return (
      <View style={[ styles.routeTitle, {
        backgroundColor: backgroundColor
      }]}>
        <Text style={ styles.routeTitleText }>{ this.props.title }</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  routeTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  routeTitleText: {
    fontFamily: FONTS.SECONDARY,
    fontSize: 20,
    color: COLORS.WHITE,
    fontWeight: '100',
  },
});

module.exports = RouteTitle;
