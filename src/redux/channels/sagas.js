import { call, put, takeLatest, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  createOpenChannel,
  createGroupChannel,
  getChannelList,
  selectChannel,
  exitChannel,
  leaveGroup,
  updateChannel,
  inviteToGroup,
  refreshGroupMembers,
} from '../../services/sendbird';
import {
  CREATE_OPEN_CHANNEL,
  CREATE_GROUP_CHANNEL,
  GET_SELECTED_CHANNEL,
  CREATE_OPEN_CHANNEL_SUCCESSED,
  CREATE_GROUP_CHANNEL_SUCCESSED,
  LEAVE_CHANNEL,
  UPDATE_CHANNEL,
  INVITE_USERS,
  ON_USER_JOINED,
  ON_USER_LEFT,
} from './types';
import {
  getSelectedChannelSuccessed,
  getSelectedChannelFailed,
  updateChannelSuccessed,
  updateChannelFailed,
  getChannelListSuccessed,
  getChannelListFailed
} from './actions';

import { USER_LOGIN_SUCCESSED, USER_RECONNECT_SUCCESSED } from '../user/types';
import {
  createOpenChannelSuccessed,
  createOpenChannelFailed,
  enterChannel,
  enterChannelSuccessed,
  enterChannelFailed,
  leaveChannelSuccessed,
  leaveChannelFailed,
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
      yield put(createOpenChannelFailed(error));
    }
  } else {
    try {
      const createdChannel = yield call(createGroupChannel, ...action.payload);
      yield put(createGroupChannelSuccessed(createdChannel));
    } catch (error) {
      yield put(createGroupChannelFailed(error));
    }
  }
}

function* getChannelsListSaga() {
  try {
    const channelList = yield call(getChannelList);
    yield put(getChannelListSuccessed(channelList));
  } catch (error) {
    yield put(getChannelListFailed(error));
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
      yield put(getSelectedChannelFailed(error));
    }
  }
}

function* leaveChannelSaga(action) {
  try {
    if (action.payload.channelType === 'open') {
      const res = yield call(exitChannel, action.payload.channelUrl);
      yield put(leaveChannelSuccessed(res));
    } else {
      const res = yield call(leaveGroup, action.payload.channelUrl);
      yield put(leaveChannelSuccessed(res));
    }
  } catch (error) {
    yield put(leaveChannelFailed(error));
  }
}

function* updateChannelSaga(action) {
  try {
    const updRes = yield call(updateChannel, ...action.payload);
    yield put(updateChannelSuccessed(updRes));
    console(updRes);
  } catch (error) {
    yield put(updateChannelFailed(error));
  }
}

function* inviteUserSaga(action) {
  try {
    const inviteRes = yield call(inviteToGroup, ...action.payload);
    yield put(inviteUsersSuccessed(inviteRes));
  } catch (error) {
    yield put(inviteUsersFailed(error));
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
    yield takeLatest(UPDATE_CHANNEL, updateChannelSaga),
    yield takeLatest(
      [ON_USER_JOINED, ON_USER_LEFT],
      refreshMembersSaga
    ),
    yield takeLatest([ON_USER_JOINED, ON_USER_LEFT], membersUpdatedSaga),
    yield takeLatest(INVITE_USERS, inviteUserSaga),
  ]);
}
