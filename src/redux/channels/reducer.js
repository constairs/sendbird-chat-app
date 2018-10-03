import {
  assoc,
  assocPath,
  pipe
} from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';
import { channelListFunc, getChannelFunc, updateChannelListItem } from './helpers';

export const initState = {
  channelsFetching: false,
  openChannelList: [],
  groupChannelList: [],
  channel: null,
  notificationShow: false,
  notification: {
    type: '',
    channel: '',
    user: '',
  },
};

const getChannelList = () => assoc('channelsFetching', true);
const getChannelListSuccessed = channelsList => pipe(
  assoc('openChannelList', channelListFunc(channelsList).openChannelList),
  assoc('groupChannelList', channelListFunc(channelsList).groupChannelList),
  assoc('channelsFetching', false),
);
const getChannelListFailed = error => pipe(
  assoc('channelsFetching', false),
  assoc('error', error),
);

const createGroupChannel = () => assoc('channelFetching', true);

const createGroupChannelSuccessed = () => assoc('channelFetching', false);

const createGroupChannelFailed = error => pipe(
  assoc('error', error),
  assoc('channelFetching', false)
);

const inviteUsersFailed = error => assoc('error', error);

const onUserJoined = userData => pipe(
  assoc('notificationShow', true),
  assocPath(['notification', 'type'], 'onUserJoined'),
  assocPath(['notification', 'channel'], getChannelFunc(userData.groupChannel)),
  assocPath(['notification', 'user'], userData.user),
);

const onUserLeft = userData => pipe(
  assoc('notificationShow', true),
  assocPath(['notification', 'type'], 'userLeft'),
  assocPath(['notification', 'channel'], getChannelFunc(userData.groupChannel)),
  assocPath(['notification', 'user'], userData.user),
);

const notificationOff = () => pipe(
  assoc('notificationShow', false),
  assocPath(['notification', 'type'], ''),
  assocPath(['notification', 'channel'], null),
  assocPath(['notification', 'user'], ''),
);

const refreshEnteredMember = members => assocPath(['channel', 'members'], members);
const refreshedMembers = members => assocPath(['channel', 'members'], members);

const refreshFailed = error => assoc('error', error);

const changeActiveChannel = () => assoc('channel', null);

const createOpenChannel = () => assoc('channelFetching', true);
const createOpenChannelSuccessed = () => assoc('channelFetching', false);
const createOpenChannelFailed = error => pipe(
  assoc('channelFetching', false),
  assoc('error', error)
);

const enterChannel = () => pipe(
  assoc('channelFetching', true),
  assoc('channel', null),
);

const enterChannelSuccessed = channel => pipe(
  assoc('channelFetching', false),
  assoc('channel', getChannelFunc(channel)),
);

const enterChannelFailed = error => pipe(
  assoc('channelFetching', false),
  assoc('error', error),
);

// const onUserJoined = (state, userData) => ({
//   ...state,
//   notificationShow: true,
//   notification: {
//     type: 'onUserJoined',
//     channel: getChannelFunc(userData.groupChannel),
//     user: userData.user,
//   },
// });

// const onUserLeft = (state, userData) => ({
//   ...state,
//   notificationShow: true,
//   notification: {
//     type: 'userLeft',
//     channel: getChannelFunc(userData.groupChannel),
//     user: userData.user,
//   },
// });

// const notificationOff = state => ({
//   ...state,
//   notification: {
//     type: '',
//     channel: '',
//     user: '',
//   },
//   notificationShow: false,
// });

// const refreshEnteredMember = (state, members) => ({
//   ...state,
//   channel: { ...state.channel, members }
// });

// const refreshedMembers = (state, members) => ({
//   ...state,
//   channel: { ...state.channel, members }
// });

// const refreshFailed = (state, error) => ({
//   ...state,
//   error,
// });

// const changeActiveChannel = state => ({
//   ...state,
//   channel: null
// });

// const createOpenChannel = state => ({
//   ...state,
//   channelFetching: true,
// });
// const createOpenChannelSuccessed = state => ({
//   ...state,
//   channelFetching: false,
// });
// const createOpenChannelFailed = (state, error) => ({
//   ...state,
//   error,
//   channelFetching: false,
// });

// const enterChannel = state => ({
//   ...state,
//   channelFetching: true,
//   channel: ''
// });
// const enterChannelSuccessed = (state, channel) => ({
//   ...state,
//   channel: getChannelFunc(channel),
//   channelFetching: false,
// });
// const enterChannelFailed = (state, error) => ({
//   ...state,
//   error,
//   channelFetching: false,
// });

