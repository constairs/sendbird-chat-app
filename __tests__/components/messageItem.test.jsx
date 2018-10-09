import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { user } from '../fixtures';
import { MessageItem, StyledImg } from '../../src/components/MessageItem';
import { EditMessageForm } from '../../src/components/EditMessageForm';
import { MessageFilePreview } from '../../src/components/MessageFilePreview';
import { FilePreloader } from '../../src/components/FilePreloader';

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

const mock = jest.fn();

const mockEvent = {
  target: {},
  preventDefault: () => {},
  value: 'value'
};

describe('<MessageItem />', () => {
  it('should render sender info', () => {
    const messageItem = shallow(
      <MessageItem
        message={message}
        userId={user.userId}
        uploadProgress={uploadProgress}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    expect(messageItem.find('.sender-nick').text()).toBe(message.sender.nickname);
    expect(messageItem.find('.sending-date').text()).toBe(moment(message.createdAt).format('DD/MM/YY hh:mm a'));
    expect(messageItem.find(StyledImg).prop('src')).toBe(message.sender.profileUrl);
  });
  it('should render file message preview', () => {
    const messageItem = shallow(
      <MessageItem
        message={fileMessage}
        userId={user.userId}
        uploadProgress={uploadProgress}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    expect(messageItem.find(MessageFilePreview)).toExist();
  });
  it('should render file message link', () => {
    const messageItem = shallow(
      <MessageItem
        userId={user.userId}
        uploadProgress={uploadProgress}
        message={fileMessage}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    expect(messageItem.find('.file-info a').prop('href')).toBe(fileMessage.url);
    expect(messageItem.find('.file-info a').text()).toBe(`${fileMessage.name} (${fileMessage.size} кб)`);
  });
  it('should render message text', () => {
    const messageItem = shallow(
      <MessageItem
        userId={user.userId}
        uploadProgress={uploadProgress}
        message={message}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    expect(messageItem.find('.message-text').text()).toBe(message.message);
  });
  it('should render read indicator', () => {
    const messageItem = shallow(
      <MessageItem
        userId={user.userId}
        uploadProgress={uploadProgress}
        message={message}
        isNotRead={
          receipt < message.createdAt &&
          receipt !== 0
        }
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    expect(messageItem.find('.isReadIndicator').children()).toExist();
  });
  it('should render file message text', () => {
    const messageItem = shallow(
      <MessageItem
        userId={user.userId}
        uploadProgress={uploadProgress}
        message={fileMessage}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    expect(messageItem.find('.message-text').text()).toBe(fileMessage.data);
  });
  it('should render file preloader', () => {
    const fakeMessage = {
      ...fileMessage,
      isFake: true,
    };
    const messageItem = shallow(
      <MessageItem
        userId={user.userId}
        uploadProgress={uploadProgress}
        message={fakeMessage}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    expect(messageItem.find(FilePreloader)).toExist();
  });
  it('should render sender buttons', () => {
    const messageItem = shallow(
      <MessageItem
        userId={user.userId}
        uploadProgress={uploadProgress}
        message={message}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    expect(messageItem.find('.edit-btn')).toExist();
  });
  it('should show edit message form', () => {
    const messageItem = shallow(
      <MessageItem
        userId={user.userId}
        uploadProgress={uploadProgress}
        message={message}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    expect(messageItem.state('onEdit')).toBe(false);
    messageItem.find('.edit-btn').simulate('click');
    expect(messageItem.state('onEdit')).toBe(true);
    expect(messageItem.find(EditMessageForm)).toExist();
  });
  it('should call onDelete func', () => {
    const messageItem = shallow(
      <MessageItem
        userId={user.userId}
        uploadProgress={uploadProgress}
        message={message}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    messageItem.find('#delMessage').simulate('click');
    expect(mock).toHaveBeenCalledWith(message);
  });
  it('should call onDelete func', () => {
    const messageItem = shallow(
      <MessageItem
        userId={user.userId}
        uploadProgress={uploadProgress}
        message={message}
        onDeleteMessage={mock}
        onEditMessage={mock}
        onCancelUploading={mock}
      />
    );
    messageItem.setState({ onEdit: true });
    messageItem.find(EditMessageForm).simulate('onEditMessage', mockEvent);
    expect(mock).toHaveBeenCalledWith(message);
  });
});
