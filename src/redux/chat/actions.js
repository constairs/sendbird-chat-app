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
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESSED,
  SEND_MESSAGE_FAILED,
  GET_MESSAGES,
  GET_MESSAGES_SUCCESSED,
  GET_MESSAGES_FAILED,
  LEAVE_CHANNEL,
  LEAVE_CHANNEL_SUCCESSED,
  LEAVE_CHANNEL_FAILED,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESSED,
  DELETE_MESSAGE_FAILED,
  CREATE_CHAT_HANDLER,
  CREATE_CHAT_HANDLER_SUCCESSED,
  CREATE_CHAT_HANDLER_FAILED,
  MESSAGE_RECEIVED,
  MESSAGE_DELETED,
  GET_PARTICIPANTS,
  GHANNEL_UPDATED,
  NEW_USER_ENTERED
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

export const getParticipants = data =>
  ({ type: GET_PARTICIPANTS, payload: data });

export const leaveChannel = channelUrl =>
  ({ type: LEAVE_CHANNEL, payload: channelUrl });
export const leaveChannelSuccessed = response =>
  ({ type: LEAVE_CHANNEL_SUCCESSED, payload: response });
export const leaveChannelFailed = error =>
  ({ type: LEAVE_CHANNEL_FAILED, payload: error });

export const sendMessage = messageData =>
  ({ type: SEND_MESSAGE, messageData });
export const sendMessageSuccessed = updMessages =>
  ({ type: SEND_MESSAGE_SUCCESSED, payload: updMessages });
export const sendMessageFailed = error =>
  ({ type: SEND_MESSAGE_FAILED, payload: error });

export const deleteMessage = messageData =>
  ({ type: DELETE_MESSAGE, messageData });
export const deleteMessageSuccessed = delRes =>
  ({ type: DELETE_MESSAGE_SUCCESSED, payload: delRes });
export const deleteMessageFailed = error =>
  ({ type: DELETE_MESSAGE_FAILED, payload: error });

export const getMessages = channelUrl =>
  ({ type: GET_MESSAGES, channelUrl });
export const getMessagesSuccessed = messages =>
  ({ type: GET_MESSAGES_SUCCESSED, payload: messages });
export const getMessagesFailed = error =>
  ({ type: GET_MESSAGES_FAILED, payload: error });


export const createChatHandler = channelUrl =>
  ({ type: CREATE_CHAT_HANDLER, channelUrl });
export const createChatHandlerSuccessed = () =>
  ({ type: CREATE_CHAT_HANDLER_SUCCESSED });
export const createChatHandlerFailed = error =>
  ({ type: CREATE_CHAT_HANDLER_FAILED, error });

export const messageReceived = (channel, message) =>
  ({ type: MESSAGE_RECEIVED, payload: message });

export const messageDeleted = (channel, messageId) =>
  ({ type: MESSAGE_DELETED, payload: messageId });

export const messageUpdated = () =>
  ({});

export const channelUpdated = channel =>
  ({ type: GHANNEL_UPDATED, payload: channel });

export const userEntered = data =>
  ({ type: NEW_USER_ENTERED, payload: data });
