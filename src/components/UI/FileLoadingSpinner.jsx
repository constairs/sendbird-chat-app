import styled from 'styled-components';
import { theme } from '../../theme/theme';

export const FileLoadingSpinner = styled.div`
width: 80px;
min-width: 80px;
height: 80px;
position: relative;
.loading-progress {
  font-size: 14px;
  text-align: center;
  position: absolute;
  display: block;
  top: 30px;
  left: 22px;
  color: ${theme.colors.main};
  font-size: 16px;
}
.PreLoading-Spinner {
  position: absolute;
  top: 0;
  right: 0;
}
&:hover {
  .cancel-button {
    opacity: 1;
  }
}
.cancel-button {
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
}
`;
