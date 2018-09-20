import SendBird from 'sendbird';
import { APP_ID, TOKEN } from '../constants';
import { store } from '../application';
import {
  messageReceived,
  messageDeleted,
  messageUpdated,
  messageTypingSet,
  readReceipt,
  preloadFileMessage,
} from '../redux/chat/actions';
import {
  userEntered,
  userExited,
} from '../redux/channels/openChannelsActions';
import {
  onUserJoined,
  onUserLeft,
  onUsersTyping,
  onReadReceiptUpdated
} from '../redux/channels/groupChannelsActions';
import { channelUpdated } from '../redux/channels/actions';

export const sb = new SendBird({ appId: APP_ID });

const ChannelHandler = new sb.ChannelHandler();
const GroupChannelHandler = new sb.ChannelHandler();
const ChatHandler = new sb.ChannelHandler();

/* eslint-disable */

ChannelHandler.onChannelChanged = function (channel) {
  store.store.dispatch(channelUpdated(channel));
};
ChannelHandler.onUserEntered = function (channel, user) {
  store.store.dispatch(userEntered(channel, user ));
};
ChannelHandler.onUserExited = function (channel, user) {
  store.store.dispatch(userExited( channel, user ));
};
ChannelHandler.onMetaDataUpdated = function (channel, metaData) {
  store.store.dispatch(messageTypingSet(metaData));
};

ChatHandler.onMessageReceived = function (channel, message) {
  store.store.dispatch(messageReceived(channel, message));
};
ChatHandler.onMessageUpdated = function (channel, message) {
  store.store.dispatch(messageUpdated(channel, message));
};
ChatHandler.onMessageDeleted = function (messageId) {
  store.store.dispatch(messageDeleted(messageId));
};
ChatHandler.onTypingStatusUpdated = function (groupChannel) {
  const typingMembers = groupChannel.getTypingMembers();
  store.store.dispatch(onUsersTyping(groupChannel, typingMembers));
};
ChatHandler.onReadReceiptUpdated = function (channel) {
  const receipt = Object.values(channel.cachedReadReceiptStatus).sort(
    (a, b) => a > b
  )[0];
  store.store.dispatch(readReceipt(receipt, channel.url));
  store.store.dispatch(onReadReceiptUpdated(channel.members));
};

GroupChannelHandler.onChannelChanged = function (channel) {
  store.store.dispatch(channelUpdated(channel));
};
GroupChannelHandler.onUserJoined = function (groupChannel, user) {
  store.store.dispatch(onUserJoined({ groupChannel, user }));
};
GroupChannelHandler.onUserLeft = function (groupChannel, user) {
  store.store.dispatch(onUserLeft({ groupChannel, user }));
};

/* eslint-disable */

sb.addChannelHandler('HANDLER', ChannelHandler);
sb.addChannelHandler('GROUP_HANDLER', GroupChannelHandler);

export function addHandler() {
  sb.addChannelHandler('CHAT_HANDLER', ChatHandler);
}

export function removeHandler() {
  sb.removeChannelHandler('CHAT_HANDLER', ChatHandler);
}

export function connectToSB(userId) {
  return new Promise((resolve, reject) => {
    sb.connect(
      userId,
      TOKEN,
      (user, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      }
    );
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

export function createOpenChannel({
  channelName,
  coverUrl,
  coverFile,
  channelData,
  customType
}) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.createChannel(
      channelName,
      coverUrl,
      coverFile,
      channelData,
      customType,
      (createdChannel, error) => {
        if (error) {
          reject(error);
        }
        createdChannel.createMetaData({ userTyping: '' }, (response, err) => {
          if (err) {
            reject(err);
          }
          resolve(createdChannel);
        });
      }
    );
  });
}

export function createGroupChannel(
  userIds,
  channelDistinct,
  channelName,
  coverUrl,
  coverFile,
  channelData,
  customType
) {
  return new Promise((resolve, reject) => {
    sb.GroupChannel.createChannelWithUserIds(
      [...userIds],
      channelDistinct,
      channelName,
      coverUrl,
      channelData,
      customType,
      function (createdChannel, error) {
        if (error) {
          reject(error);
        }
        createdChannel.createMetaData({ userTyping: '' }, (response, err) => {
          if (err) {
            reject(err);
          }
          resolve(createdChannel);
        });
      }
    );
  });
}

