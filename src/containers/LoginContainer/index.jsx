import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import * as userActions from '../../redux/user/actions';
import { LoginForm } from '../../components/LoginForm';
import { UserProfile } from '../../components/UserProfile';

import './index.css';

class LoginConnected extends React.Component {
  handleLogin = (data) => {
    this.props.userActions.loginUserRequest(data);
  }

  render() {
    return (
      <div className="page login-page">
        {
          this.props.user.fetching ?
            <div className="preloader">
              <Spinner
                color="#ffffff"
                secondaryColor="#40c9ff"
                size={200}
              />
            </div>
          : null
        }
        {
          this.props.user.userName ?
            <UserProfile user={this.props.user} />
             :
            <LoginForm onLogin={this.handleLogin} />
        }
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
