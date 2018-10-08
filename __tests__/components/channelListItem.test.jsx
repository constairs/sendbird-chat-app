import React from 'react';
import { shallow } from 'enzyme';

import { ChannelListItem } from '../../src/components/ChannelListItem';
import { InviteForm } from '../../src/components/InviteForm';
import { ListItem } from '../../src/components/ChannelListItem/index.styles';
import { UsersToInvite } from '../../src/components/UI/UsersToInvite';
import { ImgWrap } from '../../src/components/ImgRound';

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
    expect(channelListItem.find(ImgWrap).prop('src')).toBe(channelItem.coverUrl);
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
  // it('should change input', () => {
  //   const channelListItem = shallow(
  //     <ChannelListItem
  //       channelItem={channelItem}
  //       key={channelItem.createdAt}
  //       selectedChan={mock}
  //       onLeave={mock}
  //       onInviteUsers={mock}
  //     />);
  //   channelListItem.find('#inviteBtn').simulate('click');
  //   expect(channelListItem.state('usersIdsInput')).toBe('');
  //   channelListItem.find('#userId').simulate('change', mockEvent);
  //   expect(channelListItem.state('usersIdsInput')).toBe(channelListItem.find('#userId').prop('value'));
  // });
  // it('should add users to array', () => {
  //   const channelListItem = shallow(
  //     <ChannelListItem
  //       channelItem={channelItem}
  //       key={channelItem.createdAt}
  //       selectedChan={mock}
  //       onLeave={mock}
  //       onInviteUsers={mock}
  //     />);
  //   expect(channelListItem.state('usersToInvite')).toEqual([]);
  //   channelListItem.find('#inviteBtn').simulate('click');
  //   channelListItem.find('.invite-button').simulate('click');
  //   expect(channelListItem.state('usersToInvite').length).toBeGreaterThan(0);
  // });
  // it('should del user from array', () => {
  //   const channelListItem = shallow(
  //     <ChannelListItem
  //       channelItem={channelItem}
  //       key={channelItem.createdAt}
  //       selectedChan={mock}
  //       onLeave={mock}
  //       onInviteUsers={mock}
  //     />);
  //   channelListItem.setState({ usersToInvite: ['user', 'test'] });
  //   channelListItem.find('#inviteBtn').simulate('click');
  //   channelListItem.find(UsersToInvite).find('li:first-child button').simulate('click', { target: { id: 'user' } });
  //   expect(channelListItem.state('usersToInvite')).toHaveLength(1);
  // });
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
  // it('should call onInviteUsers', () => {
  //   const channelListItem = shallow(
  //     <ChannelListItem
  //       channelItem={channelItem}
  //       key={channelItem.createdAt}
  //       selectedChan={mock}
  //       onLeave={mock}
  //       onInviteUsers={mock}
  //     />);
  //   channelListItem.find('#inviteBtn').simulate('click');
  //   channelListItem.find(InviteForm).simulate('onInviteUsers', mockEvent);
  //   const formData = [
  //     channelItem.url,
  //     [],
  //   ];
  //   expect(mock).toHaveBeenCalledWith(formData);
  // });
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
