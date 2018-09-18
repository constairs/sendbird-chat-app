import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { user } from '../fixtures';
import { MessageItem } from '../../src/components/MessageItem';

const message = {
  sender: {
    nickname: user.nickname,
    profileUrl: user.profileUrl,
    userId: user.userId,
  },
  createdAt: 1546806300000,
  message: 'messsage',
};

const receipt = 1546806200000;

const fileMessage = {
  ...message,
  messageType: 'file',
  url: 'https://img.jpg',
  size: 1111,
  name: 'file',
  customType: '',
  message: null,
  data: 'text',
};

const uploadProgress = {
  progress: 100
};

describe('<MessageItem />', () => {
  it('should render sender info', () => {
    const messageItem = shallow(
      <MessageItem
        message={message}
      />
    );
    expect(messageItem.find('.sender-nick').text()).toBe(message.sender.nickname);
    expect(messageItem.find('.sending-date').text()).toBe(moment(message.createdAt).format('DD/MM/YY hh:mm a'));
    expect(messageItem.find('.sender-img img').prop('src')).toBe(message.sender.profileUrl);
  });
  it('should render file message preview', () => {
    const messageItem = shallow(
      <MessageItem message={fileMessage} />
    );
    expect(messageItem.find('.message-file-preview').children()).toExist();
  });
  it('should render image message preview', () => {
    const imageMessage = {
      ...fileMessage,
      customType: 'IMAGE',
    };
    const messageItem = shallow(
      <MessageItem message={imageMessage} />
    );
    expect(messageItem.find('.message-file-preview img').prop('src')).toBe(imageMessage.url);
    expect(messageItem.find('.message-file-preview img').prop('alt')).toBe(imageMessage.name);
  });
  it('should render file message link', () => {
    const messageItem = shallow(
      <MessageItem message={fileMessage} />
    );
    expect(messageItem.find('.file-message-item a').prop('href')).toBe(fileMessage.url);
    expect(messageItem.find('.file-message-item a').text()).toBe(`${fileMessage.name} (${fileMessage.size} кб)`);
  });
  it('should render message text', () => {
    const messageItem = shallow(
      <MessageItem message={message} />
    );
    expect(messageItem.find('.message-text').text()).toBe(message.message);
  });
  it('should render read indicator', () => {
    const messageItem = shallow(
      <MessageItem
        message={message}
        isNotRead={
          receipt < message.createdAt &&
          receipt !== 0
        }
        userId={user.userId}
      />
    );
    expect(messageItem.find('.isReadIndicator').children()).toExist();
  });
  it('should render file message text', () => {
    const messageItem = shallow(
      <MessageItem
        message={fileMessage}
      />
    );
    expect(messageItem.find('.message-text').text()).toBe(fileMessage.data);
  });
  it('should render loading progress', () => {
    const fakeMessage = {
      ...fileMessage,
      isFake: true,
    };
    const messageItem = shallow(
      <MessageItem
        message={fakeMessage}
        uploadProgress={uploadProgress}
      />
    );
    expect(messageItem.find('.loading-progress').text()).toBe(`${uploadProgress.progress} %`);
  });
  it('should render upload cancel upload button', () => {
    uploadProgress.progress = 66;
    const messageItem = shallow(
      <MessageItem
        message={fileMessage}
        uploadProgress={uploadProgress}
      />
    );
    expect(messageItem.find('.cancel-button')).toBeTruthy();
  });
  it('should render sender buttons', () => {
    const messageItem = shallow(
      <MessageItem
        message={message}
      />
    );
    expect(messageItem.find('.edit-btn')).toBeTruthy();
  });
});
