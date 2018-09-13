import {
  call,
  put,
  takeLatest,
  takeEvery,
  all,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { v4 } from 'uuid';
import {
  ENTER_CHANNEL_SUCCESSED,
  GET_SELECTED_CHANNEL_SUCCESSED,
} from '../channels/types';
import {
  sendMessage,
  sendFileMessage,
  deleteMessage,
  editMessage,
  getMessages,
  onMessageTyping,
  markAsReadSb,
  editFileMessage,
  cancelUploadingMessage,
  typingStart,
  typingEnd
} from '../../services/sendbird';
import {
  SEND_MESSAGE,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESSED,
  EDIT_MESSAGE,
  MESSAGE_TYPING,
  SEND_FILE_MESSAGE,
  EDIT_FILE_MESSAGE,
  MESSAGE_RECEIVED,
  CANCEL_UPLOADING,
  USER_TYPING_START,
  USER_TYPING_END,
} from './types';
import {
  sendMessageSuccessed,
  sendMessageFailed,
  deleteMessageSuccessed,
  deleteMessageFailed,
  editMessageSuccessed,
  editMessageFailed,
  getMessagesRequest,
  getMessagesSuccessed,
  getMessagesFailed,
  messageTypingSet,
  messageTypingError,
  messageTypingEnd,
  editFileMessageSuccessed,
  editFileMessageFailed,
  markAsRead,
  replaceMessage,
  cancelUploadingSuccessed,
  cancelUploadingFailed,
} from './actions';

function* sendMessageSaga(action) {
  try {
    const sendRes = yield call(sendMessage, ...action.messageData);
    yield put(sendMessageSuccessed(sendRes.channel, sendRes.messages));
    if (sendRes.channel.channelType === 'group') {
      yield call(markAsReadSb, sendRes.channel);
      yield put(markAsRead());
    }
  } catch (error) {
    yield put(sendMessageFailed(error));
  }
}

function* cancelUploadingSaga(action) {
  try {
    const cancelRes = yield call(
      cancelUploadingMessage,
      true,
      ...action.payload
    );
    yield put(cancelUploadingSuccessed(cancelRes));
  } catch (error) {
    yield put(cancelUploadingFailed(error));
  }
}

function* sendFileMessageSaga(action) {
  try {
    const fakeId = v4();
    const creationTime = new Date();
    const fakeMessage = {
      isFake: true,
      messageType: 'file',
      channelUrl: action.fileMessageData[0],
      channelType: action.fileMessageData[1],
      name: action.fileMessageData[5],
      type: action.fileMessageData[6],
      size: action.fileMessageData[7],
      data: action.fileMessageData[8],
      createdAt: creationTime.getTime(),
      messageId: fakeId,
      sender: {
        profileUrl: action.fileMessageData[3].userImg,
        userId: action.fileMessageData[3].userId,
        nickname: action.fileMessageData[3].userName,
      },
    };

    yield put(
      sendMessageSuccessed(
        {
          channelUrl: action.fileMessageData[0],
          channelType: action.fileMessageData[1],
        },
        fakeMessage
      )
    );

    const sendRes = yield call(sendFileMessage, ...action.fileMessageData);

    const replacer = {
      messageId: fakeId,
      message: sendRes.fileMessage,
    };

    yield put(replaceMessage(replacer));

    if (sendRes.channel.channelType === 'group') {
      yield call(markAsReadSb, sendRes.channel);
      yield put(markAsRead());
    }
  } catch (error) {
    yield put(sendMessageFailed(error));
  }
}

function* deleteMessageSaga(action) {
  try {
    const delChannel = yield call(deleteMessage, ...action.messageData);
    yield put(deleteMessageSuccessed(delChannel));
  } catch (error) {
    yield put(deleteMessageFailed(error));
  }
}

function* editMessageSaga(action) {
  try {
    const editRes = yield call(editMessage, ...action.messageData);
    yield put(editMessageSuccessed(editRes));
  } catch (error) {
    yield put(editMessageFailed(error));
  }
}

function* getMessagesSaga(action) {
  yield put(getMessagesRequest(action.payload));
  try {
    const messages = yield call(
      getMessages,
      action.payload.url,
      action.payload.channelType
    );
    yield put(getMessagesSuccessed(messages));
    if (action.payload.channelType === 'group') {
      yield call(markAsReadSb, action.payload);
      yield put(markAsRead());
    }
  } catch (error) {
    yield put(getMessagesFailed(error));
  }
}

function* messageTypingSaga(action) {
  try {
    const startRes = yield call(onMessageTyping, ...action.payload);
    yield put(messageTypingSet(startRes));
    yield call(delay, 1000);
    const endRes = yield call(
      onMessageTyping,
      action.payload[0],
      action.payload[1],
      '',
      ''
    );
    yield put(messageTypingEnd(endRes));
  } catch (error) {
    yield put(messageTypingError(error));
  }
}

function* userTypingEndSaga(action) {
  yield call(typingEnd, ...action.payload);
}

function* userTypingSaga(action) {
  if (action.type === 'USER_TYPING_START') {
    yield call(typingStart, ...action.payload);
    yield call(delay, 2000);
    yield call(typingEnd, ...action.payload);
  }
}

function* editFileMessageSaga(action) {
  try {
    const editRes = yield call(editFileMessage, ...action.updFileMessage);
    yield put(editFileMessageSuccessed(editRes));
  } catch (error) {
    yield put(editFileMessageFailed(error));
  }
}

function* markAsReadSaga(action) {
  if (action.payload.channel.channelType === 'group') {
    yield call(delay, 1000);
    yield call(markAsReadSb, action.payload.channel);
    yield put(markAsRead());
  }
}

export function* chatSagas() {
  yield all([
    yield takeLatest(MESSAGE_RECEIVED, markAsReadSaga),
    yield takeLatest(CANCEL_UPLOADING, cancelUploadingSaga),
    yield takeLatest(SEND_MESSAGE, sendMessageSaga),
    yield takeLatest(SEND_FILE_MESSAGE, sendFileMessageSaga),
    yield takeLatest(DELETE_MESSAGE, deleteMessageSaga),
    yield takeLatest(EDIT_MESSAGE, editMessageSaga),
    yield takeLatest(EDIT_FILE_MESSAGE, editFileMessageSaga),
    yield takeEvery(
      [ENTER_CHANNEL_SUCCESSED,
        GET_SELECTED_CHANNEL_SUCCESSED,
        DELETE_MESSAGE_SUCCESSED],
      getMessagesSaga),
    yield takeLatest(MESSAGE_TYPING, messageTypingSaga),
    yield takeLatest(USER_TYPING_START, userTypingSaga),
    yield takeLatest(USER_TYPING_END, userTypingEndSaga),
  ]);
}
