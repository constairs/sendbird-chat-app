import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  fetching: false,
  sendingMessage: false,
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

const updateChannel = (state, formData) => ({
  ...state,
  formData,
  fetching: true,
});
const updateChannelSuccessed = (state, updatedData) => ({
  ...state,
  updatedData,
  fetching: false,
});
const updateChannelFailed = (state, error) => ({
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

const handlers = {
  [TYPES.CREATE_OPEN_CHANNEL]: createOpenChannel,
  [TYPES.CREATE_OPEN_CHANNEL_SUCCESSED]: createOpenChannelSuccessed,
  [TYPES.CREATE_OPEN_CHANNEL_FAILED]: createOpenChannelFailed,

  [TYPES.UPDATE_CHANNEL]: updateChannel,
  [TYPES.UPDATE_CHANNEL_SUCCESSED]: updateChannelSuccessed,
  [TYPES.UPDATE_CHANNEL_FAILED]: updateChannelFailed,

  [TYPES.OPEN_CHANNELS_LIST]: openChannelsList,
  [TYPES.OPEN_CHANNELS_LIST_SUCCESSED]: openChannelsListSuccessed,
  [TYPES.OPEN_CHANNELS_LIST_FAILED]: openChannelsListFailed,

  [TYPES.ENTER_CHANNEL]: enterChannel,
  [TYPES.ENTER_CHANNEL_SUCCESSED]: enterChannelSuccessed,
  [TYPES.ENTER_CHANNEL_FAILED]: enterChannelFailed,

  [TYPES.LEAVE_CHANNEL]: leaveChannel,
  [TYPES.LEAVE_CHANNEL_SUCCESSED]: leaveChannelSuccessed,
  [TYPES.LEAVE_CHANNEL_FAILED]: leaveChannelFailed,

};

export const chatReducer = createReducer(initState, handlers);
