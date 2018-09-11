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
  handleLeaveGroup = (channelUrl) => {
    this.props.leaveGroup(channelUrl);
  };
  render() {
    return (
      <ul className="list channels-list">
        {this.props.fetching ? (
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
              onLeaveGroup={this.handleLeaveGroup}
            />
          ))
        }
      </ul>
    );
  }
}

ChannelList.defaultProps = {
  inviteUsers: PropTypes.func,
  leaveGroup: PropTypes.func,
  fetching: false,
};

ChannelList.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetching: PropTypes.bool,
  inviteUsers: PropTypes.func,
  leaveGroup: PropTypes.func,
};
