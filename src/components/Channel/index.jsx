import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ImgWrap } from '../ImgRound';
import { media } from '../../theme/media';

import { ChatBox } from '../../containers/ChatBox';

const ChannelItem = styled.div`
  width: 100%;
`;

const ChannelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 10px;
  }
  ${media.phoneLg`
    p {
      font-size: 12px;
    }
  `}
`;

export const ChannelName = styled.h1`
  margin-top: 0;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-start;
  ${media.phoneLg`
    font-size: 18px;
  `}
  ${media.phoneMd`
    font-size: 16px;
  `}
`;

const ConnectionStatus = styled.span`
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: 100%;
  position: absolute;
  top: 0;
  right: 0;
  ${media.phoneLg`
    top: -2px;
    rigth: -4px;
    width: 8px;
    height: 8px;
    border: 2px solid ${props => props.theme.colors.light};
  `}
  background-color: ${props =>
    (props.status === 'online' ? '#1ce01c' :
      '#cccccc;')
};
`;

export const UserList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: row-reverse;
  ${media.phoneLg`
    position: absolute;
    right: 20px;
  `}
`;

const UserListItem = styled.li`
  transform: translateX(
    ${props => (props.count > 8 ?
    `calc(${props.index}*(70%))`
    :
    `calc(${props.index}*(50%))`)
}
  );
  display: inline-block;
  transition: all .2s;
  &:hover + li {
    margin-right: 18px;
    ${props => (props.count > 8 ?
    'margin-right: 24px;'
    :
    'margin-right: 18px;')
}
  }
  ${media.phoneLg`
    width: 30px;
    height: 30px;
    border: 2px solid #40c9ff;
  `};
  width: 40px;
  height: 40px;
  position: relative;
  border: 2px solid #40c9ff;
  border-radius: 100%;
  img {
    width: 100%;
    border-radius: 100%;
  }
`;

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
