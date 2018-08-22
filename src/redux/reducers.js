import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { chatReducer } from './chat/reducer';
import { userReducer } from './user/reducer';
import { openChannelsReducer } from './openChannels/reducer';

const persistedUserReducer = persistReducer({ key: 'user', storage }, userReducer);

export const rootReducer = combineReducers({
  chatReducer,
  persistedUserReducer,
  openChannelsReducer
});
