import React from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { UpdateChannelForm } from '../UpdateChannelForm';
import { ChatBox } from '../../containers/ChatBox';

export class GroupChannel extends React.Component {
  state = {
    modalIsOpen: false,
  };
  handleLeaveBtn = () => {
    this.props.onLeave(this.props.channel.url);
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
    return (
      <div className="channel-item">
        <div className="channel-header">
          <div className="channel-info">
            <div className="img-place">
              <img
                src={
                  channel.coverUrl ||
                  'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={channel.name}
              />
              {/* <button onClick={this.handleOpenEditor}>
                <FontAwesomeIcon icon={faPen} />
              </button> */}
            </div>
            <div>
              <h1 className="channel-name">{channel.name}</h1>
              <p className="channel-users">Участники: {channel.memberCount}</p>
            </div>
          </div>
          <div className="channel-users-list">
            <ul className="users-list">
              {channel.members.map((cur, i) => (
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
              ))}
            </ul>
          </div>
        </div>
        <ChatBox currentChannel={channel} />
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

GroupChannel.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
  onLeave: PropTypes.func.isRequired,
  onUpdateChannel: PropTypes.func.isRequired,
};
