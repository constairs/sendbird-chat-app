import React from 'react';
import { shallow } from 'enzyme';

import { user } from '../fixtures';
import { EditMessageForm } from '../../src/components/EditMessageForm';
import { Input } from '../../src/components/UI/Input';

const message = {
  sender: {
    nickname: user.nickname,
    profileUrl: user.profileUrl,
    userId: user.userId,
  },
  createdAt: 1546806300000,
  message: 'messsage',
  messageType: 'user',
  messageId: '1'
};

const mock = jest.fn();

const mockEvent = {
  target: {},
  preventDefault: () => {},
  value: 'value'
};

describe('<EditMessageForm />', () => {
  it('edit message form', () => {
    const messageItem = shallow(
      <EditMessageForm
        text={message.message || message.data}
        onEditMessage={mock}
      />
    );
    expect(messageItem.state('messageInput')).toBe(message.message);
    messageItem.find(Input).simulate('change', mockEvent);
    expect(messageItem.state('messageInput')).toBe(messageItem.find(Input).prop('value'));
  });
});
