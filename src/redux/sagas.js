import { call, put, takeLatest } from 'redux-saga/effects';
import { connectToSB } from '../services/sendbird';

export function* loginUserAsync(action) {
  try {
    const data = yield call(connectToSB, action.payload.userId);
    yield put({ type: 'USER_LOGIN_SUCCESSED', payload: data.nickname });
  } catch (err) {
    yield put({ type: 'USER_LOGIN_FAILED', payload: err });
  }
}

export function* watchLoginUser() {
  yield takeLatest('USER_LOGIN_REQUEST', loginUserAsync);
}
