import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import {
  // createOpenChannel,
  // openChannelList,
  getChannelsList,
  getParticipantsReq,
  // getChannel,
  // enterChannel,
  // exitChannel,
  // getRecentlyMessages,
  // updateChannel,
} from '../../services/sendbird';
import {
  // CREATE_OPEN_CHANNEL,
  // GET_SELECTED_CHANNEL,
  CREATE_OPEN_CHANNEL_SUCCESSED,
  GET_CHANNELS_LIST_SUCCESSED,
  // ENTER_CHANNEL,
  // LEAVE_CHANNEL,
  // GET_RECENTLY_MESSAGES,
  // UPDATE_CHANNEL,
} from './types';
import {
  // createOpenChannelSuccessed,
  // createOpenChannelFailed,
  // openChannelsListSuccessed,
  // openChannelsListFailed,
  // getSelectedChannelSuccessed,
  // getSelectedChannelFailed,
  // enterChannelSuccessed,
  // enterChannelFailed,
  // leaveChannelSuccessed,
  // leaveChannelFailed,
  // getRecentlyMessagesSuccessed,
  // getRecentlyMessagesFailed,
  // updateChannelSuccessed,
  // updateChannelFailed,
  getChannelsListSuccessed,
  getChannelsListFailed
} from './actions';

import { USER_LOGIN_SUCCESSED, USER_RECONNECT_SUCCESSED } from '../user/types';
import { getParticipants, getParticipantsSuccessed, getParticipantsFailed } from './openChannelsActions';

function* getChannelsListSaga() {
  try {
    const channelsList = yield call(getChannelsList);
    yield put(getChannelsListSuccessed(channelsList));
  } catch (error) {
    yield put(getChannelsListFailed(error));
  }
}

function* getParticipantsSaga(action) {
  try {
    yield put(getParticipants());
    yield call(getParticipantsReq, action.payload);
    yield put(getParticipantsSuccessed());
  } catch (error) {
    yield put(getParticipantsFailed(error));
  }
}

export function* channelsSagas() {
  yield all([
    // yield takeLatest(CREATE_OPEN_CHANNEL, createChannelAsync),
    yield takeLatest(
      [
        USER_RECONNECT_SUCCESSED,
        USER_LOGIN_SUCCESSED,
        CREATE_OPEN_CHANNEL_SUCCESSED,
      ],
      getChannelsListSaga
    ),
    // yield takeLatest(
    //   GET_CHANNELS_LIST_SUCCESSED, getParticipantsSaga,
    // ),
    // yield takeLatest(GET_SELECTED_CHANNEL, selectChannel),
    // yield takeLatest(ENTER_CHANNEL, enterSelectedChannel),
    // yield takeLatest(LEAVE_CHANNEL, leaveChannel),
    // yield takeEvery(GET_RECENTLY_MESSAGES, getRecentMessages),
    // yield takeLatest(UPDATE_CHANNEL, updateChannelSaga),
  ]);
}
