import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as userActions from '../../redux/user/actions';
import { UserForm } from '../../components/UserForm';
import { checkLogin } from '../../utils/checkLogin';

import './index.scss';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentWillMount() {
    if (!this.props.user.userName) {
      if (checkLogin()) {
        this.props.userActions.loginUserRequest(checkLogin());
      }
    }
  }

  componentDidUpdate() {
    if (!localStorage.getItem('user')) {
      this.props.history.push('/login/');
    }
  }

  handleLogout = () => {
    this.props.userActions.logoutUserRequest();
  }

  handleChangeProfile = (formData) => {
    this.props.userActions.changeUserRequest(formData);
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleChangeProfile = (formData) => {
    this.props.userActions.changeUserRequest(formData);
    this.setState({ showModal: false });
  }

  render() {
    const { userName, userImg, fetching } = this.props.user;

    return (
      <div>
        {
          fetching ?
            <Spinner
              color="#ffffff"
              secondaryColor="#40c9ff"
              size={200}
            />
          :
            <div className="user-profile">
              <div className="user-cover">
                <img src={userImg} alt="user-img" />
                <button onClick={this.handleOpenModal}>Change</button>
              </div>
              <h2 className="user-nickname">
                {userName}
              </h2>
              <button className="user-logout-btn" title="logout" onClick={this.handleLogout}><FontAwesomeIcon icon={faSignOutAlt} size="xs" /></button>
              {
                this.state.showModal ?
                  <div className="modal-wrap">
                    <div className="modal">
                      <UserForm onChangeProfile={this.handleChangeProfile} />
                    </div>
                  </div>
                :
                null
              }
            </div>
      }
      </div>
    );
  }
}

UserProfile.propTypes = {
  userActions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
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

export const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
