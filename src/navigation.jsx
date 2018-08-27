import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LoginContainer } from './containers/LoginContainer/';
import { OpenChannelsContainer } from './containers/OpenChannelsContainer';
import { Banner } from './components/Banner';
import { UserProfileContainer } from './containers/UserProfileContainer';

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
  };
}

function mapStateToPropsRoute(state) {
  return {
    logged: state.persistedUserReducer.logged,
  };
}

const Private = ({ component: Component, logged, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (logged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

Private.propTypes = {
  component: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const PrivateRoute = connect(mapStateToPropsRoute)(Private);

export const Navigator = () => (
  <Switch>
    <Route exact path="/" component={Banner} />
    <Route exact path="/login/" component={LoginContainer} />
    <PrivateRoute component={OpenChannelsContainer} path="/channels/" />
    <PrivateRoute component={UserProfileContainer} path="/profile/" />
  </Switch>
);

export const Navigation = withRouter(connect(mapStateToProps)(Navigator));
