import { call, put, takeLatest } from 'redux-saga/effects';
import { SendBird } from '../services/sendbird';

import {
  loginUserRequest,
  loginUserSuccess,
  loginUserError
} from './actions/userActions';

export function* loginUserAsync() {
  try {
    const userId = yield put(loginUserRequest());
    const data = yield call(() => {
      return SendBird.connect(userId);
    });
    yield put(loginUserSuccess(data));
  } catch (e) {
    yield put(loginUserError(e));
  }
}

export function* watchLoginUser() {
  yield takeLatest('USER_LOGIN_REQUEST', loginUserAsync);
}