export function getChannelListFromSB() {
  return new Promise((resolve, reject) => {
    const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
    const groupChannelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    groupChannelListQuery.includeEmpty = true;
    groupChannelListQuery.limit = 20;
    groupChannelListQuery.showReadReceipt = true;
    openChannelListQuery.next((openChannels, error) => {
      if (error) {
        reject(error);
      }
      openChannels = openChannels.map(channel => {
        const messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.load(1, true, (message, err) => {
          if (err) {
            reject(err);
          }
          channel.lastMessage = message[0];
        });
        return channel;
      });

      if (groupChannelListQuery.hasNext) {
        groupChannelListQuery.next(function (groupChannels, error) {
          if (error) {
            reject(error);
          }
          resolve([...openChannels, ...groupChannels]);
        });
      }
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

export function groupChannelList() {
  return new Promise((resolve, reject) => {
    const groupChannelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    groupChannelListQuery.includeEmpty = true;
    groupChannelListQuery.limit = 20;
    groupChannelListQuery.showReadReceipt = true;
    if (groupChannelListQuery.hasNext) {
      groupChannelListQuery.next(function (channelList, error) {
        if (error) {
          reject(error);
        }
        resolve(channelList);
      });
    }
  });
}

export function selectChannel(channelInfo) {
  return new Promise((resolve, reject) => {
    if (channelInfo.channelType === 'group') {
      sb.GroupChannel.getChannel(channelInfo.channelUrl, (groupChannel, error) => {
        if (error) {
          reject(error);
        }
        resolve(groupChannel);
      });
    } else {
      sb.OpenChannel.getChannel(channelInfo.channelUrl, (openChannel, error) => {
        if (error) {
          reject(error);
        }
        openChannel.enter((response, err) => {
          if (err) {
            reject(err);
          }
          resolve(openChannel);
        });
      });
    }
  });
}

export function getChannel(channelUrl, channelType) {
  return new Promise((resolve, reject) => {
    if (channelType === 'group') {
      sb.GroupChannel.getChannel(channelUrl, (groupChannel, error) => {
        if (error) {
          reject(error);
        }
        resolve(groupChannel);
      });
    } else {
      sb.OpenChannel.getChannel(channelUrl, (openChannel, error) => {
        if (error) {
          reject(error);
        }
        resolve(openChannel);
      });
    }
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

export function inviteToGroup(channelUrl, userIds) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, 'group').then(groupChannel => {
      groupChannel.inviteWithUserIds([...userIds], function (response, error) {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  });
}

export function leaveGroup(channelUrl) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, 'group').then(groupChannel => {
      groupChannel.leave(function (response, error) {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  });
}

export function refreshGroupMembers(channel) {
  return new Promise((resolve, reject) => {
    channel.refresh((response, error) => {
      if (error) {
        reject(error);
      }
      console.log(response.members);
      resolve(response.members);
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

export function getMessages(channelUrl, channelType) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {
      const messageListQuery = channel.createPreviousMessageListQuery();
      messageListQuery.load(10, false, (messageList, error) => {
        if (error) {
          reject(error);
        }
        resolve(messageList);
      });
    });
  });
}

export function getRecentMessages(channelUrl, quantity) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      }
      const messageListQuery = channel.createPreviousMessageListQuery();
      messageListQuery.load(quantity, true, (messageList, err) => {
        if (err) {
          reject(err);
        }
        resolve(messageList);
      });
    });
  });
}

export function sendMessage(
  channelUrl,
  channelType,
  mType,
  user,
  message,
  data,
  customType
) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {
      channel.sendUserMessage(message, (message, err) => {
        if (err) {
          reject(err);
        }
        resolve({ channel, message });
      });
    });
  });
}

export function cancelUploadingMessage(
  cancel = false,
  channelUrl,
  channelType,
  reqId, // id of sendFileMessage request
  messageId // fakeId of preloading-message
) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {
      if (cancel) {
        const cancelResult = channel.cancelUploadingFileMessage(reqId);
        if (cancelResult) {
          resolve(messageId);
        }
        reject(cancelResult);
      }
    });
  });
}

export function sendFileMessage(
  channelUrl,
  channelType,
  mType,
  user,
  file,
  name,
  type,
  size,
  data,
  customType
) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {
      const sentFileMessage = channel.sendFileMessage(
        file,
        name,
        type,
        size,
        data,
        customType,
        event => {
          store.store.dispatch(
            preloadFileMessage({
              reqId: sentFileMessage.reqId,
              progress: parseInt(
                Math.floor((event.loaded / event.total) * 100)
              ),
            })
          );
        },
        (message, error) => {
          if (error) {
            reject(error);
          }
          resolve({ channel, message });
        }
      );
    });
  });
}

export function deleteMessage(channelUrl, channelType, message) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {
      channel.deleteMessage(message, (response, err) => {
        if (err) {
          reject(err);
        }
        resolve(channel);
      });
    });
  });
}

export function editMessage(
  channelUrl,
  channelType,
  messageType,
  messageId,
  message,
  data,
  customType
) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {
      if (messageType === 'file') {
        channel.updateFileMessage(
          messageId,
          message, // data prop in file message
          customType,
          (fileMessage, error) => {
            if (error) {
              reject(error);
            }
            resolve(fileMessage);
          }
        );
      } else {
        channel.updateUserMessage(
          messageId,
          message,
          data,
          customType,
          (userMessage, err) => {
            if (err) {
              reject(err);
            }
            resolve(userMessage);
          }
        );
      }
    });
  });
}

export function onMessageTyping(channelUrl, channelType, userNickname) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {
      channel.updateMetaData({ userTyping: userNickname }, (response, err) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  });
}

export function typingStart(channelUrl, channelType) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {
      channel.startTyping();
      resolve(channel);
    });
  });
}

export function typingEnd(channelUrl, channelType) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {
      channel.endTyping();
      resolve(channel);
    });
  });
}

export function markAsReadSb(channel) {
  channel.markAsRead();
}

export function getParticipantsSb(channel) {
  return new Promise((resolve, reject) => {
    const participantListQuery = channel.createParticipantListQuery();
    participantListQuery.next((participantList, err) => {
      if (err) {
        reject(err);
      }
      resolve(participantList);
    });
  });
}