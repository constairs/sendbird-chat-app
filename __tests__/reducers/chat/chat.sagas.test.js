import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { cloneableGenerator } from 'redux-saga/utils';

import {
  sendMessage,
  sendFileMessage,
  cancelUploadingMessage,
  deleteMessage,
  editMessage,
  getMessages,
  onMessageTyping,
  typingStart,
  typingEnd,
  markAsReadSb
} from '../../../src/services/sendbird';
import * as sagas from '../../../src/redux/chat/sagas';
import * as actions from '../../../src/redux/chat/actions';
import * as TYPES from '../../../src/redux/chat/types';
import { mockSendbird } from '../../mock';

beforeAll(mockSendbird);

describe('sendMessageSaga', () => {
  const action = {
    type: TYPES.SEND_MESSAGE,
    messageData: [
      'https://url.com/',
      'open',
      'user',
      'test',
      'messageText',
      '',
      ''
    ]
  };

  const sendMessageSaga = cloneableGenerator(sagas.sendMessageSaga)(action);

  // it('should send message', () => {
  //   const gen = sendMessageSaga.clone();
  //   expect(gen.next().value).toEqual(call(sendMessage, ...action.messageData));
  //   const sendRes = {
  //     channel: { channelType: 'open' },
  //     message: { message: 'message' }
  //   };
  //   expect(gen.next().value).toEqual(
  //     put(actions.sendMessageSuccessed(sendRes.channel, sendRes.message))
  //   );
  // });

  it('should call sendMessageFailed', () => {
    const gen = sendMessageSaga.clone();
    const error = Error('send message error');
    expect(gen.next().value).toEqual(call(sendMessage, ...action.messageData));
    expect(gen.throw(error).value).toEqual(put(actions.sendMessageFailed(error.message)));
  });
});

describe('cancelUploadingSaga', () => {
  const action = {
    type: TYPES.CANCEL_UPLOADING,
    payload: [
      'https://url.com/',
      'open',
      'reqId',
      111111
    ],
  };
  const cancelUploadingSaga = cloneableGenerator(sagas.cancelUploadingSaga)(action);

  it('should cancel uploading file message', () => {
    const gen = cancelUploadingSaga.clone();
    expect(gen.next().value).toEqual(call(cancelUploadingMessage, true, ...action.payload));
    expect(gen.next().value).toEqual(put(actions.cancelUploadingSuccessed()));
  });

  it('should call cancelUploadingFailed', () => {
    const gen = cancelUploadingSaga.clone();
    const error = Error('cancel uploading error');
    expect(gen.next().value).toEqual(call(cancelUploadingMessage, true, ...action.payload));
    expect(gen.throw(error).value).toEqual(put(actions.cancelUploadingFailed(error.message)));
  });
});

describe('sendFileMessageSaga', () => {
  const action = {
    type: TYPES.SEND_FILE_MESSAGE,
    fileMessageData: [
      'https://url.com/',
      'open',
      'FILE',
      'user',
      '',
      'filename',
      'type',
      1222,
      'messageText',
      'IMAGE'
    ]
  };
  const sendFileMessageSaga = cloneableGenerator(sagas.sendFileMessageSaga)(action);

  // it('should send file message', () => {
  //   const gen = sendFileMessageSaga.clone();
  //   gen.next();
  //   expect(gen.next().value).toEqual(call(sendFileMessage, ...action.fileMessageData));
  //   const sendRes = {
  //     channel: { channelType: 'group', url: 'https://url.com/' },
  //     message: { messageId: 1, message: 'text' }
  //   };
  //   const replacer = {
  //     messageId: 1,
  //     message: sendRes.message,
  //   };
  //   expect(gen.next().value).toEqual(put(actions.replaceMessage(replacer)));
  //   expect(gen.next().value).toEqual(call(markAsReadSb, sendRes.channel));
  //   expect(gen.next().value).toEqual(put(actions.markAsRead()));
  // });
  it('should call sendFileMessageFailed', () => {
    const gen = sendFileMessageSaga.clone();
    const error = Error('send file message failed');
    gen.next();
    expect(gen.throw(error).value).toEqual(put(actions.sendFileMessageFailed(error.message)));
  });
});

describe('deleteMessageSaga', () => {
  const action = {
    type: TYPES.DELETE_MESSAGE,
    messageData: ['https://url.com/', 'group', 1]
  };

  const deleteMessageSaga = cloneableGenerator(sagas.deleteMessageSaga)(action);
  it('should delete message', () => {
    const gen = deleteMessageSaga.clone();
    expect(gen.next().value).toEqual(call(deleteMessage, ...action.messageData));
    expect(gen.next().value).toEqual(put(actions.deleteMessageSuccessed()));
  });
  it('should call deleteMessageSagaFailed', () => {
    const gen = deleteMessageSaga.clone();
    const error = Error('delete message error');
    gen.next();
    expect(gen.throw(error).value).toEqual(put(actions.deleteMessageFailed(error.message)));
  });
});

