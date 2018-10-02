import styled from 'styled-components';
import { theme } from '../../theme/theme';

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 3px;
  padding-left: 5px;
  border: 1px solid ${theme.colors.main};
  [type="checkbox"] {
    width: 14px;
    height: 14px;
  }
`;
