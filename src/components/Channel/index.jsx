import React from 'react';
import PropTypes from 'prop-types';
import { ChatBox } from '../ChatBox';

import './index.scss';

export class Channel extends React.Component {
  componentWillMount() {
    this.props.onGetMessages(this.props.channel.url);
  }

  handleMessageSend = (messageText) => {
    const messageData = [
      this.props.channel.url,
      'MESG',
      this.props.user.userId,
      messageText,
    ];
    this.props.onMessageSend(messageData);
  }


  handleLeaveBtn = () => {
    this.props.onLeave(this.props.channel.url);
  }

  render() {
    const { name, participantCount } = this.props.channel;
    return (
      <div className="channel-item">
        <h1>{name}</h1>
        <p>Online: {participantCount}</p>
        <button onClick={this.handleLeaveBtn}>Покинуть канал</button>
        {this.props.messages ?
          <ChatBox
            messages={this.props.messages}
            onMessageSend={this.handleMessageSend}
            sendingMessage={this.props.sendingMessage}
          />
          :
          null
        }
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
  onLeave: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.any),
  sendingMessage: PropTypes.bool.isRequired
};

