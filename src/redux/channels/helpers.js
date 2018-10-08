function openChannelItemCreator(channel) {
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
    lastMessage: channel.lastMessage
  };
}

function groupChannelItemCreator(channel) {
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

export function channelListFunc(channelList) {
  const openChannelList = [];
  const groupChannelList = [];

  channelList.forEach((channel) => {
    if (channel.channelType === 'open') {
      openChannelList.push(openChannelItemCreator(channel));
    } else {
      groupChannelList.push(groupChannelItemCreator(channel));
    }
  });
  return { openChannelList, groupChannelList };
}

export function getChannelFunc(channel) {
  if (channel.channelType === 'open') {
    return openChannelItemCreator(channel);
  }
  return groupChannelItemCreator(channel);
}

export function updateChannelListItem(channel, type) {
  if (type === 'open') {
    return openChannelItemCreator(channel);
  }
  return groupChannelItemCreator(channel);
}
