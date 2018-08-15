import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginContainer } from './containers/LoginContainer/';
import { OpenChannelsContainer } from './containers/OpenChannelsContainer';
import { Banner } from './components/Banner';

export const Navigation = () => (
  <Switch>
    <Route exact path="/" component={Banner} />
    <Route
      exact
      path="/login/"
      component={LoginContainer}
    />
    <Route
      exact
      path="/channels"
      component={OpenChannelsContainer}
    />
  </Switch>
);
