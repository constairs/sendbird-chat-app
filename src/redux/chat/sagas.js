import { call, put, takeLatest } from 'redux-saga/effects';
import { createOpenChannel, openChannelsList } from '../../services/sendbird';
import { CREATE_OPEN_CHANNEL, OPEN_CHANNELS_LIST } from './types';
import {
  createOpenChannelSuccessed,
  createOpenChannelFailed,
  openChannelsListSuccessed,
  openChannelsListFailed,
} from './actions';

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

export function* openChannelsListAsync() {
  try {
      const channelsList = yield call(openChannelsList);
      yield put(openChannelsListSuccessed());
  } catch {
      yield put(openChannelsListFailed(error));
  }
}

export function* watchOpenChannelListQuery() {
  yield takeLatest(OPEN_CHANNELS_LIST, openChannelsListAsync);
}
