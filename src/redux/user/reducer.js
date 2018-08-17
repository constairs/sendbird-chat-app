import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  fetching: false,
};

const userLoginRequest = state => ({
  ...state,
  fetching: true,
});
const userLoginSuccessed = (state, user) => ({
  ...state,
  fetching: false,
  userId: user.userId,
  userName: user.nickname,
  userImg: user.profileUrl,
});
const userLoginFailed = (state, error) => ({
  ...state,
  fetching: false,
  error
});

const userReconnect = state => ({
  ...state,
  fetching: true,
});

const userReconnectSuccessed = state => ({
  ...state,
  fetching: false
});

const userReconnectFailed = (state, err) => ({
  ...state,
  fetching: false,
  err
});

const userLogoutRequest = () => ({
  fetching: false,
});
const userLogoutSuccessed = res => ({
  res,
  fetching: false,
});
const userLogoutFailed = (state, error) => ({
  ...state,
  fetching: false,
  error
});

const changeUserRequest = state => ({
  ...state,
  fetching: true,
});
const changeUserSuccessed = (state, newData) => ({
  ...state,
  fetching: false,
  userName: newData.nickname,
  userImg: newData.profileUrl
});
const changeUserFailed = (state, error) => ({
  ...state,
  fetching: false,
  error
});

const handlers = {
  [TYPES.USER_LOGIN_REQUEST]: userLoginRequest,
  [TYPES.USER_LOGIN_SUCCESSED]: userLoginSuccessed,
  [TYPES.USER_LOGIN_FAILED]: userLoginFailed,
  [TYPES.USER_LOGOUT_REQUEST]: userLogoutRequest,
  [TYPES.USER_LOGOUT_SUCCESSED]: userLogoutSuccessed,
  [TYPES.USER_LOGOUT_FAILED]: userLogoutFailed,
  [TYPES.USER_CHANGE_REQUEST]: changeUserRequest,
  [TYPES.USER_CHANGE_SUCCESSED]: changeUserSuccessed,
  [TYPES.USER_CHANGE_FAILED]: changeUserFailed,
  [TYPES.USER_RECONNECT]: userReconnect,
  [TYPES.USER_RECONNECT_SUCCESSED]: userReconnectSuccessed,
  [TYPES.USER_RECONNECT_FAILED]: userReconnectFailed
};

export const userReducer = createReducer(initState, handlers);
