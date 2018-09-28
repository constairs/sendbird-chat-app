import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { loginUserRequest, clearLoginError } from '../../redux/user/actions';
import { LoginForm } from '../../components/LoginForm';
import { Page } from '../../components/UI/Page';
import { Preloader } from '../../components/UI/Preloader';

const LoginPage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center; 
`;

export class Login extends React.Component {
  handleLogin = (data) => {
    this.props.userActions.loginUserRequest(data);
  };
  handleCloseModal = () => {
    this.props.userActions.clearLoginError();
  }

  render() {
    const { user } = this.props;
    return (
      <LoginPage>
        {user.userFetching ? (
          <Preloader color="#ffffff" secondaryColor="#40c9ff" size={100} />
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
            onRequestClose={this.handleCloseModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <button className="x-btn" onClick={this.handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>{user.error}</h3>
          </Modal>
        }
      </LoginPage>
    );
  }
}

Login.propTypes = {
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
)(Login);
