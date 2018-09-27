import styled from 'styled-components';

export const FileItem = styled.div`
  width: 80px;
  margin-bottom: 20px;
  position: relative;
  p {
    font-size: 14px;
    margin: 0;
  }
  button {
    position: absolute;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    z-index: 1;
    cursor: pointer;
    background-color: #111111;
    top: -5px;
    right: -5px;
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
`;
