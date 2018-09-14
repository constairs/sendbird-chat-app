import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-preloading-component';
import { ChannelListItem } from '../ChannelListItem';
import './index.scss';

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
      <ul className="list channels-list">
        {this.props.channelsFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={50} />
          </div>
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
      </ul>
    );
  }
}

ChannelList.defaultProps = {
  channelsFetching: false,
  inviteUsers: PropTypes.func
};

ChannelList.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(PropTypes.any).isRequired,
  channelsFetching: PropTypes.bool,
  inviteUsers: PropTypes.func,
  onLeave: PropTypes.func.isRequired,
};
