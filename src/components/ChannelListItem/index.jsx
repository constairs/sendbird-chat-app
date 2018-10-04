import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../UI/Button';
import { ListItem, ItemBtn } from './index.styles';
import { InviteForm } from '../InviteForm';
import { ImgWrap } from '../ImgRound';

const StyledImg = styled(ImgWrap)`
  width: 36px;
  height: 36px;
  min-width: 36px;
`;

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

  handleInviteUsers = (formData) => {
    this.props.onInviteUsers([this.props.channelItem.url, formData]);
  };

  render() {
    const { channelItem, isActive } = this.props;
    const { inviteForm } = this.state;
    return (
      <ListItem>
        <ItemBtn isActive={isActive} custom={channelItem.customType} onClick={this.handleItemClick}>
          <div className="channel-info">
            <div className="img-wrap">
              <StyledImg src={channelItem.coverUrl || 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'} />
              {channelItem.unreadMessageCount > 0 ? <span className="unread-count">{channelItem.unreadMessageCount}</span> : null }
            </div>
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
              <Button id="inviteBtn" onClick={this.handleInviteClick}>Пригласить</Button>
              <Button id="leaveBtn" onClick={this.handleLeaveClick}>Покинуть</Button>
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
