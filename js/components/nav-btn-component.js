'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableHighlight,
} = React;

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');

var NavButton = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        style={ styles.button }
        underlayColor="#B5B5B5"
        onPress={ this.props.onPress }>
        <Text style={ styles.buttonText }>
          { this.props.text }
        </Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: COLORS.BLUE,
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: FONTS.PRIMARY,
  },
})

module.exports = NavButton;
