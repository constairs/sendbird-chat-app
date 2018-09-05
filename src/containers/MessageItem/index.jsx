import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faPaperPlane,
  faTimes,
  faFile,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';

import './index.scss';

export class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onEdit: false,
      messageInput: props.message.updatedAt
        ? props.message.message
        : props.message.customType,
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
  handleEditFileMessage = () => {
    this.props.onEditFileMessage(this.props.message.messageId);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onEditMessage([
      this.props.message.messageId,
      this.state.messageInput,
    ]);
    this.setState({ onEdit: false });
  };
  render() {
    const { message, userId } = this.props;
    return (
      <div className="message-item">
        <div className="sender-img">
          <img
            src={
              message.sender || message.sender.profileUrl
                ? message.sender.profileUrl
                : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
            }
            alt={message.nickname}
          />
        </div>
        <div className="message-body">
          <p className="sender-info">
            <span className="sender-nick">
              {message.sender.nickname ? message.sender.nickname : 'noname'}
            </span>
            {message.updatedAt ? (
              <span className="sending-date">
                Обновлено:{' '}
                {moment(message.updatedAt).format('DD/MM/YY hh:mm a')}
              </span>
            ) : (
              <span className="sending-date">
                {moment(message.createdAt).format('DD/MM/YY hh:mm a')}
              </span>
            )}
          </p>
          {message.messageType === 'file' ? (
            <div className="file-message-item">
              <div className="message-file-preview">
                {new RegExp('^image?', 'i').test(message.type) ? (
                  <img src={message.url} alt={message.name} />
                ) : (
                  <FontAwesomeIcon icon={faFile} />
                )}
              </div>
              <p>
                <a href={message.url} target="_blank">
                  {message.name} ({message.size} кб)
                </a>
              </p>
            </div>
          ) : null}
          {this.state.onEdit ? (
            <form onSubmit={this.handleSubmit} className="edit-message-form">
              <input
                type="text"
                onChange={this.handleTextInput}
                value={this.state.messageInput}
              />
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
              {message.updatedAt ? message.message : message.customType}
            </p>
          )}
        </div>
        {userId === message.sender.userId ? (
          <div>
            <button onClick={this.handleDeleteBtn} className="x-btn">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {message.messageType === 'file' ? null : ( // </button> //   <FontAwesomeIcon icon={faPen} /> // <button onClick={this.handleEditFileMessage} className="edit-btn">
              <button onClick={this.handleEditMessage} className="edit-btn">
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

MessageItem.propTypes = {
  onDeleteMessage: PropTypes.func.isRequired,
  onEditMessage: PropTypes.func.isRequired,
  onEditFileMessage: PropTypes.func.isRequired,
  message: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.string.isRequired,
  isNotRead: PropTypes.bool,
};
