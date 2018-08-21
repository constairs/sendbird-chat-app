import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../redux/user/actions';
import { UserProfile } from '../UserProfile';

import './index.scss';

class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link href="/" to="/">Home</Link></li>
            <li><Link href="/profile" to="/profile">Profile</Link></li>
            {this.props.user.logged ?
              <li><Link href="/channels" to="/channels">Channels</Link></li>
            :
            null
            }
          </ul>
        </nav>
        {this.props.user.logged ?
          <UserProfile />
        :
          <div>
            <Link href="/login" to="/login">Войти</Link>
          </div>
        }
      </header>
    );
  }
}

Head.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Head);
