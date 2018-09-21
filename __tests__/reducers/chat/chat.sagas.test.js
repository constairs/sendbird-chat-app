import { call, put } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import { cloneableGenerator } from 'redux-saga/utils';

import {
  sendMessage,
  cancelUploadingMessage,
  // sendFileMessage
} from '../../../src/services/sendbird';
import * as sagas from '../../../src/redux/chat/sagas';
import * as actions from '../../../src/redux/chat/actions';
import * as TYPES from '../../../src/redux/chat/types';
import { mockSendbird } from '../../mock';

beforeAll(mockSendbird);

describe('sendMessageSaga', () => {
  const action = {
    type: TYPES.SEND_FILE_MESSAGE,
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
  // put(actions.sendMessageSuccessed(sendRes.channel, sendRes.message))
  // );
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

// describe('sendFileMessageSaga', () => {
//   const action = {
//     type: TYPES.SEND_FILE_MESSAGE,
//     fileMessageData: [
//       'https://url.com/',
//       'open',
//       'FILE',
//       'user',
//       '',
//       'filename',
//       'type',
//       1222,
//       'messageText',
//       'IMAGE'
//     ]
//   };
// const sendFileMessageSaga = cloneableGenerator(sagas.sendFileMessageSaga)(action);

// it('should send file message', () => {
//   const gen = sendFileMessageSaga.clone();
//   gen.next();
//   expect(gen.next().value).toEqual(call(sendFileMessage, ...action.fileMessageData));
//   gen.next();
// });
// });
