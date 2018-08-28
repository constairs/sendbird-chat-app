import {
  CREATE_GROUP_CHANNEL,
  CREATE_GROUP_CHANNEL_SUCCESSED,
  CREATE_GROUP_CHANNEL_FAILED,
  GROUP_CHANNEL_LIST,
  GROUP_CHANNELS_LIST_SUCCESSED,
  GROUP_CHANNELS_LIST_FAILED,
  GET_GROUP_CHANNEL,
  GET_GROUP_CHANNEL_SUCCESSED,
  GET_GROUP_CHANNEL_FAILED,
  INVITE_USERS,
  INVITE_USERS_SUCCESSED,
  INVITE_USERS_FAILED,
  LEAVE_GROUP,
  LEAVE_GROUP_SUCCESSED,
  LEAVE_GROUP_FAILED,
  GROUP_UPDATED,
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

export const groupChannelsList = () => ({ type: GROUP_CHANNEL_LIST });
export const groupChannelsListSuccessed = groupList => ({
  type: GROUP_CHANNELS_LIST_SUCCESSED,
  payload: groupList,
});
export const groupChannelsListFailed = error => ({
  type: GROUP_CHANNELS_LIST_FAILED,
  payload: error,
});

export const getGroupChannel = channelUrl => ({
  type: GET_GROUP_CHANNEL,
  payload: channelUrl,
});
export const getGroupChannelSuccessed = groupChannel => ({
  type: GET_GROUP_CHANNEL_SUCCESSED,
  payload: groupChannel,
});
export const getGroupChannelFailed = error => ({
  type: GET_GROUP_CHANNEL_FAILED,
  payload: error,
});

export const inviteUsers = formData => ({
  type: INVITE_USERS,
  payload: formData,
});
export const inviteUsersSuccessed = inviteRes => ({
  type: INVITE_USERS_SUCCESSED,
  payload: inviteRes,
});
export const inviteUsersFailed = error => ({
  type: INVITE_USERS_FAILED,
  payload: error,
});

export const leaveGroup = channelUrl => ({
  type: LEAVE_GROUP,
  payload: channelUrl,
});
export const leaveGroupSuccessed = leaveRes => ({
  type: LEAVE_GROUP_SUCCESSED,
  payload: leaveRes,
});
export const leaveGroupFailed = error => ({
  type: LEAVE_GROUP_FAILED,
  payload: error,
});

export const groupUpdated = channel => ({
  type: GROUP_UPDATED,
  payload: channel,
});
