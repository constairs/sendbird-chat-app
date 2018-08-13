import SendBird from 'sendbird';
import { APP_ID, TOKEN } from '../constants';

const sb = new SendBird({ appId: APP_ID });

export function connectToSB(userId) {
  return new Promise((resolve, reject) => {
    // const sb = new SendBird({ appId: APP_ID });
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
    // const sb = new SendBird({ appId: APP_ID });
    sb.disconnect((response, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

export function createChannel(
  channelName,
  channelUrl,
  coverUrl,
  coverFile,
  customType,
  channelData,
  channelOperators) {
  return new Promise((resolve, reject) => {
    // const sb = new SendBird({ appId: APP_ID });
    debugger;
    sb.OpenChannel.createChannel(
      channelName,
      coverUrl,
      channelData,
      (response, error) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      }
    );
  });
}
