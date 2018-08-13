import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  fetching: false,
  error: '',
  formData: ''
};

const createOpenChannel = (state, formData) => ({
  formData,
  fetching: true,
});

const createOpenChannelSuccessed = (state, channelData) => ({
  channelData,
  fetching: false,
});

const createOpenChannelFailed = (state, error) => ({
  error,
  fetching: false,
});

const openChannelsList = () => ({
  fetching: true,
});

const openChannelsListSuccessed = (state, channelsList) => ({
  channelsList,
  fetching: false,
});

const openChannelsListFailed = (state, error) => ({
  error,
  fetching: false,
});


const handlers = {
  [TYPES.CREATE_OPEN_CHANNEL]: createOpenChannel,
  [TYPES.CREATE_OPEN_CHANNEL_SUCCESSED]: createOpenChannelSuccessed,
  [TYPES.CREATE_OPEN_CHANNEL_FAILED]: createOpenChannelFailed,
  [TYPES.OPEN_CHANNELS_LIST]: openChannelsList,
  [TYPES.OPEN_CHANNELS_LIST_SUCCESSED]: openChannelsListSuccessed,
  [TYPES.OPEN_CHANNELS_LIST_FAILED]: openChannelsListFailed
};

export const chatReducer = createReducer(initState, handlers);
