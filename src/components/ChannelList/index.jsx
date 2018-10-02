import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ChannelListItem } from '../ChannelListItem';
import { Preloader } from '../UI/Preloader';

export const List = styled.ul`
  padding-left: 0;
  list-style-type: none;
  margin-top: 20px;
  margin-bottom: 30px;
  position: relative;
  min-height: 200px;
`;

export class ChannelList extends React.Component {
  handleChanSelect = (element) => {
    this.props.selectedChan(element);
  };
  handleInviteUsers = (formData) => {
    this.props.inviteUsers(formData);
  };
  handleLeaveGroup = (channelInfo) => {
    this.props.onLeave(channelInfo);
  };
  render() {
    return (
      <List>
        {this.props.channelsFetching ? (
          <Preloader color="#ffffff" secondColor="#40c9ff" size={50} />
        ) : null}
        {
          this.props.channels.map(channelItem => (
            <ChannelListItem
              channelItem={channelItem}
              key={channelItem.createdAt}
              selectedChan={this.handleChanSelect}
              onInviteUsers={this.handleInviteUsers}
              onLeave={this.handleLeaveGroup}
              isActive={this.props.current === channelItem.url}
            />
          ))
        }
      </List>
    );
  }
}

ChannelList.defaultProps = {
  channelsFetching: false,
  inviteUsers: PropTypes.func,
  current: null,
};

ChannelList.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(PropTypes.any).isRequired,
  channelsFetching: PropTypes.bool,
  inviteUsers: PropTypes.func,
  onLeave: PropTypes.func.isRequired,
  current: PropTypes.string,
};
