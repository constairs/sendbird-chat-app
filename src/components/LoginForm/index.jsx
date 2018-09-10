import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export class LoginForm extends React.Component {
  state = {
    userId: '',
    userNick: '',
  };

  handleTextInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userId: this.state.userId,
      userNick: this.state.userNick,
    };
    this.setState({ userId: '', userNick: '' });
    this.props.onLogin(formData);
  };

  render() {
    const { userId, userNick } = this.state;
    return (
      <div className="form login-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userId">
            <span>UserId</span>
              <input
                id="userId"
                name="userId"
                value={userId}
                onChange={this.handleTextInput}
                type="text"
              />
          </label>
            <label htmlFor="userLogin">
              <span>UserNick</span>
                <input
                  id="userNick"
                  name="userNick"
                  value={userNick}
                  onChange={this.handleTextInput}
                  type="text"
                />
            </label>
              <button disabled={!userId}>Login</button>
        </form>
      </div>
    );
  }
}
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
