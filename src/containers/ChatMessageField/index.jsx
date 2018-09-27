import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Spinner, Text } from 'react-preloading-component';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTimes, faFileAudio, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { messageTyping, messageTypingEnd, userTypingStart, userTypingEnd, sendMessage, sendFileMessage } from '../../redux/chat/actions';
import { FilePreview } from '../../components/UI/FilePreview';
import { FileItem } from '../../components/UI/FileItem';
import { FileUploadModal } from '../../components/UI/FileUploadModal';

const Field = styled.form`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 0;
  box-shadow: none;
  background-color: #ffffff;
  input {
    width: 100%;
    height: 40px;
    border: 1px solid ${props => props.theme.colors.main};
    border-radius: 3px;
    margin-bottom: 5px;
    padding-left: 5px;
    padding-top: 5px;
  }
  button {
    margin-left: 14px;
    width: auto;
    height: 30px;
  }
  .send-message-btn {
    display: flex;
    span {
      margin-left: 5px;
    }
  }
  .typing-indicator {
    display: flex;
    align-items: center;
    margin-right: 8px;
    .PreLoading-Text {
      margin-left: 6px;
    }
  }
`;

export class MessageField extends React.Component {
  state = {
    messageText: '',
    fileMessageText: '',
    uploadedFile: [],
    fileUploadModal: false,
    fileToUpload: '',
    customMessageType: '',
    errorUpload: ''
  };

  handleTextInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (this.props.channelType === 'open' && name === 'messageText') {
        this.props.chatActions.messageTyping([
          this.props.channelUrl,
          this.props.channelType,
          this.props.user.userName,
        ]);
      } else if (this.props.channelType === 'group' && name === 'messageText') {
        this.props.chatActions.userTypingStart([this.props.channelUrl, this.props.channelType]);
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
      this.state.messageText,
    ];
    this.setState({ messageText: '' });
    this.props.chatActions.sendMessage(messageData);

    if (this.props.channelType === 'open') {
      this.props.chatActions.messageTypingEnd();
    } else if (this.props.channelType === 'group') {
      this.props.chatActions.userTypingEnd([this.props.channelUrl, this.props.channelType]);
    }
  };

  handleFileForm = (e) => {
    e.preventDefault();
    const fileMessageData = [
      this.props.channelUrl,
      this.props.channelType,
      'FILE',
      this.props.user,
      ...this.state.uploadedFile,
      this.state.fileMessageText,
      this.state.customMessageType
    ];
    this.props.chatActions.sendFileMessage(fileMessageData);
    this.setState({
      uploadedFile: [],
      fileUploadModal: false,
      fileToUpload: '',
      fileMessageText: '',
    });
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
        if (new RegExp('^image?', 'i').test(file.type)) {
          this.setState({
            customMessageType: 'IMAGE'
          });
        } else if (new RegExp('^audio?', 'i').test(file.type)) {
          this.setState({
            customMessageType: 'AUDIO'
          });
        } else if (new RegExp('^video?', 'i').test(file.type)) {
          this.setState({
            customMessageType: 'VIDEO'
          });
        } else {
          this.setState({
            customMessageType: ''
          });
        }
      };
      reader.onerror = () => {
        this.setState({
          errorUpload: 'Ошибка загрузки файла'
        });
      };
      reader.readAsBinaryString(file);
    });
  };

  handleClearFile = () => {
    this.setState({
      customMessageType: '',
      uploadedFile: [],
      fileToUpload: '',
      fileMessageText: '',
    });
  }

  render() {
    const {
      fileToUpload,
      messageText,
      fileUploadModal,
      fileMessageText,
      customMessageType,
      errorUpload
    } = this.state;
    const { userTyping, user, membersTyping } = this.props;
    return (
      <div>
        <Field onSubmit={this.handleSubmit}>
          <input
            type="text"
            onInput={this.handleTextInput}
            name="messageText"
            value={messageText}
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
          {membersTyping.length > 0 ? (
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
            title="Отправить файл"
            className="file-upload-modal-btn"
          >
            <FontAwesomeIcon icon={faFile} />
          </button>
          <button
            className="send-message-btn"
            type="submit"
            disabled={!messageText}
          >
              Отправить
            {this.props.sendingMessage ? (
              <span>
                <Spinner color="#ffffff" secondaryColor="#40c9ff" size={10} />
              </span>
              ) : null}
          </button>
        </Field>
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
          <FileUploadModal>
            <form onSubmit={this.handleFileForm}>
              <Dropzone className="dropzone" onDrop={this.handleDropFile} />
              {fileToUpload ? (
                <div>
                  <p>Файл для отправки</p>
                  <FileItem>
                    <button className="clear-file-upload" onClick={this.handleClearFile}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <FilePreview>
                      {customMessageType === '' ? (
                        <FontAwesomeIcon icon={faFile} />
                      ) : (
                        <div>
                          {
                            customMessageType === 'IMAGE' ?
                              <img src={fileToUpload.preview} alt="preview" />
                            :
                              (
                                <div>
                                  {
                                    customMessageType === 'AUDIO' ?
                                      <FontAwesomeIcon icon={faFileAudio} />
                                    :
                                      <FontAwesomeIcon icon={faFileVideo} />
                                  }
                                </div>
                              )
                          }
                        </div>
                      )}
                    </FilePreview>
                    <p>{fileToUpload.size} кб</p>
                  </FileItem>
                </div>
            ) : null}
              {errorUpload || null}
              <input
                type="text"
                placeholder="Сообщение"
                name="fileMessageText"
                value={fileMessageText}
                onChange={this.handleTextInput}
                disabled={!fileToUpload}
              />
              <button type="submit">Отправить</button>
            </form>
          </FileUploadModal>
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
};

MessageField.defaultProps = {
  membersTyping: [],
};

export const ChatMessageField = connect(
  state => ({
    user: state.persistedUser,
    userTyping: state.chat.userTyping,
    membersTyping: state.chat.membersTyping,
    sendingMessage: state.chat.sendingMessage,
  }),
  dispatch => ({
    chatActions: bindActionCreators({
      messageTyping,
      messageTypingEnd,
      userTypingStart,
      userTypingEnd,
      sendMessage,
      sendFileMessage
    }, dispatch),
  })
)(MessageField);
