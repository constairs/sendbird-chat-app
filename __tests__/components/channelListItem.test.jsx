import React from 'react';
import { shallow } from 'enzyme';

import { ChannelListItem } from '../../src/components/ChannelListItem';

const channelItem = {
  name: 'neme',
  unreadMessageCount: '2',
  coverUrl: 'https://img.jpg',
  lastMessage: {
    message: 'ddd',
    messageType: 'user'
  },
  channelType: 'group',
};

describe('<ChannelListItem />', () => {
  it('should render channel cover', () => {
    const channelListItem = shallow(<ChannelListItem channelItem={channelItem} />);
    expect(channelListItem.find('.channel-info img').prop('src')).toBe(channelItem.coverUrl);
    expect(channelListItem.find('.channel-info img').prop('alt')).toBe(channelItem.name);
  });
  it('should render unread messages counter', () => {
    const channnelListItem = shallow(<ChannelListItem channelItem={channelItem} />);
    expect(channnelListItem.find('.unread-count').text()).toBe(channelItem.unreadMessageCount);
  });
  it('should render channel name', () => {
    const wrapper = shallow(<ChannelListItem channelItem={channelItem} />);
    expect(wrapper.find('.channel-item-name').text()).toEqual(channelItem.name);
  });
  it('should render last messages', () => {
    let channnelListItem = shallow(<ChannelListItem channelItem={channelItem} />);
    expect(channnelListItem.find('.last-message')).toBeTruthy();
    expect(channnelListItem.find('.last-message').children().text()).toBe(channelItem.lastMessage.message);
    channelItem.lastMessage = {
      messageType: 'file',
      size: 4000,
      url: 'https://img.jpg',
      data: 'text',
    };
    channnelListItem = shallow(<ChannelListItem channelItem={channelItem} />);
    expect(channnelListItem.find('.last-message').children()).toExist();
  });
  it('should render control buttons', () => {
    const channnelListItem = shallow(<ChannelListItem channelItem={channelItem} />);
    expect(channnelListItem.find('.btns').children()).toHaveLength(2);
  });
});
