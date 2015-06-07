var Flux = require('flux');
var {
  Dispatcher
} = Flux;

const dispatcher = new Dispatcher;

function register(callback) {
  return dispatcher.register(callback);
}

function dispatch(action, data) {
  dispatcher.dispatch({action, data});
}

module.exports = {
  register,
  dispatch,
};
