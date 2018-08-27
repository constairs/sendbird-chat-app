import {
  CREATE_GROUP_CHANNEL,
  CREATE_GROUP_CHANNEL_SUCCESSED,
  CREATE_GROUP_CHANNEL_FAILED,
} from './types';

export const createGroupChannel = formData => ({
  type: CREATE_GROUP_CHANNEL,
  payload: formData,
});
export const createGroupChannelSuccessed = channelData => ({
  type: CREATE_GROUP_CHANNEL_SUCCESSED,
  payload: channelData,
});
export const createGroupChannelFailed = error => ({
  type: CREATE_GROUP_CHANNEL_FAILED,
  payload: error,
});
