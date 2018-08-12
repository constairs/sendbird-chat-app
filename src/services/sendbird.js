import SendBird from 'sendbird';
import { APP_ID, TOKEN } from '../constants';

export class SendBirdActions {
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

  createChannel(user, coverUrl, data) {
    return new Promise((resolve, reject) =>{
      this.sb.OpenChannel.createChannel(user.name, user.coverUrl, data, (createdChannel, error) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        resolve(createdChannel);
        // onCreated
        console.log(createdChannel);
      });
    });
  }
}
