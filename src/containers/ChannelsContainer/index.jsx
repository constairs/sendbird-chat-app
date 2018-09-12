import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import * as channelsActions from '../../redux/channels/actions';
import * as groupChannelsActions from '../../redux/channels/groupChannelsActions';
import * as openChannelsActions from '../../redux/channels/openChannelsActions';
import { CreateChannelForm } from '../../components/CreateChannelForm';
import { CreateGroupForm } from '../../components/CreateGroupForm';
import { ChannelList } from '../../components/ChannelList';
import { Channel } from '../../components/Channel';
import { NotificationWindow } from '../NotificationWindow';

class Channels extends React.Component {
  state = {
    modalIsOpen: false,
    groupChModal: false,
  };

  handleOpenChannel = (formData) => {
    this.props.openChannelsActions.createOpenChannel(formData);
    this.setState({ modalIsOpen: false });
  };

  handleGroupChannel = (formData) => {
    this.props.groupChannelsActions.createGroupChannel(formData);
    this.setState({ modalIsOpen: false });
  };

  handleGetChannel = (selectedChannel) => {
    this.props.channelsActions.getSelectedChannel(selectedChannel);
  };

  handleLeaveChannel = (channelInfo) => {
    this.props.channelsActions.leaveChannel(channelInfo);
  };

  handleInviteUsers = (formData) => {
    this.props.groupChannelsActions.inviteUsers(formData);
  };

  handleUpdateChannel = (updateData) => {
    this.props.channelsActions.updateChannel(updateData);
  };

  handleOpenModal = (e) => {
    if (e.target.name === 'createOpen') {
      this.setState({ groupChModal: false, modalIsOpen: true });
    } else {
      this.setState({ groupChModal: true, modalIsOpen: true });
    }
  };

  handleNotificationClose = () => {
    this.props.groupChannelsActions.notificationOff();
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { groupChModal } = this.state;
    const {
      openChannelList, groupChannelList, channel, channelsFetching
    } = this.props.channels;
    const { userFetching } = this.props.user;
    return (
      <div className="page channel-page">
        {channelsFetching || userFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={100} />
          </div>
        ) : null}
        <div className="flex-container">
          <div className="channel-sidebar">
            <button name="createOpen" onClick={this.handleOpenModal}>
              Создать открытый канал
            </button>
            {openChannelList.length > 0 ? (
              <div>
                <p>Открытые каналы</p>
                <ChannelList
                  onLeave={this.handleLeaveChannel}
                  selectedChan={this.handleGetChannel}
                  channels={openChannelList}
                  fetching={channelsFetching}
                />
              </div>
            ) : null}
            <button name="createGroup" onClick={this.handleOpenModal}>
              Создать групповой канал
            </button>
            {groupChannelList.length > 0 ? (
              <div>
                <p>
                    Групповые каналы
                </p>
                <ChannelList
                  onLeave={this.handleLeaveChannel}
                  selectedChan={this.handleGetChannel}
                  channels={groupChannelList}
                  fetching={channelsFetching}
                  inviteUsers={this.handleInviteUsers}
                />
              </div>
            ) : null}
          </div>
          {
            channel ? (
              <div className="channel-page-content">
                <Channel
                  onLeave={this.handleLeaveChannel}
                  onUpdateChannel={this.handleUpdateChannel}
                  user={this.props.user}
                  channel={channel}
                />
              </div>
            ) : null
          }
        </div>
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
          notificationShow={this.props.notificationShow}
          notification={this.props.notification}
          nickname={this.props.user.userName}
          onNotificationClose={this.handleNotificationClose}
        />
      </div>
    );
  }
}

Channels.defaultProps = {
  notificationShow: false,
};

Channels.propTypes = {
  channelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  groupChannelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  openChannelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  channels: PropTypes.objectOf(PropTypes.any).isRequired,
  notificationShow: PropTypes.bool,
  notification: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    channels: state.channelsReducer,
    notification: state.channelsReducer.notification,
    notificationShow: state.channelsReducer.notificationShow,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    channelsActions: bindActionCreators(channelsActions, dispatch),
    groupChannelsActions: bindActionCreators(groupChannelsActions, dispatch),
    openChannelsActions: bindActionCreators(openChannelsActions, dispatch),
  };
}

export const ChannelsConstainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
