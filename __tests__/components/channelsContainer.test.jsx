import React from 'react';
import { shallow } from 'enzyme';

import { Channels } from '../../src/containers/ChannelsContainer';
import { Preloader } from '../../src/components/UI/Preloader';
import { ChannelsPage } from '../../src/containers/ChannelsContainer/index.styles';

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
    expect(wrapper.find(Preloader)).toExist();
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
    expect(wrapper.find(ChannelsPage)).toExist();
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
    wrapper.setState({ modalIsOpen: true });
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
