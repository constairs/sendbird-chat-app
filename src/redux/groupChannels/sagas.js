import { call, put, takeLatest, all, spawn } from 'redux-saga/effects';
import {
  createGroupChannel,
  groupChannelList,
  getChannel,
  inviteToGroup,
  leaveGroup,
  refreshGroupMembers,
} from '../../services/sendbird';
import {
  CREATE_GROUP_CHANNEL,
  CREATE_GROUP_CHANNEL_SUCCESSED,
  GET_GROUP_CHANNEL,
  GET_GROUP_CHANNEL_SUCCESSED,
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
  refreshedMembers,
  refreshFailed,
} from '../groupChannels/actions';

import { USER_LOGIN_SUCCESSED, USER_RECONNECT_SUCCESSED } from '../user/types';

function* createGroupAsync(action) {
  try {
    const createdChannel = yield call(createGroupChannel, ...action.payload);
    yield put(createGroupChannelSuccessed(createdChannel));
  } catch (error) {
    yield put(createGroupChannelFailed(error));
  }
}

function* watchGroupChannel() {
  yield takeLatest(CREATE_GROUP_CHANNEL, createGroupAsync);
}

function* groupChannels() {
  try {
    const channelList = yield call(groupChannelList);
    yield put(groupChannelsListSuccessed(channelList));
  } catch (error) {
    yield put(groupChannelsListFailed(error));
  }
}

function* watchGroupChannels() {
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

function* getGroup(action) {
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

function* watchGetGroup() {
  yield takeLatest(GET_GROUP_CHANNEL, getGroup);
}

function* inviteUser(action) {
  try {
    const inviteRes = yield call(inviteToGroup, ...action.payload);
    yield put(inviteUsersSuccessed(inviteRes));
  } catch (error) {
    yield put(inviteUsersFailed(error));
  }
}

function* watchInviteUser() {
  yield takeLatest(INVITE_USERS, inviteUser);
}

function* leaveGroupSaga(action) {
  try {
    const leaveRes = yield call(leaveGroup, action.payload);
    yield put(leaveGroupSuccessed(leaveRes));
  } catch (error) {
    yield put(leaveGroupFailed(error));
  }
}

function* watchLeaveGroup() {
  yield takeLatest(LEAVE_GROUP, leaveGroupSaga);
}

function* refreshMembersSaga(action) {
  try {
    const response = yield call(refreshGroupMembers, action.payload);
    yield put(refreshedMembers(response));
  } catch (error) {
    yield put(refreshFailed(error));
  }
}

function* watchRefreshMembers() {
  yield takeLatest(
    [GET_GROUP_CHANNEL_SUCCESSED, ON_USER_JOINED, ON_USER_LEFT],
    refreshMembersSaga
  );
}

export function* groupSagas() {
  yield all([
    spawn(watchRefreshMembers),
    spawn(watchLeaveGroup),
    spawn(watchInviteUser),
    spawn(watchGetGroup),
    spawn(watchGroupChannels),
    spawn(watchGroupChannel),
  ]);
}
