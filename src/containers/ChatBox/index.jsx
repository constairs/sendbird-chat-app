import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import * as chatActions from '../../redux/chat/actions';
import { MessageItem } from '../../components/MessageItem';
import { ChatMessageField } from '../ChatMessageField';

import './index.scss';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    this.ref.current.scrollTop = this.ref.current.scrollHeight;
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

  handleCancelUploading = (messageData) => {
    this.props.chatActions.cancelUploadingMessage([
      this.props.currentChannel.url,
      this.props.currentChannel.channelType,
      ...messageData,
    ]);
  };

  handleGreateFileMessage = (fileMessageData) => {
    const creationTime = new Date();
    const fakeMessage = {
      isFake: true,
      data: fileMessageData.message,
      messageType: 'file',
      name: fileMessageData.name,
      type: fileMessageData.type,
      size: fileMessageData.size,
      createdAt: creationTime.getTime(),
      sender: {
        profileUrl: this.props.user.userImg,
        userId: this.props.user.userId,
        nickname: this.props.user.userName,
      },
    };
    this.props.messages.push(fakeMessage);
    if (this.props.uploadProgress === 100) {
      this.props.messages.pop();
    }
  };

  handleTyping = () => {
    if (this.props.currentChannel.channelType === 'group') {
      this.props.chatActions.userTyping(this.props.currentChannel);
    }
  };

  handleTypingEnd = () => {
    if (this.props.currentChannel.channelType === 'group') {
      this.props.currentChannel.endTyping();
    }
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
              onDeleteMessage={this.handleMessageDelete}
              onEditMessage={this.handleMessageEdit}
              key={message.createdAt}
              userId={user.userId}
              uploadProgress={this.props.uploadProgress}
              onCancelUploading={this.handleCancelUploading}
              isNotRead={
                this.props.readReceipt < message.createdAt &&
                this.props.readReceipt !== 0
              }
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
    messages: state.chatReducer.messages,
    messFetching: state.chatReducer.messFetching,
    readReceipt: state.chatReducer.receipt,
    uploadProgress: state.chatReducer.uploadProgress,
    channel: state.channelsReducer.groupChannel,
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
  readReceipt: PropTypes.number,
  uploadProgress: PropTypes.objectOf(PropTypes.any).isRequired,
};

Chat.defaultProps = {
  messages: [],
  readReceipt: 0,
};
