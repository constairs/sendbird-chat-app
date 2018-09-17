import { channels as reducer, initState } from '../../src/redux/channels/reducer';
import * as channelsActions from '../../src/redux/channels/actions';
import * as openChannelsActions from '../../src/redux/channels/openChannelsActions';
import * as groupChannelsActions from '../../src/redux/channels/groupChannelsActions';
import { channelListFunc, getChannelFunc } from '../../src/redux/channels/helpers';

const openChannel = {
  channelType: 'open',
  participantCount: 0,
  operators: [],
  url: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
  name: 'customOpenChannel',
  coverUrl: 'https://dxstmhyqfqr1o.cloudfront.net/logo/symbol_SendBird_positive.svg',
  createdAt: 1536823763000,
  data: '',
  customType: 'gg',
  isFrozen: false,
  isEphemeral: false,
  fileUploadRequest: {},
  lastMessage: {
    messageType: 'user',
    messageId: 1833220567,
    channelUrl: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
    createdAt: 1537168248053,
    updatedAt: 0,
    channelType: 'open',
    mentionType: 'users',
    mentionedUsers: [],
    message: 'dss',
    data: '',
    _sender: {
      nickname: 'user2',
      profileUrl: 'https://sendbird-upload.s3.amazonaws.com/F5DB79DF-1EEE-4EE9-865F-1A47ECB2A09A/channels/7fe5d0b61fc001388f9a90645c05b471cfe6b027.jpg',
      userId: 'user',
      connectionStatus: 'nonavailable',
      lastSeenAt: 0,
      metaData: {},
      isActive: true,
      friendDiscoveryKey: null,
      friendName: null
    },
    reqId: '',
    customType: '',
    translations: {}
  }
};

const groupChannel = {
  channelType: 'group',
  memberCount: 3,
  url: 'sendbird_group_channel_71040649_788977edd914a744ea389bbf2af58fa976d960e5',
  name: 'groupChannel#3',
  coverUrl: 'https://sendbird-upload.s3.amazonaws.com/F5DB79DF-1EEE-4EE9-865F-1A47ECB2A09A/channels/7fe5d0b61fc001388f9a90645c05b471cfe6b027.jpg',
  createdAt: 1536314523000,
  data: '',
  customType: '',
  isDistinct: false,
  unreadMessageCount: 0,
  inviter: {
    nickname: 'test',
    profileUrl: 'https://sendbird-upload.s3.amazonaws.com/F5DB79DF-1EEE-4EE9-865F-1A47ECB2A09A/channels/b231b4e48ae96bb99b917c5dd41aa14de84069c5.jpg',
    userId: 'test',
    connectionStatus: 'nonavailable',
    lastSeenAt: 0,
    metaData: {},
    isActive: true,
    friendDiscoveryKey: null,
    friendName: null
  },
  members: [
    {
      state: 'joined',
      isBlockedByMe: false,
      isBlockingMe: false,
      userId: 'test',
      nickname: 'test2',
      profileUrl: 'https://sendbird-upload.s3.amazonaws.com/F5DB79DF-1EEE-4EE9-865F-1A47ECB2A09A/channels/b231b4e48ae96bb99b917c5dd41aa14de84069c5.jpg',
      connectionStatus: 'online',
      lastSeenAt: 0,
      metaData: {},
      isActive: true,
      friendDiscoveryKey: null,
      friendName: null
    },
    {
      state: 'joined',
      isBlockedByMe: false,
      isBlockingMe: false,
      userId: 'fd',
      nickname: 'h',
      profileUrl: 'https://sendbird.com/main/img/profiles/profile_02_512px.png',
      connectionStatus: 'offline',
      lastSeenAt: 1537159254244,
      metaData: {},
      isActive: true,
      friendDiscoveryKey: null,
      friendName: null
    },
    {
      state: 'joined',
      isBlockedByMe: false,
      isBlockingMe: false,
      userId: 'user',
      nickname: 'user2',
      profileUrl: 'https://sendbird-upload.s3.amazonaws.com/F5DB79DF-1EEE-4EE9-865F-1A47ECB2A09A/channels/7fe5d0b61fc001388f9a90645c05b471cfe6b027.jpg',
      connectionStatus: 'online',
      lastSeenAt: 0,
      metaData: {},
      isActive: true,
      friendDiscoveryKey: null,
      friendName: null
    }
  ],
  joinedMemberCount: 3,
  lastMessage: {
    messageType: 'user',
    messageId: 1825321667,
    channelUrl: 'sendbird_group_channel_71040649_788977edd914a744ea389bbf2af58fa976d960e5',
    createdAt: 1536829552891,
    updatedAt: 0,
    channelType: 'group',
    mentionType: 'users',
    mentionedUsers: [],
    message: 'dsfgdfs',
    data: '',
    _sender: {
      nickname: 'test2',
      profileUrl: 'https://sendbird-upload.s3.amazonaws.com/F5DB79DF-1EEE-4EE9-865F-1A47ECB2A09A/channels/b231b4e48ae96bb99b917c5dd41aa14de84069c5.jpg',
      userId: 'test',
      connectionStatus: 'nonavailable',
      lastSeenAt: 0,
      metaData: {},
      isActive: true,
      friendDiscoveryKey: null,
      friendName: null
    },
    reqId: '',
    customType: '',
    translations: {}
  }
};

