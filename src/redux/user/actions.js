import {
  USER_LOGGED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESSED,
  USER_LOGIN_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESSED,
  USER_LOGOUT_FAILED,
  USER_CHANGE_REQUEST,
  USER_CHANGE_SUCCESSED,
  USER_CHANGE_FAILED,
} from './types';

export const userLogged = userData => ({ type: USER_LOGGED, payload: userData });

export const loginUserRequest = userId => ({ type: USER_LOGIN_REQUEST, payload: userId });

export const loginUserSuccessed = user => ({ type: USER_LOGIN_SUCCESSED, payload: user });

export const loginUserFailed = err => ({ type: USER_LOGIN_FAILED, payload: err });

export const logoutUserRequest = () => ({ type: USER_LOGOUT_REQUEST });

export const logoutUserSuccessed = res => ({ type: USER_LOGOUT_SUCCESSED, payload: res });

export const logoutUserFailed = error => ({ type: USER_LOGOUT_FAILED, payload: error });

export const changeUserRequest = formData => ({ type: USER_CHANGE_REQUEST, newUserData: formData });

export const changeUserSuccessed = newData =>
  ({ type: USER_CHANGE_SUCCESSED, payload: newData });

export const changeUserFailed = err => ({ type: USER_CHANGE_FAILED, payload: err });
