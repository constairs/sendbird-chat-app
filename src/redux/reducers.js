import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { chatReducer } from './chat/reducer';

export const reducers = combineReducers({ userReducer, chatReducer });
// export const reducers = userReducer;
