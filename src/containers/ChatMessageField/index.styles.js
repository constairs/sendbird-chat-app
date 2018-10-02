import styled from 'styled-components';

export const Field = styled.form`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 0;
  box-shadow: none;
  background-color: ${props => props.theme.colors.blank};
  input {
    width: 100%;
    height: 40px;
    border: 1px solid ${props => props.theme.colors.main};
    border-radius: 3px;
    margin-bottom: 5px;
    padding-left: 5px;
    padding-top: 5px;
  }
  button {
    margin-left: 14px;
    width: auto;
    height: 30px;
  }
  .send-message-btn {
    display: flex;
    span {
      margin-left: 5px;
    }
  }
  .typing-indicator {
    display: flex;
    align-items: center;
    margin-right: 8px;
    .PreLoading-Text {
      margin-left: 6px;
    }
  }
`;
