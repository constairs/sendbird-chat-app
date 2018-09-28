import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ItemBtn } from './index.styles';
import { InviteForm } from '../InviteForm';

export class ChannelListItem extends React.Component {
  state = {
    inviteForm: false,
  };

  handleItemClick = () => {
    this.props.selectedChan({
      channelUrl: this.props.channelItem.url,
      channelType: this.props.channelItem.channelType,
    });
  };

  handleInviteClick = () => {
    this.setState({ inviteForm: !this.state.inviteForm });
  };

  handleLeaveClick = () => {
    this.props.onLeave({
      channelUrl: this.props.channelItem.url,
      channelType: this.props.channelItem.channelType
    });
  };

  handleInviteUsers = (e) => {
    e.preventDefault();
    this.props.onInviteUsers([this.props.channelItem.url, this.state.usersToInvite]);
  };

  render() {
    const { channelItem, isActive } = this.props;
    const { inviteForm } = this.state;
    return (
      <ListItem>
        <ItemBtn isActive={isActive} custom={channelItem.customType} onClick={this.handleItemClick}>
          <div className="channel-info">
            <span className="img">
              <img
                src={
                  channelItem.coverUrl || 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={channelItem.name}
              />
              {channelItem.unreadMessageCount > 0 ? <span className="unread-count">{channelItem.unreadMessageCount}</span> : null }
            </span>
            <span className="channel-item-name">{channelItem.name}</span>
          </div>
          {channelItem.lastMessage ? (
            <div className="last-message">
              <div className="recently-messages">
                {channelItem.lastMessage.messageType === 'file' ? (
                  <span>
                    [Файл] ({channelItem.lastMessage.size} кб)
                    <br />
                    {channelItem.lastMessage.data}
                  </span>
                ) : (
                  <span>{channelItem.lastMessage.message}</span>
                )}
              </div>
            </div>
          ) : null}
        </ItemBtn>
        {
          channelItem.channelType === 'group' && !channelItem.isDistinct ? (
            <div className="btns">
              <button id="inviteBtn" onClick={this.handleInviteClick}>Пригласить</button>
              <button id="leaveBtn" onClick={this.handleLeaveClick}>Покинуть</button>
            </div>
        ) : null
        }
        {inviteForm ? (
          <InviteForm onInviteUsers={this.handleInviteUsers} />
        ) : null}
      </ListItem>
    );
  }
}

ChannelListItem.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onInviteUsers: PropTypes.func.isRequired,
  channelItem: PropTypes.objectOf(PropTypes.any).isRequired,
  isActive: PropTypes.bool.isRequired,
};
