export function channelListFunc(channelsList) {
  const openChannelList = channelsList.map(channel => (channel.channelType === 'open' ? ({
    channelType: channel.channelType,
    memberCount: channel.participantCount,
    url: channel.url,
    name: channel.name,
    coverUrl: channel.coverUrl,
    createdAt: channel.createdAt,
    data: channel.data,
    customType: channel.customType,
  }) : null));

  const groupChannelList = channelsList.map(channel => (channel.channelType === 'group' ?
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
    })
    : null));

  return { openChannelList, groupChannelList };
}
