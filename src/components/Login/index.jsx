import React from 'react';
import { LoginForm } from '../LoginForm';

import './index.css';

export class Login extends React.Component {
  handleLogin = (data) => {
    this.props.userActions.loginUserRequest(data);
  }

  render() {
    // const { nickname, isActive } = this.props.data.user;
    return (
      <div>
        <LoginForm onLogin={this.handleLogin} />
      </div>
    );
  }
}
