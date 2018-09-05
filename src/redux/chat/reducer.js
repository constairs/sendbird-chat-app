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
};

const sendMessage = state => ({
  ...state,
  sendingMessage: true,
});
const sendMessageSuccessed = (state, sendRes) => ({
  ...state,
  messages: [...state.messages, sendRes.messages],
  sendingMessage: false,
});
const sendMessageFailed = (state, error) => ({
  ...state,
  error,
  sendingMessage: false,
});

const sendFileMessage = (state, sendRes) => ({
  ...state,
  fileToSend: sendRes.fileMessage,
});

const sendFileMessageSuccessed = state => ({
  ...state,
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

const editFileMessage = state => ({
  ...state,
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
      ? [...state.messages, messageData.message]
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
});

const readReceipt = (state, receipt) => ({
  ...state,
  receipt,
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

  [TYPES.CLEAN_CHAT]: cleanChat,

  [ON_USER_TYPING]: onUserTyping,

  [GET_GROUP_CHANNEL_SUCCESSED]: changeChannelGroup,
  [ENTER_CHANNEL_SUCCESSED]: changeOpenChannel,

  [TYPES.EDIT_FILE_MESSAGE]: editFileMessage,
  [TYPES.EDIT_FILE_MESSAGE_SUCCESSED]: editFileMessageSuccessed,
  [TYPES.EDIT_FILE_MESSAGE_FAILED]: editFileMessageFailed,
  [TYPES.READ_RECEIPT]: readReceipt,
};

export const chatReducer = createReducer(initState, handlers);
