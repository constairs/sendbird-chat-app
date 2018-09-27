import { css } from 'styled-components';

const colors = {
  light: '#f0f0f0',
  grey: '#eeeeee',
  greyHover: '#d6d4d4',
  dGrey: '#cacaca',
  black: '#2b2b2b',
  main: '#40c9ff',
  mainDarken: 'darken(#40c9ff, 6%)',
  accent: '#e36209',
};

const fonts = {
  font: '\'Helvetica\', sans-serif',
  mainFont: '\'OpenSans\', sans-serif',
};

export const theme = {
  colors,
  fonts,
  imgWrap: css`
    display: block;
    width: 100px;
    border-radius: 100%;
    position: relative;
    background-color: #ffffff;
    img {
      display: block;
      width: 100%;
      border-radius: 100%;
    };
    button {
     opacity: 0;
     width: 100%;
     height: 100%;
     position: absolute;
     bottom: 0;
     left: 0;
     text-align: center;
     color: #ffffff;
     transition: .2s;
     border-radius: 100%;
     transform: translateY(20px);
     background-color: rgba(0,0,0,.33);
   };
   &:hover {
     button {
       opacity: 1;
       background-color: rgba(0,0,0,.33);
       transform: translateY(0px);
     };
    };
  `
};
