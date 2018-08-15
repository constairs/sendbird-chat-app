import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export class UserProfile extends React.Component {
  handleChangeCover = () => {

  }

  render() {
    const { userName, userImg } = this.props.user;

    return (
      <div className="user-profile">
        <div className="user-cover">
          <img src={userImg} alt="user-img" />
          <button onClick={this.handleChangeCover}>change</button>
        </div>
        <h2 className="user-nickname">
          {userName}
        </h2>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
