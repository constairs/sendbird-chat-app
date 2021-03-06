import React from 'react';
import { shallow } from 'enzyme';

import { Chat } from '../../src/containers/ChatBox';
import { receipt } from '../fixtures';
import { Preloader } from '../../src/components/UI/Preloader';

const user = {
  userId: 'user',
  userName: 'user',
  userImg: 'hhtps://img.jpg'
};
const messages = [
  { message: '1', createdAt: 1111 },
  { message: '1', createdAt: 1111 },
  { message: '1', createdAt: 1111 }
];
const messFetching = true;
const uploadProgress = {
  progress: 66
};
const channelType = 'group';
const channelUrl = 'https://img.jpg';

const chatActions = {
  deleteMessage: jest.fn(),
  editMessage: jest.fn(),
  cancelUploadingMessage: jest.fn()
};

describe('<Chat />', () => {
  it('should render preloader', () => {
    const chat = shallow(<Chat
      user={user}
      chatActions={chatActions}
      messages={messages}
      messFetching={messFetching}
      uploadProgress={uploadProgress}
      readReceipt={receipt}
      channelUrl={channelUrl}
      channelType={channelType}
    />);
    expect(chat.find(Preloader)).toExist();
  });
  it('should render messages', () => {
    const chat = shallow(<Chat
      user={user}
      chatActions={chatActions}
      messages={messages}
      messFetching={messFetching}
      uploadProgress={uploadProgress}
      readReceipt={receipt}
      channelUrl={channelUrl}
      channelType={channelType}
    />);
    expect(chat.find('.chat-box').children()).toHaveLength(3);
  });
});
