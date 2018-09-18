import React from 'react';
import { shallow } from 'enzyme';

import { ChannelList } from '../../src/components/ChannelList';

const channelsFetching = true;
const channelList = [{ name: '1' }, { name: '2' }, { name: '3' }];

describe('<ChannelList />', () => {
  it('should render preloader', () => {
    const list = shallow(<ChannelList
      channelsFetching={channelsFetching}
      channels={channelList}
    />);
    expect(list.find('.preloader').children()).toExist();
  });
  it('should render ChannelListItem component', () => {
    const list = shallow(<ChannelList channels={channelList} />);
    expect(list.find('.channels-list').children()).toHaveLength(3);
  });
});
