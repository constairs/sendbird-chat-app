import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';
import {
  ON_USER_TYPING,
  GET_GROUP_CHANNEL_SUCCESSED,
} from '../groupChannels/types';
import { ENTER_CHANNEL_SUCCESSED } from '../openChannels/types';

const initState = {
  messFetching: false,
  sendingMessage: false,
  error: '',
  messages: [],
  userTyping: '',
  typedMessage: '',
  uploadProgress: { reqId: '', progress: 0 },
};

const sendMessageSuccessed = (state, sendRes) => ({
  ...state,
  messages: [...state.messages, sendRes.messages].slice(1),
  sendingMessage: false,
});
const sendMessageFailed = (state, error) => ({
  ...state,
  error,
  sendingMessage: false,
});

const sendFileMessageSuccessed = (state, sendRes) => ({
  ...state,
  messages: [...state.messages, sendRes.fileMessage],
});

const sendFileMessageFailed = (state, error) => ({
  ...state,
  error,
});

const deleteMessageFailed = (state, error) => ({
  ...state,
  error
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

const editFileMessageSuccessed = (state, editRes) => ({
  ...state,
  messages: state.messages.map(
    message => (message.messageId === editRes.messageId ? editRes : message)
  ),
});

const editFileMessageFailed = (state, error) => ({
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

const messageReceived = (state, messageData) => ({
  ...state,
  messages:
    state.currentChannel.url === messageData.channel.url
      ? [...state.messages.slice(1), messageData.message]
      : state.messages,
});

const messageUpdated = (state, updatedData) => ({
  ...state,
  messages: state.messages.map(
    cur =>
      (cur.messageId === updatedData.message.messageId
        ? updatedData.message
        : cur)
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

const cleanChat = state => ({
  ...state,
  messages: [],
});

const onUserTyping = (state, typingData) => ({
  ...state,
  membersTyping:
    state.currentChannel && typingData.channel.url === state.currentChannel.url
      ? typingData.typingMembers
      : [],
});

const changeChannelGroup = (state, groupChannelData) => ({
  ...state,
  currentChannel: groupChannelData.groupChannel,
  receipt: groupChannelData.receipt,
});

const changeOpenChannel = (state, openChannel) => ({
  ...state,
  currentChannel: openChannel,
  receipt: 0,
});

const readReceipt = (state, receiptData) => ({
  ...state,
  receipt:
    state.currentChannel && receiptData.channelUrl === state.currentChannel.url
      ? receiptData.receipt
      : state.receipt,
});

const preloadFileMessage = (state, progress) => ({
  ...state,
  uploadProgress: progress,
});

const replaceMessage = (state, replacer) => ({
  ...state,
  messages: state.messages.map(
    message =>
      (message.messageId === replacer.messageId ? replacer.message : message)
  ),
  uploadProgress: { reqId: '', progress: 0 },
});

const cancelUploadingSuccessed = (state, messageId) => ({
  ...state,
  messages: state.messages.filter(message => message.messageId !== messageId),
});

const cancelUploadingFailed = (state, error) => ({
  ...state,
  error,
});

const handlers = {
  [TYPES.SEND_MESSAGE_SUCCESSED]: sendMessageSuccessed,
  [TYPES.SEND_MESSAGE_FAILED]: sendMessageFailed,

  [TYPES.SEND_FILE_MESSAGE_SUCCESSED]: sendFileMessageSuccessed,
  [TYPES.SEND_FILE_MESSAGE_FAILED]: sendFileMessageFailed,

  [TYPES.DELETE_MESSAGE_FAILED]: deleteMessageFailed,

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

  [TYPES.CLEAN_CHAT]: cleanChat,

  [ON_USER_TYPING]: onUserTyping,

  [GET_GROUP_CHANNEL_SUCCESSED]: changeChannelGroup,
  [ENTER_CHANNEL_SUCCESSED]: changeOpenChannel,

  [TYPES.EDIT_FILE_MESSAGE_SUCCESSED]: editFileMessageSuccessed,
  [TYPES.EDIT_FILE_MESSAGE_FAILED]: editFileMessageFailed,
  [TYPES.READ_RECEIPT]: readReceipt,
  [TYPES.PRELOAD_FILE_MESSAGE]: preloadFileMessage,

  [TYPES.REPLACE_MESSAGE]: replaceMessage,
  [TYPES.CANCEL_UPLOADING_SUCESSED]: cancelUploadingSuccessed,
  [TYPES.CANCEL_UPLOADING_FAILED]: cancelUploadingFailed,
};

export const chatReducer = createReducer(initState, handlers);
