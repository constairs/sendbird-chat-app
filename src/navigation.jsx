import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoginContainer } from './containers/LoginContainer/';
import { OpenChannelsContainer } from './containers/OpenChannelsContainer';
import { Banner } from './components/Banner';
import { UserProfileContainer } from './containers/UserProfileContainer';
import { checkLogin } from './utils/checkLogin';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      checkLogin().userName ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any),
};

PrivateRoute.defaultProps = {
  location: {}
};

export const Navigation = () => (
  <Switch>
    <Route exact path="/" component={Banner} />
    <Route
      exact
      path="/login/"
      component={LoginContainer}
    />
    <PrivateRoute component={OpenChannelsContainer} path="/channels/" />
    <PrivateRoute component={UserProfileContainer} path="/profile/" />
  </Switch>
);
