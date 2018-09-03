import React from 'react';
import PropTypes from 'prop-types';
import { ChatBox } from '../../containers/ChatBox';
import { addEventHandlers, removeEventHandlers } from '../../services/sendbird';

import './index.scss';

export class Channel extends React.Component {
  componentDidMount() {
    addEventHandlers(this.props.channel);
  }

  componentWillUnmount() {
    removeEventHandlers(this.props.channel);
  }

  handleLeaveBtn = () => {
    this.props.onLeave(this.props.channel.url);
  };

  render() {
    const { name, participantCount, coverUrl } = this.props.channel;
    return (
      <div className="channel-item">
        <div className="channel-header">
          <div className="channel-info">
            <div className="img-place">
              <img
                src={
                  coverUrl ||
                  'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={name}
              />
            </div>
            <div>
              <h1 className="channel-name">{name}</h1>
              <p className="channel-users">Online: {participantCount}</p>
            </div>
          </div>
          <div className="channel-users-list">
            <ul className="users-list">
              {this.props.participants.map((participant, i) => (
                <li
                  style={{ transform: `translateX(calc(${i}*(50%)))` }}
                  key={participant.userId}
                >
                  <div className="img-place">
                    <img
                      src={participant.profileUrl}
                      title={participant.nickname}
                      alt={participant.nickname}
                    />{' '}
                    {participant.connectionStatus === 'online' ? (
                      <span className="connection-status online" />
                    ) : (
                      <span className="connection-status" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ChatBox currentChannel={this.props.channel} />
      </div>
    );
  }
}

Channel.defaultProps = {
  participants: [],
};

Channel.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
  onLeave: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.any),
};
