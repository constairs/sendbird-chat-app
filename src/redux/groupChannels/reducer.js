import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  fetching: false,
  participants: [],
  channelsList: [],
  messages: [],
  typedMessage: '',
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

const handlers = {
  [TYPES.CREATE_GROUP_CHANNEL]: createGroupChannel,
  [TYPES.CREATE_GROUP_CHANNEL_SUCCESSED]: createGroupChannelSuccessed,
  [TYPES.CREATE_GROUP_CHANNEL_FAILED]: createGroupChannelFailed,
};

export const openChannelsReducer = createReducer(initState, handlers);
