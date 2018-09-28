import styled from 'styled-components';
import { media } from '../../theme/media';

export const Message = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid ${props => props.theme.colors.dGrey};
  position: relative;
  ${media.phoneSm`
    padding: 10px;
  `}
  p {
    margin: 0;
  }
  .sender-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    ${media.phoneMd`
      margin-bottom: 10px;
    `}
    .sender-nick {
      color: ${props => props.theme.colors.main};
      margin-right: 10px;
      ${media.phoneMd`
        font-size: 14px;
      `}
    }
    .sending-date {
      font-size: 10px;
    }
  }
  .x-btn, .edit-btn {
    padding: 0 5px;
    color: ${props => props.theme.colors.dGrey};
    background-color: transparent;
    position: absolute;
    top: 10px;
    right: 8px;
    transition: all .2s;
    font-size: 12px;
    &:hover {
      color: ${props => props.theme.colors.main};
    }
  }
  .edit-btn {
    top: 11px;
    right: 24px;
    font-size: 10px;
  }
  &:last-child {
    border: none
  }
  &.custom-message {
    background-color: ${props => props.theme.colors.main};
  }

  .sender-img {
    width: 40px;
    min-width: 40px;
    height: 40px;
    img {
      display: block;
      width: 100%;
      border-radius: 100%;
    }
  }

  .message-body {
    padding: 10px 20px;
    p {
      ${media.phoneLg`
      font-size: 14px;
    `};
    };
    ${media.phoneLg`
      padding: 5px;
    `};
    ${media.phoneMd`
      padding: 5px;
    `}
  }

  .file-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .isReadIndicator {
    font-size: 10px;
    color: ${props => props.theme.colors.main};
    margin-right: 10px;
  }
`;
