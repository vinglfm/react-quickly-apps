const React = require('react');
const ReactDOM = require('react-dom');
const {BrowserRouter} = require('react-router-dom');
const {Provider} = require('react-redux');
const {createStore} = require('redux');
const reducers = require('./src/flow/reducers.js');
const App = require('App');

require('bootstrap/dist/css/bootstrap.min.css');
require('./app.css');

ReactDOM.render(
  (<Provider store={createStore(reducers)}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>),
  document.getElementById('timer-app')
)
