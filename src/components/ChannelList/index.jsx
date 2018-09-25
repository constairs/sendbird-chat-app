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
  .img {
    width: 36px;
    height: 36px;
    display: block;
    margin-right: 10px;
    position: relative;
    .unread-count {
      position: absolute;
      width: 12px;
      height: 12px;
      font-size: 10px;
      border-radius: 100%;
      background-color: #e7543a;
      color: #ffffff;
      top: -4px;
      right: -4px;
    }
  }
  img {
    width: 100%;
    display: block;
    border-radius: 100%;
  }
  > li {
    margin-bottom: 5px;
    background-color: #ececec;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    .channel-list-item {
      background-color: inherit;
      transition: .2s;
      padding: 10px;
      height: 100%;
      width: 100%;
      color: #000000;
      &.custom-type {
        background-color: $brand-color;
        color: #ffffff;
      }
      .channel-info {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      &:hover {
        background-color: #d6d4d4;
        color: #000000;
      }
    }
    .btns {
      display: flex;
      button {
        width: 50%;
        border-radius: 0;
      }
    }
    .recently-messages {
      list-style: none;
      text-align: left;
      padding-top: 10px;
      padding-left: 0;
      margin: 0;
      border-top: 1px solid #ccc;
      line-height: 20px;
      font-size: 12px;
    }
  }
  .channel-item-name {
    margin-left: 10px;
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
