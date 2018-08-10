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
          <Spinner
            color="#FF4601"
            secondaryColor="#40c9ff"
            size="100"
          />
          : null
        }
        <LoginForm onLogin={this.handleLogin} />
        {this.props.user.user ? <p>{this.props.user.user}</p> : null}
      </div>
    );
  }
}

LoginConnected.propTypes = {
  userActions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: PropTypes.shape.isRequired

};

function mapStateToProps(state) {
  return {
    user: state
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
