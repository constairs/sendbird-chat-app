import React from 'react';
import PropTypes from 'prop-types';
import { UsersToInvite } from '../UI/UsersToInvite';
import { Button } from '../UI/Button';
import { Form } from '../UI/Form';
import { Input } from '../../components/UI/Input';

export class CreateGroupForm extends React.Component {
  state = {
    channelName: '',
    coverUrl: '',
    coverFile: '',
    channelData: '',
    customType: '',
    groupUsersInput: '',
    channelDistinct: false,
    usersToInvite: [],
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleCheckbox = () => {
    this.setState({ channelDistinct: !this.state.channelDistinct });
  };

  handleAddUser = () => {
    this.setState({
      usersToInvite: [...this.state.usersToInvite, this.state.groupUsersInput],
      groupUsersInput: '',
    });
  };

  handleDelUser = (e) => {
    this.setState({
      usersToInvite: this.state.usersToInvite.filter(userId => userId !== e.target.id),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [
      this.state.usersToInvite,
      this.state.channelDistinct,
      this.state.channelName,
      this.state.coverUrl,
      this.state.coverFile,
      this.state.channelData,
      this.state.customType,
    ];
    this.props.onSubmitForm(formData);
    this.setState({
      channelName: '',
      coverUrl: '',
      coverFile: '',
      channelData: '',
      customType: '',
      channelDistinct: false,
      usersToInvite: [],
    });
  };

  render() {
    const {
      channelName,
      coverUrl,
      groupUsersInput,
      usersToInvite,
      channelDistinct,
      customType
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor="channelName">
          <span>Name</span>
          <Input
            id="channelName"
            name="channelName"
            value={channelName}
            onChange={this.handleInput}
            type="text"
          />
        </label>
        <label htmlFor="coverUrl">
          <span>Cover Url</span>
          <Input
            id="coverUrl"
            name="coverUrl"
            value={coverUrl}
            onChange={this.handleInput}
            type="text"
          />
        </label>
        <label htmlFor="channelDistinct">
          <Input
            type="checkbox"
            id="channelDistinct"
            name="channelDistinct"
            value={channelDistinct}
            onChange={this.handleCheckbox}
          />
            1-to-1 chat
        </label>
        <label
          htmlFor="groupUsersInput"
          className="groupUsers"
          disabled={channelDistinct && usersToInvite.length > 0}
        >
          <span>Group Users</span>
          <Input
            id="groupUsers"
            name="groupUsersInput"
            value={groupUsersInput}
            onChange={this.handleInput}
            type="text"
            disabled={channelDistinct && usersToInvite.length > 0}
          />
          <Button
            className="invite-button"
            onClick={this.handleAddUser}
            type="button"
            disabled={channelDistinct && usersToInvite.length > 0}
          >
                      ок
          </Button>
          {usersToInvite.length !== 0 ? (
            <UsersToInvite>
              {usersToInvite.map(item => (
                <li key={item}>
                  {item}{' '}
                  <Button id={item} onClick={this.handleDelUser} type="button">
                      x
                  </Button>
                </li>
                    ))}
            </UsersToInvite>
              ) : null}
        </label>
        <label htmlFor="customType">
          <span>Custom Type</span>
          <Input
            id="customType"
            name="customType"
            value={customType}
            onChange={this.handleInput}
            type="text"
          />
        </label>
        <Button disabled={!channelName}>Создать</Button>
      </Form>
    );
  }
}

CreateGroupForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
