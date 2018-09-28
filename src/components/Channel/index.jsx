import React from 'react';
import PropTypes from 'prop-types';
import { ImgWrap } from '../ImgRound';
import {
  ChannelItem,
  ChannelHeader,
  ChannelInfo,
  ChannelName,
  ConnectionStatus,
  UserList,
  UserListItem
} from './index.styles';
import { ChatBox } from '../../containers/ChatBox';

export const Channel = ({ ...props }) => {
  const { channel } = props;
  const { name, coverUrl, memberCount } = props.channel;
  return (
    <ChannelItem>
      <ChannelHeader>
        <ChannelInfo>
          <ImgWrap
            src={coverUrl ||
              'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'}
          />
          <div>
            <ChannelName>{name}</ChannelName>
            <p className="channel-users">Online: {memberCount}</p>
          </div>
        </ChannelInfo>
        <UserList>
          {channel.members ? channel.members.map((cur, i) => (
            <UserListItem
              key={cur.userId}
              index={i}
              count={channel.members.length}
            >
              <img
                src={cur.profileUrl}
                title={cur.nickname}
                alt={cur.nickname}
              />
              <ConnectionStatus status={cur.connectionStatus} />
            </UserListItem>
          )) : null}
        </UserList>
      </ChannelHeader>
      <ChatBox
        currentChannel={channel}
        channelUrl={channel.url}
        channelType={channel.channelType}
      />
    </ChannelItem>
  );
};

Channel.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
};
