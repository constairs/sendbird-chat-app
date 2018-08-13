import { call, put, takeLatest } from 'redux-saga/effects';
import { createChannel } from '../../services/sendbird';
import { CREATE_OPEN_CHANNEL } from './types';
import {
  createOpenChannelSuccessed,
  createOpenChannelFailed
} from './actions';

export function* createChannelAsync(action) {
  try {
    const createdChannel = yield call(createChannel, ...action.payload);
    yield put(createOpenChannelSuccessed(createdChannel));
  } catch (error) {
    yield put(createOpenChannelFailed(error));
  }
}

export function* watchCreateChannel() {
  yield takeLatest(CREATE_OPEN_CHANNEL, createChannelAsync);
}
