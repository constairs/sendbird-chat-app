import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LoginContainer } from './containers/LoginContainer/';
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
  </Switch>
);
