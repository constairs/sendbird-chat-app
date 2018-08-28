import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import * as openChannelsActions from '../../redux/openChannels/actions';
import * as groupChannelsActions from '../../redux/groupChannels/actions';
import { CreateChannelForm } from '../../components/CreateChannelForm';
import { CreateGroupForm } from '../../components/CreateGroupForm';
import { ChannelList } from '../../components/ChannelList';
import { Channel } from '../../components/Channel';
import { GroupChannel } from '../../components/GroupChannel';

class OpenChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      groupChModal: false,
    };
  }

  handleOpenChannel = (formData) => {
    this.props.openChannelsActions.createOpenChannel(formData);
    this.setState({ modalIsOpen: false });
  };

  handleGroupChannel = (formData) => {
    this.props.groupChannelsActions.createGroupChannel(formData);
    this.setState({ modalIsOpen: false });
  };

  handleGetChannel = (selectedChan) => {
    if (selectedChan.channelType === 'open') {
      this.props.openChannelsActions.enterChannel(selectedChan.channelUrl);
    } else {
      this.props.groupChannelsActions.getGroupChannel(selectedChan);
    }
  };

  handleInviteUsers = (formData) => {
    this.props.groupChannelsActions.inviteUsers(formData);
  };

  hanldeLeaveGroup = (channelUrl) => {
    this.props.groupChannelsActions.leaveGroup(channelUrl);
  };

  handleLeaveChannel = (channelUrl) => {
    this.props.openChannelsActions.leaveChannel(channelUrl);
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
    const { channelsList, channel } = this.props.openChannels;
    const { groupChannelsList, groupChannel } = this.props.groupChannels;
    const { groupChModal } = this.state;
    return (
      <div className="page channel-page">
        {this.props.openChannels.fetching || this.props.user.userFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={100} />
          </div>
        ) : null}
        <div className="flex-container">
          <div className="channel-sidebar">
            <button name="createOpen" onClick={this.handleOpenModal}>
              Создать открытый канал
            </button>
            {channelsList ? (
              <div>
                <h3>Открытые каналы</h3>
                <ChannelList
                  selectedChan={this.handleGetChannel}
                  channels={channelsList}
                  fetching={this.props.openChannels.fetching}
                  group={false}
                />
              </div>
            ) : null}
            <button name="createGroup" onClick={this.handleOpenModal}>
              Создать групповой канал
            </button>
            {groupChannelsList.length > 0 ? (
              <div>
                <h3>Групповые каналы</h3>
                <ChannelList
                  selectedChan={this.handleGetChannel}
                  channels={groupChannelsList}
                  groupsFetching={this.props.groupChannels.groupsFetching}
                  inviteUsers={this.handleInviteUsers}
                  leaveGroup={this.hanldeLeaveGroup}
                  group
                />
              </div>
            ) : null}
          </div>
          {channel ? (
            <Channel
              onEnter={this.handleEnterChannel}
              onLeave={this.handleLeaveChannel}
              user={this.props.user}
              channel={channel}
              participants={this.props.openChannels.participants}
            />
          ) : null}
          {groupChannel ? (
            <GroupChannel
              // onEnter={this.handleEnterChannel}
              onLeave={this.handleLeaveChannel}
              user={this.props.user}
              channel={groupChannel}
              // participants={this.props.groupChannel.members}
            />
          ) : null}
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
      </div>
    );
  }
}

OpenChannel.propTypes = {
  openChannelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  groupChannelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  openChannels: PropTypes.objectOf(PropTypes.any).isRequired,
  groupChannels: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    openChannels: state.openChannelsReducer,
    groupChannels: state.groupChannelsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openChannelsActions: bindActionCreators(openChannelsActions, dispatch),
    groupChannelsActions: bindActionCreators(groupChannelsActions, dispatch),
  };
}

export const OpenChannelsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenChannel);
