import React from 'react';
import PropTypes from 'prop-types';

export class UpdateChannelForm extends React.Component {
  state = {
    channelName: '',
    coverUrl: '',
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [this.state.channelName, this.state.coverUrl];
    this.setState({
      channelName: '',
      coverUrl: '',
    });
    this.props.onSubmitForm(formData);
  };

  render() {
    const { channelName, coverUrl } = this.state;
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
          <button disabled={!coverUrl || !channelName}>Изменить</button>
        </form>
      </div>
    );
  }
}

UpdateChannelForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
