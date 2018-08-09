import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ConnectedLogin } from './containers/ConnectedLogin';
import { Banner } from './components/Banner';

export const Navigation = () => (
  <Switch>
    <Route exact path="/" component={Banner} />
    <Route
      exact
      path="/login/"
      render={() => (
        <ConnectedLogin />
      )}
    />
  </Switch>
);
