import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getSelectedChannel, leaveChannel } from '../../redux/channels/actions';
import { createGroupChannel, inviteUsers, notificationOff } from '../../redux/channels/groupChannelsActions';
import { createOpenChannel } from '../../redux/channels/openChannelsActions';
import { CreateChannelForm } from '../../components/CreateChannelForm';
import { CreateGroupForm } from '../../components/CreateGroupForm';
import { Channel } from '../../components/Channel';
import { NotificationWindow } from '../../components/NotificationWindow';
import { Page } from '../../components/UI/Page';
import { FlexContainer } from '../../components/UI/FlexContainer';
import { media } from '../../theme/media';
import { Preloader } from '../../components/UI/Preloader';
import { ModalWindow } from '../../components/UI/ModalWindow';
import { ChannelsSidebar } from '../ChannelSidebar';

const ChannelsPage = styled(Page)`
`;

const BurgerButton = styled.button`
  position: absolute;
  top: -20px;
  left: 15px;
  z-index: 10;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  box-shadow: 5px 0 25px rgba(0,0,0,.4);
  transition: .2s all;
  display:none;
  ${media.tablet`
    display:block;
    left: ${props => (props.isOpen ? '215px' : '15px')};
  `}
`;

const ChannelContent = styled.div`
  width: 70%;
  ${media.tablet`width: 100%`}
`;

export class Channels extends React.Component {
  state = {
    modalIsOpen: false,
    groupChModal: false,
    sidebarIsOpen: false,
  };

  handleOpenChannel = (formData) => {
    this.props.createOpenChannel(formData);
    this.setState({ modalIsOpen: false });
  };

  handleGroupChannel = (formData) => {
    this.props.groupChannelsActions.createGroupChannel(formData);
    this.setState({ modalIsOpen: false });
  };

  handleInviteUsers = (formData) => {
    this.props.groupChannelsActions.inviteUsers(formData);
  };

  handleNotificationClose = () => {
    this.props.groupChannelsActions.notificationOff();
  };

  handleGetChannel = (selectedChannel) => {
    if (this.props.channels.channel && this.props.channels.channelType === 'open') {
      this.props.channelsActions.leaveChannel({
        channelUrl: this.props.channels.channel.url,
        channelType: this.props.channels.channel.channelType
      });
    }
    this.props.channelsActions.getSelectedChannel(selectedChannel);
  };

  handleLeaveChannel = (channelInfo) => {
    this.props.channelsActions.leaveChannel(channelInfo);
  };

  handleOpenModal = (type) => {
    if (type === 'open') {
      this.setState({ groupChModal: false, modalIsOpen: true });
    } else {
      this.setState({ groupChModal: true, modalIsOpen: true });
    }
  };

  handleOpenSidebar = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { groupChModal, sidebarIsOpen } = this.state;
    const {
      channel,
      channelFetching,
      notificationShow,
      notification,
    } = this.props.channels;
    const { userName, userFetching } = this.props.user;
    return (
      <ChannelsPage>
        {
          userFetching || channelFetching ? (
            <Preloader color="#ffffff" secondaryColor="#40c9ff" size={100} />
          ) : null
        }
        <FlexContainer>
          <BurgerButton isOpen={sidebarIsOpen} onClick={this.handleOpenSidebar}>
            <FontAwesomeIcon icon={sidebarIsOpen ? faTimes : faBars} />
          </BurgerButton>
          <ChannelsSidebar openModal={this.handleOpenModal} sidebarIsOpen={sidebarIsOpen} />
          {
          channel ? (
            <ChannelContent>
              <Channel
                user={this.props.user}
                channel={channel}
              />
            </ChannelContent>
          ) : null
          }
        </FlexContainer>
        <ModalWindow
          className="modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button className="x-btn" onClick={this.closeModal}>x</button>
          {
            groupChModal ? (
              <CreateGroupForm onSubmitForm={this.handleGroupChannel} />
            ) : (
              <CreateChannelForm onSubmitForm={this.handleOpenChannel} />
            )
          }
        </ModalWindow>
        <NotificationWindow
          notificationShow={notificationShow}
          notification={notification}
          nickname={userName}
          onNotificationClose={this.handleNotificationClose}
        />
      </ChannelsPage>
    );
  }
}

Channels.propTypes = {
  channelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  groupChannelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  createOpenChannel: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  channels: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const ChannelsConstainer = connect(
  state => ({
    user: state.persistedUser,
    channels: state.channels,
  }),
  dispatch => ({
    channelsActions: bindActionCreators({
      getSelectedChannel,
      leaveChannel
    }, dispatch),
    groupChannelsActions: bindActionCreators({
      createGroupChannel,
      inviteUsers,
      notificationOff
    }, dispatch),
    createOpenChannel: bindActionCreators(createOpenChannel, dispatch),
  })
)(Channels);
