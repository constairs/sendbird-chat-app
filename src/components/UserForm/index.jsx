import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../UI/Button';
import { Form } from '../../components/UI/Form';
import { Input } from '../../components/UI/Input';

export class UserForm extends React.Component {
  state = {
    userImg: '',
    userNick: '',
  };

  handleTextInput = (e) => {
    if (e.target.name === 'userNick') {
      this.setState({ userNick: e.target.value });
    }
    if (e.target.name === 'userImg') {
      this.setState({ userImg: e.target.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [this.state.userNick, this.state.userImg];
    this.setState({ userNick: '', userImg: '' });
    this.props.onChangeProfile(formData);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor="userNick">
          <span>UserNick</span>
          <Input
            id="userNick"
            name="userNick"
            value={this.state.userNick}
            onChange={this.handleTextInput}
            type="text"
          />
        </label>
        <label htmlFor="userImg">
          <span>Cover image</span>
          <Input
            id="userImg"
            name="userImg"
            value={this.state.userImg}
            onChange={this.handleTextInput}
            type="text"
          />
        </label>
        <Button disabled={!this.state.userNick}>Change</Button>
      </Form>
    );
  }
}

UserForm.propTypes = {
  onChangeProfile: PropTypes.func.isRequired,
};
