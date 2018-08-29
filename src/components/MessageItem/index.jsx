import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faPaperPlane,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import './index.scss';

export class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onEdit: false,
      message: this.props.cur.updatedAt
        ? this.props.cur.message
        : this.props.cur.customType,
    };
  }
  handleDeleteBtn = () => {
    this.props.onDeleteMessage(this.props.cur);
  };
  handleTextInput = (e) => {
    this.setState({ message: e.target.value });
  };
  handleEditMessage = () => {
    this.setState({ onEdit: true });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onEditMessage([this.props.cur.messageId, this.state.message]);
    this.setState({ onEdit: false });
  };
  render() {
    const { cur } = this.props;
    return (
      <div className="message-item">
        <div className="sender-img">
          <img
            src={
              cur.sender || cur.sender.profileUrl
                ? cur.sender.profileUrl
                : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
            }
            alt={cur.nickname}
          />
        </div>
        <div className="message-body">
          <p className="sender-info">
            <span className="sender-nick">
              {cur.sender.nickname ? cur.sender.nickname : 'noname'}
            </span>
            {cur.updatedAt ? (
              <span className="sending-date">
                Обновлено: {moment(cur.updatedAt).format('DD/MM/YY hh:mm a')}
              </span>
            ) : (
              <span className="sending-date">
                {moment(cur.createdAt).format('DD/MM/YY hh:mm a')}
              </span>
            )}
          </p>
          {cur.messageType === 'file' ? (
            <div className="file-message-item">
              <div className="message-file-preview">
                <img src={cur.url} alt={cur.name} />
              </div>
              <p>
                <a href={cur.url} target="_blank">
                  {cur.name} ({cur.size} кб)
                </a>
              </p>
            </div>
          ) : null}
          {this.state.onEdit ? (
            <form onSubmit={this.handleSubmit} className="edit-message-form">
              <input
                type="text"
                onChange={this.handleTextInput}
                value={this.state.message}
              />
              <button>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          ) : (
            <p className="message-text">
              {cur.updatedAt ? cur.message : cur.customType}
            </p>
          )}
        </div>
        {this.props.userId === cur.sender.userId ? (
          <div>
            <button onClick={this.handleDeleteBtn} className="x-btn">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button onClick={this.handleEditMessage} className="edit-btn">
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
  cur: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.string.isRequired,
};
