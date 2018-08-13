import { combineReducers } from 'redux';
import { chatReducer } from './chat/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({ chatReducer, userReducer });
