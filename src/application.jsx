/* globals window document */
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { AppBody } from './components/AppBody';
import { configureStore, history } from './redux/store';
import { rootSaga } from './redux/sagas';

import './assets/css/styles.css';
import './assets/scss/styles.scss';

export const store = configureStore();
store.runSaga(rootSaga);

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
