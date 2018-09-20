import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserForm } from '../../components/UserForm';
import { changeUserRequest, logoutUserRequest } from '../../redux/user/actions';

import './index.scss';

export class Profile extends React.Component {
  state = {
    modalIsOpen: false,
  };

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };

  handleChangeProfile = (formData) => {
    this.props.userActions.changeUserRequest(formData);
    this.setState({ modalIsOpen: false });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleLogout = () => {
    if (this.props.channelUrl && this.props.channelType) {
      this.props.userActions.logoutUserRequest({
        channelUrl: this.props.channelUrl,
        channelType: this.props.channelType
      });
    } else {
      this.props.userActions.logoutUserRequest();
    }
  };

  render() {
    const { userName, userImg } = this.props.user;

    return (
      <div className="user-profile">
        <div className="user-cover">
          <img src={userImg} alt="user-img" />
          <button onClick={this.handleOpenModal} className="change-profile-btn" title="Change profile data">
            Change
          </button>
        </div>
        <h2 className="user-nickname">{userName}</h2>
        <button
          className="user-logout-btn"
          title="Logout"
          onClick={this.handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} size="xs" />
        </button>
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
          <UserForm onChangeProfile={this.handleChangeProfile} />
        </Modal>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  userActions: PropTypes.objectOf(PropTypes.any).isRequired,
  channelUrl: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
};

export const UserProfile = connect(
  state => ({
    user: state.persistedUser,
    channelUrl: state.channels.channel ? state.channels.channel.url : '',
    channelType: state.channels.channel ? state.channels.channel.channelType : '',
  }),
  dispatch => ({
    userActions: bindActionCreators({
      changeUserRequest,
      logoutUserRequest
    }, dispatch),
  })
)(Profile);
