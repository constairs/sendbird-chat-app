import styled from 'styled-components';
import { colors } from '../../theme/theme';

export const UsersToInvite = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  li {
    background-color: ${colors.main};
    border-radius: 3px;
    height: 30px;
    text-align: center;
    position: relative;
    padding-right: 25px;
    padding-left: 5px;
    display: inline-flex;
    align-items: center;
    color: #ffffff;
    margin-right: 8px;
    >button {
      background-color: transparent;
      width: 16px;
      height: 16px;
      padding: 0;
      position: absolute;
      right: 5px;
      top: 50%;
      margin-top: -9px;
      color: #fff;
      cursor: pointer;
      z-index: 2;
    };
  };
`;
