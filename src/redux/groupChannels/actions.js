import * as TYPES from './types';

export const createGroupChannel = formData => ({
  type: TYPES.CREATE_GROUP_CHANNEL,
  payload: formData,
});
export const createGroupChannelSuccessed = channelData => ({
  type: TYPES.CREATE_GROUP_CHANNEL_SUCCESSED,
  payload: channelData,
});
export const createGroupChannelFailed = error => ({
  type: TYPES.CREATE_GROUP_CHANNEL_FAILED,
  payload: error,
});

export const groupChannelsList = () => ({ type: TYPES.GROUP_CHANNEL_LIST });
export const groupChannelsListSuccessed = groupList => ({
  type: TYPES.GROUP_CHANNELS_LIST_SUCCESSED,
  payload: groupList,
});
export const groupChannelsListFailed = error => ({
  type: TYPES.GROUP_CHANNELS_LIST_FAILED,
  payload: error,
});

export const getGroupChannel = channelUrl => ({
  type: TYPES.GET_GROUP_CHANNEL,
  payload: channelUrl,
});
export const getGroupChannelSuccessed = groupChannel => ({
  type: TYPES.GET_GROUP_CHANNEL_SUCCESSED,
  payload: groupChannel,
});
export const getGroupChannelFailed = error => ({
  type: TYPES.GET_GROUP_CHANNEL_FAILED,
  payload: error,
});

export const inviteUsers = formData => ({
  type: TYPES.INVITE_USERS,
  payload: formData,
});
export const inviteUsersSuccessed = inviteRes => ({
  type: TYPES.INVITE_USERS_SUCCESSED,
  payload: inviteRes,
});
export const inviteUsersFailed = error => ({
  type: TYPES.INVITE_USERS_FAILED,
  payload: error,
});

export const leaveGroup = channelUrl => ({
  type: TYPES.LEAVE_GROUP,
  payload: channelUrl,
});
export const leaveGroupSuccessed = leaveRes => ({
  type: TYPES.LEAVE_GROUP_SUCCESSED,
  payload: leaveRes,
});
export const leaveGroupFailed = error => ({
  type: TYPES.LEAVE_GROUP_FAILED,
  payload: error,
});

export const groupUpdated = channel => ({
  type: TYPES.GROUP_UPDATED,
  payload: channel,
});

export const onUserJoined = userData => ({
  type: TYPES.ON_USER_JOINED,
  payload: userData,
});

export const onUserLeft = userData => ({
  type: TYPES.ON_USER_LEFT,
  payload: userData,
});

export const notificationOff = () => ({
  type: TYPES.NOTIFICATION_OFF,
});

export const refreshedMembers = response => ({
  type: TYPES.REFRESHED_MEMBERS,
  payload: response,
});

export const refreshFailed = error => ({
  type: TYPES.REFRESH_FAILED,
  payload: error,
});

export const onUserTyping = (channel, typingMembers) => ({
  type: TYPES.ON_USER_TYPING,
  payload: { channel, typingMembers },
});

export const onReadReceiptUpdated = channel => ({
  type: TYPES.ON_READ_RECEIPT_UPDATED,
  payload: channel,
});
