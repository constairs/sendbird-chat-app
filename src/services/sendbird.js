import SendBird from 'sendbird';
import { APP_ID, TOKEN } from '../constants';

const sb = new SendBird({ appId: APP_ID });

export function connectToSB(userId) {
  return new Promise((resolve, reject) => {
    sb.connect(userId, TOKEN, (user, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

export function disconnectFromSB() {
  return new Promise((resolve, reject) => {
    sb.disconnect((response, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

export function changeProfile(nickname, profileUrl) {
  return new Promise((resolve, reject) => {
    sb.updateCurrentUserInfo(nickname, profileUrl, (response, error) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    });
  });
}

export function createOpenChannel(
  channelName,
  coverUrl,
  coverFile) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.createChannel(
      channelName,
      coverUrl,
      coverFile,
      (response, error) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      }
    );
  });
}

export function openChannelList() {
  return new Promise((resolve, reject) => {
    const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
    openChannelListQuery.next((channels, error) => {
      if (error) {
        reject(error);
      }
      resolve(channels);
    });
  });
}

export function getChannel(channelUrl) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      resolve(channel);
    });
  });
}

export function exitChannel(channel) {
  return new Promise((resolve, reject) => {
    channel.exit((response, error) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    });
  });
}

export function enterChannel(channelUrl) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      channel.enter((response, err) => {
        if (error) {
          reject(err);
        }
        resolve(channel);
      });
    });
  });
}

const ChannelHandler = new sb.ChannelHandler();
export function receiveMessage() {
  return new Promise((resolve, reject) => {
    ChannelHandler.onMessageReceived = (channel, message) => {
      if (message) {
        resolve({ channel, message });
      }
      reject(Error.message);
    };
    sb.addChannelHandler('UNIQUE_HANDLER_ID', ChannelHandler);
  });
}

export function getMessages(channelUrl) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      const messageListQuery = channel.createPreviousMessageListQuery();
      messageListQuery.load(30, true, (messageList, err) => {
        if (err) {
          reject(err);
        }
        resolve(messageList.reverse());
      });
    });
  });
}

export function sendMessage(channelUrl, mType, user, message) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      channel.sendUserMessage(mType, user, message, (response, err) => {
        if (err) {
          reject(err);
        }
        // resolve(response);
        const messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.load(30, true, (messageList, e) => {
          if (e) {
            reject(e);
          }
          resolve(messageList.reverse());
        });
      });
    });
  });
}
