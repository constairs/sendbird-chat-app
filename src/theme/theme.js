export const theme = {
  colors: {
    light: '#f0f0f0',
    grey: 'rgba(133, 133, 133, 0.616)',
    main: '#40c9ff',
    dblue: '#475366',
  },
  fonts: {
    font: '\'Helvetica\', sans-serif',
    mainFont: '\'OpenSans\' sans-serif',
  },
  buttons: {
    btn: `
      background-color: #40c9ff;
      color: #ffffff;
      border: none;
      border-radius: 3px;
      padding: 5px 10px;
      font-size: 14px;
      transition: .2s;
      :focus {
        outline: none
      }
      &:hover {
        background-color: darken(#40c9ff, 6%);
      }
      &[disabled] {
        background-color: #ccc;
        color: #999999;
      }
    `,
  },
  imgWrap: `{
    display: block;
    width: 100px;
    border-radius: 100%;
    position: relative;
    background-color: #ffffff;
    margin-right: 10px;
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
  }`
};
