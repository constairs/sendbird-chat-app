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

export function openChannelsList() {
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
      resolve(new Promise((res, rej) => {
        channel.enter((response, err) => {
          if (err) {
            rej(err);
          }
          res(response);
        });
      }));
    });
  });
}
