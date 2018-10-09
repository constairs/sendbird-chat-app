import React from 'react';
import { shallow } from 'enzyme';

import { Channel, StyledImg } from '../../src/components/Channel';
import { ChannelInfo, ChannelName } from '../../src/components/Channel/index.styles';

const channel = {
  coverUrl: 'http://img.jpg',
  members: [{ userId: 1 }, { userId: 2 }, { userId: 3 }],
  memberCount: 3,
  name: 'name'
};

describe('<Channel />', () => {
  it('should render channel name', () => {
    const wrapper = shallow(<Channel channel={channel} />);
    expect(wrapper.find(ChannelName).children().text()).toEqual(channel.name);
  });
  it('should render members count', () => {
    const wrapper = shallow(<Channel channel={channel} />);
    expect(wrapper.find('.channel-users').text()).toEqual(`Online: ${channel.memberCount}`);
  });
  it('should render channel img', () => {
    const wrapper = shallow(<Channel channel={channel} />);
    expect(wrapper.find(ChannelInfo).find(StyledImg).prop('src')).toBe(channel.coverUrl);
  });
});
