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
} from '../../services/sendbird';
import {
  SEND_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  ON_MESSAGE_TYPING,
  SEND_FILE_MESSAGE,
} from './types';
import { ENTER_CHANNEL_SUCCESSED } from '../openChannels/types';
import {
  GET_GROUP_CHANNEL_SUCCESSED,
  LEAVE_GROUP_SUCCESSED,
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
} from './actions';

export function* sendMessageAsync(action) {
  try {
    const sendRes = yield call(sendMessage, ...action.messageData);
    yield put(sendMessageSuccessed(sendRes));
  } catch (error) {
    yield put(sendMessageFailed(error));
  }
}

// export function* watchSendMessage() {
//   yield takeLatest(SEND_MESSAGE, sendMessageAsync);
// }

function* sendFileMessageAsync(action) {
  try {
    const sendRes = yield call(sendFileMessage, ...action.fileMessageData);
    yield put(sendMessageSuccessed(sendRes));
  } catch (error) {
    yield put(sendMessageFailed(error));
  }
}

// export function* watchSendFileMessage() {
//   yield takeLatest(SEND_FILE_MESSAGE, sendFileMessageAsync);
// }

export function* deleteMessageAsync(action) {
  try {
    const delRes = yield call(deleteMessage, ...action.messageData);
    yield put(deleteMessageSuccessed(delRes));
  } catch (error) {
    yield put(deleteMessageFailed(error));
  }
}

// export function* watchDeleteMessage() {
//   yield takeLatest(DELETE_MESSAGE, deleteMessageAsync);
// }

export function* editMessageAsync(action) {
  try {
    const editRes = yield call(editMessage, ...action.messageData);
    yield put(editMessageSuccessed(editRes));
  } catch (error) {
    yield put(editMessageFailed(error));
  }
}

// export function* watchEditMessage() {
//   yield takeLatest(EDIT_MESSAGE, editMessageAsync);
// }

export function* getMessagesAsync(action) {
  yield put(getMessagesRequest(action.payload));
  try {
    const messages = yield call(
      getMessages,
      action.payload.url,
      action.payload.channelType
    );
    yield put(getMessagesSuccessed(messages));
  } catch (error) {
    yield put(getMessagesFailed(error));
  }
}

// export function* watchGetMessages() {
//   yield takeEvery(
//     [ENTER_CHANNEL_SUCCESSED, GET_GROUP_CHANNEL_SUCCESSED],
//     getMessagesAsync
//   );
// }

export function* onMessageTypingSaga(action) {
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

// export function* onMessageTypeWatch() {
//   yield takeLatest(ON_MESSAGE_TYPING, onMessageTypingSaga);
// }

export function* cleanChatSaga() {
  yield put(cleanChat());
}

// export function* watchCleanChat() {
//   yield take(LEAVE_GROUP_SUCCESSED, cleanChatSaga);
// }

export function* chatSagas() {
  yield all([
    yield takeLatest(SEND_MESSAGE, sendMessageAsync),
    yield takeLatest(SEND_FILE_MESSAGE, sendFileMessageAsync),
    yield takeLatest(DELETE_MESSAGE, deleteMessageAsync),
    yield takeLatest(EDIT_MESSAGE, editMessageAsync),
    yield takeEvery(
      [ENTER_CHANNEL_SUCCESSED, GET_GROUP_CHANNEL_SUCCESSED],
      getMessagesAsync
    ),
    yield takeLatest(ON_MESSAGE_TYPING, onMessageTypingSaga),
    yield take(LEAVE_GROUP_SUCCESSED, cleanChatSaga),
  ]);
}
