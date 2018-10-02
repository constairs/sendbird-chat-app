import { css } from 'styled-components';
import { theme } from './theme';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.mainFont};
    font-size: 16px;
  }

  #root {
    height: 100vh;
    width: 100%;
    background-color: ${theme.colors.blank};
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
  
  .ReactModal__Overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 15;
  }
`;
