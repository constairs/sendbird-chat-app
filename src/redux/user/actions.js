import * as TYPES from './types';

export const loginUserRequest = userId => ({
  type: TYPES.USER_LOGIN_REQUEST,
  payload: userId,
});

export const loginUserSuccessed = user => ({
  type: TYPES.USER_LOGIN_SUCCESSED,
  payload: user,
});

export const loginUserFailed = err => ({
  type: TYPES.USER_LOGIN_FAILED,
  payload: err,
});

export const loginUserTimeout = err => ({
  type: TYPES.USER_LOGIN_TIMEOUT,
  payload: err
});

export const clearLoginError = () => ({
  type: TYPES.CLEAR_LOGIN_ERROR
});

export const userReconnect = () => ({ type: TYPES.USER_RECONNECT });

export const userReconnectSuccessed = user => ({
  type: TYPES.USER_RECONNECT_SUCCESSED,
  payload: user,
});

export const userReconnectFailed = err => ({
  type: TYPES.USER_RECONNECT_FAILED,
  payload: err,
});

export const logoutUserRequest = () => ({ type: TYPES.USER_LOGOUT_REQUEST });

export const logoutUserSuccessed = res => ({
  type: TYPES.USER_LOGOUT_SUCCESSED,
  payload: res,
});

export const logoutUserFailed = error => ({
  type: TYPES.USER_LOGOUT_FAILED,
  payload: error,
});

export const changeUserRequest = formData => ({
  type: TYPES.USER_CHANGE_REQUEST,
  newUserData: formData,
});

export const changeUserSuccessed = newData => ({
  type: TYPES.USER_CHANGE_SUCCESSED,
  payload: newData,
});

export const changeUserFailed = err => ({
  type: TYPES.USER_CHANGE_FAILED,
  payload: err,
});
