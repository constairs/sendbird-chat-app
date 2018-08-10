import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESSED,
  USER_LOGIN_FAILED,
} from './types';

export const loginUserRequest = (userId) => {
  return { type: USER_LOGIN_REQUEST, payload: userId };
};

export const loginUserSuccess = (userData) => {
  return { type: USER_LOGIN_SUCCESSED, payload: userData };
};

export const loginUserError = (error) => {
  return { type: USER_LOGIN_FAILED, payload: error };
};