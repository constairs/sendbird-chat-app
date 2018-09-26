import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPaperPlane, faTimes, faFile, faCircle, faFileAudio, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import LazyLoad from 'react-lazyload';
import { Spinner } from 'react-preloading-component';
import './index.scss';

export class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onEdit: false,
      messageInput: props.message.message ? props.message.message : props.message.data,
    };
  }

  handleDeleteBtn = () => {
    this.props.onDeleteMessage(this.props.message);
  };
  handleTextInput = (e) => {
    this.setState({ messageInput: e.target.value });
  };
  handleEditMessage = () => {
    this.setState({ onEdit: true });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onEditMessage([
      this.props.message.messageType,
      this.props.message.messageId,
      this.state.messageInput,
    ]);
    this.setState({ onEdit: false });
  };

  handleCancelUploading = () => {
    this.props.onCancelUploading([this.props.uploadProgress.reqId, this.props.message.messageId]);
  };

  render() {
    const { message, userId, uploadProgress } = this.props;
    return (
      <div
        className="message-item"
      >
        <div className="sender-img">
          <img
            src={
              message.sender || message.sender.profileUrl
                ? message.sender.profileUrl
                : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
            }
            alt={message.sender.nickname}
          />
        </div>
        <div className="message-body">
          <p className="sender-info">
            <span className="sender-nick">{message.sender.nickname || 'noname'}</span>
            {message.updatedAt ? (
              <span className="sending-date">
                  Обновлено: {moment(message.updatedAt).format('DD/MM/YY hh:mm a')}
              </span>
              ) : (
                <span className="sending-date">
                  {moment(message.createdAt).format('DD/MM/YY hh:mm a')}
                </span>
                )}
          </p>
          {message.messageType === 'file' ? (
            <div className="file-message-item">
              <div className="file-info">
                {message.isFake ? (
                  <div className="message-file-preview">
                    <Spinner color="#ffffff" secondaryColor="#40c9ff" size={70} />
                    <span className="loading-progress">{uploadProgress.progress} %</span>
                    {uploadProgress.progress < 100 ? (
                      <button onClick={this.handleCancelUploading} className="cancel-button">
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                      ) : null}
                  </div>
                  ) : (
                    <div className="message-file-preview">
                      {message.customType === '' ? (
                        <FontAwesomeIcon icon={faFile} />
                      ) : (
                        <div>
                          {
                            message.customType === 'IMAGE' ?
                              <LazyLoad height="100%" placeholder={<Spinner color="#ffffff" secondaryColor="#40c9ff" size={30} />} offset={100}>
                                <img src={message.url} alt={message.name} />
                              </LazyLoad>
                            :
                              (
                                <div>
                                  {
                                    message.customType === 'AUDIO' ?
                                      <FontAwesomeIcon icon={faFileAudio} />
                                    :
                                      <FontAwesomeIcon icon={faFileVideo} />
                                  }
                                </div>
                              )
                          }
                        </div>
                      )}
                    </div>
                  )
                }
                <p>
                  <a href={message.url || '#'} target="_blank">
                    {message.name} ({message.size} кб)
                  </a>
                </p>
              </div>
            </div>
            ) : null}
          {this.state.onEdit ? (
            <form onSubmit={this.handleSubmit} className="edit-message-form">
              <input type="text" onChange={this.handleTextInput} value={this.state.messageInput} />
              <button>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
            ) : (
              <p className="message-text">
                <span className="isReadIndicator">
                  {this.props.isNotRead && userId === message.sender.userId ? (
                    <FontAwesomeIcon icon={faCircle} />
                  ) : null}
                </span>
                {message.message || null}
                {message.messageType === 'file' && message.data ? message.data : null}
              </p>
              )}
        </div>
        {userId === message.sender.userId ? (
          <div>
            <button onClick={this.handleDeleteBtn} id="delMessage" className="x-btn">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button onClick={this.handleEditMessage} if="editMessage" className="edit-btn">
              <FontAwesomeIcon icon={faPen} />
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

MessageItem.propTypes = {
  onDeleteMessage: PropTypes.func.isRequired,
  onEditMessage: PropTypes.func.isRequired,
  message: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.string.isRequired,
  isNotRead: PropTypes.bool,
  uploadProgress: PropTypes.objectOf(PropTypes.any).isRequired,
  onCancelUploading: PropTypes.func.isRequired,
};

MessageItem.defaultProps = {
  isNotRead: false,
};