const getParticipantsSuccessed = (state, participantList) => ({
  ...state,
  channel: { ...state.channel, members: participantList },
});

const getParticipantsFailed = (state, error) => ({
  ...state,
  error,
});

const leaveChannel = state => ({
  ...state,
  channelFetching: true,
});
const leaveChannelSuccessed = (state, channelInfo) => ({
  ...state,
  channel: null,
  groupChannelList: channelInfo.channelType === 'group' ? state.groupChannelList.filter(channel => channel.url !== channelInfo.channelUrl) : state.groupChannelList,
  channelFetching: false,
});
const leaveChannelFailed = (state, error) => ({
  ...state,
  channelFetching: false,
  error
});

const channelUpdated = (state, channel) => ({
  ...state,
  channel: state.channel && state.channel.url === channel.url ?
    getChannelFunc(channel) : state.channel,
  openChannelList: channel.channelType === 'open' ? updateChannelListItem(state.openChannelList, channel, 'open') : state.openChannelList,
  groupChannelList: channel.channelType === 'group' ? updateChannelListItem(state.groupChannelList, channel, 'group') : state.groupChannelList,
});

const userEntered = (state, enterData) => ({
  ...state,
  channel: getChannelFunc(enterData.channel),
});

const userExited = (state, exitData) => ({
  ...state,
  channel: getChannelFunc(exitData.channel),
});

const getSelectedChannel = state => ({
  ...state,
  channelFetching: true,
});
const getSelectedChannelSuccessed = (state, channel) => ({
  ...state,
  channel: getChannelFunc(channel),
  channelFetching: false,
});
const getSelectedChannelFailed = (state, error) => ({
  ...state,
  channelFetching: false,
  error
});

const handlers = {
  [TYPES.CREATE_GROUP_CHANNEL]: createGroupChannel,
  [TYPES.CREATE_GROUP_CHANNEL_SUCCESSED]: createGroupChannelSuccessed,
  [TYPES.CREATE_GROUP_CHANNEL_FAILED]: createGroupChannelFailed,

  [TYPES.CREATE_OPEN_CHANNEL]: createOpenChannel,
  [TYPES.CREATE_OPEN_CHANNEL_SUCCESSED]: createOpenChannelSuccessed,
  [TYPES.CREATE_OPEN_CHANNEL_FAILED]: createOpenChannelFailed,

  [TYPES.INVITE_USERS_FAILED]: inviteUsersFailed,

  [TYPES.ON_USER_JOINED]: onUserJoined,
  [TYPES.ON_USER_LEFT]: onUserLeft,

  [TYPES.NOTIFICATION_OFF]: notificationOff,

  [TYPES.ON_READ_RECEIPT_UPDATED]: refreshEnteredMember,
  [TYPES.REFRESHED_MEMBERS]: refreshedMembers,
  [TYPES.REFRESH_FAILED]: refreshFailed,

  [TYPES.ENTER_CHANNEL]: changeActiveChannel,
  [TYPES.CHANGE_ACTIVE_CHANNEL]: changeActiveChannel,

  [TYPES.ENTER_CHANNEL]: enterChannel,
  [TYPES.ENTER_CHANNEL_SUCCESSED]: enterChannelSuccessed,
  [TYPES.ENTER_CHANNEL_FAILED]: enterChannelFailed,

  [TYPES.LEAVE_CHANNEL]: leaveChannel,
  [TYPES.LEAVE_CHANNEL_SUCCESSED]: leaveChannelSuccessed,
  [TYPES.LEAVE_CHANNEL_FAILED]: leaveChannelFailed,

  [TYPES.GET_PARTICIPANTS_SUCCESSED]: getParticipantsSuccessed,
  [TYPES.GET_PARTICIPANTS_FAILED]: getParticipantsFailed,

  [TYPES.CHANNEL_UPDATED]: channelUpdated,

  [TYPES.NEW_USER_ENTERED]: userEntered,
  [TYPES.USER_EXITED]: userExited,

  [TYPES.GET_CHANNEL_LIST]: getChannelList,
  [TYPES.GET_CHANNEL_LIST_SUCCESSED]: getChannelListSuccessed,
  [TYPES.GET_CHANNEL_LIST_FAILED]: getChannelListFailed,

  [TYPES.GET_SELECTED_CHANNEL]: getSelectedChannel,
  [TYPES.GET_SELECTED_CHANNEL_SUCCESSED]: getSelectedChannelSuccessed,
  [TYPES.GET_SELECTED_CHANNEL_FAILED]: getSelectedChannelFailed,
};

export const channels = createReducer(initState, handlers);
