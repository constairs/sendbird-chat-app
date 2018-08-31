import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import * as chatActions from '../../redux/chat/actions';
import { MessageItem } from '../MessageItem';
import { ChatMessageField } from '../ChatMessageField';

import './index.scss';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    this.ref.current.scrollTop = this.ref.current.scrollHeight;
    if (this.props.currentChannel.channelType === 'group') {
      this.props.currentChannel.markAsRead();
    }
  }

  handleMessageDelete = (message) => {
    this.props.chatActions.deleteMessage([
      this.props.currentChannel.url,
      this.props.currentChannel.channelType,
      message,
    ]);
  };

  handleMessageEdit = (newMessage) => {
    this.props.chatActions.editMessage([
      this.props.currentChannel.url,
      this.props.currentChannel.channelType,
      ...newMessage,
    ]);
  };

  handleTyping = () => {
    this.props.currentChannel.startTyping();
  };

  handleTypingEnd = () => {
    this.props.currentChannel.endTyping();
  };

  render() {
    const { messFetching, messages, user } = this.props;
    const { url, channelType } = this.props.currentChannel;
    return (
      <div>
        <div className="chat-box" ref={this.ref}>
          {messFetching ? (
            <div className="preloader">
              <Spinner color="#ffffff" secondaryColor="#40c9ff" size={50} />
            </div>
          ) : null}
          {messages.map(message => (
            <MessageItem
              message={message}
              currentChannel={this.props.currentChannel}
              onDeleteMessage={this.handleMessageDelete}
              onEditMessage={this.handleMessageEdit}
              key={message.createdAt}
              userId={user.userId}
            />
          ))}
        </div>
        <ChatMessageField
          onMessageTyping={this.handleTyping}
          onMessageTypingEnd={this.handleTypingEnd}
          channelUrl={url}
          channelType={channelType}
          channel={this.props.currentChannel}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    chatParticipants:
      state.openChannelsReducer.participants ||
      state.groupChannelsReducer.participants,
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
