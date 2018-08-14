import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  user: '',
  fetching: false,
  error: '',
  userId: '',
  channelData: ''
};

const userLoginRequest = (state, userId) => ({
  userId,
  fetching: true,
});
const userLoginSuccessed = (state, user) => ({
  ...state,
  userId: user.userId,
  userName: user.nickname,
  fetching: false
});
const userLoginFailed = (state, error) => ({
  user: '',
  fetching: false,
  error
});

const handlers = {
  [TYPES.USER_LOGIN_REQUEST]: userLoginRequest,
  [TYPES.USER_LOGIN_SUCCESSED]: userLoginSuccessed,
  [TYPES.USER_LOGIN_FAILED]: userLoginFailed,
};

export const userReducer = createReducer(initState, handlers);
