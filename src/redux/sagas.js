import { spawn } from 'redux-saga/effects';
import * as chatSagas from './chat/sagas';
import * as userSagas from './user/sagas';

export function* rootSaga() {
  yield spawn(chatSagas.watchCreateChannel);
  yield spawn(chatSagas.watchOpenChannelListQuery);
  yield spawn(userSagas.watchLoginUser);
}
