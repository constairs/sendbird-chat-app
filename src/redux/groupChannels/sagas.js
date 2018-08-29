import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createGroupChannel,
  groupChannelList,
  getChannel,
  inviteToGroup,
  leaveGroup,
} from '../../services/sendbird';
import {
  CREATE_GROUP_CHANNEL,
  CREATE_GROUP_CHANNEL_SUCCESSED,
  GET_GROUP_CHANNEL,
  INVITE_USERS,
  LEAVE_GROUP,
  LEAVE_GROUP_SUCCESSED,
  ON_USER_JOINED,
  ON_USER_LEFT,
} from '../groupChannels/types';

import {
  createGroupChannelSuccessed,
  createGroupChannelFailed,
  groupChannelsListSuccessed,
  groupChannelsListFailed,
  getGroupChannelSuccessed,
  getGroupChannelFailed,
  inviteUsersSuccessed,
  inviteUsersFailed,
  leaveGroupSuccessed,
  leaveGroupFailed,
  notificationOff,
} from '../groupChannels/actions';

import { USER_LOGIN_SUCCESSED, USER_RECONNECT_SUCCESSED } from '../user/types';

export function* createGroupAsync(action) {
  try {
    const createdChannel = yield call(createGroupChannel, ...action.payload);
    yield put(createGroupChannelSuccessed(createdChannel));
  } catch (error) {
    yield put(createGroupChannelFailed(error));
  }
}

export function* watchGroupChannel() {
  yield takeLatest(CREATE_GROUP_CHANNEL, createGroupAsync);
}

export function* groupChannels() {
  try {
    const channelList = yield call(groupChannelList);
    yield put(groupChannelsListSuccessed(channelList));
  } catch (error) {
    yield put(groupChannelsListFailed(error));
  }
}

export function* watchGroupChannels() {
  yield takeLatest(
    [
      USER_RECONNECT_SUCCESSED,
      USER_LOGIN_SUCCESSED,
      CREATE_GROUP_CHANNEL_SUCCESSED,
      LEAVE_GROUP_SUCCESSED,
      ON_USER_JOINED,
    ],
    groupChannels
  );
}

export function* getGroup(action) {
  try {
    const groupChannel = yield call(
      getChannel,
      action.payload.channelUrl,
      action.payload.channelType
    );
    yield put(getGroupChannelSuccessed(groupChannel));
  } catch (error) {
    yield put(getGroupChannelFailed(error));
  }
}

export function* watchGetGroup() {
  yield takeLatest(GET_GROUP_CHANNEL, getGroup);
}

export function* inviteUser(action) {
  try {
    const inviteRes = yield call(inviteToGroup, ...action.payload);
    yield put(inviteUsersSuccessed(inviteRes));
  } catch (error) {
    yield put(inviteUsersFailed(error));
  }
}

export function* watchInviteUser() {
  yield takeLatest(INVITE_USERS, inviteUser);
}

export function* leaveGroupSaga(action) {
  try {
    const leaveRes = yield call(leaveGroup, action.payload);
    yield put(leaveGroupSuccessed(leaveRes));
  } catch (error) {
    yield put(leaveGroupFailed(error));
  }
}

export function* watchLeaveGroup() {
  yield takeLatest(LEAVE_GROUP, leaveGroupSaga);
}

export function* groupEventsSaga() {
  yield put(notificationOff());
}

export function* watchGroupEvents() {
  yield takeLatest(
    [
      // ON_USER_JOINED,
      // ON_USER_LEFT
    ],
    groupEventsSaga
  );
}
