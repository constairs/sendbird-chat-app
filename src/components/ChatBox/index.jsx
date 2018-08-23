import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import * as chatActions from '../../redux/chat/actions';
import { MessageItem } from '../MessageItem';

import './index.scss';


export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleTextInput = (e) => {
    this.setState({ message: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const messageData = [
      this.props.currentChannel.url,
      'MESG',
      this.props.user.userId,
      this.state.message,
    ];
    this.props.chatActions.sendMessage(messageData);
    this.setState({ message: '' });
  }

  handleMessageDelete = (message) => {
    this.props.chatActions.deleteMessage([this.props.currentChannel.url, message]);
  }

  handleMessageEdit = (newMessage) => {
    this.props.chatActions.editMessage([this.props.currentChannel.url, ...newMessage]);
  }

  render() {
    return (
      <div>
        <div className="chat-box">
          {
            this.props.chat.messFetching ?
              <div className="preloader">
                <Spinner
                  color="#ffffff"
                  secondaryColor="#40c9ff"
                  size={50}
                />
              </div>
              :
              null
          }
          {
            this.props.messages.map(
              elem => (
                <MessageItem
                  cur={elem}
                  onDeleteMessage={this.handleMessageDelete}
                  onEditMessage={this.handleMessageEdit}
                  key={elem.createdAt}
                  userId={this.props.user.userId}
                />
              )
            )
          }
        </div>
        <form className="chat-message-form" onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleTextInput} value={this.state.message} />
          <button className="send-message-btn" disabled={!this.state.message}>
            Отправить
            {
              this.props.chat.sendingMessage ? <Spinner
                color="#ffffff"
                secondaryColor="#40c9ff"
                size={10}
              />
                :
                null
            }
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    chat: state.chatReducer,
    currentChannel: state.openChannelsReducer.channel,
    chatParticipants: state.openChannelsReducer.participants,
    messages: state.chatReducer.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
  };
}

export const ChatBox = connect(mapStateToProps, mapDispatchToProps)(Chat);

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.any),
  sendingMessage: PropTypes.bool,
  chatActions: PropTypes.objectOf(PropTypes.any).isRequired,
  chat: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  currentChannel: PropTypes.objectOf(PropTypes.any).isRequired,
};

Chat.defaultProps = {
  messages: [],
  sendingMessage: false,
};

