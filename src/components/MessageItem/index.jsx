import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { MessageFilePreview } from '../../components/MessageFilePreview';
import { FilePreloader } from '../../components/FilePreloader';
import { Message } from './index.styles';
import { EditMessageForm } from '../EditMessageForm';
import { ImgWrap } from '../ImgRound';
import { Button } from '../UI/Button';

const StyledImg = styled(ImgWrap)`
  width: 40px;
  min-width: 40px;
  height: 40px;
`;

export class MessageItem extends React.Component {
  state = {
    onEdit: false,
  };

  handleDeleteBtn = () => {
    this.props.onDeleteMessage(this.props.message);
  };
  handleEditMessage = () => {
    this.setState({ onEdit: true });
  };
  handleSubmit = (text) => {
    this.props.onEditMessage([
      this.props.message.messageType,
      this.props.message.messageId,
      text,
    ]);
    this.setState({ onEdit: false });
  };

  handleCancelUploading = () => {
    this.props.onCancelUploading([this.props.uploadProgress.reqId, this.props.message.messageId]);
  };

  render() {
    const { message, userId, uploadProgress } = this.props;
    return (
      <Message>
        <StyledImg
          src={
            message.sender.profileUrl || 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
          }
        />
        <div className="message-body">
          <p className="sender-info">
            <span className="sender-nick">{message.sender.nickname || 'noname'}</span>
            {
              message.updatedAt ? (
                <span className="sending-date">
                  Обновлено: {moment(message.updatedAt).format('DD/MM/YY hh:mm a')}
                </span>
              ) : (
                <span className="sending-date">
                  {moment(message.createdAt).format('DD/MM/YY hh:mm a')}
                </span>
              )
            }
          </p>
          {message.messageType === 'file' ? (
            <div className="file-info">
              {
                message.isFake ? (
                  <FilePreloader
                    progress={uploadProgress.progress}
                    onCancelUploading={this.handleCancelUploading}
                  />
                ) : (
                  <MessageFilePreview
                    customType={message.customType}
                    url={message.url}
                    name={message.name}
                  />
                )
              }
              <p>
                <a href={message.url || '#'} target="_blank">
                  {message.name} ({message.size} кб)
                </a>
              </p>
            </div>
            ) : null}
          {this.state.onEdit ? (
            <EditMessageForm
              text={message.message || message.data}
              onEditMessage={this.handleSubmit}
            />
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
          <Button onClick={this.handleDeleteBtn} id="delMessage" className="x-btn">
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        ) : null}
        {userId === message.sender.userId ? (
          <Button onClick={this.handleEditMessage} if="editMessage" className="edit-btn">
            <FontAwesomeIcon icon={faPen} />
          </Button>
        ) : null}
      </Message>
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
