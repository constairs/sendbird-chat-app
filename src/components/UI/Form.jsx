import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { Button } from './Button';

export const Form = styled.form`
  background-color: #f0f0f0;
  label {
    display: block;
    margin-bottom: 20px;
    span {
      font-size: 12px;
      display: block;
      margin-bottom: 4px;
      font-family: ${theme.fonts.font};
    }
    &[disabled] {
      color: #ccc;
    }
  }
  ${Button} {
    width: 100%;
    height: 45px;
    border: none;
  }
`;
