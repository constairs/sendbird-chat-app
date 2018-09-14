import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { loginUserRequest, clearLoginError } from '../../redux/user/actions';
import { LoginForm } from '../../components/LoginForm';

import './index.scss';

class LoginConnected extends React.Component {
  handleLogin = (data) => {
    this.props.userActions.loginUserRequest(data);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="page login-page">
        {user.userFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={100} />
          </div>
        ) : null}
        {user.logged ? (
          <Redirect to="/channels" />
        ) : (
          <LoginForm onLogin={this.handleLogin} />
        )}
        {
          <Modal
            className="modal file-upload-modal"
            isOpen={!!user.error}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.fileUploadModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <button className="x-btn" onClick={this.props.userActions.clearLoginError}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>{user.error}</h3>
          </Modal>
        }

      </div>
    );
  }
}

LoginConnected.propTypes = {
  userActions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const LoginContainer = connect(
  state => ({ user: state.persistedUser, }),
  dispatch => ({
    userActions: bindActionCreators({
      loginUserRequest,
      clearLoginError
    }, dispatch)
  })
)(LoginConnected);
