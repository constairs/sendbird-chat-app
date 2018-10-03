import {
  assoc,
  pipe
} from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  userFetching: false,
  logged: false,
};

const userLoginRequest = () => assoc('userFetching', true);
const userLoginSuccessed = user => pipe(
  assoc('userId', user.userId),
  assoc('userName', user.nickname),
  assoc('userImg', user.profileUrl),
  assoc('userFetching', false),
  assoc('logged', true),
);
const userLoginFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error),
);

const userLoginTimeout = error => pipe(
  assoc('error', error),
  assoc('userFetching', false),
);

const clearLoginError = () => assoc('error', '');

const userLogoutSuccessed = () => assoc('logged', false);
const userLogoutFailed = error => assoc('error', error);

const changeUserRequest = () => assoc('userFetching', true);

const changeUserSuccessed = newData => pipe(
  assoc('userName', newData.nickname),
  assoc('userImg', newData.profileUrl),
  assoc('userFetching', false),
);

const changeUserFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error),
);

const userReconnect = () => assoc('userFetching', true);

const userReconnectSuccessed = () => assoc('userFetching', false);

const userReconnectFailed = error => pipe(
  assoc('error', error),
  assoc('userFetching', false),
);

const handlers = {
  [TYPES.USER_LOGIN_REQUEST]: userLoginRequest,
  [TYPES.USER_LOGIN_SUCCESSED]: userLoginSuccessed,
  [TYPES.USER_LOGIN_FAILED]: userLoginFailed,
  [TYPES.USER_LOGIN_TIMEOUT]: userLoginTimeout,
  [TYPES.CLEAR_LOGIN_ERROR]: clearLoginError,
  [TYPES.USER_LOGOUT_SUCCESSED]: userLogoutSuccessed,
  [TYPES.USER_LOGOUT_FAILED]: userLogoutFailed,
  [TYPES.USER_CHANGE_REQUEST]: changeUserRequest,
  [TYPES.USER_CHANGE_SUCCESSED]: changeUserSuccessed,
  [TYPES.USER_CHANGE_FAILED]: changeUserFailed,
  [TYPES.USER_RECONNECT]: userReconnect,
  [TYPES.USER_RECONNECT_SUCCESSED]: userReconnectSuccessed,
  [TYPES.USER_RECONNECT_FAILED]: userReconnectFailed,
};

export const user = createReducer(initState, handlers);
