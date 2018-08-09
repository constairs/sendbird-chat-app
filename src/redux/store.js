import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducers/index';
import { watchLoginUser } from './sagas';

export const history = createBrowserHistory();

export function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    connectRouter(history)(reducer),
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
      )
    )
  );

  sagaMiddleware.run(watchLoginUser);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
