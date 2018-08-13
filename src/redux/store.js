import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { rootReducer } from './reducers';

export const history = createBrowserHistory();

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    connectRouter(history)(rootReducer),
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      logger,
      routerMiddleware(history),
      sagaMiddleware
    )
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  store.runSaga = sagaMiddleware.run;
  return store;
}
