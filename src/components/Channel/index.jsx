import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
`;

export const ChannelName = styled.h1`
  margin-top: 0;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-start;
`;

const ImgPlace = styled.div`
  margin-right: 15px;
  position: relative;
  width: 100px;
  height: 100px;
  img {
    border-radius: 100%;
    width: 100%;
  }
`;

const ConnectionStatus = styled.span`
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: 100%;
  position: absolute;
  top: 0;
  right: 0;
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
`;

const UserListItem = styled.li`
  transform: translateX(calc(${props => props.index}*(50%)));
  display: inline-block;
  transition: all .2s;
  &:hover + li {
    margin-right: 18px;
  }
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
          <ImgPlace>
            <img
              src={
              coverUrl ||
              'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
            }
              alt={name}
            />
          </ImgPlace>
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
