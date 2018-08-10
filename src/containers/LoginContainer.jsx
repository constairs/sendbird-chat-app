import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../redux/user/actions';
import { LoginForm } from '../components/LoginForm';

class LoginContainer extends React.Component {
  handleLogin = (data) => {
    this.props.userActions.loginUserRequest(data);
  }

  render() {
    return (
      <div className="page login-page">
        { this.props.user.fetching ? <p>Загрузка...</p> : null }
        <LoginForm onLogin={this.handleLogin} />
        { this.props.user.user ? <p>{this.props.user.user }</p> : null }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export const LoginConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