const newMembers = [
  ...groupChannel.members,
  {
    state: 'joined',
    isBlockedByMe: false,
    isBlockingMe: false,
    userId: 'fd',
    nickname: 'h',
    profileUrl: 'https://sendbird.com/main/img/profiles/profile_02_512px.png',
    connectionStatus: 'offline',
    lastSeenAt: 1537159254244,
    metaData: {},
    isActive: true,
    friendDiscoveryKey: null,
    friendName: null
  },
];

const newChannel = {
  ...groupChannel,
  members: newMembers,
  cachedReadReceiptStatus: {
    test: 1536904355795,
    fd: 1536806256382
  },
};

const channelsList = [openChannel, groupChannel];

const error = {
  message: 'Error',
};

const user = {
  nickname: 'test2',
  profileUrl: 'https://sendbird-upload.s3.amazonaws.com/F5DB79DF-1EEE-4EE9-865F-1A47ECB2A09A/channels/b231b4e48ae96bb99b917c5dd41aa14de84069c5.jpg',
  userId: 'test',
  connectionStatus: 'nonavailable',
  lastSeenAt: 0,
  metaData: {},
  isActive: true,
  friendDiscoveryKey: null,
  friendName: null,
};

const userData = {
  groupChannel,
  user,
};


const participants = [
  user
];

