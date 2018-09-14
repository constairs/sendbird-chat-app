import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserProfile } from '../UserProfile';

import './index.scss';

class Head extends React.Component {
  state = {};
  render() {
    const { logged } = this.props;
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/profile" to="/profile">
                Profile
              </Link>
            </li>
            {logged ? (
              <li>
                <Link href="/channels" to="/channels">
                  Channels
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
        {logged ? (
          <UserProfile />
        ) : (
          <div>
            <Link href="/login" to="/login">
              Войти
            </Link>
          </div>
        )}
      </header>
    );
  }
}

Head.propTypes = {
  logged: PropTypes.bool.isRequired,
};


export const Header = connect(
  state => ({ logged: state.persistedUser.logged, }),
)(Head);
