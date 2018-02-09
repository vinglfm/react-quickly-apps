const {combineReducers} = require('redux');
const {
  reducer: logs
} = require('./log.js');

module.exports = combineReducers({
  logs
});
