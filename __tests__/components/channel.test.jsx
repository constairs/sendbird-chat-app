import React from 'react';
import { shallow } from 'enzyme';

import { Channel } from '../../src/components/Channel';

const channel = {
  coverUrl: 'http://img.jpg',
  members: [{ userId: 1 }, { userId: 2 }, { userId: 3 }],
  memberCount: 3,
  name: 'name'
};

describe('<Channel />', () => {
  it('should render members list', () => {
    const wrapper = shallow(<Channel channel={channel} />);
    expect(wrapper.find('.users-list').children()).toHaveLength(3);
  });
  it('should render channel name', () => {
    const wrapper = shallow(<Channel channel={channel} />);
    expect(wrapper.find('.channel-name').text()).toEqual(channel.name);
  });
  it('should render members count', () => {
    const wrapper = shallow(<Channel channel={channel} />);
    expect(wrapper.find('.channel-users').text()).toEqual(`Online: ${channel.memberCount}`);
  });
  it('should render channel img', () => {
    const wrapper = shallow(<Channel channel={channel} />);
    expect(wrapper.find('.channel-info img').prop('src')).toBe(channel.coverUrl);
    expect(wrapper.find('.channel-info img').prop('alt')).toBe(channel.name);
  });
});

