import {
  call,
  put,
  takeLatest,
  takeEvery,
  take,
  all,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { v4 } from 'uuid';
import {
  ENTER_CHANNEL_SUCCESSED,
  GET_SELECTED_CHANNEL_SUCCESSED,
  LEAVE_GROUP_SUCCESSED,
  USER_TYPING_START
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
} from '../../services/sendbird';
import {
  SEND_MESSAGE,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESSED,
  EDIT_MESSAGE,
  ON_MESSAGE_TYPING,
  SEND_FILE_MESSAGE,
  EDIT_FILE_MESSAGE,
  MESSAGE_RECEIVED,
  CANCEL_UPLOADING,
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
  cleanChat,
  editFileMessageSuccessed,
  editFileMessageFailed,
  markAsRead,
  replaceMessage,
  cancelUploadingSuccessed,
  cancelUploadingFailed,
} from './actions';

function* sendMessageAsync(action) {
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

function* sendFileMessageAsync(action) {
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

function* deleteMessageAsync(action) {
  try {
    const delChannel = yield call(deleteMessage, ...action.messageData);
    yield put(deleteMessageSuccessed(delChannel));
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
    if (action.payload.groupChannel.channelType === 'group') {
      yield call(markAsReadSb, action.payload.groupChannel);
      yield put(markAsRead());
    }
  } catch (error) {
    yield put(getMessagesFailed(error));
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

function* userTypingSaga(action) {
  yield call(action.payload.startTyping);
  yield call(delay, 2000);
  yield call(action.payload.endTyping);
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

function* markAsReadSaga(action) {
  if (action.payload.channel.channelType === 'group') {
    yield call(markAsReadSb, action.payload.channel);
    yield put(markAsRead());
  }
}

export function* chatSagas() {
  yield all([
    yield takeLatest(MESSAGE_RECEIVED, markAsReadSaga),
    yield takeLatest(CANCEL_UPLOADING, cancelUploadingSaga),
    yield takeLatest(SEND_MESSAGE, sendMessageAsync),
    yield takeLatest(SEND_FILE_MESSAGE, sendFileMessageAsync),
    yield takeLatest(DELETE_MESSAGE, deleteMessageAsync),
    yield takeLatest(EDIT_MESSAGE, editMessageAsync),
    yield takeLatest(EDIT_FILE_MESSAGE, editFileMessageSaga),
    yield takeEvery(
      [ENTER_CHANNEL_SUCCESSED,
        GET_SELECTED_CHANNEL_SUCCESSED,
        DELETE_MESSAGE_SUCCESSED],
      getMessagesAsync),
    yield take(LEAVE_GROUP_SUCCESSED, cleanChatSaga),
    yield takeLatest(ON_MESSAGE_TYPING, onMessageTypingSaga),
    yield takeLatest(USER_TYPING_START, userTypingSaga),
  ]);
}
