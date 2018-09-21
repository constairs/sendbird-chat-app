export const mockSendbird = () => {
  jest.mock('../src/services/sendbird.js', () => ({
    createOpenChannel: jest.fn(channel => channel),
    createGroupChannel: jest.fn(channel => channel),
    getChannelListFromSB: jest.fn(),
    selectChannel: jest.fn(channelData => channelData),
    exitChannel: jest.fn(channelUrl => channelUrl),
    leaveGroup: jest.fn(channelUrl => channelUrl),
    inviteToGroup: jest.fn((channelUrl, userIds) => userIds),
    refreshGroupMembers: jest.fn(userData => userData),
    getParticipantsSb: jest.fn(channel => channel),
  }));
};
