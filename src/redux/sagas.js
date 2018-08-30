import { spawn } from 'redux-saga/effects';
import { chatSagas } from './chat/sagas';
import { userSagas } from './user/sagas';
import { openChannelSagas } from './openChannels/sagas';
import { groupSagas } from './groupChannels/sagas';

export function* rootSaga() {
  yield spawn(openChannelSagas);
  yield spawn(groupSagas);
  yield spawn(chatSagas);
  yield spawn(userSagas);
}
