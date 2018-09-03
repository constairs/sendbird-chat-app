import * as TYPES from './types';

export const sendMessage = messageData => ({
  type: TYPES.SEND_MESSAGE,
  messageData,
});
export const sendMessageSuccessed = updMessages => ({
  type: TYPES.SEND_MESSAGE_SUCCESSED,
  payload: updMessages,
});
export const sendMessageFailed = error => ({
  type: TYPES.SEND_MESSAGE_FAILED,
  payload: error,
});

export const sendFileMessage = fileMessageData => ({
  type: TYPES.SEND_FILE_MESSAGE,
  fileMessageData,
});
export const sendFileMessageSuccessed = updMessages => ({
  type: TYPES.SEND_FILE_MESSAGE_SUCCESSED,
  payload: updMessages,
});
export const sendFileMessageFailed = error => ({
  type: TYPES.SEND_FILE_MESSAGE_FAILED,
  payload: error,
});

export const deleteMessage = messageData => ({
  type: TYPES.DELETE_MESSAGE,
  messageData,
});
export const deleteMessageSuccessed = delRes => ({
  type: TYPES.DELETE_MESSAGE_SUCCESSED,
  payload: delRes,
});
export const deleteMessageFailed = error => ({
  type: TYPES.DELETE_MESSAGE_FAILED,
  payload: error,
});

export const editMessage = messageData => ({
  type: TYPES.EDIT_MESSAGE,
  messageData,
});
export const editMessageSuccessed = editRes => ({
  type: TYPES.EDIT_MESSAGE_SUCCESSED,
  payload: editRes,
});
export const editMessageFailed = error => ({
  type: TYPES.EDIT_MESSAGE_FAILED,
  payload: error,
});

export const editFileMessage = updFileMessage => ({
  type: TYPES.EDIT_FILE_MESSAGE,
  payload: updFileMessage,
});
export const editFileMessageSuccessed = editRes => ({
  type: TYPES.EDIT_FILE_MESSAGE_SUCCESSED,
  payload: editRes,
});
export const editFileMessageFailed = error => ({
  type: TYPES.EDIT_FILE_MESSAGE_FAILED,
  payload: error,
});

export const getMessagesRequest = channelUrl => ({
  type: TYPES.GET_MESSAGES,
  channelUrl,
});
export const getMessagesSuccessed = messages => ({
  type: TYPES.GET_MESSAGES_SUCCESSED,
  payload: messages,
});
export const getMessagesFailed = error => ({
  type: TYPES.GET_MESSAGES_FAILED,
  payload: error,
});

export const messageReceived = (channel, message) => ({
  type: TYPES.MESSAGE_RECEIVED,
  payload: { channel, message },
});

export const messageDeleted = (channel, messageId) => ({
  type: TYPES.MESSAGE_DELETED,
  payload: messageId,
});

export const messageUpdated = (channel, message) => ({
  type: TYPES.MESSAGE_UPDATED,
  payload: { channel, message },
});

export const onMessageTyping = messageData => ({
  type: TYPES.ON_MESSAGE_TYPING,
  payload: messageData,
});

export const messageTypingSet = userTyping => ({
  type: TYPES.MESSAGE_TYPING_SET,
  payload: userTyping,
});

export const messageTypingError = error => ({
  type: TYPES.MESSAGE_TYPING_ERROR,
  payload: error,
});

export const userTyping = user => ({
  type: TYPES.USER_TYPING,
  payload: user,
});

export const messageTypingEnd = () => ({
  type: TYPES.MESSAGE_TYPING_END,
});

export const cleanChat = () => ({
  type: TYPES.CLEAN_CHAT,
});
