import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { Login } from '../components/Login';
import store from '../application';
import * as userActions from '../redux/actions/userActions';

export const LoginContainer = () => (
  <Provider store={store}>
    <Login />
  </Provider>
);

function mapStateToProps(state) {
  return {
    data: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
