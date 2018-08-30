import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import {
  createOpenChannel,
  openChannelList,
  getChannel,
  enterChannel,
  exitChannel,
  getRecentlyMessages,
} from '../../services/sendbird';
import {
  CREATE_OPEN_CHANNEL,
  GET_SELECTED_CHANNEL,
  CREATE_OPEN_CHANNEL_SUCCESSED,
  ENTER_CHANNEL,
  LEAVE_CHANNEL,
  GET_RECENTLY_MESSAGES,
} from './types';
import {
  createOpenChannelSuccessed,
  createOpenChannelFailed,
  openChannelsListSuccessed,
  openChannelsListFailed,
  getSelectedChannelSuccessed,
  getSelectedChannelFailed,
  enterChannelSuccessed,
  enterChannelFailed,
  leaveChannelSuccessed,
  leaveChannelFailed,
  getRecentlyMessagesSuccessed,
  getRecentlyMessagesFailed,
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

export function* openChannels() {
  try {
    const channelList = yield call(openChannelList);
    yield put(openChannelsListSuccessed(channelList));
  } catch (error) {
    yield put(openChannelsListFailed(error));
  }
}

export function* selectChannel(action) {
  try {
    const channel = yield call(getChannel, action.channelUrl);
    yield put(getSelectedChannelSuccessed(channel));
  } catch (error) {
    yield put(getSelectedChannelFailed(error));
  }
}

export function* enterSelectedChannel(action) {
  try {
    const data = yield call(enterChannel, action.payload);
    yield put(enterChannelSuccessed(data));
  } catch (error) {
    yield put(enterChannelFailed(error));
  }
}

export function* leaveChannel(action) {
  try {
    const res = yield call(exitChannel, action.payload);
    yield put(leaveChannelSuccessed(res));
  } catch (error) {
    yield put(leaveChannelFailed(error));
  }
}

export function* getRecentMessages(action) {
  try {
    let messages = yield call(getRecentlyMessages, ...action.payload);
    messages = { messages, channel: action.payload[0] };
    yield put(getRecentlyMessagesSuccessed(messages));
  } catch (error) {
    yield put(getRecentlyMessagesFailed(error));
  }
}

export function* openChannelSagas() {
  yield all([
    yield takeLatest(CREATE_OPEN_CHANNEL, createChannelAsync),
    yield takeLatest(
      [
        USER_RECONNECT_SUCCESSED,
        USER_LOGIN_SUCCESSED,
        CREATE_OPEN_CHANNEL_SUCCESSED,
      ],
      openChannels
    ),
    yield takeLatest(GET_SELECTED_CHANNEL, selectChannel),
    yield takeLatest(ENTER_CHANNEL, enterSelectedChannel),
    yield takeLatest(LEAVE_CHANNEL, leaveChannel),
    yield takeEvery(GET_RECENTLY_MESSAGES, getRecentMessages),
  ]);
}