describe('channels reducer tests', () => {
  it('getChannelList', () => {
    const state = reducer(initState, channelsActions.getChannelList());
    expect(state.channelsFetching).toBe(true);
  });
  it('getChannelListSuccessed', () => {
    const stateBefore = {
      ...initState,
      channelsFetching: true,
    };
    const state = reducer(stateBefore, channelsActions.getChannelListSuccessed(channelsList));
    expect(state.openChannelList).toEqual(channelListFunc(channelsList).openChannelList);
    expect(state.groupChannelList).toEqual(channelListFunc(channelsList).groupChannelList);
    expect(state.channelsFetching).toBe(false);
  });
  it('getChannelListFailed', () => {
    const stateBefore = {
      ...initState,
      channelsFetching: true,
    };
    const state = reducer(stateBefore, channelsActions.getChannelListFailed(error.message));
    expect(state.channelsFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
  it('createGroupChannel', () => {
    const state = reducer(initState, groupChannelsActions.createGroupChannel());
    expect(state.channelFetching).toBe(true);
  });
  it('createGroupChannelSuccessed', () => {
    const state = reducer(initState, groupChannelsActions.createGroupChannelSuccessed());
    expect(state.channelFetching).toBe(false);
  });
  it('createGroupChannelFailed', () => {
    const state = reducer(initState, groupChannelsActions.createGroupChannelFailed(error.message));
    expect(state.channelFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
  it('inviteUsersFailed', () => {
    const state = reducer(initState, groupChannelsActions.inviteUsersFailed(error.message));
    expect(state.error).toBe(error.message);
  });
  it('onUserJoined', () => {
    const state = reducer(initState, groupChannelsActions.onUserJoined(userData));
    expect(state).toEqual({
      ...initState,
      notificationShow: true,
      notification: {
        type: 'onUserJoined',
        channel: userData.groupChannel,
        user: userData.user,
      },
    });
  });
  it('onUserLeft', () => {
    const state = reducer(initState, groupChannelsActions.onUserLeft(userData));
    expect(state).toEqual({
      ...initState,
      notificationShow: true,
      notification: {
        type: 'userLeft',
        channel: userData.groupChannel,
        user: userData.user,
      },
    });
  });
  it('notificationOff', () => {
    const stateBefore = {
      ...initState,
      notificationShow: true,
      notification: {
        type: 'userLeft',
        channel: userData.groupChannel,
        user: userData.user,
      },
    };
    const state = reducer(stateBefore, groupChannelsActions.notificationOff());
    expect(state.notification).toEqual({
      type: '',
      channel: '',
      user: ''
    });
    expect(state.notificationShow).toBe(false);
  });
  it('refreshEnteredMember', () => {
    const stateBefore = {
      ...initState,
      channel: groupChannel,
    };
    const state = reducer(stateBefore, groupChannelsActions.onReadReceiptUpdated(newMembers));
    expect(state.channel).toEqual({ ...state.channel, members: newMembers });
  });
  it('refreshedMembers', () => {
    const stateBefore = {
      ...initState,
      channel: groupChannel,
    };
    const state = reducer(stateBefore, groupChannelsActions.refreshedMembers(newMembers));
    expect(state.channel).toEqual({ ...stateBefore.channel, members: newMembers });
  });
  it('refreshFailed', () => {
    const state = reducer(initState, groupChannelsActions.refreshFailed(error.message));
    expect(state.error).toBe(error.message);
  });
  it('changeActiveChannel', () => {
    const state = reducer(initState, channelsActions.changeActiveChannel());
    expect(state.channel).toBe(null);
  });
  it('createOpenChannel', () => {
    const state = reducer(initState, openChannelsActions.createOpenChannel());
    expect(state.channelFetching).toBe(true);
  });
  it('createOpenChannelSuccessed', () => {
    const state = reducer(initState, openChannelsActions.createOpenChannelSuccessed());
    expect(state.channelFetching).toBe(false);
  });
  it('createOpenChannelFailed', () => {
    const state = reducer(initState, openChannelsActions.createOpenChannelFailed(error.message));
    expect(state.channelFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
  it('enterChannel', () => {
    const state = reducer(initState, openChannelsActions.enterChannel());
    expect(state.channelFetching).toBe(true);
    expect(state.channel).toBe('');
  });
  it('enterChannelSuccessed', () => {
    const state = reducer(initState, openChannelsActions.enterChannelSuccessed(openChannel));
    expect(state.channelFetching).toBe(false);
    expect(state.channel).toEqual(getChannelFunc(openChannel));
  });
  it('enterChannelFailed', () => {
    const state = reducer(initState, openChannelsActions.enterChannelFailed(error.message));
    expect(state.channelFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
  it('getParticipantsSuccessed', () => {
    const stateBefore = {
      initState,
      channel: openChannel
    };
    const state = reducer(stateBefore, openChannelsActions.getParticipantsSuccessed(participants));
    expect(state.channel.members).toEqual(participants);
  });
  it('getParticipantsFailed', () => {
    const state = reducer(initState, openChannelsActions.getParticipantsFailed(error.message));
    expect(state.error).toBe(error.message);
  });
  it('leaveChannel', () => {
    const state = reducer(initState, channelsActions.leaveChannel());
    expect(state.channelFetching).toBe(true);
  });
  // it('leaveChannelSuccessed', () => {
  //   const stateBefore = {
  //     ...initState,
  //     channelFetching: true,
  //   };
  //   const state = reducer(stateBefore, channelsActions.leaveChannelSuccessed(groupChannel));
  //   expect(state.channel).toBe(null);
  //   expect(state.channelFetching).toBe(false);
  // expect(state.groupChannelList).toEqual();
  // });
});
