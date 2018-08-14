import { spawn } from 'redux-saga/effects';
import * as chatSagas from './chat/sagas';
import * as userSagas from './user/sagas';

export function* rootSaga() {
  yield spawn(chatSagas.watchCreateChannel);
  yield spawn(chatSagas.watchOpenChannels);
  yield spawn(chatSagas.watchEnterChannel);
  yield spawn(chatSagas.watchSendMessage);
  yield spawn(userSagas.watchLoginUser);
}
