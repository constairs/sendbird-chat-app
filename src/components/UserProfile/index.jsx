import React from 'react';
import PropTypes from 'prop-types';
import { UserForm } from '../../components/UserForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

export class UserProfile extends React.Component {
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
    this.props.onChangeProfile(formData);
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
        <button className="user-logout-btn" title="logout" onClick={this.props.onLogout}><FontAwesomeIcon icon={faSignOutAlt} size="xs" /></button>
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

UserProfile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  onLogout: PropTypes.func.isRequired,
  onChangeProfile: PropTypes.func.isRequired,
};
