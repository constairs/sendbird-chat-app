import Modal from 'react-modal';
import styled from 'styled-components';

export const ModalWindow = styled(Modal)`
  max-width: 300px;
  position: relative;
  z-index: 15;
  &:focus {
    outline: none
  };
  .x-btn {
    right: 10px;
    top: 10px;
    width: 20px;
    padding: 0;
    height: 20px;
    position: absolute;
    z-index: 1;
    line-height: 20px;
    vertical-align: middle;
  };
  form {
    padding: 40px;
    min-width: 300px;
    box-shadow: 0 0 15px rgba(0,0,0,.3);
    border-radius: 5px;
  }
`;
