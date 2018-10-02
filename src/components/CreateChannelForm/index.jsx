import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../UI/Button';
import { Form } from '../../components/UI/Form';
import { Input } from '../../components/UI/Input';

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

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [
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
    });
  };

  render() {
    const { channelName, coverUrl, customType } = this.state;
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

CreateChannelForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
