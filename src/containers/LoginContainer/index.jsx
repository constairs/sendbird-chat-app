import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Redirect } from 'react-router';
import * as userActions from '../../redux/user/actions';
import { LoginForm } from '../../components/LoginForm';

import './index.css';

class LoginConnected extends React.Component {
  handleLogin = (data) => {
    this.props.userActions.loginUserRequest(data);
  };

  handleLogout = () => {
    this.props.userActions.logoutUserRequest();
  };

  handleChangeProfile = (formData) => {
    this.props.userActions.changeUserRequest(formData);
  };

  render() {
    return (
      <div className="page login-page">
        {this.props.user.userFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={100} />
          </div>
        ) : null}
        {this.props.user.logged ? (
          <Redirect to="/channels" />
        ) : (
          <LoginForm onLogin={this.handleLogin} />
        )}
        <Modal
          className="modal"
          isOpen={this.props.user.err}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h2>Произошла ошибка при подключении</h2>
          <button className="x-btn" onClick={this.closeModal}>
            x
          </button>
          <button onClick={this.props.userActions.userReconnect()}>
            Попробовать снова
          </button>
        </Modal>
      </div>
    );
  }
}

LoginConnected.propTypes = {
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

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginConnected);
