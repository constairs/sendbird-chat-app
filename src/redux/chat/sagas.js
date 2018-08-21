import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  createOpenChannel,
  updateChannel,
  openChannelList,
  getChannel,
  enterChannel,
  exitChannel,
  sendMessage,
  deleteMessage,
  getMessages,
  registerChatHandler,
} from '../../services/sendbird';
import {
  CREATE_OPEN_CHANNEL,
  UPDATE_CHANNEL,
  GET_SELECTED_CHANNEL,
  ENTER_CHANNEL,
  ENTER_CHANNEL_SUCCESSED,
  LEAVE_CHANNEL,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  CREATE_CHAT_HANDLER,
} from './types';
import {
  createOpenChannelSuccessed,
  createOpenChannelFailed,
  updateChannelSuccessed,
  updateChannelFailed,
  openChannelsListSuccessed,
  openChannelsListFailed,
  getSelectedChannelSuccessed,
  getSelectedChannelFailed,
  getParticipants,
  enterChannelSuccessed,
  enterChannelFailed,
  sendMessageSuccessed,
  sendMessageFailed,
  deleteMessageSuccessed,
  deleteMessageFailed,
  getMessagesSuccessed,
  getMessagesFailed,
  leaveChannelSuccessed,
  leaveChannelFailed,
  createChatHandlerSuccessed,
  createChatHandlerFailed,
} from './actions';

import { USER_LOGIN_SUCCESSED, USER_RECONNECT_SUCCESSED } from '../user/types';

export function* createChannelAsync(action) {
  try {
    const createdChannel = yield call(createOpenChannel, ...action.payload);
    yield put(createOpenChannelSuccessed(createdChannel));
  } catch (error) {
    yield put(createOpenChannelFailed(error));
  }
}

export function* watchCreateChannel() {
  yield takeLatest(CREATE_OPEN_CHANNEL, createChannelAsync);
}

export function* updateChannelAsync(action) {
  try {
    const updatedChannel = yield call(updateChannel, ...action.payload);
    yield put(updateChannelSuccessed(updatedChannel));
  } catch (error) {
    yield put(updateChannelFailed(error));
  }
}

export function* watchUpdateChannel() {
  yield takeLatest(UPDATE_CHANNEL, updateChannelAsync);
}

export function* openChannels() {
  try {
    const channelList = yield call(openChannelList);
    yield put(openChannelsListSuccessed(channelList));
  } catch (error) {
    yield put(openChannelsListFailed(error));
  }
}

export function* watchOpenChannels() {
  yield takeLatest(USER_RECONNECT_SUCCESSED || USER_LOGIN_SUCCESSED, openChannels);
}

export function* selectChannel(action) {
  try {
    const channel = yield call(getChannel, action.channelUrl);
    yield put(getSelectedChannelSuccessed(channel));
  } catch (error) {
    yield put(getSelectedChannelFailed(error));
  }
}

export function* watchGetChannel() {
  yield takeLatest(GET_SELECTED_CHANNEL, selectChannel);
}

export function* enterSelectedChannel(action) {
  try {
    const data = yield call(enterChannel, action.payload);
    yield put(enterChannelSuccessed(data.channel));
    yield put(getParticipants(data.participantList));
  } catch (error) {
    yield put(enterChannelFailed(error));
  }
}

export function* watchEnterChannel() {
  yield takeLatest(ENTER_CHANNEL, enterSelectedChannel);
}

export function* leaveChannel(action) {
  try {
    const res = yield call(exitChannel, action.payload);
    yield put(leaveChannelSuccessed(res));
  } catch (error) {
    yield put(leaveChannelFailed(error));
  }
}

export function* watchLeaveChannel() {
  yield takeLatest(LEAVE_CHANNEL, leaveChannel);
}

export function* sendMessageAsync(action) {
  try {
    const sendRes = yield call(sendMessage, ...action.messageData);
    yield put(sendMessageSuccessed(sendRes));
  } catch (error) {
    yield put(sendMessageFailed(error));
  }
}

export function* watchSendMessage() {
  yield takeLatest(SEND_MESSAGE, sendMessageAsync);
}

export function* deleteMessageAsync(action) {
  try {
    const delRes = yield call(deleteMessage, ...action.messageData);
    yield put(deleteMessageSuccessed(delRes));
  } catch (error) {
    yield put(deleteMessageFailed(error));
  }
}

export function* watchDeleteMessage() {
  yield takeLatest(DELETE_MESSAGE, deleteMessageAsync);
}

export function* getMessagesAsync(action) {
  try {
    const messages = yield call(getMessages, action.payload.url);
    yield put(getMessagesSuccessed(messages));
  } catch (error) {
    yield put(getMessagesFailed(error));
  }
}

export function* watchGetMessages() {
  yield takeEvery(ENTER_CHANNEL_SUCCESSED, getMessagesAsync);
}


export function* createChatHandlerReceiveSaga(action) {
  try {
    const data = yield call(registerChatHandler, action.channelUrl);
    yield put(createChatHandlerSuccessed(data));
  } catch (error) {
    yield put(createChatHandlerFailed(error));
  }
}

export function* watchCreateChatHandler() {
  yield takeEvery(CREATE_CHAT_HANDLER, createChatHandlerReceiveSaga);
}
