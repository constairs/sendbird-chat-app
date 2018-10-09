import React from 'react';
import { shallow } from 'enzyme';

import { MessageField } from '../../src/containers/ChatMessageField';
import { Field } from '../../src/containers/ChatMessageField/index.styles';
import { Input } from '../../src/components/UI/Input';


const channelUrl = 'https://url.com';
const channelType = 'group';
const mockEvent = { target: '', value: 'dd', preventDefault: () => {} };

const user = {
  userId: 'user',
  userName: 'user',
  userImg: 'https://img.jpg',
};
const userTyping = 'test';
const sendingMessage = false;
const membersTyping = [
  {
    userId: 'test',
    nickname: 'test'
  }, {
    userId: 'test2',
    nickname: 'test2'
  }
];

const chatActions = {
  messageTyping: jest.fn(),
  messageTypingEnd: jest.fn(),
  userTypingStart: jest.fn(),
  userTypingEnd: jest.fn(),
  sendMessage: jest.fn(),
  sendFileMessage: jest.fn()
};

describe('<MessageField />', () => {
  it('should change input', () => {
    const wrapper = shallow(
      <MessageField
        channelUrl={channelUrl}
        channelType={channelType}
        chatActions={chatActions}
        user={user}
        userTyping={userTyping}
        sendingMessage={sendingMessage}
      />
    );
    expect(wrapper.state('messageText')).toBe('');
    wrapper.find(Input).simulate('change', mockEvent);
    expect(wrapper.state('messageText')).toBe(wrapper.find(Input).prop('value'));
  });
  it('should render user typing indicator', () => {
    const wrapper = shallow(
      <MessageField
        channelUrl={channelUrl}
        channelType={channelType}
        chatActions={chatActions}
        user={user}
        userTyping={userTyping}
        sendingMessage={sendingMessage}
      />
    );
    expect(wrapper.find('.typing-indicator')).toExist();
  });
  it('should render typing indicator for open channel chat', () => {
    const wrapper = shallow(
      <MessageField
        channelUrl={channelUrl}
        channelType={channelType}
        chatActions={chatActions}
        user={user}
        userTyping={userTyping}
        sendingMessage={sendingMessage}
        membersTyping={membersTyping}
      />
    );
    expect(wrapper.find('.typing-indicator span')).toHaveLength(2);
  });
  it('should show fileUploadModal', () => {
    const wrapper = shallow(
      <MessageField
        channelUrl={channelUrl}
        channelType={channelType}
        chatActions={chatActions}
        user={user}
        userTyping={userTyping}
        sendingMessage={sendingMessage}
        membersTyping={membersTyping}
      />
    );
    expect(wrapper.state('fileUploadModal')).toBe(false);
    wrapper.find('.file-upload-modal-btn').simulate('click');
    expect(wrapper.state('fileUploadModal')).toBe(true);
  });
  it('should show sending indicator', () => {
    const wrapper = shallow(
      <MessageField
        channelUrl={channelUrl}
        channelType={channelType}
        chatActions={chatActions}
        user={user}
        userTyping={userTyping}
        sendingMessage
        membersTyping={membersTyping}
      />
    );
    expect(wrapper.find('.send-message-btn span')).toExist();
  });
  it('should call sendMessage & messageTypingEnd/userTypingEnd', () => {
    const wrapper = shallow(
      <MessageField
        channelUrl={channelUrl}
        channelType={channelType}
        chatActions={chatActions}
        user={user}
        userTyping={userTyping}
        sendingMessage
        membersTyping={membersTyping}
      />
    );
    wrapper.find(Field).simulate('submit', mockEvent);
    const messageData = [
      channelUrl,
      channelType,
      'MESG',
      user.userId,
      wrapper.state('messageText'),
    ];
    expect(chatActions.sendMessage).toHaveBeenCalledWith(messageData);
    expect(chatActions.userTypingEnd).toHaveBeenCalledWith([channelUrl, channelType]);
    const wrapperOpenCh = shallow(
      <MessageField
        channelUrl={channelUrl}
        channelType="open"
        chatActions={chatActions}
        user={user}
        userTyping={userTyping}
        sendingMessage
        membersTyping={membersTyping}
      />
    );
    wrapperOpenCh.find(Field).simulate('submit', mockEvent);
    expect(chatActions.messageTypingEnd).toHaveBeenCalled();
  });
});
