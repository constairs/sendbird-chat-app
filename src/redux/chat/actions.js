import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESSED,
  SEND_MESSAGE_FAILED,
  SEND_FILE_MESSAGE,
  SEND_FILE_MESSAGE_SUCCESSED,
  SEND_FILE_MESSAGE_FAILED,
  GET_MESSAGES,
  GET_MESSAGES_SUCCESSED,
  GET_MESSAGES_FAILED,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESSED,
  DELETE_MESSAGE_FAILED,
  MESSAGE_RECEIVED,
  MESSAGE_UPDATED,
  MESSAGE_DELETED,
  EDIT_MESSAGE,
  EDIT_MESSAGE_SUCCESSED,
  EDIT_MESSAGE_FAILED,
  ON_MESSAGE_TYPING,
  MESSAGE_TYPING_SET,
  MESSAGE_TYPING_ERROR,
  USER_TYPING,
  MESSAGE_TYPING_END,
  CLEAN_CHAT,
} from './types';

export const sendMessage = messageData => ({ type: SEND_MESSAGE, messageData });
export const sendMessageSuccessed = updMessages => ({
  type: SEND_MESSAGE_SUCCESSED,
  payload: updMessages,
});
export const sendMessageFailed = error => ({
  type: SEND_MESSAGE_FAILED,
  payload: error,
});

export const sendFileMessage = fileMessageData => ({
  type: SEND_FILE_MESSAGE,
  fileMessageData,
});
export const sendFileMessageSuccessed = updMessages => ({
  type: SEND_FILE_MESSAGE_SUCCESSED,
  payload: updMessages,
});
export const sendFileMessageFailed = error => ({
  type: SEND_FILE_MESSAGE_FAILED,
  payload: error,
});

export const deleteMessage = messageData => ({
  type: DELETE_MESSAGE,
  messageData,
});
export const deleteMessageSuccessed = delRes => ({
  type: DELETE_MESSAGE_SUCCESSED,
  payload: delRes,
});
export const deleteMessageFailed = error => ({
  type: DELETE_MESSAGE_FAILED,
  payload: error,
});

export const editMessage = messageData => ({ type: EDIT_MESSAGE, messageData });
export const editMessageSuccessed = editRes => ({
  type: EDIT_MESSAGE_SUCCESSED,
  payload: editRes,
});
export const editMessageFailed = error => ({
  type: EDIT_MESSAGE_FAILED,
  payload: error,
});

export const getMessagesRequest = channelUrl => ({
  type: GET_MESSAGES,
  channelUrl,
});
export const getMessagesSuccessed = messages => ({
  type: GET_MESSAGES_SUCCESSED,
  payload: messages,
});
export const getMessagesFailed = error => ({
  type: GET_MESSAGES_FAILED,
  payload: error,
});

export const messageReceived = (channel, message) => ({
  type: MESSAGE_RECEIVED,
  payload: message,
});

export const messageDeleted = (channel, messageId) => ({
  type: MESSAGE_DELETED,
  payload: messageId,
});

export const messageUpdated = (channel, message) => ({
  type: MESSAGE_UPDATED,
  payload: message,
});

export const onMessageTyping = messageData => ({
  type: ON_MESSAGE_TYPING,
  payload: messageData,
});

export const messageTypingSet = userTyping => ({
  type: MESSAGE_TYPING_SET,
  payload: userTyping,
});

export const messageTypingError = error => ({
  type: MESSAGE_TYPING_ERROR,
  payload: error,
});

export const userTyping = user => ({
  type: USER_TYPING,
  payload: user,
});

export const messageTypingEnd = () => ({
  type: MESSAGE_TYPING_END,
});

export const cleanChat = () => ({
  type: CLEAN_CHAT,
});
