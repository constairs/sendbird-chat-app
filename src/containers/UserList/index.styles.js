import styled from 'styled-components';
import { media } from '../../theme/media';

export const ConnectionStatus = styled.span`
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

export const StyledUserList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: row-reverse;
  ${media.phoneLg`
    position: absolute;
    right: 20px;
  `}
`;

export const UserListItem = styled.li`
  transform: translateX(
${
  props => (props.count > 8 ?
    `calc(${props.index}*(70%))`
    :
    `calc(${props.index}*(50%))`)
});
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
