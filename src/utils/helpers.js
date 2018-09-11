export function channelListFunc(channelList) {
  const openChannelList = channelList.map(channel => (channel.channelType === 'open' ? ({
    channelType: channel.channelType,
    memberCount: channel.participantCount,
    url: channel.url,
    name: channel.name,
    coverUrl: channel.coverUrl,
    createdAt: channel.createdAt,
    data: channel.data,
    customType: channel.customType,
    members: [],
    lastMessage: channel.lastMessage
  }) : null)).filter(channel => channel !== null);

  const groupChannelList = channelList.map(channel => (channel.channelType === 'group' ?
    ({
      channelType: channel.channelType,
      memberCount: channel.memberCount,
      url: channel.url,
      name: channel.name,
      coverUrl: channel.coverUrl,
      createdAt: channel.createdAt,
      data: channel.data,
      customType: channel.customType,
      isDistinct: channel.isDistinct,
      unreadMessageCount: channel.unreadMessageCount,
      inviter: channel.inviter,
      members: channel.members,
      joinedMemberCount: channel.joinedMemberCount,
      lastMessage: channel.lastMessage
    })
    : null)).filter(channel => channel !== null);

  return { openChannelList, groupChannelList };
}

export function getChannelFunc(channel) {
  if (channel.channelType === 'open') {
    return {
      channelType: channel.channelType,
      memberCount: channel.participantCount,
      url: channel.url,
      name: channel.name,
      coverUrl: channel.coverUrl,
      createdAt: channel.createdAt,
      data: channel.data,
      customType: channel.customType,
      members: [],
    };
  }
  return {
    channelType: channel.channelType,
    memberCount: channel.memberCount,
    url: channel.url,
    name: channel.name,
    coverUrl: channel.coverUrl,
    createdAt: channel.createdAt,
    data: channel.data,
    customType: channel.customType,
    isDistinct: channel.isDistinct,
    unreadMessageCount: channel.unreadMessageCount,
    inviter: channel.inviter,
    members: channel.members,
    joinedMemberCount: channel.joinedMemberCount,
    lastMessage: channel.lastMessage
  };
}

export function getLeastReceiptStatusTime(channel) {
  return Object.values(channel.cachedReadReceiptStatus).sort(
    (a, b) => a > b
  )[0];
}
