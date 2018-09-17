import { call, put, takeLatest, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  createOpenChannel,
  createGroupChannel,
  getChannelListFromSB,
  selectChannel,
  exitChannel,
  leaveGroup,
  inviteToGroup,
  refreshGroupMembers,
  getParticipantsSb,
} from '../../services/sendbird';
import {
  CREATE_OPEN_CHANNEL,
  CREATE_GROUP_CHANNEL,
  GET_SELECTED_CHANNEL,
  GET_SELECTED_CHANNEL_SUCCESSED,
  CREATE_OPEN_CHANNEL_SUCCESSED,
  CREATE_GROUP_CHANNEL_SUCCESSED,
  LEAVE_CHANNEL,
  INVITE_USERS,
  ON_USER_JOINED,
  ON_USER_LEFT,
  NEW_USER_ENTERED,
  USER_EXITED,
} from './types';
import {
  getSelectedChannelSuccessed,
  getSelectedChannelFailed,
  getChannelListSuccessed,
  getChannelListFailed,
  getChannelList,
  leaveChannelSuccessed,
  leaveChannelFailed,
} from './actions';

import { USER_LOGIN_SUCCESSED, USER_RECONNECT_SUCCESSED } from '../user/types';
import {
  createOpenChannelSuccessed,
  createOpenChannelFailed,
  enterChannel,
  enterChannelSuccessed,
  enterChannelFailed,
  getParticipants,
  getParticipantsSuccessed,
  getParticipantsFailed
} from './openChannelsActions';
import {
  createGroupChannelSuccessed,
  createGroupChannelFailed,
  inviteUsersSuccessed,
  inviteUsersFailed,
  refreshedMembers,
  refreshFailed,
  notificationOff,
} from './groupChannelsActions';
import { cleanChat } from '../chat/actions';

function* createChannelSaga(action) {
  if (action.type === CREATE_OPEN_CHANNEL) {
    try {
      const createdChannel = yield call(createOpenChannel, ...action.payload);
      yield put(createOpenChannelSuccessed(createdChannel));
    } catch (error) {
      yield put(createOpenChannelFailed(error.message));
    }
  } else {
    try {
      const createdChannel = yield call(createGroupChannel, ...action.payload);
      yield put(createGroupChannelSuccessed(createdChannel));
    } catch (error) {
      yield put(createGroupChannelFailed(error.message));
    }
  }
}

function* getChannelsListSaga() {
  yield put(getChannelList());
  try {
    const channelList = yield call(getChannelListFromSB);
    yield put(getChannelListSuccessed(channelList));
  } catch (error) {
    yield put(getChannelListFailed(error.message));
  }
}

function* getSelectedChannelSaga(action) {
  yield put(cleanChat());
  try {
    const channel = yield call(selectChannel, action.payload);
    if (action.payload.channelType === 'open') {
      yield put(enterChannel(action));
      yield put(enterChannelSuccessed(channel));
    } else {
      yield put(getSelectedChannelSuccessed(channel));
    }
  } catch (error) {
    if (action.payload.channelType === 'open') {
      yield put(enterChannelFailed(error));
    } else {
      yield put(getSelectedChannelFailed(error.message));
    }
  }
}

function* leaveChannelSaga(action) {
  try {
    if (action.payload.channelType === 'open') {
      yield call(exitChannel, action.payload.channelUrl);
      yield put(leaveChannelSuccessed(action.payload));
    } else {
      yield call(leaveGroup, action.payload.channelUrl);
      yield put(leaveChannelSuccessed(action.payload));
    }
  } catch (error) {
    yield put(leaveChannelFailed(error.message));
  }
}

function* inviteUserSaga(action) {
  try {
    const inviteRes = yield call(inviteToGroup, ...action.payload);
    yield put(inviteUsersSuccessed(inviteRes));
  } catch (error) {
    yield put(inviteUsersFailed(error.message));
  }
}

function* membersUpdatedSaga() {
  yield call(delay, 5000);
  yield put(notificationOff());
}

function* refreshMembersSaga(action) {
  try {
    if (action.type === ON_USER_JOINED || action.type === ON_USER_LEFT) {
      if (action.payload.myMemberState === 'joined') {
        const members = yield call(refreshGroupMembers, action.payload);
        yield put(refreshedMembers(members));
      }
    } else {
      const response = yield call(
        refreshGroupMembers,
        action.payload
      );
      yield put(refreshedMembers(response));
    }
  } catch (error) {
    yield put(refreshFailed(error.message));
  }
}

function* membersRefresher(action) {
  while (action) {
    yield call(delay, 20000);
    yield refreshMembersSaga(action);
  }
}

function* getParticipantsSaga(action) {
  yield put(getParticipants());
  try {
    const participantsList = yield call(getParticipantsSb, action.payload.channel);
    yield put(getParticipantsSuccessed(participantsList));
  } catch (error) {
    yield put(getParticipantsFailed(error.message));
  }
}

export function* channelsSagas() {
  yield all([
    yield takeLatest([CREATE_OPEN_CHANNEL, CREATE_GROUP_CHANNEL], createChannelSaga),
    yield takeLatest(
      [
        USER_RECONNECT_SUCCESSED,
        USER_LOGIN_SUCCESSED,
        CREATE_OPEN_CHANNEL_SUCCESSED,
        CREATE_GROUP_CHANNEL_SUCCESSED
      ],
      getChannelsListSaga
    ),
    yield takeLatest(GET_SELECTED_CHANNEL, getSelectedChannelSaga),
    yield takeLatest(LEAVE_CHANNEL, leaveChannelSaga),
    yield takeLatest(
      [ON_USER_JOINED, ON_USER_LEFT, GET_SELECTED_CHANNEL_SUCCESSED],
      refreshMembersSaga
    ),
    yield takeLatest(GET_SELECTED_CHANNEL_SUCCESSED, membersRefresher),
    yield takeLatest([ON_USER_JOINED, ON_USER_LEFT], membersUpdatedSaga),
    yield takeLatest([NEW_USER_ENTERED, USER_EXITED], getParticipantsSaga),
    yield takeLatest(ON_USER_JOINED, getChannelsListSaga),
    yield takeLatest(INVITE_USERS, inviteUserSaga),
  ]);
}
