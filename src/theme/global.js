import { theme } from './theme';

export const globalStyles = `
  * {
  box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.mainFont};
  }

  h1, h2, h3, h4 {
    font-family: ${theme.fonts.font};
  }

  h1 {
    font-size: 26px;
  }

  .title {
    color: ${theme.colors.main};
    font-family: ${theme.fonts.font};
    font-size: 28px;
  }

  ul {
    padding-left: 0;
    list-style-type: none;
  }

  a {
    color: ${theme.colors.main};
  }

  #root {
    height: 100vh;
    width: 100%;
  }

  .img-place {
    display: block;
    img {
      border-radius: 100%;
      width: 100%;
      display: block;
    }
  }

  .lazy-load-container {
    height: 100%;
  }

  input, button, textarea {
    &:focus {
      outline: none;
    }
  }
  
  input {
    :focus {
      outline: none;
    }
  }
  
  textarea {
    :focus {
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
    padding: 40px;
    min-width: 300px;
    box-shadow: 0 0 15px rgba(0,0,0,.3);
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
      // border: 1px solid #999;
      // :hover {
      //   border-color: #333;
      // }
    }
    input[type=file] {
      width: 100%;
      border-radius: 3px;
      border: none;
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
  
  .invite-form {
    box-shadow: none;
    background-color: #d6d4d4;
    min-width: auto;
  }
  
  .users-to-invite {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    li {
      background-color: ${theme.colors.main};
      border-radius: 3px;
      height: 30px;
      text-align: center;
      position: relative;
      padding-right: 25px;
      padding-left: 5px;
      display: inline-flex;
      align-items: center;
      color: #ffffff;
      margin-right: 8px;
      >button {
        background-color: transparent;
        width: 16px;
        height: 16px;
        padding: 0;
        position: absolute;
        right: 5px;
        top: 50%;
        margin-top: -9px;
        color: #fff;
        cursor: pointer;
        z-index: 2;
      }
    }
  }
  
  .groupUsers {
    position: relative;
    .invite-button {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0;
    }
  }
  
  .file-upload-modal {
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
      color: #999999;
      text-indent: 8px; 
      margin-bottom: 16px;
      &:focus {
        border-color: ${theme.colors.main};
      }
      &[disabled] {
        border-color: #dddddd;
        &::placeholder{
          color: #dddddd;
        }
      }
    }
    button {
      width: 100%;
      height: 40px;
    }
  }
  
  .files-to-upload {
    display: flex;
  }
  
  .file-item {
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
      cursor: pointer;
      background-color: #111111;
      top: -5px;
      right: -5px;
      padding: 0;
      margin: 0;
    }
  }
  
  .file-preview {
    border-radius: 3px;
    width: 80px;
    height: 80px;
    padding: 16px;
    background-color: #aaaaaa;
    font-size: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    img {
      display: block;
      width: 100%;
    }
  }

  .modal-wrap {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, .66);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .ReactModal__Overlay {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    max-width: 300px;
    position: relative;
    &:focus {
      outline: none
    }
    .x-btn {
      right: 10px;
      top: 10px;
      width: 20px;
      padding: 0;
      height: 20px;
      position: absolute;
    }
  }
`;
