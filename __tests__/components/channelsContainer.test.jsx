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
  channel: {
    name: 'name',
  }
};

const user = {
  userId: 'user',
  userName: 'user',
  userImg: 'https://img.jpg',
  userFetching: true,
};

const mockEvent = {
  target: {},
  preventDefault: () => {}
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
    expect(wrapper.find('.preloader')).toExist();
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
    expect(wrapper.find('.channel-page-content')).toExist();
  });
  it('should show modal', () => {
    const wrapper = shallow(
      <Channels
        channelsActions={mockObj}
        groupChannelsActions={mockObj}
        createOpenChannel={jest.fn}
        user={user}
        channels={channels}
      />
    );
    wrapper.find('button[name="createOpen"]').simulate('click', mockEvent);
    expect(wrapper.state('modalIsOpen')).toBe(true);
    wrapper.setState({ modalIsOpen: false });
    wrapper.find('button[name="createGroup"]').simulate('click', mockEvent);
    expect(wrapper.state('modalIsOpen')).toBe(true);
  });
  it('should hide modal', () => {
    const wrapper = shallow(
      <Channels
        channelsActions={mockObj}
        groupChannelsActions={mockObj}
        createOpenChannel={jest.fn}
        user={user}
        channels={channels}
      />
    );
    wrapper.setState({ modalIsOpen: true });
    wrapper.find('.x-btn').simulate('click');
    expect(wrapper.state('modalIsOpen')).toBe(false);
  });
});
