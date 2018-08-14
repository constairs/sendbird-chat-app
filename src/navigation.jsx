import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginContainer } from './containers/LoginContainer/';
import { OpenChannelsContainer } from './containers/OpenChannelsContainer';
import { Banner } from './components/Banner';
import { store } from './application';

export const Navigation = () => (
  <Switch>
    <Route exact path="/" component={Banner} />
    <Route
      exact
      path="/login/"
      props={store}
      component={LoginContainer}
    />
    <Route
      exact
      path="/createChannel"
      props={store}
      component={OpenChannelsContainer}
    />
  </Switch>
);
