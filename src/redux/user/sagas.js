import { call, put, takeLatest } from 'redux-saga/effects';
import { connectToSB } from '../../services/sendbird';
import { USER_LOGIN_REQUEST } from './types';
import { loginUserSuccess, loginUserError } from './actions';

export function* loginUserAsync(action) {
  try {
    const user = yield call(connectToSB, action.payload.userId);
    yield put(loginUserSuccess(user));
  } catch (err) {
    yield put(loginUserError(err));
  }
}

export function* watchLoginUser() {
  yield takeLatest(USER_LOGIN_REQUEST, loginUserAsync);
}
