import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-preloading-component';
import styled from 'styled-components';
import { ChannelListItem } from '../ChannelListItem';

export const List = styled.ul`
  padding-left: 0;
  list-style-type: none;
  margin-top: 20px;
  margin-bottom: 30px;
  position: relative;
  min-height: 200px;
  .preloader {
    position: absolute;
    height: 100%;
  }
`;

export const ListPreloader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255,255,255,.7);
  width: 100%;
  height: 100vh;
  z-index: 1;
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
          <ListPreloader>
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={50} />
          </ListPreloader>
        ) : null}
        {
          this.props.channels.map(channelItem => (
            <ChannelListItem
              channelItem={channelItem}
              key={channelItem.createdAt}
              selectedChan={this.handleChanSelect}
              onInviteUsers={this.handleInviteUsers}
              onLeave={this.handleLeaveGroup}
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
};

ChannelList.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(PropTypes.any).isRequired,
  channelsFetching: PropTypes.bool,
  inviteUsers: PropTypes.func,
  onLeave: PropTypes.func.isRequired,
};
