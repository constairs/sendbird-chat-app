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
  GET_MESSAGES,
  GET_MESSAGES_SUCCESSED,
  GET_MESSAGES_FAILED,
} from './types';

export const createOpenChannel = formData =>
  ({ type: CREATE_OPEN_CHANNEL, payload: formData });

export const createOpenChannelSuccessed = channelData =>
  ({ type: CREATE_OPEN_CHANNEL_SUCCESSED, payload: channelData });

export const createOpenChannelFailed = error =>
  ({ type: CREATE_OPEN_CHANNEL_FAILED, payload: error });

export const openChannelsList = () => ({ type: OPEN_CHANNELS_LIST });

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

export const sendMessage = messageData =>
  ({ type: SEND_MESSAGE, messageData });

export const sendMessageSuccessed = updMessages =>
  ({ type: SEND_MESSAGE_SUCCESSED, payload: updMessages });

export const sendMessageFailed = error =>
  ({ type: SEND_MESSAGE_FAILED, payload: error });

export const getMessages = channelUrl =>
  ({ type: GET_MESSAGES, channelUrl });

export const getMessagesSuccessed = messages =>
  ({ type: GET_MESSAGES_SUCCESSED, payload: messages });

export const getMessagesFailed = error =>
  ({ type: GET_MESSAGES_FAILED, payload: error });
