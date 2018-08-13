import React from 'react';
import PropTypes from 'prop-types';

export class CreateChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: '',
      channelUrl: '',
      coverUrl: '',
      coverFile: '',
      customType: '',
      channelData: '',
      channelOperators: [],
      disabledBtn: true
    };
  }

  handleInput = (e) => {
    const curInput = e.target;
    if (curInput.name === 'channelName') {
      this.setState({ channelName: curInput.value });
    }
    if (curInput.name === 'channelUrl') {
      this.setState({ channelUrl: curInput.value });
    }
    if (curInput.name === 'coverUrl') {
      this.setState({ coverUrl: curInput.value });
    }
    if (curInput.name === 'coverFile') {
      this.setState({ coverFile: curInput.value });
    }
    if (curInput.name === 'customType') {
      this.setState({ customType: curInput.value });
    }
    if (curInput.name === 'channelData') {
      this.setState({ channelData: curInput.value });
    }
    if (curInput.name === 'channelOperators') {
      this.setState({ channelOperators: curInput.value });
    }
    if (this.state.channelName) {
      this.setState({ disabledBtn: false });
    } else {
      this.setState({ disabledBtn: true });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [
      this.state.channelName,
      this.state.channelUrl,
      this.state.coverUrl,
      this.state.coverFile,
      this.state.customType,
      this.state.channelData,
      this.state.channelOperators
    ];
    this.setState({
      channelName: '',
      channelUrl: '',
      coverUrl: '',
      coverFile: undefined,
      customType: '',
      channelData: '',
      channelOperators: [],
      disabledBtn: true
    });
    this.props.onCreateChannel(formData);
  }

  render() {
    return (
      <div className="form create-channel-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="channelName">
            <span>Name</span>
            <input id="channelName" name="channelName" value={this.state.channelName} onChange={this.handleInput} type="text" />
          </label>
          <label htmlFor="channelUrl">
            <span>Channel Url</span>
            <input id="channelUrl" name="channelUrl" value={this.state.channelUrl} onChange={this.handleInput} type="text" />
          </label>
          <label htmlFor="coverUrl">
            <span>Cover Url</span>
            <input id="coverUrl" name="coverUrl" value={this.state.coverUrl} onChange={this.handleInput} type="text" />
          </label>
          <label htmlFor="coverFile">
            <span>Cover File</span>
            <input id="coverFile" name="coverFile" value={this.state.coverFile} onChange={this.handleInput} type="text" />
          </label>
          <label htmlFor="customType">
            <span>Custom Type</span>
            <input id="customType" name="customType" value={this.state.customType} onChange={this.handleInput} type="text" />
          </label>
          <label htmlFor="channelData">
            <span>Channel Data</span>
            <input id="channelData" name="channelData" value={this.state.channelData} onChange={this.handleInput} type="text" />
          </label>
          <label htmlFor="channelOperators">
            <span>Channel Operators</span>
            <input id="channelOperators" name="channelOperators" value={this.state.channelOperators} onChange={this.handleInput} type="text" />
          </label>
          <button disabled={this.state.disabledBtn}>Создать</button>
        </form>
      </div>
    );
  }
}

CreateChannelForm.propTypes = {
  onCreateChannel: PropTypes.func.isRequired
};
