import styled from 'styled-components';

export const ListItem = styled.li`
  margin-bottom: 5px;
  background-color: ${props => props.theme.colors.grey};
  border: none;
  border-radius: 3px;
  font-size: 16px;
  .channel-item-name {
    margin-left: 10px;
  }
  .img {
    width: 36px;
    height: 36px;
    display: block;
    margin-right: 10px;
    position: relative;
    img {
    width: 100%;
    display: block;
    border-radius: 100%;
    };
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

export const ItemBtn = styled.button`
  background-color: ${props => (props.isActive ? props.theme.colors.main : 'inherit')};
  border: 1px solid ${props => (props.custom ? props.theme.colors.main : 'inherit')};
  color: ${props => (props.isActive ? props.theme.colors.light : props.theme.colors.black)};
  transition: .2s;
  padding: 10px;
  height: 100%;
  width: 100%;
  .channel-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  &:hover {
    background-color: ${props => props.theme.colors.greyHover};
  }
`;
