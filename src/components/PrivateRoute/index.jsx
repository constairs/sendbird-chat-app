import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        fakeAuth.isLogged ? (
          <Component {...props} />
        )
        :
        (
          <Redirect to={{
              pathname: '/login/',
              state: { from: props.location }
            }}
          />
        )
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  fakeAuth: PropTypes.bool.isRequired,
};
