import * as TYPES from './types';

export const getChannelList = () => ({ type: TYPES.GET_CHANNEL_LIST });
export const getChannelListSuccessed = channelsList => ({
  type: TYPES.GET_CHANNEL_LIST_SUCCESSED,
  payload: channelsList,
});
export const getChannelListFailed = error => ({
  type: TYPES.GET_CHANNEL_LIST_FAILED,
  payload: error,
});

export const getSelectedChannel = channelInfo => ({
  type: TYPES.GET_SELECTED_CHANNEL,
  payload: channelInfo,
});
export const getSelectedChannelSuccessed = groupChannel => ({
  type: TYPES.GET_SELECTED_CHANNEL_SUCCESSED,
  payload: groupChannel,
});
export const getSelectedChannelFailed = error => ({
  type: TYPES.GET_SELECTED_CHANNEL_FAILED,
  payload: error,
});

export const leaveChannel = channelInfo => ({
  type: TYPES.LEAVE_CHANNEL,
  payload: channelInfo,
});
export const leaveChannelSuccessed = response => ({
  type: TYPES.LEAVE_CHANNEL_SUCCESSED,
  payload: response,
});
export const leaveChannelFailed = error => ({
  type: TYPES.LEAVE_CHANNEL_FAILED,
  payload: error,
});

export const channelUpdated = channel => ({
  type: TYPES.CHANNEL_UPDATED,
  payload: channel,
});
