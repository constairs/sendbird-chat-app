import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import * as userActions from '../../redux/user/actions';
import { LoginForm } from '../../components/LoginForm';

import './index.css';

class LoginConnected extends React.Component {
  handleLogin = (data) => {
    this.props.userActions.loginUserRequest(data);
  }

  render() {
    return (
      <div className="page login-page">
        {this.props.user.fetching ?
          <div className="preloader">
            <Spinner
              color="#80f0c1"
              secondaryColor="#f7a2c9"
              size="200"
            />
          </div>
          : null
        }
        {
          this.props.user.user ?
            <p>{this.props.user.user}</p> :
            <LoginForm onLogin={this.handleLogin} />
        }
      </div>
    );
  }
}

LoginConnected.propTypes = {
  userActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginConnected);
