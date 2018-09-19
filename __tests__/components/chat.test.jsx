import React from 'react';
import { shallow } from 'enzyme';

import { Chat } from '../../src/containers/ChatBox';
import { receipt } from '../fixtures';

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

describe('<Chat />', () => {
  it('should render preloader', () => {
    const chat = shallow(<Chat
      user={user}
      chatActions={{ fn: jest.fn() }}
      messages={messages}
      messFetching={messFetching}
      uploadProgress={uploadProgress}
      readReceipt={receipt}
      channelUrl={channelUrl}
      channelType={channelType}
    />);
    expect(chat.find('.preloader').children()).toExist();
  });
  it('should render messages', () => {
    const chat = shallow(<Chat
      user={user}
      chatActions={{ fn: jest.fn() }}
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
