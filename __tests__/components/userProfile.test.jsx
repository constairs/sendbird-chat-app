import React from 'react';
import { shallow } from 'enzyme';

import { Profile } from '../../src/containers/UserProfile';

const user = {
  userName: 'test2',
  userImg: 'https://img.jpg',
  userId: 'test',
};

describe('<UserProfile />', () => {
  it('should render user cover img', () => {
    const profile = shallow(<Profile user={user} />);
    expect(profile.find('.user-cover img').prop('src')).toBe(user.userImg);
  });
  it('should render user nickname', () => {
    const profile = shallow(<Profile user={user} />);
    expect(profile.find('.user-nickname').text()).toBe(user.userName);
  });
});
