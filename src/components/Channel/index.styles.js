import styled from 'styled-components';
import { media } from '../../theme/media';

export const ChannelItem = styled.div`
  width: 100%;
`;

export const ChannelHeader = styled.div`
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
