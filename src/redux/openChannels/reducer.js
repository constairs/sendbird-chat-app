import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  fetching: false,
  participants: [],
  channelsList: [],
  messages: [],
};

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

const openChannelsList = state => ({
  ...state,
  fetching: true,
});
const openChannelsListSuccessed = (state, channelsList) => ({
  ...state,
  channelsList,
  fetching: false,
});
const openChannelsListFailed = (state, error) => ({
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
};

export const openChannelsReducer = createReducer(initState, handlers);
