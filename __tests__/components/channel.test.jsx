import React from 'react';
import { shallow } from 'enzyme';

import { Channel } from '../../src/components/Channel';

const channel = {
  members: [{ userId: 1 }, { userId: 2 }, { userId: 3 }],
};

describe('<Channel />', () => {
  it('should render members list', () => {
    const wrapper = shallow(<Channel channel={channel} />);
    expect(wrapper.find('.users-list').children()).toHaveLength(3);
  });
});

