import {
  CREATE_OPEN_CHANNEL,
  CREATE_OPEN_CHANNEL_SUCCESSED,
  CREATE_OPEN_CHANNEL_FAILED,
  OPEN_CHANNELS_LIST,
  OPEN_CHANNELS_LIST_SUCCESSED,
  OPEN_CHANNELS_LIST_FAILED
} from './types';

export const createOpenChannel = (formData) => {
  return { type: CREATE_OPEN_CHANNEL, payload: formData };
};

export const createOpenChannelSuccessed = (channelData) => {
  return { type: CREATE_OPEN_CHANNEL_SUCCESSED, payload: channelData };
};

export const createOpenChannelFailed = (error) => {
  return { type: CREATE_OPEN_CHANNEL_FAILED, payload: error };
};

export const openChannelsList = () => {
  return { type: OPEN_CHANNELS_LIST };
};

export const openChannelsListSuccessed = (channelsList) => {
  return { type: OPEN_CHANNELS_LIST_SUCCESSED, payload: channelsList };
};

export const openChannelsListFailed = (error) => {
  return { type: OPEN_CHANNELS_LIST_FAILED, payload: error };
};
