import React from 'react';
import PropTypes from 'prop-types';

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
    this.props.onLeaveGroup({
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
    const { channelItem } = this.props;
    const { usersToInvite, usersIdsInput, inviteForm } = this.state;
    return (
      <li>
        <button className="channel-list-item" onClick={this.handleItemClick}>
          <div className="channel-info">
            <span className="img">
              <img
                src={
                  channelItem.coverUrl
                    ? channelItem.coverUrl
                    : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={channelItem.name}
              />
              {channelItem.unreadMessageCount > 0 ? <span className="unread-count">{channelItem.unreadMessageCount}</span> : null }
            </span>
            <span className="channel-item-name">{channelItem.name}</span>
          </div>
          {channelItem.lastMessage ? (
            <div>
              <div className="recently-messages">
                Последнее сообщение:
                <br />
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
        </button>
        {channelItem.channelType === 'group' && !channelItem.isDistinct ? (
          <div className="btns">
            <button onClick={this.handleInviteClick}>Пригласить</button>
            <button onClick={this.handleLeaveClick}>Покинуть</button>
          </div>
        ) : null}

        {inviteForm ? (
          <form onSubmit={this.handleFormSubmit} className="form invite-form">
            <label htmlFor="userId" className="groupUsers">
              <span>user ids</span>
              <input id="userId" value={usersIdsInput} onChange={this.handleInput} type="text" />
              <button className="invite-button" onClick={this.handleAddUser} type="button">
                    ок
              </button>
              {usersToInvite.length !== 0 ? (
                <ul className="users-to-invite">
                  {usersToInvite.map(item => (
                    <li key={item}>
                      {item}{' '}
                      <button id={item} onClick={this.handleDelUser} type="button">
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </label>
            <button type="submit">Пригласить</button>
          </form>
        ) : null}
      </li>
    );
  }
}

ChannelListItem.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  onLeaveGroup: PropTypes.func.isRequired,
  onInviteUsers: PropTypes.func.isRequired,
  channelItem: PropTypes.objectOf(PropTypes.any).isRequired
};
