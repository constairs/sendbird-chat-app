import SendBird from 'sendbird';
import { APP_ID, TOKEN } from '../constants';

class SendBirdAction {
  constructor() {
    this.sb = new SendBird({ appId: APP_ID });
  }

  connect(userId) {
    return new Promise((resolve, reject) => {
      this.sb.connect(userId, TOKEN, (user, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.sb.disconnect((Response, error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  createChannel(user, data) {
    return new Promise((resolve, reject) =>{
      this.sb.OpenChannel.createChannel(user.name, user.coverUrl, data, (createdChannel, error) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        resolve();
        // onCreated
        console.log(createdChannel);
      });
    });
  }
}

export { SendBirdAction };

export const connectToSB = (userId) => {
  return new Promise((resolve, reject) => {
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, TOKEN, (user, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};
