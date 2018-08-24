import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import * as chatActions from '../../redux/chat/actions';
import { MessageItem } from '../MessageItem';
import { scrollToBottom } from '../../utils/scrollToBottom';
import { ChatMessageField } from '../ChatMessageField';

import './index.scss';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    scrollToBottom(this.ref.current);
  }

  handleMessageDelete = (message) => {
    this.props.chatActions.deleteMessage([
      this.props.currentChannel.url,
      message,
    ]);
  };

  handleMessageEdit = (newMessage) => {
    this.props.chatActions.editMessage([
      this.props.currentChannel.url,
      ...newMessage,
    ]);
  };

  // handleMessageTyping = (messageText) => {
  //   this.props.chatActions.onMessageTyping([
  //     this.props.currentChannel.url,
  //     this.props.user.userName,
  //     messageText,
  //   ]);
  // };

  // handleSendMessage = (messageText) => {
  //   const messageData = [
  //     this.props.currentChannel.url,
  //     'MESG',
  //     this.props.user.userId,
  //     messageText,
  //   ];
  //   this.props.chatActions.sendMessage(messageData);
  // };

  render() {
    return (
      <div>
        <div className="chat-box" ref={this.ref}>
          {this.props.messFetching ? (
            <div className="preloader">
              <Spinner color="#ffffff" secondaryColor="#40c9ff" size={50} />
            </div>
          ) : null}
          {this.props.messages.map(elem => (
            <MessageItem
              cur={elem}
              onDeleteMessage={this.handleMessageDelete}
              onEditMessage={this.handleMessageEdit}
              key={elem.createdAt}
              userId={this.props.user.userId}
            />
          ))}
        </div>
        <ChatMessageField />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    currentChannel: state.openChannelsReducer.channel,
    chatParticipants: state.openChannelsReducer.participants,
    messages: state.chatReducer.messages,
    messFetching: state.chatReducer.messFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
  };
}

export const ChatBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.any),
  chatActions: PropTypes.objectOf(PropTypes.any).isRequired,
  messFetching: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  currentChannel: PropTypes.objectOf(PropTypes.any).isRequired,
};

Chat.defaultProps = {
  messages: [],
};
