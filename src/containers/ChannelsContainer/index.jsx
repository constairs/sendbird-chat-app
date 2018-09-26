import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';
import { getSelectedChannel, leaveChannel } from '../../redux/channels/actions';
import { createGroupChannel, inviteUsers, notificationOff } from '../../redux/channels/groupChannelsActions';
import { createOpenChannel } from '../../redux/channels/openChannelsActions';
import { CreateChannelForm } from '../../components/CreateChannelForm';
import { CreateGroupForm } from '../../components/CreateGroupForm';
import { ChannelList } from '../../components/ChannelList';
import { Channel } from '../../components/Channel';
import { NotificationWindow } from '../../components/NotificationWindow';
import { Page } from '../../theme/Page';
import { FlexContainer } from '../../theme/FlexContainer';

const ChannelsPage = styled(Page)`
  .channel-sidebar {
    width: 30%;
    transition: .2s;
    height: calc(100vh - 172px);
    overflow-y: scroll;
    margin-right: 20px;
    padding-right: 10px;
    &.min {
      width: 35%;
    }
  }
  .channel-page-content {
    width: 70%;
  }
`;

export class Channels extends React.Component {
  state = {
    modalIsOpen: false,
    groupChModal: false,
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
          <div className="channel-sidebar">
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
                  inviteUsers={this.handleInviteUsers}
                />
              </div>
            ) : null}
          </div>
          {
            channel ? (
              <div className="channel-page-content">
                <Channel
                  user={this.props.user}
                  channel={channel}
                />
              </div>
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
