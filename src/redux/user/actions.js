import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESSED,
  USER_LOGIN_FAILED,
} from './types';

export const loginUserRequest = (userId) => {
  return { type: USER_LOGIN_REQUEST, payload: userId };
};

export const loginUserSuccess = (user) => {
  return { type: USER_LOGIN_SUCCESSED, payload: user.nickname };
};

export const loginUserError = (err) => {
  return { type: USER_LOGIN_FAILED, payload: err };
};