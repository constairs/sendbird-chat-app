import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ImgWrap } from '../../components/ImgRound';
import { media } from '../../theme/media';
import {
  ConnectionStatus,
  StyledUserList,
  UserListItem
} from './index.styles';

const StyledImg = styled(ImgWrap)`
  width: 36px;
  height: 36px;
  ${media.phoneLg`
    width: 26px;
    height: 26px;
  `};
`;

const List = ({ ...props }) => {
  const { channel } = props;
  return (
    <StyledUserList>
      {
        channel.members ? channel.members.map((cur, i) => (
          <UserListItem
            key={cur.userId}
            index={i}
            count={channel.members.length}
          >
            <StyledImg
              src={cur.profileUrl ||
              'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'}
            />
            <ConnectionStatus status={cur.connectionStatus} />
          </UserListItem>
        ))
        : null
      }
    </StyledUserList>
  );
};


export const UserList = connect(state => ({ channel: state.channels.channel }))(List);


List.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
};
