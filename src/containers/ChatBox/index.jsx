import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import { deleteMessage, editMessage, cancelUploadingMessage } from '../../redux/chat/actions';
import { MessageItem } from '../../components/MessageItem';
import { ChatMessageField } from '../ChatMessageField';
import { addHandler, removeHandler } from '../../services/sendbird';

import './index.scss';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentWillMount() {
    addHandler();
  }

  componentDidUpdate() {
    this.ref.current.scrollTop = this.ref.current.scrollHeight;
  }

  componentWillUnmount() {
    removeHandler();
  }

  handleMessageDelete = (message) => {
    this.props.chatActions.deleteMessage([
      this.props.channelUrl,
      this.props.channelType,
      message,
    ]);
  };

  handleMessageEdit = (newMessage) => {
    this.props.chatActions.editMessage([
      this.props.channelUrl,
      this.props.channelType,
      ...newMessage,
    ]);
  };

  handleCancelUploading = (messageData) => {
    this.props.chatActions.cancelUploadingMessage([
      this.props.channelUrl,
      this.props.channelType,
      ...messageData,
    ]);
  };

  render() {
    const { messFetching, messages, user } = this.props;
    const { channelUrl, channelType } = this.props;
    return (
      <div className="chat">
        {messFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={50} />
          </div>
          ) : null}
        <div className="chat-box" ref={this.ref}>
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
          channelUrl={channelUrl}
          channelType={channelType}
        />
      </div>
    );
  }
}

export const ChatBox = connect(
  state => ({
    user: state.persistedUser,
    messages: state.chat.messages,
    messFetching: state.chat.messFetching,
    readReceipt: state.chat.receipt,
    uploadProgress: state.chat.uploadProgress,
  }),
  dispatch => ({
    chatActions: bindActionCreators({
      deleteMessage,
      editMessage,
      cancelUploadingMessage
    }, dispatch),
  })
)(Chat);

Chat.propTypes = {
  channelUrl: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.any),
  chatActions: PropTypes.objectOf(PropTypes.any).isRequired,
  messFetching: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  readReceipt: PropTypes.number,
  uploadProgress: PropTypes.objectOf(PropTypes.any).isRequired,
};

Chat.defaultProps = {
  messages: [],
  readReceipt: 0,
};
