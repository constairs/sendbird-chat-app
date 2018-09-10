import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';
import { channelListFunc } from '../../utils/helpers';

const initState = {
  channelFetching: false,
  channelsList: [],
  channel: null,
  notificationShow: false,
  notification: {
    type: '',
    channel: '',
    user: '',
  },
};

const getChannelsList = state => ({
  ...state,
  channelFetching: true
});
const getChannelsListSuccessed = (state, channelsList) => ({
  ...state,
  openChannelList: channelListFunc(channelsList).openChannelList,
  groupChannelList: channelListFunc(channelsList).groupChannelList,
  channelFetching: false
});
const getChannelsListFailed = (state, error) => ({
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

const groupChannelsList = state => ({
  ...state,
  channelFetching: true,
});
const groupChannelsListSuccessed = (state, groupList) => ({
  ...state,
  groupChannelsList: groupList,
  channelFetching: false,
});
const groupChannelsListFailed = (state, error) => ({
  ...state,
  error,
  channelFetching: false,
});

const openChannelsList = state => ({
  ...state,
  channelFetching: true,
});
const openChannelsListSuccessed = (state, channelsList) => ({
  ...state,
  channelsList,
  channelFetching: false,
});
const openChannelsListFailed = (state, error) => ({
  ...state,
  error,
  channelFetching: false,
});

const getGroup = state => ({
  ...state,
  fetching: true,
});
const getGroupSuccessed = (state, groupData) => ({
  ...state,
  groupChannel: groupData.groupChannel,
  receipt: groupData.receipt,
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

const changedToAnotherChannel = state => ({
  ...state,
  channel: '',
  receipt: '',
});

// const changedToAnotherChannel = state => ({
//   ...state,
//   channel: '',
// });

// open

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
  channel,
  fetching: false,
});
const enterChannelFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const getParticipants = (state, data) => ({
  ...state,
  participants: data,
});

const getParticipantsSuccessed = (state, participantList) => ({
  ...state,
  participants: participantList,
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
const leaveChannelSuccessed = state => ({
  ...state,
  channel: '',
  fetching: false,
});
const leaveChannelFailed = state => ({
  ...state,
  fetching: false,
});

const channelUpdated = (state, channel) => ({
  ...state,
  channel,
});

const userEntered = (state, action) => ({
  ...state,
  userEntered: action.user,
  channel: action.channel,
});

const userExited = (state, action) => ({
  ...state,
  channel: action.channel,
  exitedUser: state.participants.indexOf(action.user.userId),
  participants: [
    ...state.participants.filter(cur => cur.userId !== action.user.userId),
  ],
});

const getRecentlyMessages = (state, reqParams) => ({
  ...state,
  reqParams,
  fetching: true,
});
const getRecentlyMessagesSuccessed = (state, messages) => ({
  ...state,
  channelsList: state.channelsList.map(
    cur =>
      (cur.url === messages.channel
        ? { ...cur, messages: messages.messages }
        : cur)
  ),
  fetching: false,
});
const getRecentlyMessagesFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
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

  [TYPES.ENTER_CHANNEL_SUCCESSED]: changedToAnotherChannel,

  // [GET_GROUP_CHANNEL_SUCCESSED]: changedToAnotherChannel,

  // open

  [TYPES.CREATE_OPEN_CHANNEL]: createOpenChannel,
  [TYPES.CREATE_OPEN_CHANNEL_SUCCESSED]: createOpenChannelSuccessed,
  [TYPES.CREATE_OPEN_CHANNEL_FAILED]: createOpenChannelFailed,

  [TYPES.OPEN_CHANNELS_LIST]: openChannelsList,
  [TYPES.OPEN_CHANNELS_LIST_SUCCESSED]: openChannelsListSuccessed,
  [TYPES.OPEN_CHANNELS_LIST_FAILED]: openChannelsListFailed,

  [TYPES.ENTER_CHANNEL]: enterChannel,
  [TYPES.ENTER_CHANNEL_SUCCESSED]: enterChannelSuccessed,
  [TYPES.ENTER_CHANNEL_FAILED]: enterChannelFailed,

  [TYPES.LEAVE_CHANNEL]: leaveChannel,
  [TYPES.LEAVE_CHANNEL_SUCCESSED]: leaveChannelSuccessed,
  [TYPES.LEAVE_CHANNEL_FAILED]: leaveChannelFailed,

  [TYPES.GET_PARTICIPANTS]: getParticipants,
  [TYPES.GET_PARTICIPANTS_SUCCESSED]: getParticipantsSuccessed,
  [TYPES.GET_PARTICIPANTS_FAILED]: getParticipantsFailed,

  [TYPES.GHANNEL_UPDATED]: channelUpdated,

  [TYPES.NEW_USER_ENTERED]: userEntered,

  [TYPES.USER_EXITED]: userExited,

  [TYPES.GET_RECENTLY_MESSAGES]: getRecentlyMessages,
  [TYPES.GET_RECENTLY_MESSAGES_SUCCESSED]: getRecentlyMessagesSuccessed,
  [TYPES.GET_RECENTLY_MESSAGES_FAILED]: getRecentlyMessagesFailed,

  [TYPES.GET_CHANNELS_LIST]: getChannelsList,
  [TYPES.GET_CHANNELS_LIST_SUCCESSED]: getChannelsListSuccessed,
  [TYPES.GET_CHANNELS_LIST_FAILED]: getChannelsListFailed,

};

export const channelsReducer = createReducer(initState, handlers);

