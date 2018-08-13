import {
  CREATE_OPEN_CHANNEL,
  CREATE_OPEN_CHANNEL_SUCCESSED,
  CREATE_OPEN_CHANNEL_FAILED
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
