import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ChatBox } from '../ChatBox';
import { UpdateChannelForm } from '../UpdateChannelForm';

import './index.scss';

export class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  handleLeaveBtn = () => {
    this.props.onLeave(this.props.channel.url);
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handleEditBtnClick = () => {
    this.setState({
      modalIsOpen: true,
    });
  }

  handleUpdateChannel = (formData) => {
    this.props.channel.update(formData[1]);
  }

  render() {
    const { name, participantCount } = this.props.channel;
    return (
      <div className="channel-item">
        <div className="channel-info">
          <div className="img-place"><img src={this.props.channel.coverUrl ? this.props.channel.coverUrl : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'} alt={name} /><button className="edit-btn" onClick={this.handleEditBtnClick}><FontAwesomeIcon icon={faPen} /></button></div>
          <div>
            <h1 className="channel-name">{name}</h1>
            <p className="channel-users">Online: {participantCount}</p>
            <ul className="users-list">
              {
                this.props.participants.map(cur => (
                  <li key={cur.userId}><div className="img-place"><img src={cur.profileUrl} title={cur.nickname} alt={cur.nickname} /> {cur.connectionStatus === 'online' ? <span className="connection-status online" /> : <span className="connection-status" />}</div></li>
                )
              )
              }
            </ul>
          </div>
          <button onClick={this.handleLeaveBtn}>Покинуть канал</button>
        </div>
        <ChatBox />
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button className="x-btn" onClick={this.closeModal}>x</button>
          <UpdateChannelForm onSubmitForm={this.handleUpdateChannel} />
        </Modal>
      </div>
    );
  }
}

Channel.defaultProps = {
  participants: [],
};

Channel.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
  onLeave: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.any),
};

