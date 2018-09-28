import { css } from 'styled-components';
import { theme } from './theme';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  #root {
    height: 100vh;
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.mainFont};
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: ${theme.fonts.font};
  }

  h1 {
    font-size: 26px;
  }

  ul {
    padding-left: 0;
    list-style-type: none;
  }

  a {
    color: ${theme.colors.main};
  }

  input, button, textarea {
    &:focus {
      outline: none;
    }
  }
  
  input {
    &:focus {
      outline: none;
    }
  }
  
  textarea {
    &:focus {
      outline: none;
    }
  }
  
  button {
    background-color: ${theme.colors.main};
    color: #ffffff;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    font-size: 14px;
    transition: .2s;
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
  }
  
  form {
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
    input {
      width: 100%;
      height: 40px;
      border-radius: 3px;
      padding-left: 5px;
      border: 1px solid ${theme.colors.main};
    }
    input[type="checkbox"] {
      width: 14px;
      height: 14px;
    }
    button {
      width: 100%;
      border-radius: 3px;
      height: 45px;
      font-size: 16px;
      font-family: ${theme.fonts.font};
      border: none;
      transition: all .2s
    }
  }

  .ReactModal__Overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 15;
  }
`;
