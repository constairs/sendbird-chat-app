import { call, put, takeLatest } from 'redux-saga/effects';
import { SendBirdActions } from '../../services/sendbird';
import {
  CREATE_OPEN_CHANNEL,
  CREATE_OPEN_CHANNEL_SUCCESSED,
  CREATE_OPEN_CHANNEL_FAILED
} from './types';

export function* createChannelAsync(action) {
  try {
    const createdChannel = yield call(SendBirdActions.createChannel, action.payload);
    yield put({ type: CREATE_OPEN_CHANNEL_SUCCESSED, payload: createdChannel });
  } catch (error) {
    yield put({ type: CREATE_OPEN_CHANNEL_FAILED, payload: error });
  }
}

export function* watchCreateChannel() {
  yield takeLatest(CREATE_OPEN_CHANNEL, createChannelAsync);
}
