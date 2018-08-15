import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  fetching: false,
  error: ''
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

const handlers = {
  [TYPES.USER_LOGIN_REQUEST]: userLoginRequest,
  [TYPES.USER_LOGIN_SUCCESSED]: userLoginSuccessed,
  [TYPES.USER_LOGIN_FAILED]: userLoginFailed,
};

export const userReducer = createReducer(initState, handlers);
