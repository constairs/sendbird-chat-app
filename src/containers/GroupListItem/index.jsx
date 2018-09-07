import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ListItem extends React.Component {
  state = {
    inviteForm: false,
    usersIdsInput: '',
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
    this.props.onLeaveGroup(this.props.channelItem.url);
  };

  handleInput = (e) => {
    this.setState({ usersIdsInput: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onInviteUsers([
      this.props.channelItem.url,
      this.state.usersIdsInput,
    ]);
    this.setState({ inviteForm: false, usersIdsInput: '' });
  };

  render() {
    const { channelItem } = this.props;
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
            </span>
            <span className="channel-item-name">{channelItem.name}</span>
          </div>
          {channelItem.lastMessage ? (
            <div>
              <div className="recently-messages">
                Последнее сообщение:
                <br />
                <span>{channelItem.lastMessage.customType}</span>
              </div>
            </div>
          ) : null}
        </button>
        <div className="btns">
          <button onClick={this.handleInviteClick}>Пригласить</button>
          <button onClick={this.handleLeaveClick}>Покинуть</button>
        </div>
        {this.state.inviteForm ? (
          <form onSubmit={this.handleFormSubmit} className="form invite-form">
            <label htmlFor="userId">
              <span>user ids</span>
              <input
                id="userId"
                value={this.state.usersIdsInput}
                onChange={this.handleInput}
                type="text"
              />
            </label>
            <button>ok</button>
          </form>
        ) : null}
      </li>
    );
  }
}

ListItem.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  channelItem: PropTypes.objectOf(PropTypes.any).isRequired,
  onInviteUsers: PropTypes.func.isRequired,
  onLeaveGroup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    groupChannels: state.groupChannelsReducer,
  };
}

export const GroupListItem = connect(mapStateToProps)(ListItem);
