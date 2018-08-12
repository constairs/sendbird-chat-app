import { call, put, takeLatest } from 'redux-saga/effects';
import { SendBirdActions } from '../../services/sendbird';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESSED,
  USER_LOGIN_FAILED,
} from './types';

export function* loginUserAsync(action) {
  try {
    const user = yield call(SendBirdActions.connect, action.payload.userId);
    yield put({ type: USER_LOGIN_SUCCESSED, payload: user.nickname });
  } catch (err) {
    yield put({ type: USER_LOGIN_FAILED, payload: err });
  }
}

export function* watchLoginUser() {
  yield takeLatest(USER_LOGIN_REQUEST, loginUserAsync);
}
