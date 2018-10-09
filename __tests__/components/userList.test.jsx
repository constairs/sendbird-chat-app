import React from 'react';
import { shallow } from 'enzyme';

import { List } from '../../src/containers/UserList';

const channel = {
  members: [
    { userId: 1 }, { userId: 2 }, { userId: 3 }
  ],
};

describe('<UserList />', () => {
  it('should render members list', () => {
    const wrapper = shallow(<List channel={channel} />);
    expect(wrapper.children()).toHaveLength(3);
  });
});
