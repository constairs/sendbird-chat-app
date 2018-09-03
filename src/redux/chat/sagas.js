import {
  call,
  put,
  takeLatest,
  takeEvery,
  take,
  all,
} from 'redux-saga/effects';
import {
  sendMessage,
  sendFileMessage,
  deleteMessage,
  editMessage,
  getMessages,
  onMessageTyping,
  makeAsRead,
  editFileMessage,
} from '../../services/sendbird';
import {
  SEND_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  ON_MESSAGE_TYPING,
  SEND_FILE_MESSAGE,
  EDIT_FILE_MESSAGE,
} from './types';
import { ENTER_CHANNEL_SUCCESSED } from '../openChannels/types';
import {
  GET_GROUP_CHANNEL_SUCCESSED,
  LEAVE_GROUP_SUCCESSED,
  MESSAGE_RECEIVED,
} from '../groupChannels/types';
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
  cleanChat,
  editFileMessageSuccessed,
  editFileMessageFailed,
} from './actions';

function* sendMessageAsync(action) {
  try {
    const sendRes = yield call(sendMessage, ...action.messageData);
    yield put(sendMessageSuccessed(sendRes));
  } catch (error) {
    yield put(sendMessageFailed(error));
  }
}

function* sendFileMessageAsync(action) {
  try {
    const sendRes = yield call(sendFileMessage, ...action.fileMessageData);
    yield put(sendMessageSuccessed(sendRes));
  } catch (error) {
    yield put(sendMessageFailed(error));
  }
}

function* deleteMessageAsync(action) {
  try {
    const delRes = yield call(deleteMessage, ...action.messageData);
    yield put(deleteMessageSuccessed(delRes));
  } catch (error) {
    yield put(deleteMessageFailed(error));
  }
}

function* editMessageAsync(action) {
  try {
    const editRes = yield call(editMessage, ...action.messageData);
    yield put(editMessageSuccessed(editRes));
  } catch (error) {
    yield put(editMessageFailed(error));
  }
}

function* getMessagesAsync(action) {
  yield put(getMessagesRequest(action.payload));
  try {
    const messages = yield call(
      getMessages,
      action.payload.url,
      action.payload.channelType
    );
    yield put(getMessagesSuccessed(messages));
    if (action.payload.channelType === 'group') {
      yield call(makeAsRead, action.payload);
    }
  } catch (error) {
    yield put(getMessagesFailed(error));
  }
}

function* makeAsReadSaga(action) {
  if (action.payload.channelType === 'group') {
    yield call(makeAsRead, action.payload.channel);
  }
}

function* onMessageTypingSaga(action) {
  try {
    const response = yield call(onMessageTyping, ...action.payload);
    yield put(messageTypingSet(response));
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

function* cleanChatSaga() {
  yield put(cleanChat());
}

function* editFileMessageSaga(action) {
  try {
    const editRes = yield call(editFileMessage, ...action.updFileMessage);
    yield put(editFileMessageSuccessed(editRes));
  } catch (error) {
    yield put(editFileMessageFailed(error));
  }
}

export function* chatSagas() {
  yield all([
    yield takeLatest(SEND_MESSAGE, sendMessageAsync),
    yield takeLatest(SEND_FILE_MESSAGE, sendFileMessageAsync),
    yield takeLatest(DELETE_MESSAGE, deleteMessageAsync),
    yield takeLatest(EDIT_MESSAGE, editMessageAsync),
    yield takeLatest(EDIT_FILE_MESSAGE, editFileMessageSaga),
    yield takeEvery(
      [ENTER_CHANNEL_SUCCESSED, GET_GROUP_CHANNEL_SUCCESSED],
      getMessagesAsync
    ),
    yield takeLatest(ON_MESSAGE_TYPING, onMessageTypingSaga),
    yield take(LEAVE_GROUP_SUCCESSED, cleanChatSaga),
    yield takeLatest(MESSAGE_RECEIVED, makeAsReadSaga),
  ]);
}
