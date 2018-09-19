import React from 'react';
import { shallow } from 'enzyme';

import { Channels } from '../../src/containers/ChannelsContainer';

const mockObj = {
  fn: jest.fn(),
};

const channels = {
  notification: {
    type: '',
    channel: '',
    user: '',
  },

};

const user = {
  userId: 'user',
  userName: 'user',
  userImg: 'https://img.jpg',
};

describe('<Channels />', () => {
  it('should render preloader', () => {
    const wrapper = shallow(
      <Channels
        channelsActions={mockObj}
        groupChannelsActions={mockObj}
        createOpenChannel={jest.fn}
        user={user}
        channels={channels}
      />);
    expect(wrapper.find('.preloader')).toBeTruthy();
  });
  it('should render channel', () => {
    const wrapper = shallow(
      <Channels
        channelsActions={mockObj}
        groupChannelsActions={mockObj}
        createOpenChannel={jest.fn}
        user={user}
        channels={channels}
      />
    );
    expect(wrapper.find('.channel-sidebar .channel-page-content')).toBeTruthy();
  });
});
