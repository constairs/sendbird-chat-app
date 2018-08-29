import { spawn } from 'redux-saga/effects';
import * as chatSagas from './chat/sagas';
import * as userSagas from './user/sagas';
import * as openChannelSagas from './openChannels/sagas';
import { groupSagas } from './groupChannels/sagas';

export function* rootSaga() {
  yield spawn(openChannelSagas.watchCreateChannel);
  yield spawn(openChannelSagas.watchOpenChannels);
  yield spawn(openChannelSagas.watchEnterChannel);
  yield spawn(openChannelSagas.watchLeaveChannel);
  yield spawn(openChannelSagas.watchGetRecentMessages);

  yield spawn(groupSagas);

  yield spawn(chatSagas.watchSendMessage);
  yield spawn(chatSagas.watchDeleteMessage);
  yield spawn(chatSagas.watchEditMessage);
  yield spawn(chatSagas.watchGetMessages);
  yield spawn(chatSagas.onMessageTypeWatch);
  yield spawn(chatSagas.watchCleanChat);
  yield spawn(chatSagas.watchSendFileMessage);

  yield spawn(userSagas.watchLoginUser);
  yield spawn(userSagas.watchLogoutUser);
  yield spawn(userSagas.watchChangeUser);
  yield spawn(userSagas.weatchReconnect);
  yield spawn(userSagas.watchLogoutComplete);
  yield spawn(userSagas.watchLoginSuccessed);
}
