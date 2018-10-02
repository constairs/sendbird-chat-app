import styled from 'styled-components';
import { theme } from '../../theme/theme';

export const Button = styled.button`
  background-color: ${theme.colors.main};
  color: #ffffff;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 14px;
  transition: .2s;
  font-family: ${theme.fonts.font};
  font-size: 16px;
  transition: all .2s;
  &:focus {
    outline: none;
  };
  &:hover {
    background-color: ${theme.colors.mainDarken};
  };
  &[disabled] {
    background-color: #ccc;
    color: #999999;
  };
`;
