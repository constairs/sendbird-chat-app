import { createReducer } from '../../utils/reducerUtils';
import { ENTER_CHANNEL_SUCCESSED } from '../openChannels/types';
import * as TYPES from './types';

const initState = {
  messFetching: false,
  sendingMessage: false,
  error: '',
  messages: [],

};

const sendMessage = state => ({
  ...state,
  sendingMessage: true,
});
const sendMessageSuccessed = (state, updMessages) => ({
  ...state,
  messages: updMessages,
  sendingMessage: false
});
const sendMessageFailed = (state, error) => ({
  ...state,
  error,
  sendingMessage: false
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
  error
});

const editMessage = state => ({
  ...state,
});
const editMessageSuccessed = (state, editRes) => ({
  ...state,
  messages: state.messages.map((cur, i) => {
    if (cur.messageId === editRes.messageId) {
      return editRes;
    }
    return cur;
  }),
});
const editMessageFailed = (state, error) => ({
  ...state,
  error
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
  messages: [...state.messages, message]
});

const messageUpdated = (state, message) => ({
  ...state,
  messages: state.messages.map((cur, i) => {
    if (cur.messageId === message.messageId) {
      return message;
    }
    return cur;
  }),
});

const messageDeleted = (state, messageId) => ({
  ...state,
  messageDeleted: messageId,
  messages: [...state.messages.filter(cur => `${cur.messageId}` !== messageId)],
});

const handlers = {

  [TYPES.SEND_MESSAGE]: sendMessage,
  [TYPES.SEND_MESSAGE_SUCCESSED]: sendMessageSuccessed,
  [TYPES.SEND_MESSAGE_FAILED]: sendMessageFailed,

  [TYPES.DELETE_MESSAGE]: deleteMessage,
  [TYPES.DELETE_MESSAGE_SUCCESSED]: deleteMessageSuccessed,
  [TYPES.DELETE_MESSAGE_FAILED]: deleteMessageFailed,

  [TYPES.EDIT_MESSAGE]: editMessage,
  [TYPES.EDIT_MESSAGE_SUCCESSED]: editMessageSuccessed,
  [TYPES.EDIT_MESSAGE_FAILED]: editMessageFailed,

  [ENTER_CHANNEL_SUCCESSED]: getMessages,
  [TYPES.GET_MESSAGES_SUCCESSED]: getMessagesSuccessed,
  [TYPES.GET_MESSAGES_FAILED]: getMessagesFailed,

  [TYPES.MESSAGE_RECEIVED]: messageReceived,
  [TYPES.MESSAGE_UPDATED]: messageUpdated,
  [TYPES.MESSAGE_DELETED]: messageDeleted,

};

export const chatReducer = createReducer(initState, handlers);
