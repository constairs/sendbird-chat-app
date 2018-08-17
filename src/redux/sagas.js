import { spawn } from 'redux-saga/effects';
import * as chatSagas from './chat/sagas';
import * as userSagas from './user/sagas';

export function* rootSaga() {
  yield spawn(chatSagas.watchCreateChannel);
  yield spawn(chatSagas.watchOpenChannels);
  yield spawn(chatSagas.watchEnterChannel);
  yield spawn(chatSagas.watchLeaveChannel);
  yield spawn(chatSagas.watchSendMessage);
  yield spawn(chatSagas.watchDeleteMessage);
  yield spawn(chatSagas.watchGetMessages);
  yield spawn(userSagas.watchLoginUser);
  yield spawn(userSagas.watchLogoutUser);
  yield spawn(userSagas.watchChangeUser);
  yield spawn(userSagas.weatchReconnect);
}
