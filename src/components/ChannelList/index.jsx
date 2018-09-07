import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-preloading-component';
import { ChannelListItem } from '../../containers/ChannelListItem';
import { GroupListItem } from '../../containers/GroupListItem';

import './index.scss';

export class ChannelList extends React.Component {
  handleChanSelect = (el) => {
    this.props.selectedChan(el);
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
        {this.props.fetching || this.props.groupsFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={50} />
          </div>
        ) : null}
        {this.props.channels.map(
          channelItem =>
            (this.props.group ? (
              <GroupListItem
                channelItem={channelItem}
                key={channelItem.createdAt}
                selectedChan={this.handleChanSelect}
                onInviteUsers={this.handleInviteUsers}
                onLeaveGroup={this.handleLeaveGroup}
              />
            ) : (
              <ChannelListItem
                channelItem={channelItem}
                key={channelItem.createdAt}
                selectedChan={this.handleChanSelect}
              />
            ))
        )}
      </ul>
    );
  }
}

ChannelList.defaultProps = {
  inviteUsers: PropTypes.func,
  leaveGroup: PropTypes.func,
  fetching: false,
  groupsFetching: false,
};

ChannelList.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetching: PropTypes.bool,
  groupsFetching: PropTypes.bool,
  group: PropTypes.bool.isRequired,
  inviteUsers: PropTypes.func,
  leaveGroup: PropTypes.func,
};
