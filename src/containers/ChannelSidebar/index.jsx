import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getSelectedChannel, leaveChannel } from '../../redux/channels/actions';
import { inviteUsers, notificationOff } from '../../redux/channels/groupChannelsActions';
import { ChannelList } from '../../components/ChannelList';
import { media } from '../../theme/media';

const StyledSidebar = styled.div`
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
    box-shadow: 8px 0 20px -5px rgba(0,0,0, .33);
    visibility: ${props => (props.sidebarIsOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.sidebarIsOpen ? '100' : '0')}
    transform: ${props => (props.sidebarIsOpen ? 'translateX(-20px)' : 'translateX(-300px)')}
  `};
  ${media.phoneSm`
    height: calc(100vh - 104px);
  `};
`;

export class Sidebar extends React.Component {
  handleInviteUsers = (formData) => {
    this.props.groupChannelsActions.inviteUsers(formData);
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
      this.props.openModal('open');
    } else {
      this.props.openModal('group');
    }
  };

  render() {
    const {
      openChannelList,
      groupChannelList,
      channel,
      channelsFetching,
    } = this.props.channels;
    return (
      <StyledSidebar sidebarIsOpen={this.props.sidebarIsOpen}>
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
      </StyledSidebar>
    );
  }
}

Sidebar.propTypes = {
  channelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  groupChannelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  channels: PropTypes.objectOf(PropTypes.any).isRequired,
  openModal: PropTypes.func.isRequired,
  sidebarIsOpen: PropTypes.bool.isRequired,
};

export const ChannelsSidebar = connect(
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
      inviteUsers,
      notificationOff
    }, dispatch),
  })
)(Sidebar);
