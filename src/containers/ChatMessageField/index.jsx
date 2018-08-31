import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Spinner, Text } from 'react-preloading-component';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as chatActions from '../../redux/chat/actions';

class MessageField extends React.Component {
  state = {
    messageInput: '',
    uploadedFile: [],
    fileUploadModal: false,
    fileToUpload: '',
  };

  handleTextInput = (e) => {
    this.setState({ messageInput: e.target.value }, () => {
      if (this.props.channelType === 'open') {
        this.props.chatActions.onMessageTyping([
          this.props.channelUrl,
          this.props.channelType,
          this.props.user.userName,
          this.state.message,
        ]);
      } else {
        this.props.onMessageTyping();
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const messageData = [
      this.props.channelUrl,
      this.props.channelType,
      'MESG',
      this.props.user.userId,
      this.state.messageInput,
    ];
    this.setState({ messageInput: '' });
    this.props.chatActions.sendMessage(messageData);
    this.props.onMessageTypingEnd();
  };

  handleFileForm = (e) => {
    e.preventDefault();
    const fileMessageData = [
      this.props.channelUrl,
      this.props.channelType,
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

  fileUploadModal = () => {
    this.setState({ fileUploadModal: !this.state.fileUploadModal });
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
    const { fileToUpload, messageInput, fileUploadModal } = this.state;
    const { userTyping, user, membersTyping } = this.props;
    return (
      <div>
        <div className="chat-message-filed">
          <form className="chat-message-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              onInput={this.handleTextInput}
              value={messageInput}
            />
            {userTyping && userTyping !== user.userName ? (
              <span className="typing-indicator">
                {userTyping}
                <Text
                  color="#000000"
                  fontSize="1em"
                  text="набирает сообщение"
                />
              </span>
            ) : null}
            {membersTyping.length ? (
              <span className="typing-indicator">
                {membersTyping.map((member, i) => {
                  if (
                    membersTyping.length > 1 &&
                    i !== membersTyping.length - 1
                  ) {
                    return <span key={member.userId}>{member.nickname}, </span>;
                  }
                  return <span key={member.userId}>{member.nickname}</span>;
                })}
                <Text
                  color="#000000"
                  fontSize="1em"
                  text="набирает сообщение"
                />
              </span>
            ) : null}
            <button
              onClick={this.fileUploadModal}
              type="button"
              title="Прикрепить файл"
            >
              <FontAwesomeIcon icon={faFile} />
            </button>
            <button
              className="send-message-btn"
              type="submit"
              disabled={!messageInput}
            >
              Отправить
              {this.props.sendingMessage ? (
                <Spinner color="#ffffff" secondaryColor="#40c9ff" size={10} />
              ) : null}
            </button>
          </form>
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
          <form onSubmit={this.handleFileForm}>
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
            <button type="submit">Загрузить</button>
          </form>
        </Modal>
      </div>
    );
  }
}

MessageField.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  channelUrl: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
  userTyping: PropTypes.string.isRequired,
  membersTyping: PropTypes.arrayOf(PropTypes.any),
  sendingMessage: PropTypes.bool.isRequired,
  chatActions: PropTypes.objectOf(PropTypes.func).isRequired,
  onMessageTyping: PropTypes.func.isRequired,
  onMessageTypingEnd: PropTypes.func.isRequired,
};

MessageField.defaultProps = {
  membersTyping: [],
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    userTyping: state.chatReducer.userTyping,
    membersTyping: state.chatReducer.membersTyping,
    sendingMessage: state.chatReducer.sendingMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
  };
}
export const ChatMessageField = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageField);
