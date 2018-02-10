const {combineReducers} = require('redux');
const {
  reducer: log
} = require('./log.js');

module.exports = combineReducers({
  log
});
