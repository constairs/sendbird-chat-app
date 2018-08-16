import React from 'react';
import moment from 'moment';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './index.scss';


export class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleTextInput = (e) => {
    this.setState({ message: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const messageText = this.state.message;
    this.props.onMessageSend(messageText);
    this.setState({ message: '' });
  }

  render() {
    return (
      <div>
        <div className="chat-box">
          {
            this.props.messages.map(cur =>
              (
                <div className="message-item" key={cur.createdAt} >
                  <p>
                    <a href={cur.sender.propfileUrl}><FontAwesomeIcon icon={faUser} /><span className="chat-user"> {cur.sender.nickname}</span></a>
                    <span> {moment(cur.createdAt).format('DD/MM/YY hh:mm a')}</span>
                  </p>
                  <p>{cur.customType}</p>
                </div>
              )
            )
          }
        </div>
        <form className="chat-message-form" onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleTextInput} value={this.state.message} />
          <button className="send-message-btn">
            Отправить{
              this.props.sendingMessage ? <Spinner
                color="#ffffff"
                secondaryColor="#40c9ff"
                size={10}
              />
                :
                null
            }
          </button>
        </form>
      </div>
    );
  }
}

ChatBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.any).isRequired,
  onMessageSend: PropTypes.func.isRequired,
  sendingMessage: PropTypes.bool.isRequired
};
