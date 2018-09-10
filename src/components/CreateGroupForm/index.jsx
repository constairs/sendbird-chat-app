import React from 'react';
import PropTypes from 'prop-types';

export class CreateGroupForm extends React.Component {
  state = {
    channelName: '',
    coverUrl: '',
    coverFile: '',
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

  handleFilesLoad = (file) => {
    this.setState({ coverFile: file });
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
    ];
    this.setState({
      channelName: '',
      coverUrl: '',
      coverFile: '',
      channelDistinct: false,
      usersToInvite: [],
    });
    this.props.onSubmitForm(formData);
  };

  render() {
    const {
      channelName, coverUrl, groupUsersInput, usersToInvite, channelDistinct
    } = this.state;
    return (
      <div className="form create-channel-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="channelName">
            <span>Name</span>
            <input
              id="channelName"
              name="channelName"
              value={channelName}
              onChange={this.handleInput}
              type="text"
            />
          </label>
          <label htmlFor="coverUrl">
            <span>Cover Url</span>
            <input
              id="coverUrl"
              name="coverUrl"
              value={coverUrl}
              onChange={this.handleInput}
              type="text"
            />
          </label>
          <label htmlFor="channelDistinct">
            <input
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
            <input
              id="groupUsers"
              name="groupUsersInput"
              value={groupUsersInput}
              onChange={this.handleInput}
              type="text"
              disabled={channelDistinct && usersToInvite.length > 0}
            />
            <button
              className="invite-button"
              onClick={this.handleAddUser}
              type="button"
              disabled={channelDistinct && usersToInvite.length > 0}
            >
                      ок
            </button>
            {usersToInvite.length !== 0 ? (
              <ul className="users-to-invite">
                {usersToInvite.map(item => (
                  <li key={item}>
                    {item}{' '}
                    <button id={item} onClick={this.handleDelUser} type="button">
                            x
                    </button>
                  </li>
                    ))}
              </ul>
              ) : null}
          </label>

          <button disabled={!channelName}>Создать</button>
        </form>
      </div>
    );
  }
}

CreateGroupForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
