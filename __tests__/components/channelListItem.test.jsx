import React from 'react';
import { shallow } from 'enzyme';

import { ChannelListItem } from '../../src/components/ChannelListItem';

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

const mockEvent = {
  target: {},
  preventDefault: () => {},
  value: 'value'
};

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
    expect(channelListItem.find('.channel-info img').prop('src')).toBe(channelItem.coverUrl);
    expect(channelListItem.find('.channel-info img').prop('alt')).toBe(channelItem.name);
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
  it('should change input', () => {
    const channelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    channelListItem.find('#inviteBtn').simulate('click');
    expect(channelListItem.state('usersIdsInput')).toBe('');
    channelListItem.find('#userId').simulate('change', mockEvent);
    expect(channelListItem.state('usersIdsInput')).toBe(channelListItem.find('#userId').prop('value'));
  });
  it('should add users to array', () => {
    const channelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    expect(channelListItem.state('usersToInvite')).toEqual([]);
    channelListItem.find('#inviteBtn').simulate('click');
    channelListItem.find('.invite-button').simulate('click');
    expect(channelListItem.state('usersToInvite').length).toBeGreaterThan(0);
  });
  it('should del user from array', () => {
    const channelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    channelListItem.setState({ usersToInvite: ['user', 'test'] });
    channelListItem.find('#inviteBtn').simulate('click');
    channelListItem.find('.users-to-invite li:first-child button').simulate('click', { target: { id: 'user' } });
    expect(channelListItem.state('usersToInvite')).toHaveLength(1);
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
  it('should call onInviteUsers', () => {
    const channelListItem = shallow(
      <ChannelListItem
        channelItem={channelItem}
        key={channelItem.createdAt}
        selectedChan={mock}
        onLeave={mock}
        onInviteUsers={mock}
      />);
    channelListItem.find('#inviteBtn').simulate('click');
    channelListItem.find('.invite-form').simulate('submit', mockEvent);
    channelListItem.setState({ userToInvite: ['user', 'test'] });
    const formData = [
      channelItem.url,
      channelListItem.state('usersToInvite'),
    ];
    expect(mock).toHaveBeenCalledWith(formData);
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
});
