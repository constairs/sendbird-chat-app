import { call, put, takeLatest } from 'redux-saga/effects';
import { connectToSB, disconnectFromSB, changeProfile, reconnectToSB } from '../../services/sendbird';
import {
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_CHANGE_REQUEST,
  USER_LOGGED,
} from './types';
import {
  loginUserSuccessed,
  loginUserError,
  logoutUserSuccessed,
  logoutUserFailed,
  changeUserSuccessed,
  changeUserFailed,
} from './actions';

export function* loginUserAsync(action) {
  try {
    const user = yield call(connectToSB, action.payload.userId);
    yield put(loginUserSuccessed(user));
  } catch (err) {
    yield put(loginUserError(err));
  }
}

export function* watchLoginUser() {
  yield takeLatest(USER_LOGIN_REQUEST, loginUserAsync);
}

// export function* userReconnectAsync(action) {
//   try {
//     yield call(reconnectToSB, action.payload.userId);
//     yield put(loginUserSuccessed({ ...action.payload }));
//   } catch (err) {
//     yield put(loginUserError(err));
//   }
// }

// export function* weatchReconnect() {
//   yield takeLatest(USER_LOGGED, userReconnectAsync);
// }

export function* logoutUserAsync(action) {
  try {
    const res = yield call(disconnectFromSB, action);
    yield put(logoutUserSuccessed(res));
  } catch (err) {
    yield put(logoutUserFailed(err));
  }
}

export function* watchLogoutUser() {
  yield takeLatest(USER_LOGOUT_REQUEST, logoutUserAsync);
}

export function* changeUserAsync(action) {
  try {
    const newData = yield call(changeProfile, ...action.newUserData);
    yield put(changeUserSuccessed(newData));
  } catch (err) {
    yield put(changeUserFailed(err));
  }
}

export function* watchChangeUser() {
  yield takeLatest(USER_CHANGE_REQUEST, changeUserAsync);
}
