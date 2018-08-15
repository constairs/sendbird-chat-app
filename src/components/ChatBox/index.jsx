import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

export const ChatBox = () => (
  <div className="chat-box">
    {
      this.props.messages.map((cur) => {
        return (
          <div className="message-item" key={cur.createdAt} >
            <p>
              <a href={cur.sender.propfileUrl}><FontAwesomeIcon icon={faUser} /><span className="chat-user"> {cur.sender.nickname}</span></a>
              <span> {moment(cur.createdAt).format('DD/MM/YY hh:mm a')}</span>
            </p>
            <p>{cur.customType}</p>
          </div>
        );
      })
    }
  </div>
);