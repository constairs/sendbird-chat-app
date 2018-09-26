import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserForm } from '../../components/UserForm';
import { ImgRound } from '../../components/ImgRound';
import { changeUserRequest, logoutUserRequest } from '../../redux/user/actions';

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  h2 {
    margin-left: 10px;
  }
`;
const ImgWrap = styled(ImgRound)`
  ${props => props.theme.imgWrap}
`;

const LogoutBtn = styled.button`
  ${props => props.theme.buttons.btn}
  width: 20px;
  height: 20px;
  padding: 0;
  background-color: #e4dcdc;
  font-size: 12px;
  text-align: center;
  margin: 8px;
`;

export class Profile extends React.Component {
  state = {
    modalIsOpen: false,
  };

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };

  handleChangeProfile = (formData) => {
    this.props.userActions.changeUserRequest(formData);
    this.setState({ modalIsOpen: false });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleLogout = () => {
    if (this.props.channelUrl && this.props.channelType) {
      this.props.userActions.logoutUserRequest({
        channelUrl: this.props.channelUrl,
        channelType: this.props.channelType
      });
    } else {
      this.props.userActions.logoutUserRequest();
    }
  };

  render() {
    const { userName, userImg } = this.props.user;

    return (
      <ProfileCard className={this.props.className}>
        <ImgWrap src={userImg} btn btnTitle="change" onClickBtn={this.handleOpenModal} additionalTitle="Change profile data" />
        <h2>{userName}</h2>
        <LogoutBtn
          className="user-logout-btn"
          title="Logout"
          onClick={this.handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} size="xs" />
        </LogoutBtn>
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button className="x-btn" onClick={this.closeModal}>
            x
          </button>
          <UserForm onChangeProfile={this.handleChangeProfile} />
        </Modal>
      </ProfileCard>
    );
  }
}

Profile.defaultProps = {
  className: ''
};

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  userActions: PropTypes.objectOf(PropTypes.any).isRequired,
  channelUrl: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const UserProfile = connect(
  state => ({
    user: state.persistedUser,
    channelUrl: state.channels.channel ? state.channels.channel.url : '',
    channelType: state.channels.channel ? state.channels.channel.channelType : '',
  }),
  dispatch => ({
    userActions: bindActionCreators({
      changeUserRequest,
      logoutUserRequest
    }, dispatch),
  })
)(Profile);
