import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  messFetching: false,
  sendingMessage: false,
  error: '',
  messages: [],
  userTyping: '',
  typedMessage: '',
};

const sendMessage = state => ({
  ...state,
  sendingMessage: true,
});
const sendMessageSuccessed = (state, updMessages) => ({
  ...state,
  messages: updMessages,
  sendingMessage: false,
});
const sendMessageFailed = (state, error) => ({
  ...state,
  error,
  sendingMessage: false,
});

const sendFileMessage = (state, fileMessageData) => ({
  ...state,
  fileToSend: fileMessageData,
});

const sendFileMessageSuccessed = (state, updMessages) => ({
  ...state,
  updMessages,
});

const sendFileMessageFailed = (state, error) => ({
  ...state,
  error,
});

const deleteMessage = state => ({
  ...state,
});
const deleteMessageSuccessed = (state, delRes) => ({
  ...state,
  messages: state.messages.filter(cur => cur.messageId !== delRes.messageId),
});
const deleteMessageFailed = (state, error) => ({
  ...state,
  error,
});

const editMessage = state => ({
  ...state,
});
const editMessageSuccessed = (state, editRes) => ({
  ...state,
  messages: state.messages.map(
    cur => (cur.messageId === editRes.messageId ? editRes : cur)
  ),
});
const editMessageFailed = (state, error) => ({
  ...state,
  error,
});

const getMessages = state => ({
  ...state,
  messFetching: true,
});
const getMessagesSuccessed = (state, messages) => ({
  ...state,
  messages,
  messFetching: false,
});
const getMessagesFailed = (state, error) => ({
  ...state,
  error,
  messFetching: false,
});

const messageReceived = (state, message) => ({
  ...state,
  messages: [...state.messages, message],
});

const messageUpdated = (state, message) => ({
  ...state,
  messages: state.messages.map(
    cur => (cur.messageId === message.messageId ? message : cur)
  ),
});

const messageDeleted = (state, messageId) => ({
  ...state,
  messageDeleted: messageId,
  messages: [...state.messages.filter(cur => `${cur.messageId}` !== messageId)],
});

const onMessageTyping = (state, messageData) => ({
  ...state,
  typedMessage: messageData[2],
});

const messageTypingSet = (state, userTyping) => ({
  ...state,
  userTyping: userTyping.userTyping,
});

const messageTypingError = (state, error) => ({
  ...state,
  error,
});

const messageTypingEnd = state => ({
  ...state,
  userTyping: '',
});

const userTyping = (state, user) => ({
  ...state,
  ...user,
});

const handlers = {
  [TYPES.SEND_MESSAGE]: sendMessage,
  [TYPES.SEND_MESSAGE_SUCCESSED]: sendMessageSuccessed,
  [TYPES.SEND_MESSAGE_FAILED]: sendMessageFailed,

  [TYPES.SEND_FILE_MESSAGE]: sendFileMessage,
  [TYPES.SEND_FILE_MESSAGE_SUCCESSED]: sendFileMessageSuccessed,
  [TYPES.SEND_FILE_MESSAGE_FAILED]: sendFileMessageFailed,

  [TYPES.DELETE_MESSAGE]: deleteMessage,
  [TYPES.DELETE_MESSAGE_SUCCESSED]: deleteMessageSuccessed,
  [TYPES.DELETE_MESSAGE_FAILED]: deleteMessageFailed,

  [TYPES.EDIT_MESSAGE]: editMessage,
  [TYPES.EDIT_MESSAGE_SUCCESSED]: editMessageSuccessed,
  [TYPES.EDIT_MESSAGE_FAILED]: editMessageFailed,

  [TYPES.GET_MESSAGES]: getMessages,
  [TYPES.GET_MESSAGES_SUCCESSED]: getMessagesSuccessed,
  [TYPES.GET_MESSAGES_FAILED]: getMessagesFailed,

  [TYPES.MESSAGE_RECEIVED]: messageReceived,
  [TYPES.MESSAGE_UPDATED]: messageUpdated,
  [TYPES.MESSAGE_DELETED]: messageDeleted,

  [TYPES.ON_MESSAGE_TYPING]: onMessageTyping,
  [TYPES.MESSAGE_TYPING_SET]: messageTypingSet,
  [TYPES.MESSAGE_TYPING_ERROR]: messageTypingError,

  [TYPES.USER_TYPING]: userTyping,
  [TYPES.MESSAGE_TYPING_END]: messageTypingEnd,
};

export const chatReducer = createReducer(initState, handlers);
