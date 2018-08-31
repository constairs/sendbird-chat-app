import React from 'react';
import PropTypes from 'prop-types';

export class CreateGroupForm extends React.Component {
  state = {
    channelName: '',
    coverUrl: '',
    coverFile: '',
    groupUsers: '',
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFilesLoad = (file) => {
    this.setState({ coverFile: file });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [
      [this.state.groupUsers],
      this.state.channelName,
      this.state.coverUrl,
      this.state.coverFile,
    ];
    this.setState({
      channelName: '',
      coverUrl: '',
      coverFile: '',
      groupUsers: '',
    });
    this.props.onSubmitForm(formData);
  };

  render() {
    const { channelName, coverUrl, groupUsers } = this.state;
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

          <label htmlFor="groupUsers">
            <span>Group Users</span>
            <input
              id="groupUsers"
              name="groupUsers"
              value={groupUsers}
              onChange={this.handleInput}
              type="text"
            />
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
