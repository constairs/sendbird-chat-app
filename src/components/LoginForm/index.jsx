import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Form = styled.form`
  background-color: rgba(240, 240, 240, 0.377);
  box-shadow: 0 0 15px rgba(0,0,0,.3);
  border-radius: 3px;
  min-width: 300px;
  padding: 40px;
  box-sizing: border-box;
`;

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
      <Form onSubmit={this.handleSubmit}>
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
      </Form>
    );
  }
}
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
