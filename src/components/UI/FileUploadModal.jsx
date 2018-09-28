import styled from 'styled-components';
import { colors } from '../../theme/theme';

export const FileUploadModal = styled.div`
  padding: 0;
  position: relative;
  .dropzone {
    margin: 0 auto;
    margin-bottom: 15px;
    position: relative;
    width: 220px;
    height: 220px;
    border-width: 2px;
    border-color: #666666;
    border-style: dashed;
    border-radius: 5px;
    cursor: pointer;
  }
  input {
    width: 100%;
    height: 40px;
    border-radius: 3px;
    border: 1px solid #999;
    color: ${colors.black};
    text-indent: 8px; 
    margin-bottom: 16px;
    &:focus {
      border-color: ${colors.main};
    }
    &[disabled] {
      border-color: ${colors.greyHover};
      &::placeholder{
        color: ${colors.greyHover};
      }
    }
  }
`;
