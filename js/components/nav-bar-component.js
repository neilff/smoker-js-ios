'use strict';

var React = require('react-native');
var {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

var COLORS = require('../constants/colors');
var FONTS = require('../constants/fonts');

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: props.initTabIndex,
    };
  }

  handleWillFocus(route) {
    var tabIndex = this.props.routeStack.indexOf(route);
    this.setState({ tabIndex, });
  }

  render() {
    return (
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => {
            this.props.onTabIndex(0);
            this.setState({ tabIndex: 0, });
          }}>
          <View
            style={ styles.tabItem }>
            <Text
              style={ styles.tabText }>TEMPERATURE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.onTabIndex(1);
            this.setState({ tabIndex: 1, });
          }}>
          <View
            style={ styles.tabItem }>
            <Text
              style={ styles.tabText }>TIMER</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  tabs: {
    height: 50,
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    fontSize: 32,
    backgroundColor: COLORS.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.SECONDARY,
    fontWeight: '100',
  },
});

module.exports = NavBar;
