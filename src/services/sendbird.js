import SendBird from 'sendbird';
import { APP_ID, TOKEN } from '../constants';
import { store } from '../application';
import { messageReceived, messageDeleted, messageUpdated } from '../redux/chat/actions';
import { channelUpdated, userEntered, userExited } from '../redux/openChannels/actions';

export const sb = new SendBird({ appId: APP_ID });

const ChannelHandler = new sb.ChannelHandler();

ChannelHandler.onMessageReceived = function (channel, message) {
  store.store.dispatch(messageReceived(channel, message));
};

ChannelHandler.onMessageUpdated = function (channel, message) {
  console.log(message);
  store.store.dispatch(messageUpdated(channel, message));
};

ChannelHandler.onMessageDeleted = function (channel, messageId) {
  store.store.dispatch(messageDeleted(channel, messageId));
};

ChannelHandler.onChannelChanged = function (channel) {
  store.store.dispatch(channelUpdated(channel));
};

ChannelHandler.onUserEntered = function (channel, user) {
  store.store.dispatch(userEntered({ channel, user }));
};

ChannelHandler.onUserExited = function (channel, user) {
  store.store.dispatch(userExited({ channel, user }));
};

sb.addChannelHandler('HANDLER', ChannelHandler);

// export function addChatHandlers(channelUrl) {
//   const ChannelHandler = new sb.ChannelHandler();
//   ChannelHandler.onMessageReceived = function (channel, message) {
//     // if (channel.url === channelUrl) {
//     store.store.dispatch(messageUpdated(channel, message));
//     // }
//   };

// ChannelHandler.onMessageUpdated = function (channel, message) {
//   if (channel.url === channelUrl) {
//     store.store.dispatch(messageUpdated(channel, message));
//   }
// };
// ChannelHandler.onMessageDeleted = function (channel, messageId) {
//   if (channel.url === channelUrl) {
//     store.store.dispatch(messageDeleted(channel, messageId));
//   }
// };
//   sb.addChannelHandler('MESSAGE_HANDLER', ChannelHandler);
// }

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
        localStorage.clear();
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

export function updateChannel(channelUrl, newName, newCover) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      channel.update(newName, newCover, (response, err) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  });
}

export function openChannelList() {
  return new Promise((resolve, reject) => {
    const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();

    openChannelListQuery.next((channels, error) => {
      if (error) {
        reject(error);
      }
      resolve(channels.reverse());
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

export function enterChannel(channelUrl) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      channel.enter((response, err) => {
        if (err) {
          reject(err);
        }
        resolve(channel);
      });
    });
  });
}

export function getParticipantsReq(channelUrl) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      const participantListQuery = channel.createParticipantListQuery();
      participantListQuery.next((participantList, err) => {
        if (err) {
          reject(err);
        }
        resolve(participantList);
      });
    });
  });
}

export function exitChannel(channelUrl) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      channel.exit((response, err) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  });
}

export function getMessages(channelUrl) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      const messageListQuery = channel.createPreviousMessageListQuery();
      messageListQuery.load(10, true, (messageList, err) => {
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
        const messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.load(10, true, (messageList, e) => {
          if (e) {
            reject(e);
          }
          resolve(messageList.reverse());
        });
      });
    });
  });
}

export function deleteMessage(channelUrl, message) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      channel.deleteMessage(message, (response, err) => {
        if (err) {
          reject(err);
        }
        const messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.load(10, true, (messageList, e) => {
          if (e) {
            reject(e);
          }
          resolve(messageList.reverse());
        });
      });
    });
  });
}


export function editMessage(channelUrl, messageId, message, data, customType) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      channel.updateUserMessage(messageId, message, data, customType, (userMessage, err) => {
        if (err) {
          reject(err);
        }
        resolve(userMessage);
      });
    });
  });
}
