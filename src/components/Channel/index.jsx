import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ImgWrap } from '../ImgRound';
import {
  ChannelItem,
  ChannelHeader,
  ChannelInfo,
  ChannelName,
} from './index.styles';
import { ChatBox } from '../../containers/ChatBox';
import { UserList } from '../../containers/UserList';

export const StyledImg = styled(ImgWrap)`
  margin-right: 15px;
`;

export const Channel = ({ ...props }) => {
  const { channel } = props;
  const { name, coverUrl, memberCount } = props.channel;
  return (
    <ChannelItem>
      <ChannelHeader>
        <ChannelInfo>
          <StyledImg
            src={coverUrl ||
              'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'}
          />
          <div>
            <ChannelName>{name}</ChannelName>
            <p className="channel-users">Online: {memberCount}</p>
          </div>
        </ChannelInfo>
        <UserList />
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
