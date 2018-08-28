import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteForm: false,
      usersIdsInput: '',
    };
  }
  handleItemClick = () => {
    this.props.selectedChan({
      channelUrl: this.props.cur.url,
      channelType: this.props.cur.channelType,
    });
  };

  handleInviteClick = () => {
    this.setState({ inviteForm: true });
  };

  handleLeaveClick = () => {
    this.props.onLeaveGroup(this.props.cur.url);
  };

  handleInput = (e) => {
    this.setState({ usersIdsInput: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onInviteUsers([this.props.cur.url, this.state.usersIdsInput]);
  };

  render() {
    return (
      <li>
        <button onClick={this.handleItemClick}>
          <div className="channel-info">
            <span className="img">
              <img
                src={
                  this.props.cur.coverUrl
                    ? this.props.cur.coverUrl
                    : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={this.props.cur.name}
              />
            </span>
            <span className="channel-item-name">{this.props.cur.name}</span>
          </div>
          {this.props.cur.lastMessage ? (
            <div>
              <div className="recently-messages">
                Последнее сообщение:
                <br />
                <span>{this.props.cur.lastMessage.customType}</span>
              </div>
            </div>
          ) : null}
        </button>
        <button onClick={this.handleInviteClick}>Пригласить</button>
        {this.state.inviteForm ? (
          <div>
            <form onSubmit={this.handleFormSubmit} className="form invite-form">
              <input
                value={this.state.usersIdsInput}
                onChange={this.handleInput}
                type="text"
                placeholder="user id"
              />
              <button>ok</button>
            </form>
          </div>
        ) : null}
        <button onClick={this.handleLeaveClick}>Покинуть</button>
      </li>
    );
  }
}

ListItem.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  cur: PropTypes.objectOf(PropTypes.any).isRequired,
  onInviteUsers: PropTypes.func.isRequired,
  onLeaveGroup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    groupChannels: state.groupChannelsReducer,
  };
}

export const GroupListItem = connect(mapStateToProps)(ListItem);
