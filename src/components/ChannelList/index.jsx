import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-preloading-component';
import { ChannelListItem } from '../ChannelListItem';
import { GroupListItem } from '../../components/GroupListItem';

import './index.scss';

export class ChannelList extends React.Component {
  handleChanSelect = (el) => {
    this.props.selectedChan(el);
  };

  handleInviteUser = (formData) => {
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
          cur =>
            (this.props.group ? (
              <GroupListItem
                cur={cur}
                key={cur.createdAt}
                selectedChan={this.handleChanSelect}
                onInviteUsers={this.handleInviteUser}
                onLeaveGroup={this.handleLeaveGroup}
              />
            ) : (
              <ChannelListItem
                cur={cur}
                key={cur.createdAt}
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
