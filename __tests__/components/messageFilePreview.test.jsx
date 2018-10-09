import React from 'react';
import { shallow } from 'enzyme';

import { user } from '../fixtures';
import { MessageFilePreview } from '../../src/components/MessageFilePreview';

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

describe('<MessageFilePreview', () => {
  it('should render image message preview', () => {
    const imageMessage = {
      ...fileMessage,
      customType: 'IMAGE',
    };
    const messageFilePreview = shallow(
      <MessageFilePreview
        customType={imageMessage.customType}
        url={imageMessage.url}
        name={imageMessage.name}
      />
    );
    expect(messageFilePreview.find('img').prop('src')).toBe(imageMessage.url);
    expect(messageFilePreview.find('img').prop('alt')).toBe(imageMessage.name);
  });
});
