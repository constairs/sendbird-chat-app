import React from 'react';
import { shallow } from 'enzyme';

import { ChannelListItem, StyledImg } from '../../src/components/ChannelListItem';
import { ListItem } from '../../src/components/ChannelListItem/index.styles';

const channelItem = {
  name: 'neme',
  unreadMessageCount: '2',
  coverUrl: 'https://img.jpg',
  url: 'https://url.com/',
  createdAt: 1111,
  lastMessage: {
    message: 'ddd',
    messageType: 'user'
  },
  channelType: 'group',
};
const mock = jest.fn();

describe('<ChannelListItem />', () => {
  it('should render channel cover', () => {
    const channelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    expect(channelListItem.find(StyledImg).prop('src')).toBe(channelItem.coverUrl);
  });
  it('should render unread messages counter', () => {
    const channnelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    expect(channnelListItem.find('.unread-count').text()).toBe(channelItem.unreadMessageCount);
  });
  it('should render channel name', () => {
    const wrapper = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    expect(wrapper.find('.channel-item-name').text()).toEqual(channelItem.name);
  });
  it('should render last messages', () => {
    let channnelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    expect(channnelListItem.find('.last-message')).toExist();
    expect(channnelListItem.find('.last-message').children().text()).toBe(channelItem.lastMessage.message);
    channelItem.lastMessage = {
      messageType: 'file',
      size: 4000,
      url: 'https://img.jpg',
      data: 'text',
    };
    channnelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    expect(channnelListItem.find('.last-message').children()).toExist();
  });
  it('should render control buttons', () => {
    const channnelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    expect(channnelListItem.find('.btns').children()).toHaveLength(2);
  });

  it('should show invite form', () => {
    const channelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    channelListItem.find('#inviteBtn').simulate('click');
    expect(channelListItem.state('inviteForm')).toBe(true);
  });
  it('should call onLeave', () => {
    const channelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    channelListItem.find('#leaveBtn').simulate('click');
    expect(mock).toHaveBeenCalledWith({
      channelUrl: channelItem.url,
      channelType: channelItem.channelType
    });
  });
  it('should call selectedChan', () => {
    const channelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    channelListItem.find(ListItem).simulate('click');
    expect(mock).toHaveBeenCalledWith({
      channelUrl: channelItem.url,
      channelType: channelItem.channelType,
    });
  });
});
