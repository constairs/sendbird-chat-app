import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  fetching: false,
  groupsFetching: false,
  groupChannelsList: [],
  groupChannel: null,
  notificationShow: false,
  notification: {
    type: '',
    channel: '',
    user: '',
  },
};

const createGroupChannel = (state, formData) => ({
  ...state,
  formData,
  fetching: true,
});

const createGroupChannelSuccessed = (state, channelData) => ({
  ...state,
  channelData,
  fetching: false,
});

const createGroupChannelFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const groupChannelsList = state => ({
  ...state,
  groupsFetching: true,
});
const groupChannelsListSuccessed = (state, groupList) => ({
  ...state,
  groupChannelsList: groupList,
  groupsFetching: false,
});
const groupChannelsListFailed = (state, error) => ({
  ...state,
  error,
  groupsFetching: false,
});

const getGroup = state => ({
  ...state,
  fetching: true,
});

const getGroupSuccessed = (state, groupChannel) => ({
  ...state,
  groupChannel,
  fetching: false,
});

const getGroupFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const inviteUsers = state => ({
  ...state,
  fetching: true,
});

const inviteUsersSuccessed = (state, inviteRes) => ({
  ...state,
  inviteRes,
  fetching: false,
});

const inviteUsersFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const leaveGroup = state => ({
  ...state,
});

const leaveGroupSuccessed = state => ({
  ...state,
  groupChannel: null,
});

const leaveGroupFailed = (state, error) => ({
  ...state,
  error,
});

const groupUpdated = (state, channel) => ({
  ...state,
  groupChannel: state.groupChannel ? channel : null,
});

const onUserJoined = (state, userData) => ({
  ...state,
  notificationShow: true,
  notification: {
    type: 'onUserJoined',
    channel: userData.groupChannel,
    user: userData.user,
  },
});

const onUserLeft = (state, userData) => ({
  ...state,
  notificationShow: true,
  notification: {
    type: 'userLeft',
    channel: userData.groupChannel,
    user: userData.user,
  },
});

const notificationOff = state => ({
  ...state,
  notificationShow: false,
});

const refreshedMembers = (state, response) => ({
  ...state,
  response,
});

const refreshFailed = (state, error) => ({
  ...state,
  error,
});

const onReadReceiptUpdated = (state, channel) => ({
  ...state,
  groupChannel: channel,
});

const handlers = {
  [TYPES.CREATE_GROUP_CHANNEL]: createGroupChannel,
  [TYPES.CREATE_GROUP_CHANNEL_SUCCESSED]: createGroupChannelSuccessed,
  [TYPES.CREATE_GROUP_CHANNEL_FAILED]: createGroupChannelFailed,

  [TYPES.GROUP_CHANNELS_LIST]: groupChannelsList,
  [TYPES.GROUP_CHANNELS_LIST_SUCCESSED]: groupChannelsListSuccessed,
  [TYPES.GROUP_CHANNELS_LIST_FAILED]: groupChannelsListFailed,

  [TYPES.GET_GROUP_CHANNEL]: getGroup,
  [TYPES.GET_GROUP_CHANNEL_SUCCESSED]: getGroupSuccessed,
  [TYPES.GET_GROUP_CHANNEL_FAILED]: getGroupFailed,

  [TYPES.INVITE_USERS]: inviteUsers,
  [TYPES.INVITE_USERS_SUCCESSED]: inviteUsersSuccessed,
  [TYPES.INVITE_USERS_FAILED]: inviteUsersFailed,

  [TYPES.LEAVE_GROUP]: leaveGroup,
  [TYPES.LEAVE_GROUP_SUCCESSED]: leaveGroupSuccessed,
  [TYPES.LEAVE_GROUP_FAILED]: leaveGroupFailed,

  [TYPES.GROUP_UPDATED]: groupUpdated,

  [TYPES.ON_USER_JOINED]: onUserJoined,
  [TYPES.ON_USER_LEFT]: onUserLeft,

  [TYPES.NOTIFICATION_OFF]: notificationOff,

  [TYPES.REFRESHED_MEMBERS]: refreshedMembers,
  [TYPES.REFRESH_FAILED]: refreshFailed,
  [TYPES.ON_READ_RECEIPT_UPDATED]: onReadReceiptUpdated,
};

export const groupChannelsReducer = createReducer(initState, handlers);
