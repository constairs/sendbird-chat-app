import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getSelectedChannel, leaveChannel } from '../../redux/channels/actions';
import { createGroupChannel, inviteUsers, notificationOff } from '../../redux/channels/groupChannelsActions';
import { createOpenChannel } from '../../redux/channels/openChannelsActions';
import { CreateChannelForm } from '../../components/CreateChannelForm';
import { CreateGroupForm } from '../../components/CreateGroupForm';
import { ChannelList } from '../../components/ChannelList';
import { Channel } from '../../components/Channel';
import { NotificationWindow } from '../../components/NotificationWindow';
import { Page } from '../../components/UI/Page';
import { FlexContainer } from '../../components/UI/FlexContainer';
import { media } from '../../theme/media';

const ChannelsPage = styled(Page)`
  .preloader {
    position: fixed;
    top: 50%;
    left: 0;
    margin-top: -50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
  ${media.desktop`display:none`}
  ${media.tablet`
    display:block;
    left: ${props => (props.isOpen ? '215px' : '15px')};
  `}
`;

const ChannelSidebar = styled.div`
  width: 30%;
  transition: .2s;
  height: calc(100vh - 172px);
  overflow-y: scroll;
  margin-right: 20px;
  padding-right: 10px;
  background-color: ${props => props.theme.colors.light};
  transition: .2s all;
  ${media.tablet`
    width: 280px;
    padding-top: 20px;
    padding-left: 20px;
    position: absolute;
    top: 0;
    height: calc(100vh - 76px);
    z-index: 5;
    box-shadow: 8px 0 20px -5px rgba(0,0,0,.33);
    visibility: ${props => (props.sidebarIsOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.sidebarIsOpen ? '100' : '0')}
    transform: ${props => (props.sidebarIsOpen ? 'translateX(-20px)' : 'translateX(-300px)')}
  `};
  ${media.phoneSm`
    height: calc(100vh - 104px);
  `};
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

  handleOpenModal = (e) => {
    if (e.target.name === 'createOpen') {
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
    const { groupChModal } = this.state;
    const {
      openChannelList,
      groupChannelList,
      channel,
      channelsFetching,
      channelFetching,
      notificationShow,
      notification,
    } = this.props.channels;
    const { userName, userFetching } = this.props.user;
    return (
      <ChannelsPage>
        {userFetching || channelFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={100} />
          </div>
        ) : null}
        <FlexContainer>
          <BurgerButton isOpen={this.state.sidebarIsOpen} onClick={this.handleOpenSidebar}>
            <FontAwesomeIcon icon={this.state.sidebarIsOpen ? faTimes : faBars} />
          </BurgerButton>
          <ChannelSidebar sidebarIsOpen={this.state.sidebarIsOpen}>
            <button name="createOpen" onClick={this.handleOpenModal}>
              Создать открытый канал
            </button>
            {openChannelList ? (
              <div>
                <p>Открытые каналы</p>
                <ChannelList
                  onLeave={this.handleLeaveChannel}
                  selectedChan={this.handleGetChannel}
                  channels={openChannelList}
                  current={channel ? channel.url : null}
                  channelsFetching={channelsFetching}
                />
              </div>
            ) : null}
            <button name="createGroup" onClick={this.handleOpenModal}>
              Создать групповой канал
            </button>
            {groupChannelList ? (
              <div>
                <p>
                    Групповые каналы
                </p>
                <ChannelList
                  onLeave={this.handleLeaveChannel}
                  selectedChan={this.handleGetChannel}
                  channels={groupChannelList}
                  channelsFetching={channelsFetching}
                  current={channel ? channel.url : null}
                  inviteUsers={this.handleInviteUsers}
                />
              </div>
            ) : null}
          </ChannelSidebar>
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
          {groupChModal ? (
            <CreateGroupForm onSubmitForm={this.handleGroupChannel} />
          ) : (
            <CreateChannelForm onSubmitForm={this.handleOpenChannel} />
          )}
        </Modal>
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
