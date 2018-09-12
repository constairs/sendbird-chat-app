import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';
import { channelListFunc, getChannelFunc, updateChannelListItem } from './helpers';

const initState = {
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

const getChannelList = state => ({
  ...state,
  channelFetching: true
});
const getChannelListSuccessed = (state, channelsList) => ({
  ...state,
  openChannelList: channelListFunc(channelsList).openChannelList,
  groupChannelList: channelListFunc(channelsList).groupChannelList,
  channelsFetching: false
});
const getChannelListFailed = (state, error) => ({
  ...state,
  error,
  channelFetching: false,
});

const createGroupChannel = state => ({
  ...state,
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

const changedToAnotherChannel = state => ({
  ...state,
  channel: '',
  receipt: '',
});

const createOpenChannel = (state, formData) => ({
  ...state,
  formData,
  fetching: true,
});
const createOpenChannelSuccessed = (state, channelData) => ({
  ...state,
  channelData,
  fetching: false,
});
const createOpenChannelFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const enterChannel = state => ({
  ...state,
  fetching: true,
});
const enterChannelSuccessed = (state, channel) => ({
  ...state,
  channel: getChannelFunc(channel),
  fetching: false,
});
const enterChannelFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const getParticipants = state => ({
  ...state,
});

const getParticipantsSuccessed = (state, participantList) => ({
  ...state,
  channel: { ...state.channel, members: participantList },
  fetching: false,
});

const getParticipantsFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const leaveChannel = state => ({
  ...state,
  fetching: true,
});
const leaveChannelSuccessed = (state, channelInfo) => ({
  ...state,
  channel: '',
  openChannelList: channelInfo.channelType === 'open' ? state.openChannelList.filter(channel => channel.url !== channelInfo.channelUrl) : state.openChannelList,
  groupChannelList: channelInfo.channelType === 'group' ? state.groupChannelList.filter(channel => channel.url !== channelInfo.channelUrl) : state.groupChannelList,
  fetching: false,
});
const leaveChannelFailed = state => ({
  ...state,
  fetching: false,
});

const channelUpdated = (state, channel) => ({
  ...state,
  channel: state.channel ? getChannelFunc(channel) : null,
  openChannelList: channel.channelType === 'open' ? updateChannelListItem(state.openChannelList, channel, 'open') : state.openChannelList,
  groupChannelList: channel.channelType === 'group' ? updateChannelListItem(state.groupChannelList, channel, 'group') : state.groupChannelList,
});

const userEntered = (state, action) => ({
  ...state,
  channel: getChannelFunc(action.channel),
});

const userExited = (state, action) => ({
  ...state,
  channel: getChannelFunc(action.channel),
  participants: [
    ...state.participants.filter(cur => cur.userId !== action.user.userId),
  ],
});

const getRecentlyMessages = state => ({
  ...state,
  fetching: true,
});
const getRecentlyMessagesSuccessed = (state, message) => ({
  ...state,
  openChannelList: state.openChannelList.map(
    channel =>
      (channel.url === message.channel
        ? { ...channel, messages: message.messages }
        : channel)
  ),
  fetching: false,
});
const getRecentlyMessagesFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const getSelectedChannel = state => ({
  ...state,
  fetching: true,
});
const getSelectedChannelSuccessed = (state, channel) => ({
  ...state,
  channel: getChannelFunc(channel),
  fetching: false,
});
const getSelectedChannelFailed = (state, error) => ({
  ...state,
  fetching: false,
  error
});

const handlers = {
  [TYPES.CREATE_GROUP_CHANNEL]: createGroupChannel,
  [TYPES.CREATE_GROUP_CHANNEL_SUCCESSED]: createGroupChannelSuccessed,
  [TYPES.CREATE_GROUP_CHANNEL_FAILED]: createGroupChannelFailed,

  [TYPES.CREATE_OPEN_CHANNEL]: createOpenChannel,
  [TYPES.CREATE_OPEN_CHANNEL_SUCCESSED]: createOpenChannelSuccessed,
  [TYPES.CREATE_OPEN_CHANNEL_FAILED]: createOpenChannelFailed,

  [TYPES.INVITE_USERS]: inviteUsers,
  [TYPES.INVITE_USERS_SUCCESSED]: inviteUsersSuccessed,
  [TYPES.INVITE_USERS_FAILED]: inviteUsersFailed,

  [TYPES.ON_USER_JOINED]: onUserJoined,
  [TYPES.ON_USER_LEFT]: onUserLeft,

  [TYPES.NOTIFICATION_OFF]: notificationOff,

  [TYPES.REFRESHED_MEMBERS]: refreshedMembers,
  [TYPES.REFRESH_FAILED]: refreshFailed,

  [TYPES.ENTER_CHANNEL_SUCCESSED]: changedToAnotherChannel,

  [TYPES.ENTER_CHANNEL]: enterChannel,
  [TYPES.ENTER_CHANNEL_SUCCESSED]: enterChannelSuccessed,
  [TYPES.ENTER_CHANNEL_FAILED]: enterChannelFailed,

  [TYPES.LEAVE_CHANNEL]: leaveChannel,
  [TYPES.LEAVE_CHANNEL_SUCCESSED]: leaveChannelSuccessed,
  [TYPES.LEAVE_CHANNEL_FAILED]: leaveChannelFailed,

  [TYPES.GET_PARTICIPANTS]: getParticipants,
  [TYPES.GET_PARTICIPANTS_SUCCESSED]: getParticipantsSuccessed,
  [TYPES.GET_PARTICIPANTS_FAILED]: getParticipantsFailed,

  [TYPES.CHANNEL_UPDATED]: channelUpdated,

  [TYPES.NEW_USER_ENTERED]: userEntered,

  [TYPES.USER_EXITED]: userExited,

  [TYPES.GET_RECENTLY_MESSAGES]: getRecentlyMessages,
  [TYPES.GET_RECENTLY_MESSAGES_SUCCESSED]: getRecentlyMessagesSuccessed,
  [TYPES.GET_RECENTLY_MESSAGES_FAILED]: getRecentlyMessagesFailed,

  [TYPES.GET_CHANNEL_LIST]: getChannelList,
  [TYPES.GET_CHANNEL_LIST_SUCCESSED]: getChannelListSuccessed,
  [TYPES.GET_CHANNEL_LIST_FAILED]: getChannelListFailed,

  [TYPES.GET_SELECTED_CHANNEL]: getSelectedChannel,
  [TYPES.GET_SELECTED_CHANNEL_SUCCESSED]: getSelectedChannelSuccessed,
  [TYPES.GET_SELECTED_CHANNEL_FAILED]: getSelectedChannelFailed,
};

export const channelsReducer = createReducer(initState, handlers);

