'use strict';

var React = require('react-native');
var {
  Navigator,
  AppRegistry,
  PixelRatio,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  View,
} = React;

var COLORS = require('../constants/colors');
var ROUTES = require('../constants/routes');

var NavBar = require('./nav-bar-component');
var TempReader = require('./temp-reader-component');
var TimeReader = require('./time-reader-component');

var ROUTE_STACK = [
  {
    id: ROUTES.TEMP_READER,
    title: 'Temp Reader'
  },
  {
    id: ROUTES.TIME_READER,
    title: 'Time Reader'
  },
];

var INIT_ROUTE_INDEX = 1;

/**
 * This component contains the navigator for the primary content, the temp
 * reader and the time editor.
 */
var PrimaryNav = React.createClass({
  renderScene: function(route, navigator) {
    var topLevelNav = this.props.topLevelNav;

    switch(route.id) {

      // Temperature Reader Route
      case ROUTES.TEMP_READER:
        return (
          <TempReader
            topLevelNav={ topLevelNav } />
        );

      // Time Reader Route
      case ROUTES.TIME_READER:
        return (
          <TimeReader
            topLevelNav={ topLevelNav } />
        );
    }
  },

  render: function() {
    return (
      <Navigator
        debugOverlay={true}
        style={ styles.appContainer }
        ref={(navigator) => {
          this._navigator = navigator;
        }}
        initialRoute={ ROUTE_STACK[INIT_ROUTE_INDEX] }
        initialRouteStack={ ROUTE_STACK }
        renderScene={ this.renderScene }
        configureScene={() => ({
          ...Navigator.SceneConfigs.HorizontalSwipeJump,
        })}
        navigationBar={
          <NavBar
            ref={(navBar) => { this.navBar = navBar; }}
            initTabIndex={ INIT_ROUTE_INDEX }
            routeStack={ ROUTE_STACK }
            onTabIndex={(index) => {
              this._navigator.jumpTo(ROUTE_STACK[index]);
            }}
          />
        }
      />
    );
  },
});

var styles = StyleSheet.create({
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
  appContainer: {
    overflow: 'hidden',
    backgroundColor: COLORS.BLACK,
    flex: 1,
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

module.exports = PrimaryNav;
