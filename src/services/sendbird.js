import SendBird from 'sendbird';
import { APP_ID, TOKEN } from '../constants';

// class SendBirdAction {
//   constructor() {
//     this.sb = new SendBird({ AppId });
//   }

//   connect(userId) {
//     return new Promise((resolve, reject) => {
//       const sb = this;
//       sb.connect(userId, appToken, (user, error) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(user);
//         }
//       });
//     });
//   }

//   disconnect() {
//     return new Promise((resolve, reject) => {
//       this.sb.disconnect((Response, error) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve();
//         }
//       });
//     });
//   }
// }

// export { SendBirdAction };

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
