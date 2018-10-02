import React from 'react';
import { shallow } from 'enzyme';

import { MessageField, Field } from '../../src/containers/ChatMessageField';


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
const fileToUpload = {
  name: 'ddd',
  size: 111,
  preview: 'blob:http://0.0.0.0:3003/bc15c8f6-0252-47a0-b179-2e4bf52bf164',
  type: 'image/jpeg'
};

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
    wrapper.find('input[name="messageText"]').simulate('change', mockEvent);
    expect(wrapper.state('messageText')).toBe(wrapper.find('input[name="messageText"]').prop('value'));
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
  it('should render file for uploading', () => {
    const wrapper = shallow(
      <MessageField
        channelUrl={channelUrl}
        channelType={channelType}
        chatActions={{ fn: jest.fn() }}
        user={user}
        userTyping={userTyping}
        sendingMessage
        membersTyping={membersTyping}
      />
    );
    expect(wrapper.state('fileToUpload')).toBe('');
    wrapper.setState({ fileToUpload });
    expect(wrapper.find('.files-to-upload')).toExist();
    expect(wrapper.find('.file-preview').children()).toExist();
    wrapper.setState({ customMessageType: 'IMAGE' });
    expect(wrapper.find('.files-to-upload img').prop('src')).toBe(fileToUpload.preview);
    expect(wrapper.find('.file-item p').text()).toBe(`${fileToUpload.size} кб`);
  });
  it('should clear file for uploading', () => {
    const wrapper = shallow(
      <MessageField
        channelUrl={channelUrl}
        channelType={channelType}
        chatActions={{ fn: jest.fn() }}
        user={user}
        userTyping={userTyping}
        sendingMessage
        membersTyping={membersTyping}
      />
    );
    wrapper.setState({ fileToUpload });
    wrapper.find('.clear-file-upload').simulate('click');
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
    wrapperOpenCh.find('.chat-message-form').simulate('submit', mockEvent);
    expect(chatActions.messageTypingEnd).toHaveBeenCalled();
  });
});
