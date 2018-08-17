import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export class MessageItem extends React.Component {
  handleDeleteBtn = () => {
    this.props.onDeleteMessage(this.props.cur);
  }
  render() {
    const { cur } = this.props;
    return (
      <div className="message-item" id={cur.messageId} key={cur.createdAt} >
        <div className="sender-img"><img src={cur.sender.profileUrl ? cur.sender.profileUrl : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'} alt={cur.nickname} /></div>
        <div>
          <p className="sender-info">
            <span className="sender-nick">{cur.sender.nickname}</span>
            <span className="sending-date">{moment(cur.createdAt).format('DD/MM/YY hh:mm a')}</span>
          </p>
          <p className="message-text">{cur.customType}</p>
        </div>
        <button onClick={this.handleDeleteBtn} className="x-btn">x</button>
      </div>
    );
  }
}

MessageItem.propTypes = {
  onDeleteMessage: PropTypes.func.isRequired,
  cur: PropTypes.objectOf(PropTypes.any).isRequired
};
