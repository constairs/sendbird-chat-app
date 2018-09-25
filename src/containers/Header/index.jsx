import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { UserProfile } from '../UserProfile';

// import './index.scss';


// header {
//   .user-cover {
//     width: 50px;
//     button {
//       border-radius: 100%;
//       padding: 0;
//       font-size: 10px;
//       &:hover {
//         background-color: rgba(0,0,0,.33);
//       }
//     }
//   }
//   .user-nickname {
//     font-size: 16px;
//     font-weight: 400;
//   }
// }

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.light};
  display: block;
  padding: 5px 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Nav = styled.nav`
  ul {
  list-style-type: none;
  padding-left: 0;
  margin: 10px 0;
  li {
    display: inline-block;
    margin: 0 10px;
    a {
      padding: 5px 20px;
      border-radius: 3px;
      font-size: 18px;
      text-decoration: none;
      background-color: ${props => props.theme.colors.main};
      color: #ffffff;
      box-shadow: 0 0 10px rgba
      font-family:  ${props => props.theme.fonts.mainFont};
    }
  };
  }
`;

export class Head extends React.Component {
  state = {};
  render() {
    const { logged } = this.props;
    return (
      // <header>
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
          <UserProfile />
        ) : (
          <div>
            <Link href="/login" to="/login">
              Войти
            </Link>
          </div>
        )}
        {/* </header> */}
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
