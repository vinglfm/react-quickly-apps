const {handleActions, createAction} = require('redux-actions');

const addLog = createAction('log/ADD_LOG');
const clearLog = createAction('log/CLEAR_LOG');

module.exports = {
  addLog,
  clearLog,
  reducer: handleActions({
    [addLog]: (state, action) => ({
      ...state,
      logs: state.logs.concat(action.payload)
    }),
    [clearLog]: (state) => ({
      ...state,
      logs: []
    })
  }, {logs:[]}),
  getLog: state => state.logs
}
