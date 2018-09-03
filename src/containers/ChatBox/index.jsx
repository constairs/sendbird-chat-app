import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import * as chatActions from '../../redux/chat/actions';
import { MessageItem } from '../MessageItem';
import { ChatMessageField } from '../ChatMessageField';

import './index.scss';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  state = {
    fileToUpload: '',
    fileUploadModal: false,
    fileEditFile: false,
    messToEdit: '',
  };

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

  handleFileMessageEdit = (messageId) => {
    this.setState({
      fileUploadModal: true,
      fileEditFile: true,
      messToEdit: messageId,
    });
  };

  handleTyping = () => {
    this.props.currentChannel.startTyping();
  };

  handleTypingEnd = () => {
    this.props.currentChannel.endTyping();
  };

  handleFileForm = (e) => {
    e.preventDefault();
    const fileMessageData = [
      this.props.currentChannel.url,
      this.props.currentChannel.channelType,
      'FILE',
      this.props.user.userId,
      ...this.state.uploadedFile,
    ];
    this.setState({
      uploadedFile: [],
      fileUploadModal: false,
      fileToUpload: '',
    });
    this.props.chatActions.sendFileMessage(fileMessageData);
  };

  handleFileEdit = (e) => {
    e.preventDefault();
    const updFileMessageData = [
      this.props.currentChannel.url,
      this.props.currentChannel.channelType,
      this.state.messToEdit,
      'FILE',
      this.props.user.userId,
      ...this.state.uploadedFile,
    ];
    this.setState({
      uploadedFile: [],
      fileUploadModal: false,
      fileToUpload: '',
    });
    this.props.chatActions.editFileMessage(updFileMessageData);
  };

  fileUploadModal = () => {
    this.setState({
      fileUploadModal: !this.state.fileUploadModal,
      fileEditFile: false,
    });
  };

  handleDropFile = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          fileToUpload: file,
        });
        this.setState({
          uploadedFile: [file, file.name, file.type, file.size],
        });
      };
      // reader.onabort = () => console.log('file reading was aborted');
      // reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
  };

  render() {
    const { messFetching, messages, user } = this.props;
    const { url, channelType } = this.props.currentChannel;
    const { fileToUpload, fileUploadModal, fileEditFile } = this.state;
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
              onEditFileMessage={this.handleFileMessageEdit}
              onEditMessage={this.handleMessageEdit}
              key={message.createdAt}
              userId={user.userId}
            />
          ))}
        </div>
        <Modal
          className="modal file-upload-modal"
          isOpen={fileUploadModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.fileUploadModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button className="x-btn" onClick={this.fileUploadModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form
            onSubmit={fileEditFile ? this.handleFileEdit : this.handleFileForm}
          >
            <Dropzone className="dropzone" onDrop={this.handleDropFile} />
            {fileToUpload ? (
              <div>
                <p>Файл для отправки</p>
                <div className="files-to-upload">
                  <div className="file-item">
                    <div className="file-preview">
                      {new RegExp('^image?', 'i').test(fileToUpload.type) ? (
                        <img src={fileToUpload.preview} alt="preview" />
                      ) : (
                        <FontAwesomeIcon icon={faFile} />
                      )}
                    </div>
                    <p>{fileToUpload.size} кб</p>
                  </div>
                </div>
              </div>
            ) : null}
            {fileEditFile ? (
              <button type="submit">Обновить</button>
            ) : (
              <button type="submit">Загрузить</button>
            )}
          </form>
        </Modal>
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
