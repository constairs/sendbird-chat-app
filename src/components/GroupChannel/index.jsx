import React from 'react';
import PropTypes from 'prop-types';
import { ChatBox } from '../../containers/ChatBox';
import { addEventHandlers, removeEventHandlers } from '../../services/sendbird';

export class GroupChannel extends React.Component {
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
    const { channel } = this.props;
    return (
      <div className="channel-item">
        <div className="channel-header">
          <div className="channel-info">
            <div className="img-place">
              <img
                src={
                  channel.coverUrl ||
                  'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={channel.name}
              />
            </div>
            <div>
              <h1 className="channel-name">{channel.name}</h1>
              <p className="channel-users">Участники: {channel.memberCount}</p>
            </div>
          </div>
          <div className="channel-users-list">
            <ul className="users-list">
              {channel.members.map((cur, i) => (
                <li
                  style={{ transform: `translateX(calc(${i}*(50%)))` }}
                  key={cur.userId}
                >
                  <div className="img-place">
                    <img
                      src={cur.profileUrl}
                      title={cur.nickname}
                      alt={cur.nickname}
                    />{' '}
                    {cur.connectionStatus === 'online' ? (
                      <span className="connection-status online" />
                    ) : (
                      <span className="connection-status" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* <button onClick={this.handleLeaveBtn}>Покинуть канал</button> */}
        </div>
        <ChatBox currentChannel={channel} />
      </div>
    );
  }
}

GroupChannel.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
  onLeave: PropTypes.func.isRequired,
};
