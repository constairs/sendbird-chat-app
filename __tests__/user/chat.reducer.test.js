import { chat as reducer, initState } from '../../src/redux/chat/reducer';
import * as actions from '../../src/redux/chat/actions';
import { onUsersTyping } from '../../src/redux/channels/groupChannelsActions';
import { getSelectedChannelSuccessed, channelUpdated } from '../../src/redux/channels/actions';
import { enterChannelSuccessed } from '../../src/redux/channels/openChannelsActions';
import { getChannelFunc } from '../../src/redux/channels/helpers';

const message = {
  messageType: ' user',
  messageId: 1832802277,
  channelUrl: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
  createdAt: 1537151810941,
  updatedAt: 0,
  channelType: 'open',
  mentionType: 'users',
  mentionedUsers: '',
  message: 'fdfd',
  data: '',
  reqId: '1537150730719',
  customType: '',
  translations: '',
};
const messageId = 1832802277;
const editRes = {
  ...message,
  updatedAt: 1537151810948,
  message: 'another text',
};
const replacer = editRes;
const channel = {
  url: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943'
};
const newChannel = {
  url: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
  channelType: 'group',
  cachedReadReceiptStatus: {
    test: 1536904355795,
    user: 1536806256382
  },
};
const metaData = {
  userTyping: 'user',
};
const typingMembers = [1, 2];
const receipt = 1546806256382;
const progress = 66;


