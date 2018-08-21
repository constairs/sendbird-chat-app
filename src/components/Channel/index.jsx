import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ChatBox } from '../ChatBox';

import './index.scss';

export class Channel extends React.Component {
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
        <div className="channel-info">
          <div className="img-place"><img src={this.props.channel.coverUrl ? this.props.channel.coverUrl : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'} alt={name} /><button className="edit-btn" onClick={this.handleEditBtnClick}><FontAwesomeIcon icon={faPen} /></button></div>
          <div>
            <h1 className="channel-name">{name}</h1>
            <p className="channel-users">Online: {participantCount}</p>
            <ul className="users-list">
              {
                this.props.participants.map(cur => (
                  <li key={cur.userId}><div className="img-place"><img src={cur.profileUrl} title={cur.nickname} alt={cur.nickname} /> {cur.connectionStatus === 'online' ? <span className="connection-status online" /> : <span className="connection-status" />}</div></li>
                )
              )
              }
            </ul>
          </div>
          <button onClick={this.handleLeaveBtn}>Покинуть канал</button>
        </div>
        {
          this.props.messages ?
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
  participants: [],
};

Channel.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  onMessageSend: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.any),
  participants: PropTypes.arrayOf(PropTypes.any),
  sendingMessage: PropTypes.bool.isRequired,
};

