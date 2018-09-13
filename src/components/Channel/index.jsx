import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ChatBox } from '../../containers/ChatBox';
import { UpdateChannelForm } from '../UpdateChannelForm';


import './index.scss';

export class Channel extends React.Component {
  state = {
    modalIsOpen: false,
  };
  handleLeaveBtn = () => {
    this.props.onLeave({
      channelUrl: this.props.channel.url,
      channelType: this.props.channel.channelType
    });
  };

  handleOpenEditor = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  handleChannelEdit = (updateData) => {
    this.props.onUpdateChannel([
      this.props.channel.url,
      this.props.channel.channelType,
      ...updateData,
    ]);
  };

  render() {
    const { channel } = this.props;
    const { name, coverUrl, memberCount } = this.props.channel;
    return (
      <div className="channel-item">
        <div className="channel-header">
          <div className="channel-info">
            <div className="img-place">
              <img
                src={
                  coverUrl ||
                  'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={name}
              />
            </div>
            {/* <button onClick={this.handleOpenEditor}>
              <FontAwesomeIcon icon={faPen} />
            </button> */}
            <div>
              <h1 className="channel-name">{name}</h1>
              <p className="channel-users">Online: {memberCount}</p>
            </div>
          </div>
          <div className="channel-users-list">
            <ul className="users-list">
              {channel.members ? channel.members.map((cur, i) => (
                <li
                  style={{ transform: `translateX(calc(${i}*(50%)))` }}
                  key={cur.userId}
                >
                  <div className="img-place">
                    <img
                      src={cur.profileUrl}
                      title={cur.nickname}
                      alt={cur.nickname}
                    />{' '}
                    {cur.connectionStatus === 'online' ? (
                      <span className="connection-status online" />
                    ) : (
                      <span className="connection-status" />
                    )}
                  </div>
                </li>
              )) : null}
            </ul>
          </div>
        </div>
        <ChatBox
          currentChannel={channel}
        />
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button className="x-btn" onClick={this.closeModal}>
            x
          </button>
          <UpdateChannelForm onSubmitForm={this.handleChannelEdit} />
        </Modal>
      </div>
    );
  }
}

Channel.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
  onLeave: PropTypes.func.isRequired,
  onUpdateChannel: PropTypes.func.isRequired,
};