describe('chat reducer', () => {
  it('sendMessage', () => {
    const state = reducer(initState, actions.sendMessage());
    expect(state.sendingMessage).toBe(true);
  });
  it('sendMessageSuccessed', () => {
    const stateBefore = {
      ...initState,
      messages: [1, 2, 3],
      sendingMessage: true,
    };
    const state = reducer(stateBefore, actions.sendMessageSuccessed(channel, message));
    expect(state).toEqual({
      ...stateBefore,
      sendingMessage: false,
      messages: [...stateBefore.messages, message],
    });
  });
  it('sendMessageFailed', () => {
    const state = reducer(initState, actions.sendMessageFailed(Error));
    expect(state.sendingMessage).toBe(false);
    expect(state.error).toBe(Error);
  });
  it('sendFileMessageSuccessed', () => {
    const state = reducer(initState, actions.sendFileMessageSuccessed(channel, message));
    expect(state).toEqual({
      ...initState,
      messages: [...initState.messages, message],
    });
  });
  it('sendFileMessageFailed', () => {
    const state = reducer(initState, actions.sendFileMessageFailed(Error));
    expect(state.error).toBe(Error);
  });
  it('deleteMessageFailed', () => {
    const state = reducer(initState, actions.deleteMessageFailed(Error));
    expect(state.error).toBe(Error);
  });
  it('editMessageSuccessed', () => {
    const stateBefore = {
      ...initState,
      messages: [1, 2, 3],
    };
    const state = reducer(stateBefore, actions.editMessageSuccessed(editRes));
    expect(state).toEqual({
      ...stateBefore,
      messages: stateBefore.messages.map(mess =>
        (mess.messageId === editRes.messageId ? editRes : mess)),
    });
  });
  it('editMessageFailed', () => {
    const state = reducer(initState, actions.editMessageFailed(Error));
    expect(state.error).toBe(Error);
  });
  it('editFileMessageSuccessed', () => {
    const stateBefore = {
      ...initState,
      messages: [1, 2, 3],
    };
    const state = reducer(stateBefore, actions.editFileMessageSuccessed(editRes));
    expect(state).toEqual({
      ...stateBefore,
      messages: stateBefore.messages.map(mess =>
        (mess.messageId === editRes.messageId ? editRes : mess)),
    });
  });
  it('editFileMessageFailed', () => {
    const state = reducer(initState, actions.editFileMessageFailed(Error));
    expect(state.error).toBe(Error);
  });
  it('getMessages', () => {
    const state = reducer(initState, actions.getMessagesRequest());
    expect(state.messFetching).toBe(true);
  });
  it('getMessagesSuccessed', () => {
    const state = reducer(initState, actions.getMessagesSuccessed([1, 2, 3, 4]));
    expect(state.messages).toHaveLength(4);
    expect(state.messFetching).toBe(false);
  });
  it('getMessagesFailed', () => {
    const state = reducer(initState, actions.getMessagesFailed(Error));
    expect(state.error).toBe(Error);
  });
  it('messageReceived', () => {
    const stateBefore = {
      ...initState,
      currentChannel: {
        url: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
      }
    };
    const state = reducer(stateBefore, actions.messageReceived(channel, message));
    expect(state).toEqual({
      ...stateBefore,
      messages: [...initState.messages, message]
    });
  });
  it('messageUpdated', () => {
    const state = reducer(initState, actions.messageUpdated(channel, editRes));
    expect(state).toEqual({
      ...initState,
      messages: initState.messages.map(mess =>
        (mess.messageId === editRes.messageId ? editRes : mess)),
    });
  });
  it('messageDeleted', () => {
    const stateBefore = {
      ...initState,
      messages: [message]
    };
    const state = reducer(initState, actions.messageDeleted(messageId));
    expect(state).toEqual({
      ...stateBefore,
      messages: stateBefore.messages.filter(mess => mess.messageId !== messageId),
    });
  });
  it('messageTypingSet', () => {
    const state = reducer(initState, actions.messageTypingSet(metaData));
    expect(state.userTyping).toBe(metaData.userTyping);
  });
  it('messageTypingEnd', () => {
    const state = reducer(initState, actions.messageTypingEnd());
    expect(state.userTyping).toBe('');
  });
  it('messageTypingError', () => {
    const state = reducer(initState, actions.messageTypingError(Error));
    expect(state.error).toBe(Error);
  });
  it('cleanChat', () => {
    const stateBefore = {
      ...initState,
      messages: [1, 2, 3]
    };
    const state = reducer(stateBefore, actions.cleanChat());
    expect(state.messages).toEqual([]);
  });
  it('onUsersTyping', () => {
    const stateBefore = {
      ...initState,
      currentChannel: {
        url: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
      }
    };
    const state = reducer(stateBefore, onUsersTyping(channel, typingMembers));
    expect(state.membersTyping).toEqual(typingMembers);
  });
  it('changeChannelGroup', () => {
    const stateBefore = {
      ...initState,
      currentChannel: {
        channelType: 'open',
        url: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
      }
    };
    const state = reducer(stateBefore, getSelectedChannelSuccessed(newChannel));
    expect(state.currentChannel).toEqual(newChannel);
    expect(state.receipt).toBe(Object.values(newChannel.cachedReadReceiptStatus).sort(
      (a, b) => a > b
    )[0]);
  });
  it('changeOpenChannel', () => {
    const stateBefore = {
      ...initState,
      currentChannel: {
        channelType: 'group',
        url: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
        cachedReadReceiptStatus: {
          test: 1536904355795,
          user: 1536806256382
        },
      },
      receipt: 1536806256382,
    };
    const state = reducer(stateBefore, enterChannelSuccessed(newChannel));
    expect(state.currentChannel).toEqual(newChannel);
    expect(state.receipt).toBe(0);
  });
  it('readReceipt', () => {
    const stateBefore = {
      ...initState,
      currentChannel: {
        channelType: 'group',
        url: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
        cachedReadReceiptStatus: {
          test: 1536904355795,
          user: 1536806256382
        }
      }
    };
    const state = reducer(stateBefore, actions.readReceipt(receipt, channel.url));
    expect(state.receipt).toBe(receipt);
  });
  it('channelUpdated', () => {
    const stateBefore = {
      ...initState,
      currentChannel: channel
    };
    const state = reducer(stateBefore, channelUpdated(newChannel));
    expect(state.currentChannel).toEqual(getChannelFunc(newChannel));
  });
  it('preloadFileMessage', () => {
    const state = reducer(initState, actions.preloadFileMessage(progress));
    expect(state.uploadProgress).toBe(progress);
  });
  it('replaceMessage', () => {
    const stateBefore = {
      ...initState,
      messgaes: [1, 2, 3, message]
    };
    const state = reducer(stateBefore, actions.replaceMessage(replacer));
    expect(state.messages).toEqual(stateBefore.messages.map(mess =>
      (mess.messageId === replacer.messageId ? replacer.message : mess)));
  });
  it('cancelUploadingSuccessed', () => {
    const stateBefore = {
      ...initState,
      messages: [1, 2, 3, message],
    };
    const state = reducer(stateBefore, actions.cancelUploadingSuccessed(messageId));
    expect(state.messages).toEqual(stateBefore.messages.filter(mess =>
      mess.messageId !== messageId));
  });
  it('cancelUploadingFailed', () => {
    const state = reducer(initState, actions.cancelUploadingFailed(Error));
    expect(state.error).toBe(Error);
  });
});
