export const openChannel = {
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

export const groupChannel = {
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

export const newMembers = [
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

export const newChannel = {
  ...groupChannel,
  members: newMembers,
  cachedReadReceiptStatus: {
    test: 1536904355795,
    fd: 1536806256382
  },
};

export const channelsList = [openChannel, groupChannel];

export const error = {
  message: 'Error',
};

export const user = {
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

export const userData = {
  groupChannel,
  user,
};

export const participants = [
  user
];

export const message = {
  messageType: ' user',
  messageId: 1832802277,
  channelUrl: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943',
  createdAt: 1537151810941,
  updatedAt: 0,
  channelType: 'open',
  mentionType: 'users',
  mentionedUsers: '',
  message: 'fdfd',
  data: '',
  reqId: '1537150730719',
  customType: '',
  translations: '',
};
export const messageId = 1832802277;
export const editRes = {
  ...message,
  updatedAt: 1537151810948,
  message: 'another text',
};
export const replacer = editRes;
export const channel = {
  url: 'sendbird_open_channel_41569_c0870af54119f6cf2e1cd9116d6f4de524710943'
};
export const metaData = {
  userTyping: 'user',
};
export const typingMembers = [1, 2];
export const receipt = 1546806256382;
export const progress = 66;
