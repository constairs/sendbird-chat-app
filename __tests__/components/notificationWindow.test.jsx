import React from 'react';
import { shallow } from 'enzyme';

import { NotificationWindow } from '../../src/components/NotificationWindow';
import { groupChannel, user } from '../fixtures';
import { getChannelFunc } from '../../src/redux/channels/helpers';

const notification = {
  type: 'userLeft',
  channel: getChannelFunc(groupChannel),
  user,
};
const nick = user.nickname;

const mock = jest.fn();


describe('<NotificationWindow />', () => {
  it('should render join notification', () => {
    const wrapper = shallow(
      <NotificationWindow
        notification={notification}
        nickname={nick}
        notificationShow
        onNotificationClose={mock}
      />);
    expect(wrapper.find('.notification-window p')).toExist();
  });
  it('should show notification', () => {
    const wrapper = shallow(
      <NotificationWindow
        notification={notification}
        nickname={nick}
        notificationShow
        onNotificationClose={mock}
      />
    );
    expect(wrapper.prop('className')).toBe('notification-window show');
  });
  it('should close notification', () => {
    const wrapper = shallow(
      <NotificationWindow
        notification={notification}
        nickname={nick}
        notificationShow
        onNotificationClose={mock}
      />
    );
    wrapper.find('.x-btn').simulate('click');
    expect(mock).toHaveBeenCalled();
  });
});
