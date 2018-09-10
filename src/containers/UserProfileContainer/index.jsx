import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as userActions from '../../redux/user/actions';
import { UserForm } from '../../components/UserForm';

import './index.scss';

class UserProfile extends React.Component {
  state = {
    modalIsOpen: false,
  };

  handleLogout = () => {
    this.props.userActions.logoutUserRequest();
  };

  handleChangeProfile = (formData) => {
    this.props.userActions.changeUserRequest(formData);
  };

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };

  handleChangeProfile = (formData) => {
    this.props.userActions.changeUserRequest(formData);
    this.setState({ modalIsOpen: false });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  render() {
    const { userName, userImg, userFetching } = this.props.user;

    return (
      <div>
        {userFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={100} />
          </div>
        ) : (
          <div className="user-profile">
            <div className="user-cover">
              <img src={userImg} alt="user-img" />
              <button onClick={this.handleOpenModal}>Change</button>
            </div>
            <h2 className="user-nickname">{userName}</h2>
            <button
              className="user-logout-btn"
              title="logout"
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
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <UserForm onChangeProfile={this.handleChangeProfile} />
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

UserProfile.propTypes = {
  userActions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
