import { call, put, takeLatest, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { REHYDRATE } from 'redux-persist';
import { push } from 'connected-react-router';
import {
  connectToSB,
  disconnectFromSB,
  changeProfile,
  exitChannel
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
  loginUserFailed,
  loginUserTimeout,
  userReconnect,
  userReconnectSuccessed,
  userReconnectFailed,
  logoutUserSuccessed,
  logoutUserFailed,
  changeUserSuccessed,
  changeUserFailed,
} from './actions';
import { leaveChannel, leaveChannelSuccessed, changeActiveChannel } from '../channels/actions';

export function* loginUserSaga(action) {
  try {
    const { user, timeout } = yield race({
      user: call(connectToSB, action.payload.userId),
      timeout: call(delay, 10000),
    });
    if (user) {
      yield put(loginUserSuccessed(user));
    } else if (timeout) {
      yield put(loginUserTimeout('Login timeout'));
    }
  } catch (error) {
    yield put(loginUserFailed(error.message));
  }
}

export function* loginSuccessed() {
  yield put(push('/channels'));
}

export function* userReconnectSaga(action) {
  if (action.payload && action.payload.userId) {
    try {
      yield put(userReconnect());
      const { user, timeout } = yield race({
        user: call(connectToSB, action.payload.userId),
        timeout: call(delay, 10000),
      });
      if (user) {
        yield put(userReconnectSuccessed(action.payload));
      } else if (timeout) {
        yield put(loginUserTimeout('Login timeout'));
      }
    } catch (error) {
      yield put(userReconnectFailed(error.message));
    }
  }
}

export function* logoutUserSaga(action) {
  try {
    if (action.payload && action.payload.channelType === 'open') {
      yield put(leaveChannel(action.payload));
      yield call(exitChannel, action.payload.channelUrl);
      yield put(leaveChannelSuccessed(action.payload));
    } else if (action.payload && action.payload.channelType === 'group') {
      yield put(changeActiveChannel());
    }
    const res = yield call(disconnectFromSB, action);
    yield put(logoutUserSuccessed(res));
  } catch (error) {
    yield put(logoutUserFailed(error.message));
  }
}

export function* logoutUserComplete() {
  yield put(push('/'));
}

export function* changeUserSaga(action) {
  try {
    const newData = yield call(changeProfile, ...action.newUserData);
    yield put(changeUserSuccessed(newData));
  } catch (error) {
    yield put(changeUserFailed(error.message));
  }
}

export function* userSagas() {
  yield takeLatest(USER_LOGIN_REQUEST, loginUserSaga);
  yield takeLatest(USER_LOGIN_SUCCESSED, loginSuccessed);
  yield takeLatest(REHYDRATE, userReconnectSaga);
  yield takeLatest(USER_LOGOUT_REQUEST, logoutUserSaga);
  yield takeLatest(USER_LOGOUT_SUCCESSED, logoutUserComplete);
  yield takeLatest(USER_CHANGE_REQUEST, changeUserSaga);
}
