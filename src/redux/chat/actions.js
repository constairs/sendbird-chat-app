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
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESSED,
  SEND_MESSAGE_FAILED,
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

export const openChannelsList = () => {
  return { type: OPEN_CHANNELS_LIST };
};

export const openChannelsListSuccessed = (channelsList) => {
  return { type: OPEN_CHANNELS_LIST_SUCCESSED, payload: channelsList };
};

export const openChannelsListFailed = (error) => {
  return { type: OPEN_CHANNELS_LIST_FAILED, payload: error };
};

export const enterChannel = (channelUrl) => {
  return { type: ENTER_CHANNEL, payload: channelUrl };
};

export const enterChannelSuccessed = (channel) => {
  return { type: ENTER_CHANNEL_SUCCESSED, payload: channel };
};

export const enterChannelFailed = (error) => {
  return { type: ENTER_CHANNEL_FAILED, payload: error };
};

export const sendMessage = (messageData) => {
  return { type: SEND_MESSAGE, messageData };
};

export const sendMessageSuccessed = (sendRes) => {
  return { type: SEND_MESSAGE_SUCCESSED, payload: sendRes };
};

export const sendMessageFailed = (error) => {
  return { type: SEND_MESSAGE_FAILED, payload: error };
};