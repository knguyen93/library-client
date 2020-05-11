import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import thunkMiddleWare from 'redux-thunk'
import apiMiddleware from './middleware/api'
import loadingMiddleware from './middleware/loading'
import { authenticationMiddlewear } from './middleware/authentication';

const store = createStore(
  reducers,
  applyMiddleware(// allow dispatch function instead of plain object. Acts like Java Filter
    thunkMiddleWare,
    apiMiddleware,
    authenticationMiddlewear,
    loadingMiddleware,
  )
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
