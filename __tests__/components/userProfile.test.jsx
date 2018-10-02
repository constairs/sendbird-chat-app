import React from 'react';
import { shallow } from 'enzyme';

import { Profile } from '../../src/containers/UserProfile';
import { ImgWrap } from '../../src/components/ImgRound';

const user = {
  userName: 'test2',
  userImg: 'https://img.jpg',
  userId: 'test',
};

const channelUrl = 'https://url.com/';

const channelType = 'open';

const mockObj = { fn: jest.fn() };

describe('<UserProfile />', () => {
  it('should render user cover img', () => {
    const profile = shallow(
      <Profile
        user={user}
        channelUrl={channelUrl}
        channelType={channelType}
        userActions={mockObj}
      />);
    expect(profile.find(ImgWrap).prop('src')).toBe(user.userImg);
  });
  it('should render user nickname', () => {
    const profile = shallow(
      <Profile
        user={user}
        channelUrl={channelUrl}
        channelType={channelType}
        userActions={mockObj}
      />);
    expect(profile.find('h2').text()).toBe(user.userName);
  });
  it('should open/hide modal', () => {
    const profile = shallow(
      <Profile
        user={user}
        channelUrl={channelUrl}
        channelType={channelType}
        userActions={mockObj}
      />);
    expect(profile.state('modalIsOpen')).toBe(false);
    profile.find('.x-btn').simulate('click');
    expect(profile.state('modalIsOpen')).toBe(false);
  });
});
