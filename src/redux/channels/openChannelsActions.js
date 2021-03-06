import * as TYPES from './types';

export const createOpenChannel = formData => ({
  type: TYPES.CREATE_OPEN_CHANNEL,
  payload: formData,
});
export const createOpenChannelSuccessed = channelData => ({
  type: TYPES.CREATE_OPEN_CHANNEL_SUCCESSED,
  payload: channelData,
});
export const createOpenChannelFailed = error => ({
  type: TYPES.CREATE_OPEN_CHANNEL_FAILED,
  payload: error,
});

export const enterChannel = channelUrl => ({
  type: TYPES.ENTER_CHANNEL,
  payload: channelUrl,
});
export const enterChannelSuccessed = channel => ({
  type: TYPES.ENTER_CHANNEL_SUCCESSED,
  payload: channel,
});
export const enterChannelFailed = error => ({
  type: TYPES.ENTER_CHANNEL_FAILED,
  payload: error,
});

export const getParticipants = data => ({
  type: TYPES.GET_PARTICIPANTS,
  payload: data,
});
export const getParticipantsSuccessed = data => ({
  type: TYPES.GET_PARTICIPANTS_SUCCESSED,
  payload: data,
});
export const getParticipantsFailed = error => ({
  type: TYPES.GET_PARTICIPANTS_FAILED,
  payload: error,
});

export const userEntered = (channel, user) => ({
  type: TYPES.NEW_USER_ENTERED,
  payload: { channel, user },
});

export const userExited = (channel, user) => ({
  type: TYPES.USER_EXITED,
  payload: { channel, user }
});

