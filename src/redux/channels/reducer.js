import {
  assoc,
  assocPath,
  pipe,
  lensProp,
  lensPath,
  set,
  view,
  over,
  when,
  filter,
  map,
  propSatisfies,
  equals,
  prop
} from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';
import { channelListFunc, getChannelFunc, updateChannelListItem } from './helpers';

export const initState = {
  channelsFetching: false,
  openChannelList: [],
  groupChannelList: [],
  channelFetching: false,
  channel: null,
  notificationShow: false,
  notification: {
    type: '',
    channel: '',
    user: '',
  },
};

const ch = lensProp('channel');
const chUrl = lensPath(['channel', 'url']);
const chList = lensProp('openChannelList');
const grChList = lensProp('groupChannelList');


const getChannelList = () => assoc('channelsFetching', true);
const getChannelListSuccessed = channelsList => pipe(
  set(chList, channelListFunc(channelsList).openChannelList),
  set(grChList, channelListFunc(channelsList).groupChannelList),
  assoc('channelsFetching', false),
);
const getChannelListFailed = error => pipe(
  assoc('channelsFetching', false),
  assoc('error', error),
);

const createGroupChannel = () => assoc('channelFetching', true);

const createGroupChannelSuccessed = () => assoc('channelFetching', false);

const createGroupChannelFailed = error => pipe(
  assoc('error', error),
  assoc('channelFetching', false)
);

const inviteUsersFailed = error => assoc('error', error);

const onUserJoined = userData => pipe(
  assoc('notificationShow', true),
  assocPath(['notification', 'type'], 'onUserJoined'),
  assocPath(['notification', 'channel'], getChannelFunc(userData.groupChannel)),
  assocPath(['notification', 'user'], userData.user),
);

const onUserLeft = userData => pipe(
  assoc('notificationShow', true),
  assocPath(['notification', 'type'], 'userLeft'),
  assocPath(['notification', 'channel'], getChannelFunc(userData.groupChannel)),
  assocPath(['notification', 'user'], userData.user),
);

const notificationOff = () => pipe(
  assoc('notificationShow', false),
  assocPath(['notification', 'type'], ''),
  assocPath(['notification', 'channel'], ''),
  assocPath(['notification', 'user'], ''),
);

const refreshEnteredMember = members => assocPath(['channel', 'members'], members);
const refreshedMembers = members => assocPath(['channel', 'members'], members);

const refreshFailed = error => assoc('error', error);

const changeActiveChannel = () => set(ch, null);

const createOpenChannel = () => assoc('channelFetching', true);
const createOpenChannelSuccessed = () => assoc('channelFetching', false);
const createOpenChannelFailed = error => pipe(
  assoc('channelFetching', false),
  assoc('error', error)
);

const enterChannel = () => pipe(
  assoc('channelFetching', true),
  set(ch, null),
);

const enterChannelSuccessed = channel => pipe(
  assoc('channelFetching', false),
  set(ch, getChannelFunc(channel)),
);

const enterChannelFailed = error => pipe(
  assoc('channelFetching', false),
  assoc('error', error),
);

const getParticipantsSuccessed = participantList => assocPath(['channel', 'members'], participantList);

const getParticipantsFailed = error => assoc('error', error);

const leaveChannel = () => assoc('channelFetching', true);

const leaveChannelSuccessed = channelInfo => pipe(
  set(ch, null),
  assoc('channelFetching', false),
  when(
    () => propSatisfies(equals('group'), 'channelType', channelInfo),
    over(
      grChList, filter(
        item => item.url !== channelInfo.channelUrl
      ),
    ),
  )
);

const leaveChannelFailed = error => pipe(
  assoc('channelFetching', false),
  assoc('error', error)
);

const channelUpdated = channel =>
  when(
    equals(prop('url', channel)), view(chUrl),
    pipe(
      set(ch, getChannelFunc(channel)),
      when(
        () => propSatisfies(equals('open'), 'channelType', channel),
        over(
          chList,
          map(item => (item.url === channel.url ? updateChannelListItem(channel, 'open') : item))
        )
      ),
      when(
        () => propSatisfies(equals('group'), 'channelType', channel),
        over(
          grChList,
          map(item => (item.url === channel.url ? updateChannelListItem(channel, 'group') : item))
        )
      )
    )
  );

const userEntered = enterData => set(ch, getChannelFunc(enterData.channel));

const userExited = exitData => set(ch, getChannelFunc(exitData.channel));

const getSelectedChannel = () => assoc('channelFetching', true);
const getSelectedChannelSuccessed = channel => pipe(
  set(ch, getChannelFunc(channel)),
  assoc('channelFetching', false),
);
const getSelectedChannelFailed = error => pipe(
  assoc('channelFetching', false),
  assoc('error', error),
);

const handlers = {
  [TYPES.CREATE_GROUP_CHANNEL]: createGroupChannel,
  [TYPES.CREATE_GROUP_CHANNEL_SUCCESSED]: createGroupChannelSuccessed,
  [TYPES.CREATE_GROUP_CHANNEL_FAILED]: createGroupChannelFailed,

  [TYPES.CREATE_OPEN_CHANNEL]: createOpenChannel,
  [TYPES.CREATE_OPEN_CHANNEL_SUCCESSED]: createOpenChannelSuccessed,
  [TYPES.CREATE_OPEN_CHANNEL_FAILED]: createOpenChannelFailed,

  [TYPES.INVITE_USERS_FAILED]: inviteUsersFailed,

  [TYPES.ON_USER_JOINED]: onUserJoined,
  [TYPES.ON_USER_LEFT]: onUserLeft,

  [TYPES.NOTIFICATION_OFF]: notificationOff,

  [TYPES.ON_READ_RECEIPT_UPDATED]: refreshEnteredMember,
  [TYPES.REFRESHED_MEMBERS]: refreshedMembers,
  [TYPES.REFRESH_FAILED]: refreshFailed,

  [TYPES.ENTER_CHANNEL]: changeActiveChannel,
  [TYPES.CHANGE_ACTIVE_CHANNEL]: changeActiveChannel,

  [TYPES.ENTER_CHANNEL]: enterChannel,
  [TYPES.ENTER_CHANNEL_SUCCESSED]: enterChannelSuccessed,
  [TYPES.ENTER_CHANNEL_FAILED]: enterChannelFailed,

  [TYPES.LEAVE_CHANNEL]: leaveChannel,
  [TYPES.LEAVE_CHANNEL_SUCCESSED]: leaveChannelSuccessed,
  [TYPES.LEAVE_CHANNEL_FAILED]: leaveChannelFailed,

  [TYPES.GET_PARTICIPANTS_SUCCESSED]: getParticipantsSuccessed,
  [TYPES.GET_PARTICIPANTS_FAILED]: getParticipantsFailed,

  [TYPES.CHANNEL_UPDATED]: channelUpdated,

  [TYPES.NEW_USER_ENTERED]: userEntered,
  [TYPES.USER_EXITED]: userExited,

  [TYPES.GET_CHANNEL_LIST]: getChannelList,
  [TYPES.GET_CHANNEL_LIST_SUCCESSED]: getChannelListSuccessed,
  [TYPES.GET_CHANNEL_LIST_FAILED]: getChannelListFailed,

  [TYPES.GET_SELECTED_CHANNEL]: getSelectedChannel,
  [TYPES.GET_SELECTED_CHANNEL_SUCCESSED]: getSelectedChannelSuccessed,
  [TYPES.GET_SELECTED_CHANNEL_FAILED]: getSelectedChannelFailed,
};

export const channels = createReducer(initState, handlers);
