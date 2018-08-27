import {
  CREATE_OPEN_CHANNEL,
  CREATE_OPEN_CHANNEL_SUCCESSED,
  CREATE_OPEN_CHANNEL_FAILED,
  OPEN_CHANNELS_LIST,
  OPEN_CHANNELS_LIST_SUCCESSED,
  OPEN_CHANNELS_LIST_FAILED,
  ENTER_CHANNEL,
  ENTER_CHANNEL_SUCCESSED,
  ENTER_CHANNEL_FAILED,
  LEAVE_CHANNEL,
  LEAVE_CHANNEL_SUCCESSED,
  LEAVE_CHANNEL_FAILED,
  GET_PARTICIPANTS,
  GET_PARTICIPANTS_SUCCESSED,
  GET_PARTICIPANTS_FAILED,
  GHANNEL_UPDATED,
  NEW_USER_ENTERED,
  USER_EXITED,
  UPDATE_PARTICIPANTS_STATUS,
  GET_RECENTLY_MESSAGES,
  GET_RECENTLY_MESSAGES_SUCCESSED,
  GET_RECENTLY_MESSAGES_FAILED,
  CREATE_GROUP_CHANNEL,
  CREATE_GROUP_CHANNEL_SUCCESSED,
  CREATE_GROUP_CHANNEL_FAILED,
} from './types';

export const createOpenChannel = formData => ({
  type: CREATE_OPEN_CHANNEL,
  payload: formData,
});
export const createOpenChannelSuccessed = channelData => ({
  type: CREATE_OPEN_CHANNEL_SUCCESSED,
  payload: channelData,
});
export const createOpenChannelFailed = error => ({
  type: CREATE_OPEN_CHANNEL_FAILED,
  payload: error,
});

export const openChannelsList = () => ({ type: OPEN_CHANNELS_LIST });
export const openChannelsListSuccessed = channelsList => ({
  type: OPEN_CHANNELS_LIST_SUCCESSED,
  payload: channelsList,
});
export const openChannelsListFailed = error => ({
  type: OPEN_CHANNELS_LIST_FAILED,
  payload: error,
});

export const enterChannel = channelUrl => ({
  type: ENTER_CHANNEL,
  payload: channelUrl,
});
export const enterChannelSuccessed = channel => ({
  type: ENTER_CHANNEL_SUCCESSED,
  payload: channel,
});
export const enterChannelFailed = error => ({
  type: ENTER_CHANNEL_FAILED,
  payload: error,
});

export const getParticipants = data => ({
  type: GET_PARTICIPANTS,
  payload: data,
});
export const getParticipantsSuccessed = data => ({
  type: GET_PARTICIPANTS_SUCCESSED,
  payload: data,
});
export const getParticipantsFailed = error => ({
  type: GET_PARTICIPANTS_FAILED,
  payload: error,
});

export const leaveChannel = channelUrl => ({
  type: LEAVE_CHANNEL,
  payload: channelUrl,
});
export const leaveChannelSuccessed = response => ({
  type: LEAVE_CHANNEL_SUCCESSED,
  payload: response,
});
export const leaveChannelFailed = error => ({
  type: LEAVE_CHANNEL_FAILED,
  payload: error,
});

export const channelUpdated = channel => ({
  type: GHANNEL_UPDATED,
  payload: channel,
});

export const userEntered = data => ({ type: NEW_USER_ENTERED, payload: data });

export const userExited = data => ({ type: USER_EXITED, payload: data });

export const updateParticipantsStatus = () => ({
  type: UPDATE_PARTICIPANTS_STATUS,
});

export const getRecentlyMessages = reqParams => ({
  type: GET_RECENTLY_MESSAGES,
  payload: reqParams,
});
export const getRecentlyMessagesSuccessed = messages => ({
  type: GET_RECENTLY_MESSAGES_SUCCESSED,
  payload: messages,
});
export const getRecentlyMessagesFailed = error => ({
  type: GET_RECENTLY_MESSAGES_FAILED,
  payload: error,
});

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
