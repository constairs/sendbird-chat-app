export const mockSendbird = () => {
  jest.mock('../src/services/sendbird.js', () => ({
    createOpenChannel: jest.fn(channel => channel),
  }));
};
