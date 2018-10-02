import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../UI/Button';

export const WindowInner = styled.div`
  width: 280px;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0,0,0,.33);
  padding: 20px;
  position: fixed;
  top: 10%;
  right: 10px;
  background-color: ${props => props.theme.colors.light};
  transition: .3s ease-in-out;
  z-index: 10;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};  
  opacity: ${props => (props.show ? 100 : 0)};
  .x-btn {
    background-color: #d6d4d4;
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    padding: 0;
    font-size: 10px;
    &:hover {
      background-color: #ccc;
    }
  }
`;

export class NotificationWindow extends React.Component {
  handleClose = () => {
    this.props.onNotificationClose();
  };

  render() {
    const {
      user, channel, type
    } = this.props.notification;
    const { nickname } = this.props;
    return (
      <WindowInner show={this.props.notificationShow} >
        {type === 'onUserJoined' ? (
          <p>
            {
              user.nickname === nickname
              ? `Вас пригласили в групповой канал ${channel.name}`
              : `Пользователь ${user.nickname} присоединился к каналу ${
                channel.name
              }`
            }
          </p>
        ) : (
          <p>
            {
              user.nickname === nickname
              ? `Вы покинули в групповой канал ${channel.name}`
              : `Пользователь ${user.nickname} покинул канал ${channel.name}`
            }
          </p>
        )}
        <Button className="x-btn" onClick={this.handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </WindowInner>
    );
  }
}

NotificationWindow.defaultProps = {
  notificationShow: false,
};

NotificationWindow.propTypes = {
  notificationShow: PropTypes.bool,
  onNotificationClose: PropTypes.func.isRequired,
  notification: PropTypes.objectOf(PropTypes.any).isRequired,
  nickname: PropTypes.string.isRequired,
};
