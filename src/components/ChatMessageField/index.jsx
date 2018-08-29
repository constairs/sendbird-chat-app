import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Spinner, Text } from 'react-preloading-component';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as chatActions from '../../redux/chat/actions';

class MessageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      uploadedFile: [],
      fileUploadModal: false,
      uploadedPreview: '',
    };
  }

  handleTextInput = (e) => {
    this.setState({ message: e.target.value }, () => {
      this.props.chatActions.onMessageTyping([
        this.props.channelUrl,
        this.props.channelType,
        this.props.user.userName,
        this.state.message,
      ]);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const messageData = [
      this.props.channelUrl,
      this.props.channelType,
      'MESG',
      this.props.user.userId,
      this.state.message,
    ];
    this.setState({ message: '' });
    this.props.chatActions.sendMessage(messageData);
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
    this.setState({ uploadedFile: [] });
    this.props.chatActions.sendFileMessage(fileMessageData);
  };

  fileUploadModal = () => {
    this.setState({ fileUploadModal: !this.state.fileUploadModal });
  };

  handleDropFile = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ uploadedPreview: file.preview });
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
    return (
      <div>
        <form className="chat-message-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            onInput={this.handleTextInput}
            value={this.state.message}
          />
          {this.props.userTyping &&
          this.props.userTyping !== this.props.user.userName ? (
            <span className="typing-indicator">
              {this.props.userTyping}
              <Text color="#000000" fontSize="1em" text="набирает сообщение" />
            </span>
          ) : null}
          <button
            className="send-message-btn"
            type="submit"
            disabled={!this.state.message}
          >
            Отправить
            {this.props.sendingMessage ? (
              <Spinner color="#ffffff" secondaryColor="#40c9ff" size={10} />
            ) : null}
          </button>
        </form>
        <button onClick={this.fileUploadModal}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
        <Modal
          className="file-upload-modal"
          isOpen={this.state.fileUploadModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.fileUploadModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button className="x-btn" onClick={this.fileUploadModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form onSubmit={this.handleFileForm}>
            {this.state.uploadedPreview ? (
              <div className="file-preview">
                <img src={this.state.uploadedPreview} alt="preview" />
              </div>
            ) : null}
            <Dropzone className="dropzone" onDrop={this.handleDropFile} />
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
  sendingMessage: PropTypes.bool.isRequired,
  chatActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    userTyping: state.chatReducer.userTyping,
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
