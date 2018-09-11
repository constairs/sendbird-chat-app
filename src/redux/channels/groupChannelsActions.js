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
