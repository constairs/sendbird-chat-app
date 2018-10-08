import {
  assoc,
  append,
  pipe,
  lensProp,
  lensPath,
  set,
  view,
  over,
  when,
  map,
  filter,
  propSatisfies,
  equals,
  prop,
} from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';
import { ENTER_CHANNEL_SUCCESSED, GET_SELECTED_CHANNEL_SUCCESSED, ON_USERS_TYPING, CHANNEL_UPDATED } from '../channels/types';
import { getLeastReceiptStatusTime } from './helpers';
import { getChannelFunc } from '../channels/helpers';

export const initState = {
  messFetching: false,
  sendingMessage: false,
  error: '',
  messages: [],
  currentChannel: null,
  userTyping: '',
  uploadProgress: { reqId: '', progress: 0 },
  membersTyping: [],
  receipt: 0
};

const curCh = lensProp('currentChannel');
const curChUrl = lensPath(['currentChannel', 'url']);
const mgs = lensProp('messages');

const sendMessage = () => assoc('sendingMessage', true);

const sendMessageSuccessed = ({ message }) => pipe(
  over(mgs, append(message)),
  assoc('sendingMessage', false),
);

const sendMessageFailed = error => pipe(
  assoc('error', error),
  assoc('sendingMessage', false),
);

const sendFileMessageSuccessed = sendRes => over(mgs, append(sendRes.message));

const sendFileMessageFailed = error => assoc('error', error);

const deleteMessageFailed = error => assoc('error', error);

const editMessageSuccessed = editRes =>
  over(mgs, map(curMess => (curMess.messageId === editRes.messageId ? editRes : curMess)));

const editMessageFailed = error => assoc('error', error);

const editFileMessageSuccessed = editRes =>
  over(mgs, map(curMess => (curMess.messageId === editRes.messageId ? editRes : curMess)));

const editFileMessageFailed = error => assoc('error', error);

const getMessages = () => assoc('messFetching', true);

const getMessagesSuccessed = messages => pipe(
  assoc('messages', messages),
  assoc('messFetching', false),
);

const getMessagesFailed = error => pipe(
  assoc('error', error),
  assoc('messFetching', false)
);

const messageReceived = ({ channel, message }) => when(
  equals(prop('url', channel)), view(curChUrl),
  over(mgs, append(message))
);

const messageUpdated = updatedData => over(
  mgs,
  map(curMess =>
    (curMess.messageId === updatedData.message.messageId ? updatedData.message : curMess)
  )
);

const messageDeleted = messageId => over(mgs, filter(curMsg => `${curMsg.messageId}` !== messageId));

const messageTypingSet = userTyping => assoc('userTyping', userTyping.userTyping);

const messageTypingEnd = () => assoc('userTyping', '');

const messageTypingError = error => assoc('error', error);

const cleanChat = () => assoc('messages', []);

const onUsersTyping = ({ channel, typingMembers }) => when(
  equals(prop('url', channel)), view(curChUrl),
  assoc('membersTyping', typingMembers)
);

const changeChannelGroup = channel => pipe(
  set(curCh, channel),
  assoc('receipt', getLeastReceiptStatusTime(channel))
);

const changeOpenChannel = openChannel => pipe(
  set(curCh, openChannel),
  assoc('receipt', 0)
);

const readReceipt = ({ receipt, channelUrl }) => when(
  () => propSatisfies(equals('url', channelUrl), view(curChUrl)),
  assoc('receipt', receipt),
);

const channelUpdated = channel => when(
  equals(prop('url', channel)), view(curChUrl),
  set(curCh, getChannelFunc(channel))
);

const preloadFileMessage = progress => assoc('uploadProgress', progress);

const replaceMessage = replacer => pipe(
  over(mgs, map(curMess =>
    (curMess.messageId === replacer.messageId ? replacer.message : curMess))
  ),
  assoc('uploadProgress', { reqId: '', progress: 0 }),
);

const cancelUploadingSuccessed = messageId => over(
  mgs, filter(curMess => curMess.messageId !== messageId)
);

const cancelUploadingFailed = error => assoc('error', error);

const handlers = {
  [TYPES.SEND_MESSAGE]: sendMessage,
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

  [TYPES.MESSAGE_TYPING_SET]: messageTypingSet,
  [TYPES.MESSAGE_TYPING_END]: messageTypingEnd,
  [TYPES.MESSAGE_TYPING_ERROR]: messageTypingError,

  [TYPES.CLEAN_CHAT]: cleanChat,

  [ON_USERS_TYPING]: onUsersTyping,

  [CHANNEL_UPDATED]: channelUpdated,

  [GET_SELECTED_CHANNEL_SUCCESSED]: changeChannelGroup,

  [ENTER_CHANNEL_SUCCESSED]: changeOpenChannel,

  [TYPES.EDIT_FILE_MESSAGE_SUCCESSED]: editFileMessageSuccessed,
  [TYPES.EDIT_FILE_MESSAGE_FAILED]: editFileMessageFailed,
  [TYPES.READ_RECEIPT]: readReceipt,
  [TYPES.PRELOAD_FILE_MESSAGE]: preloadFileMessage,

  [TYPES.REPLACE_MESSAGE]: replaceMessage,
  [TYPES.CANCEL_UPLOADING_SUCESSED]: cancelUploadingSuccessed,
  [TYPES.CANCEL_UPLOADING_FAILED]: cancelUploadingFailed,
};

export const chat = createReducer(initState, handlers);
