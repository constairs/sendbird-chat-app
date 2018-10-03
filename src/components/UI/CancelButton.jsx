import styled from 'styled-components';
import { theme } from '../../theme/theme';

export const CancelButton = styled.button`
  opacity: 0;
  background-color: ${theme.colors.main};
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  font-size: 20px;
  transition: all .2s
`;
