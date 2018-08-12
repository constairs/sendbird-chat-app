import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LoginContainer } from './containers/LoginContainer/';
import { OpenChannelContainer } from './containers/OpenChannelContainer';
import { Banner } from './components/Banner';
import { store } from './application';

export const Navigation = () => (
  <Switch>
    <Route exact path="/" component={Banner} />
    <Route
      exact
      path="/login/"
      render={() => (
        <Provider store={store}>
          <LoginContainer />
        </Provider>
      )}
    />
    <Route
      exact
      path="/createChannel"
      render={() => (
        <Provider store={store}>
          <OpenChannelContainer />
        </Provider>
      )}
    />
  </Switch>
);
