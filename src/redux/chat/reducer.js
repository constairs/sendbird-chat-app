import {
  assoc,
  append,
  pipe,
  lensProp,
  set,
  over,
  when,
  ifElse,
  map,
  filter
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
const mgs = lensProp('messages');

const sendMessage = () => assoc('sendingMessage', true);

const sendMessageSuccessed = (sendRes) => {
  pipe(
    ifElse(
      mgs.length > 10,
      over(mgs.slice(1), append(sendRes.message)),
      over(mgs, append(sendRes.message)),
    ),
    assoc('sendingMessage', false),
  );
};

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

const messageReceived = messageData =>
  when(
    curCh && curCh.url === messageData.channel.url,
    ifElse(
      mgs.length > 10,
      over(mgs.slice(1), append(messageData.message)),
      over(mgs, append(messageData.message))
    ),
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

const onUsersTyping = typingData => when(
  curCh && curCh.url === typingData.channel.url,
  assoc('membersTyping', typingData.typingMembers)
);

const changeChannelGroup = channel => pipe(
  set(curCh, channel),
  assoc('receipt', getLeastReceiptStatusTime(channel))
);

const changeOpenChannel = openChannel => pipe(
  set(curCh, openChannel),
  assoc('receipt', 0)
);

const readReceipt = receiptData => pipe(
  when(
    curCh && curCh.url === receiptData.channelUrl,
    assoc('receipt', receiptData.receipt),
  ),
  'receipt'
);

const channelUpdated = channel => pipe(
  when(
    curCh && curCh.url === channel.url,
    set(curCh, getChannelFunc(channel))
  )
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

// const sendMessageSuccessed = (state, sendRes) => ({
//   ...state,
//   messages: state.messages.length === 10 ?
//     [...state.messages, sendRes.message].slice(1) : [...state.messages, sendRes.message],
//   sendingMessage: false,
// });
// const sendMessageFailed = (state, error) => ({
//   ...state,
//   error,
//   sendingMessage: false,
// });

// const sendFileMessageSuccessed = (state, sendRes) => ({
//   ...state,
//   messages: [...state.messages, sendRes.message],
// });
// const sendFileMessageFailed = (state, error) => ({
//   ...state,
//   error,
// });

// const deleteMessageFailed = (state, error) => ({
//   ...state,
//   error
// });

// const editMessageSuccessed = (state, editRes) => ({
//   ...state,
//   messages: state.messages.map(
//     cur => (cur.messageId === editRes.messageId ? editRes : cur)
//   ),
// });
// const editMessageFailed = (state, error) => ({
//   ...state,
//   error,
// });

// const editFileMessageSuccessed = (state, editRes) => ({
//   ...state,
//   messages: state.messages.map(
//     message => (message.messageId === editRes.messageId ? editRes : message)
//   ),
// });

// const editFileMessageFailed = (state, error) => ({
//   ...state,
//   error,
// });


// const messageReceived = (state, messageData) => {
//   if (state.currentChannel && state.currentChannel.url === messageData.channel.url) {
//     return {
//       ...state,
//       messages: state.messages.length === 10 ?
//         [...state.messages.slice(1), messageData.message]
//         :
//         [...state.messages, messageData.message]
//     };
//   }
//   return {
//     ...state,
//   };
// };


// const messageUpdated = (state, updatedData) => ({
//   ...state,
//   messages: state.messages.map(
//     cur =>
//       (cur.messageId === updatedData.message.messageId
//         ? updatedData.message
//         : cur)
//   ),
// });

// const messageDeleted = (state, messageId) => ({
//   ...state,
//   messages: [...state.messages.filter(cur => `${cur.messageId}` !== messageId)],
// });

// const messageTypingSet = (state, userTyping) => ({
//   ...state,
//   userTyping: userTyping.userTyping,
// });

// const messageTypingEnd = state => ({
//   ...state,
//   userTyping: ''
// });

// const messageTypingError = (state, error) => ({
//   ...state,
//   error,
// });

// const onUsersTyping = (state, typingData) => ({
//   ...state,
//   membersTyping:
//     state.currentChannel && typingData.channel.url === state.currentChannel.url
//       ? typingData.typingMembers
//       : state.membersTyping,
// });

// const preloadFileMessage = (state, progress) => ({
//   ...state,
//   uploadProgress: progress,
// });

// const replaceMessage = (state, replacer) => ({
//   ...state,
//   messages: state.messages.map(
//     message =>
//       (message.messageId === replacer.messageId ? replacer.message : message)
//   ),
//   uploadProgress: { reqId: '', progress: 0 },
// });

// const cancelUploadingSuccessed = (state, messageId) => ({
//   ...state,
//   messages: state.messages.filter(message => message.messageId !== messageId),
// });

// const cancelUploadingFailed = (state, error) => ({
//   ...state,
//   error,
// });

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
