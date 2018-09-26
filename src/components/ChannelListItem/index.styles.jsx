import styled from 'styled-components';

export const ListItem = styled.li`
  margin-bottom: 5px;
  background-color: ${props => props.theme.colors.grey};
  border: none;
  border-radius: 3px;
  font-size: 16px;
  .channel-list-item {
    background-color: inherit;
    transition: .2s;
    padding: 10px;
    height: 100%;
    width: 100%;
    color: ${props => props.theme.colors.black};
    &.custom-type {
      background-color: ${props => props.theme.colors.main};
      color: ${props => props.theme.colors.light};
    }
    .channel-info {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    &:hover {
      background-color: ${props => props.theme.colors.greyHover};
      color: ${props => props.theme.colors.black};
    }
  }
  .channel-item-name {
    margin-left: 10px;
  }
  .img {
    width: 36px;
    height: 36px;
    display: block;
    margin-right: 10px;
    position: relative;
    .unread-count {
      position: absolute;
      width: 12px;
      height: 12px;
      font-size: 10px;
      border-radius: 100%;
      background-color: ${props => props.theme.colors.accent};
      color: ${props => props.theme.colors.light};
      top: -4px;
      right: -4px;
    }
  }
  img {
    width: 100%;
    display: block;
    border-radius: 100%;
  }
  .btns {
    display: flex;
    button {
      width: 50%;
      border-radius: 0;
    }
  }
  .recently-messages {
    list-style: none;
    text-align: left;
    padding-top: 10px;
    padding-left: 0;
    margin: 0;
    border-top: 1px solid ${props => props.theme.colors.dGrey};
    line-height: 20px;
    font-size: 12px;
  }
`;
