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

export const userEntered = data => ({
  type: TYPES.NEW_USER_ENTERED,
  payload: data,
});

export const userExited = data => ({
  type: TYPES.USER_EXITED,
  payload: data
});

export const updateParticipantsStatus = () => ({
  type: TYPES.UPDATE_PARTICIPANTS_STATUS,
});

export const getRecentlyMessages = reqParams => ({
  type: TYPES.GET_RECENTLY_MESSAGES,
  payload: reqParams,
});
export const getRecentlyMessagesSuccessed = messages => ({
  type: TYPES.GET_RECENTLY_MESSAGES_SUCCESSED,
  payload: messages,
});
export const getRecentlyMessagesFailed = error => ({
  type: TYPES.GET_RECENTLY_MESSAGES_FAILED,
  payload: error,
});
