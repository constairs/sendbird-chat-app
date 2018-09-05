import { call, put, takeLatest, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
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
} from './types';

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
  notificationOff,
} from './actions';

import { cleanChat } from '../chat/actions';

import { USER_LOGIN_SUCCESSED, USER_RECONNECT_SUCCESSED } from '../user/types';

function* createGroupAsync(action) {
  try {
    const createdChannel = yield call(createGroupChannel, ...action.payload);
    yield put(createGroupChannelSuccessed(createdChannel));
  } catch (error) {
    yield put(createGroupChannelFailed(error));
  }
}

function* groupChannels() {
  try {
    const channelList = yield call(groupChannelList);
    yield put(groupChannelsListSuccessed(channelList));
  } catch (error) {
    yield put(groupChannelsListFailed(error));
  }
}

function* getGroup(action) {
  try {
    const groupChannel = yield call(
      getChannel,
      action.payload.channelUrl,
      action.payload.channelType
    );
    const receipt = Object.values(groupChannel.cachedReadReceiptStatus).sort(
      (a, b) => a > b
    )[0];
    yield put(cleanChat());
    yield put(getGroupChannelSuccessed(groupChannel, receipt));
  } catch (error) {
    yield put(getGroupChannelFailed(error));
  }
}

function* inviteUser(action) {
  try {
    const inviteRes = yield call(inviteToGroup, ...action.payload);
    yield put(inviteUsersSuccessed(inviteRes));
  } catch (error) {
    yield put(inviteUsersFailed(error));
  }
}

function* leaveGroupSaga(action) {
  try {
    const leaveRes = yield call(leaveGroup, action.payload);
    yield put(leaveGroupSuccessed(leaveRes));
  } catch (error) {
    yield put(leaveGroupFailed(error));
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
        const response = yield call(refreshGroupMembers, action.payload);
        yield put(refreshedMembers(response));
      }
    } else {
      const response = yield call(
        refreshGroupMembers,
        action.payload.groupChannel
      );
      yield put(refreshedMembers(response));
    }
  } catch (error) {
    yield put(refreshFailed(error));
  }
}

export function* groupSagas() {
  yield all([
    yield takeLatest(
      [GET_GROUP_CHANNEL_SUCCESSED, ON_USER_JOINED, ON_USER_LEFT],
      refreshMembersSaga
    ),
    yield takeLatest([ON_USER_JOINED, ON_USER_LEFT], membersUpdatedSaga),
    yield takeLatest(LEAVE_GROUP, leaveGroupSaga),
    yield takeLatest(INVITE_USERS, inviteUser),
    yield takeLatest(CREATE_GROUP_CHANNEL, createGroupAsync),
    yield takeLatest(
      [
        USER_RECONNECT_SUCCESSED,
        USER_LOGIN_SUCCESSED,
        CREATE_GROUP_CHANNEL_SUCCESSED,
        LEAVE_GROUP_SUCCESSED,
        ON_USER_JOINED,
      ],
      groupChannels
    ),
    yield takeLatest(GET_GROUP_CHANNEL, getGroup),
  ]);
}
