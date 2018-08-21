import React from 'react';
import PropTypes from 'prop-types';

export class UpdateChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: '',
      coverUrl: '',
    };
  }

  handleInput = (e) => {
    const curInput = e.target;
    const curName = curInput.name;
    const curValue = curInput.value;
    this.setState({ [curName]: curValue });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [
      this.state.channelName,
      this.state.coverUrl,
    ];
    this.setState({
      channelName: '',
      coverUrl: '',
    });
    this.props.onSubmitForm(formData);
  }

  render() {
    return (
      <div className="form create-channel-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="channelName">
            <span>Name</span>
            <input id="channelName" name="channelName" value={this.state.channelName} onChange={this.handleInput} type="text" />
          </label>
          <label htmlFor="coverUrl">
            <span>Cover Url</span>
            <input id="coverUrl" name="coverUrl" value={this.state.coverUrl} onChange={this.handleInput} type="text" />
          </label>
          <button >Изменить</button>
        </form>
      </div>
    );
  }
}

UpdateChannelForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired
};
