import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  userFetching: false,
};

const userLoginRequest = state => ({
  ...state,
  userFetching: true,
});
const userLoginSuccessed = (state, user) => ({
  ...state,
  userFetching: false,
  userId: user.userId,
  userName: user.nickname,
  userImg: user.profileUrl,
  logged: true,
});
const userLoginFailed = (state, error) => ({
  ...state,
  userFetching: false,
  error
});

const userReconnect = state => ({
  ...state,
  userFetching: true,
});

const userReconnectSuccessed = state => ({
  ...state,
  userFetching: false
});

const userReconnectFailed = (state, err) => ({
  ...state,
  userFetching: false,
  err
});

const userLogoutRequest = () => ({
  userFetching: false,
});
const userLogoutSuccessed = () => ({
  userFetching: false,
  logged: false,
});
const userLogoutFailed = (state, error) => ({
  ...state,
  userFetching: false,
  error
});

const changeUserRequest = state => ({
  ...state,
  userFetching: true,
});
const changeUserSuccessed = (state, newData) => ({
  ...state,
  userFetching: false,
  userName: newData.nickname,
  userImg: newData.profileUrl
});
const changeUserFailed = (state, error) => ({
  ...state,
  userFetching: false,
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