describe('editMessageSaga', () => {
  const action = {
    type: TYPES.EDIT_MESSAGE,
    messageData: []
  };
  const editMessageSaga = cloneableGenerator(sagas.editMessageSaga)(action);
  it('should edit message', () => {
    const gen = editMessageSaga.clone();
    expect(gen.next().value).toEqual(call(editMessage, ...action.messageData));
    expect(gen.next().value).toEqual(put(actions.editMessageSuccessed()));
  });
  it('should call editMessageFailed', () => {
    const gen = editMessageSaga.clone();
    const error = Error('edit message error');
    expect(gen.next().value).toEqual(call(editMessage, ...action.messageData));
    expect(gen.throw(error).value).toEqual(put(actions.editMessageFailed(error.message)));
  });
});

describe('getMessagesSaga', () => {
  const action = {
    type: TYPES.GET_MESSAGES,
    payload: {
      url: 'https://url.com/',
      channelType: 'group'
    }
  };
  const getMessagesSaga = cloneableGenerator(sagas.getMessagesSaga)(action);
  it('should get messages request', () => {
    const gen = getMessagesSaga.clone();
    expect(gen.next().value).toEqual(put(actions.getMessagesRequest(action.payload)));
    expect(gen.next().value).toEqual(
      call(getMessages, action.payload.url, action.payload.channelType)
    );
    expect(gen.next().value).toEqual(put(actions.getMessagesSuccessed()));
  });
  it('should call getMessagesFailed', () => {
    const gen = getMessagesSaga.clone();
    const error = Error('get messages error');
    expect(gen.next().value).toEqual(put(actions.getMessagesRequest(action.payload)));
    expect(gen.next().value).toEqual(
      call(getMessages, action.payload.url, action.payload.channelType)
    );
    expect(gen.throw(error).value).toEqual(put(actions.getMessagesFailed(error.message)));
  });
});

describe('messageTypingSaga', () => {
  const action = {
    type: TYPES.MESSAGE_TYPING,
    payload: ['message', '1'],
  };
  const messageTypingSaga = cloneableGenerator(sagas.messageTypingSaga)(action);
  it('should message typing', () => {
    const gen = messageTypingSaga.clone();
    expect(gen.next().value).toEqual(call(onMessageTyping, ...action.payload));
    expect(gen.next().value).toEqual(put(actions.messageTypingSet()));
    expect(gen.next().value).toEqual(call(delay, 1000));
    expect(gen.next().value).toEqual(call(onMessageTyping, ...action.payload, '', ''));
    expect(gen.next().value).toEqual(put(actions.messageTypingEnd()));
  });
  it('should call messageTypingError', () => {
    const gen = messageTypingSaga.clone();
    const error = Error('message typing error');
    expect(gen.next().value).toEqual(call(onMessageTyping, ...action.payload));
    expect(gen.throw(error).value).toEqual(put(actions.messageTypingError(error.message)));
  });
});

describe('userTypingEndSaga', () => {
  const action = {
    type: TYPES.USER_TYPING_END,
    payload: ['https://url.com/', 'group']
  };
  const userTypingEndSaga = cloneableGenerator(sagas.userTypingEndSaga)(action);
  it('should user end typing', () => {
    const gen = userTypingEndSaga.clone();
    expect(gen.next().value).toEqual(call(typingEnd, ...action.payload));
  });
});

describe('userTypingSaga', () => {
  const action = {
    type: TYPES.USER_TYPING_START,
    payload: ['https://url.com/', 'group'],
  };
  const userTypingSaga = cloneableGenerator(sagas.userTypingSaga)(action);
  it('should user typing start', () => {
    const gen = userTypingSaga.clone();
    expect(gen.next().value).toEqual(call(typingStart, ...action.payload));
    expect(gen.next().value).toEqual(call(delay, 2000));
    expect(gen.next().value).toEqual(call(typingEnd, ...action.payload));
  });
});

describe('editFileMessageSaga', () => {
  const action = {
    type: TYPES.EDIT_FILE_MESSAGE,
    payload: ['ds', 'group', 'file', 1, 'message'],
  };
  const editFileMessageSaga = cloneableGenerator(sagas.editFileMessageSaga)(action);
  it('should edit file message', () => {
    const gen = editFileMessageSaga.clone();
    expect(gen.next().value).toEqual(call(editMessage, ...action.payload));
    expect(gen.next().value).toEqual(put(actions.editFileMessageSuccessed()));
  });
  it('should call editFileMessageFailed', () => {
    const gen = editFileMessageSaga.clone();
    const error = Error('edit file message error');
    expect(gen.next().value).toEqual(call(editMessage, ...action.payload));
    expect(gen.throw(error).value).toEqual(put(actions.editFileMessageFailed(error.message)));
  });
});

describe('markAsReadSaga', () => {
  const action = {
    type: TYPES.MESSAGE_RECEIVED,
    payload: { channel: { channelType: 'group', url: 'https://url.com/' }, message: { message: 'message' } }
  };
  const markAsReadSaga = cloneableGenerator(sagas.markAsReadSaga)(action);
  it('should mark as read', () => {
    const gen = markAsReadSaga.clone();
    expect(gen.next().value).toEqual(call(delay, 1000));
    expect(gen.next().value).toEqual(call(markAsReadSb, action.payload.channel));
    expect(gen.next().value).toEqual(put(actions.markAsRead()));
  });
});
