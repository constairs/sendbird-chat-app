import {
  CREATE_OPEN_CHANNEL,
  CREATE_OPEN_CHANNEL_SUCCESSED,
  CREATE_OPEN_CHANNEL_FAILED,
  UPDATE_CHANNEL,
  UPDATE_CHANNEL_SUCCESSED,
  UPDATE_CHANNEL_FAILED,
  OPEN_CHANNELS_LIST,
  OPEN_CHANNELS_LIST_SUCCESSED,
  OPEN_CHANNELS_LIST_FAILED,
  ENTER_CHANNEL,
  ENTER_CHANNEL_SUCCESSED,
  ENTER_CHANNEL_FAILED,
  LEAVE_CHANNEL,
  LEAVE_CHANNEL_SUCCESSED,
  LEAVE_CHANNEL_FAILED,
} from './types';


export const createOpenChannel = formData =>
  ({ type: CREATE_OPEN_CHANNEL, payload: formData });
export const createOpenChannelSuccessed = channelData =>
  ({ type: CREATE_OPEN_CHANNEL_SUCCESSED, payload: channelData });
export const createOpenChannelFailed = error =>
  ({ type: CREATE_OPEN_CHANNEL_FAILED, payload: error });

export const updateChannel = formData =>
  ({ type: UPDATE_CHANNEL, payload: formData });
export const updateChannelSuccessed = updatedData =>
  ({ type: UPDATE_CHANNEL_SUCCESSED, payload: updatedData });
export const updateChannelFailed = error =>
  ({ type: UPDATE_CHANNEL_FAILED, payload: error });

export const openChannelsList = () =>
  ({ type: OPEN_CHANNELS_LIST });
export const openChannelsListSuccessed = channelsList =>
  ({ type: OPEN_CHANNELS_LIST_SUCCESSED, payload: channelsList });
export const openChannelsListFailed = error =>
  ({ type: OPEN_CHANNELS_LIST_FAILED, payload: error });

export const enterChannel = channelUrl =>
  ({ type: ENTER_CHANNEL, payload: channelUrl });
export const enterChannelSuccessed = channel =>
  ({ type: ENTER_CHANNEL_SUCCESSED, payload: channel });
export const enterChannelFailed = error =>
  ({ type: ENTER_CHANNEL_FAILED, payload: error });

export const leaveChannel = channelUrl =>
  ({ type: LEAVE_CHANNEL, payload: channelUrl });
export const leaveChannelSuccessed = response =>
  ({ type: LEAVE_CHANNEL_SUCCESSED, payload: response });
export const leaveChannelFailed = error =>
  ({ type: LEAVE_CHANNEL_FAILED, payload: error });