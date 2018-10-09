import React from 'react';
import { shallow } from 'enzyme';

import { ChannelList, List } from '../../src/components/ChannelList';
import { Preloader } from '../../src/components/UI/Preloader';

const channelsFetching = true;
const channelList = [{ name: '1', createdAt: 111 }, { name: '2', createdAt: 111 }, { name: '3', createdAt: 111 }];
const mock = jest.fn();

describe('<ChannelList />', () => {
  it('should render preloader', () => {
    const list = shallow(<ChannelList
      channelsFetching={channelsFetching}
      channels={channelList}
      selectedChan={mock}
      onLeave={mock}
    />);
    expect(list.find(Preloader)).toExist();
  });
  it('should render ChannelListItem component', () => {
    const list = shallow(
      <ChannelList
        channels={channelList}
        selectedChan={mock}
        onLeave={mock}
      />);
    expect(list.find(List).children()).toHaveLength(3);
  });
});
