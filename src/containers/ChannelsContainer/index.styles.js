import styled from 'styled-components';
import { Page } from '../../components/UI/Page';
import { media } from '../../theme/media';

export const ChannelsPage = styled(Page)`
`;

export const BurgerButton = styled.button`
  position: absolute;
  top: -20px;
  left: 15px;
  z-index: 10;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  box-shadow: 5px 0 25px rgba(0,0,0,.4);
  transition: .2s all;
  display:none;
  ${media.tablet`
    display:block;
    left: ${props => (props.isOpen ? '215px' : '15px')};
  `}
`;

export const ChannelContent = styled.div`
  width: 70%;
  ${media.tablet`width: 100%`}
`;
