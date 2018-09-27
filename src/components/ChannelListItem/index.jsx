import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ListItem, ItemBtn } from './index.styles';
import { UsersToInvite } from '../UI/UsersToInvite';

const InviteForm = styled.form`
  box-shadow: none;
  background-color: #d6d4d4;
  min-width: auto;
  padding: 15px;
`;

export class ChannelListItem extends React.Component {
  state = {
    inviteForm: false,
    usersIdsInput: '',
    usersToInvite: [],
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

  handleAddUser = () => {
    this.setState({
      usersToInvite: [...this.state.usersToInvite, this.state.usersIdsInput],
      usersIdsInput: '',
    });
  };

  handleDelUser = (e) => {
    this.setState({
      usersToInvite: this.state.usersToInvite.filter(userId => userId !== e.target.id),
    });
  };

  handleLeaveClick = () => {
    this.props.onLeave({
      channelUrl: this.props.channelItem.url,
      channelType: this.props.channelItem.channelType
    });
  };

  handleInput = (e) => {
    this.setState({ usersIdsInput: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onInviteUsers([this.props.channelItem.url, this.state.usersToInvite]);
    this.setState({ inviteForm: false, usersIdsInput: '', usersToInvite: [] });
  };

  render() {
    const { channelItem, isActive } = this.props;
    const { usersToInvite, usersIdsInput, inviteForm } = this.state;
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
        {channelItem.channelType === 'group' && !channelItem.isDistinct ? (
          <div className="btns">
            <button id="inviteBtn" onClick={this.handleInviteClick}>Пригласить</button>
            <button id="leaveBtn" onClick={this.handleLeaveClick}>Покинуть</button>
          </div>
        ) : null}

        {inviteForm ? (
          <InviteForm onSubmit={this.handleFormSubmit}>
            <label htmlFor="userId" className="groupUsers">
              <span>user ids</span>
              <input id="userId" value={usersIdsInput} onChange={this.handleInput} type="text" />
              <button className="invite-button" onClick={this.handleAddUser} type="button">
                    ок
              </button>
              {usersToInvite.length !== 0 ? (
                <UsersToInvite>
                  {usersToInvite.map(item => (
                    <li key={item}>
                      {item}{' '}
                      <button id={item} onClick={this.handleDelUser} type="button">
                        x
                      </button>
                    </li>
                  ))}
                </UsersToInvite>
              ) : null}
            </label>
            <button type="submit">Пригласить</button>
          </InviteForm>
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
