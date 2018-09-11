import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginContainer } from './containers/LoginContainer/';
import { ChannelsConstainer } from './containers/ChannelsContainer';
import { Banner } from './components/Banner';
import { UserProfileContainer } from './containers/UserProfileContainer';

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

Private.defaultProps = {
  logged: false,
};

Private.propTypes = {
  component: PropTypes.func.isRequired,
  logged: PropTypes.bool,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const PrivateRoute = connect(mapStateToPropsRoute)(Private);

export const Navigation = () => (
  <Switch>
    <Route exact path="/" component={Banner} />
    <Route exact path="/login/" component={LoginContainer} />
    <PrivateRoute component={ChannelsConstainer} path="/channels/" />
    <PrivateRoute component={UserProfileContainer} path="/profile/" />
  </Switch>
);
