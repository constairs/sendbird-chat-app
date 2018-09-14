import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { chat } from './chat/reducer';
import { user } from './user/reducer';
import { channels } from './channels/reducer';

const persistedUser = persistReducer(
  { key: 'user', storage },
  user
);

export const rootReducer = combineReducers({
  chat,
  persistedUser,
  channels,
});
