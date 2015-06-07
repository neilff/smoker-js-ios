'use strict';

/**
 * Renders the top level navigation for the application. Enabled switching
 * between the editors (temperature and time) and the primary navigation routes.
 *
 * @type {Component}
 */
var React = require('react-native');
var {
  Navigator,
  StatusBarIOS,
  AppRegistry,
  StyleSheet,
  View,
  Text,
} = React;

var onTemperatureReadStart = require('./js/actions/temperature-actions').onTemperatureReadStart;

var COLORS = require('./js/constants/colors');
var FONTS = require('./js/constants/fonts');
var ROUTES = require('./js/constants/routes');

var PrimaryNav = require('./js/components/primary-nav-component');
var TempEditor = require('./js/components/temp-editor-component');
var TimeEditor = require('./js/components/time-editor-component');
var RouteTitle = require('./js/components/route-title-component');
var TempWarning = require('./js/components/temp-warning-component');

(function init() {
  onTemperatureReadStart();
})();

StatusBarIOS.setHidden(true);

var PRIMARY_ROUTE_STACK = [
  {
    id: ROUTES.PRIMARY,
  },
];

var INIT_ROUTE_INDEX = 0;

var App = React.createClass({
  renderScene: function(route, navigator) {
    switch (route.id) {

      // Primary Route
      case ROUTES.PRIMARY:
        return (
          <View style={ styles.appContainer }>
            <TempWarning />
            <RouteTitle
              title="Smoker.js" />
            <PrimaryNav
              topLevelNav={ navigator }
              title={ route.title } />
          </View>
        );

      // Time Editor Route
      case ROUTES.TIME_EDITOR:
        return (
          <View style={ styles.appContainer }>
            <RouteTitle
              backgroundColor={ COLORS.GRAY }
              title="Alarm Settings" />
            <TimeEditor
              topLevelNav={ navigator }
              title={ route.title } />
          </View>
        );

      // Temperature Editor Route
      case ROUTES.TEMP_EDITOR:
        return (
          <View style={ styles.appContainer }>
            <RouteTitle
              backgroundColor={ COLORS.GRAY }
              title="Temperature Settings" />
            <TempEditor
              topLevelNav={ navigator }
              type={ route.type } />
          </View>
        );
    }
  },

  render: function() {
    return(
      <View style={ styles.appContainer }>
        <Navigator
          initialRoute={ PRIMARY_ROUTE_STACK[INIT_ROUTE_INDEX] }
          initialRouteStack={ PRIMARY_ROUTE_STACK }
          renderScene={ this.renderScene }>
        </Navigator>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  appTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    top: 0,
    position: 'absolute',
  },
  appTitleText: {
    fontFamily: FONTS.PRIMARY,
    fontSize: 20,
    color: COLORS.WHITE,
    fontWeight: '100',
  },
});

AppRegistry.registerComponent('SmokerJsLatest', () => App);
