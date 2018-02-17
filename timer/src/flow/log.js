const {handleActions, createAction} = require('redux-actions');

const addLog = createAction('log/ADD_LOG');
const fetchLog = createAction('log/FETCH_LOG');
const clearLog = createAction('log/CLEAR_LOG');

module.exports = {
  addLog,
  clearLog,
  fetchLog,
  reducer: handleActions({
    [addLog]: (state, action) => {
      return {...state,
        logs: state.logs.concat({'text':action.payload})
      };
    },
    [clearLog]: (state) => {
      return {...state, logs: []};
    },
    [fetchLog]: (state, action) => {
      return {...state, logs: action.payload.concat(state.logs)};
    }
  }, {logs:[]})
}
