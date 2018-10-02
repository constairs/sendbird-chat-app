import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StyledHeader, HeaderUserProfile, Nav } from './index.styles';

export class Head extends React.Component {
  state = {};
  render() {
    const { logged } = this.props;
    return (
      <StyledHeader>
        <Nav>
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
        </Nav>
        {logged ? (
          <HeaderUserProfile />
        ) : (
          <div>
            <Link href="/login" to="/login">
              Войти
            </Link>
          </div>
        )}
      </StyledHeader>
    );
  }
}

Head.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export const Header = connect(
  state => ({ logged: state.persistedUser.logged, }),
)(Head);
