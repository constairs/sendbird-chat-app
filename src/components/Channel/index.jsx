import React from 'react';
import PropTypes from 'prop-types';
import { ChatBox } from '../ChatBox';

import './index.scss';

export class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  componentDidMount() {
    this.props.onGetMessages(this.props.channel.url);
  }

  handleTextInput = (e) => {
    this.setState({ message: e.target.value });
  }

  updateChannelChat = () => {
    this.props.onUpdateChannelChat(this.props.channel.url);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const messageData = [
      this.props.channel.url,
      'MESG',
      this.props.user.userId,
      this.state.message,
    ];
    this.props.onMessageSend(messageData);
  }

  render() {
    const { name, participantCount } = this.props.channel;
    return (
      <div className="channel-item">
        <h1>{name}</h1>
        <p>{participantCount}</p>
        {this.props.messages ?
          <ChatBox messages={this.props.messages} onUpdateChat={this.updateChannelChat} />
          :
          null
        }
        <form className="chat-message-form" onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleTextInput} value={this.state.message} />
          <button className="send-message-btn">Отправить</button>
        </form>
      </div>
    );
  }
}

Channel.defaultProps = {
  messages: [],
};

Channel.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  onGetMessages: PropTypes.func.isRequired,
  onMessageSend: PropTypes.func.isRequired,
  onUpdateChannelChat: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.any)
};

