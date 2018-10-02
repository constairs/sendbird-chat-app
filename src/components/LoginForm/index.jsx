import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../UI/Button';
import { Form } from '../../components/UI/Form';
import { Input } from '../../components/UI/Input';

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
          <Input
            id="userId"
            name="userId"
            value={userId}
            onChange={this.handleTextInput}
            type="text"
          />
        </label>
        <label htmlFor="userLogin">
          <span>UserNick</span>
          <Input
            id="userNick"
            name="userNick"
            value={userNick}
            onChange={this.handleTextInput}
            type="text"
          />
        </label>
        <Button disabled={!userId}>Login</Button>
      </Form>
    );
  }
}
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
