import { createReducer } from '../../utils/reducerUtils';

import * as TYPES from './types';

const initState = {
  user: '',
  fetching: false,
  error: '',
  userId: ''
};

const userLoginRequest = (state, userId) => ({
  userId,
  fetching: true,
});
const userLoginSuccessed = (state, user) => ({
  user,
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

export const reducer = createReducer(initState, handlers);
