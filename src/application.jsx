/* globals window document */
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
// import { configureStore, history } from './redux/store';
import { AppBody } from './components/AppBody';

import { reducer } from './redux/reducers/index';
import { watchLoginUser } from './redux/sagas';

import './assets/css/styles.css';
import './assets/scss/styles.scss';

const history = createBrowserHistory();
// const store = configureStore();
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  connectRouter(history)(reducer),
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      logger
    )
  )
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./redux/reducers', () => {
    const nextRootReducer = require('./redux/reducers/');
    store.replaceReducer(nextRootReducer);
  });
}

sagaMiddleware.run(watchLoginUser);

export const Application = hot(module)(() => (
  <Provider store={store}>
    <React.Fragment>
      <ConnectedRouter history={history} >
        <Router>
          <AppBody />
        </Router>
      </ConnectedRouter>
    </React.Fragment>
  </Provider>
));
