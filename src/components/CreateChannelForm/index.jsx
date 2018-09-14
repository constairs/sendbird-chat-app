import React from 'react';
import PropTypes from 'prop-types';

export class CreateChannelForm extends React.Component {
  state = {
    channelName: '',
    coverUrl: '',
    coverFile: '',
    channelData: '',
    customType: '',
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
      this.state.channelName,
      this.state.coverUrl,
      this.state.coverFile,
      this.state.channelData,
      this.state.customType,
    ];
    this.setState({
      channelName: '',
      coverUrl: '',
      coverFile: '',
      channelData: '',
      customType: '',
    });
    this.props.onSubmitForm(formData);
  };

  render() {
    const { channelName, coverUrl, customType } = this.state;
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
          <label htmlFor="customType">
            <span>Custom Type</span>
            <input
              id="customType"
              name="customType"
              value={customType}
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

CreateChannelForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
