import * as TYPES from './types';

export const sendMessage = messageData => ({
  type: TYPES.SEND_MESSAGE,
  messageData
});
export const sendMessageSuccessed = (channel, message) => ({
  type: TYPES.SEND_MESSAGE_SUCCESSED,
  payload: { channel, message },
});
export const sendMessageFailed = error => ({
  type: TYPES.SEND_MESSAGE_FAILED,
  payload: error,
});

export const cancelUploadingMessage = messageData => ({
  type: TYPES.CANCEL_UPLOADING,
  payload: messageData,
});
export const cancelUploadingSuccessed = messageId => ({
  type: TYPES.CANCEL_UPLOADING_SUCESSED,
  payload: messageId,
});
export const cancelUploadingFailed = error => ({
  type: TYPES.CANCEL_UPLOADING_FAILED,
  payload: error,
});

export const sendFileMessage = fileMessageData => ({
  type: TYPES.SEND_FILE_MESSAGE,
  fileMessageData,
});
export const sendFileMessageSuccessed = (channel, message) => ({
  type: TYPES.SEND_FILE_MESSAGE_SUCCESSED,
  payload: { channel, message },
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

export const messageUpdated = (channel, message) => ({
  type: TYPES.MESSAGE_UPDATED,
  payload: { channel, message },
});

export const messageDeleted = messageId => ({
  type: TYPES.MESSAGE_DELETED,
  payload: messageId,
});

export const messageTyping = messageData => ({
  type: TYPES.MESSAGE_TYPING,
  payload: messageData,
});

export const messageTypingSet = userTyping => ({
  type: TYPES.MESSAGE_TYPING_SET,
  payload: userTyping,
});

export const messageTypingEnd = () => ({
  type: TYPES.MESSAGE_TYPING_END,
});

export const messageTypingError = error => ({
  type: TYPES.MESSAGE_TYPING_ERROR,
  payload: error,
});

export const cleanChat = () => ({
  type: TYPES.CLEAN_CHAT,
});

export const userTypingStart = channel => ({
  type: TYPES.USER_TYPING_START,
  payload: channel
});

export const userTypingEnd = channel => ({
  type: TYPES.USER_TYPING_END,
  payload: channel
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

export const readReceipt = (receipt, channelUrl) => ({
  type: TYPES.READ_RECEIPT,
  payload: { receipt, channelUrl },
});

export const markAsRead = () => ({
  type: TYPES.MARK_AS_READ,
});

export const preloadFileMessage = progress => ({
  type: TYPES.PRELOAD_FILE_MESSAGE,
  payload: progress,
});

export const replaceMessage = replacer => ({
  type: TYPES.REPLACE_MESSAGE,
  payload: replacer,
});
