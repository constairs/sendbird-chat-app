import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserForm } from '../../components/UserForm';
import * as userActions from '../../redux/user/actions';

import './index.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleChangeProfile = (formData) => {
    this.props.userActions.changeUserRequest(formData);
    this.setState({ showModal: false });
  }

  render() {
    const { userName, userImg } = this.props.user;

    return (
      <div className="user-profile">
        <div className="user-cover">
          <img src={userImg} alt="user-img" />
          <button onClick={this.handleOpenModal}>Change</button>
        </div>
        <h2 className="user-nickname">
          {userName}
        </h2>
        <button className="user-logout-btn" title="logout" onClick={this.props.userActions.logoutUserRequest}><FontAwesomeIcon icon={faSignOutAlt} size="xs" /></button>
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
    );
  }
}

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  userActions: PropTypes.objectOf(PropTypes.any).isRequired
};


function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
