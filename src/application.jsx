/* globals window document */
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { Navigation } from './navigation';
import { Header } from './components/Header';
import { configureStore, history } from './redux/store';
import { rootSaga } from './redux/sagas';

import './assets/css/styles.css';
import './assets/scss/styles.scss';

export const store = configureStore();
store.store.runSaga(rootSaga);

export const Application = hot(module)(() => (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <React.Fragment>
        <ConnectedRouter history={history}>
          <Router>
            <div>
              <Header />
              <Navigation />
            </div>
          </Router>
        </ConnectedRouter>
      </React.Fragment>
    </PersistGate>
  </Provider>
));
