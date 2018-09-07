import { call, put, takeLatest, all, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { REHYDRATE } from 'redux-persist';
import { push } from 'connected-react-router';
import {
  connectToSB,
  disconnectFromSB,
  changeProfile,
} from '../../services/sendbird';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESSED,
  USER_LOGOUT_REQUEST,
  USER_CHANGE_REQUEST,
  USER_LOGOUT_SUCCESSED,
} from './types';
import {
  loginUserSuccessed,
  loginUserError,
  userReconnect,
  userReconnectSuccessed,
  userReconnectFailed,
  logoutUserSuccessed,
  logoutUserFailed,
  changeUserSuccessed,
  changeUserFailed,
} from './actions';

function* loginUserAsync(action) {
  try {
    const { user, timeout } = yield race({
      user: call(connectToSB, action.payload.userId),
      timeout: call(delay, 10000),
    });
    if (user) {
      yield put(loginUserSuccessed(user));
    } else {
      yield put(loginUserError(`LOGIN TIMEOUT ${timeout} s`));
    }
  } catch (err) {
    yield put(loginUserError(err));
  }
}

function* loginSuccessed() {
  yield put(push('/channels'));
}

function* userReconnectAsync(action) {
  if (action.payload && action.payload.userId) {
    try {
      yield put(userReconnect());
      yield call(connectToSB, action.payload.userId);
      yield put(userReconnectSuccessed(action.payload));
    } catch (err) {
      yield put(userReconnectFailed(err));
    }
  }
}

function* logoutUserAsync(action) {
  try {
    const res = yield call(disconnectFromSB, action);
    yield put(logoutUserSuccessed(res));
  } catch (err) {
    yield put(logoutUserFailed(err));
  }
}

function* logoutUserComplete() {
  yield put(push('/'));
}

function* changeUserAsync(action) {
  try {
    const newData = yield call(changeProfile, ...action.newUserData);
    yield put(changeUserSuccessed(newData));
  } catch (err) {
    yield put(changeUserFailed(err));
  }
}

export function* userSagas() {
  yield all([
    yield takeLatest(USER_LOGIN_REQUEST, loginUserAsync),
    yield takeLatest(USER_LOGIN_SUCCESSED, loginSuccessed),
    yield takeLatest(REHYDRATE, userReconnectAsync),
    yield takeLatest(USER_LOGOUT_REQUEST, logoutUserAsync),
    yield takeLatest(USER_LOGOUT_SUCCESSED, logoutUserComplete),
    yield takeLatest(USER_CHANGE_REQUEST, changeUserAsync),
  ]);
}
