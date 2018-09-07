import SendBird from 'sendbird';
import { APP_ID, TOKEN } from '../constants';
import { store } from '../application';
import {
  messageReceived,
  messageDeleted,
  messageUpdated,
  userTyping,
  readReceipt,
  preloadFileMessage,
} from '../redux/chat/actions';
import {
  channelUpdated,
  userEntered,
  userExited,
  getParticipantsSuccessed,
  getParticipantsFailed,
} from '../redux/openChannels/actions';

import {
  groupUpdated,
  onUserJoined,
  onUserLeft,
  onUserTyping,
} from '../redux/groupChannels/actions';

export const sb = new SendBird({ appId: APP_ID });

const ChannelHandler = new sb.ChannelHandler();
const GroupChannelHandler = new sb.ChannelHandler();
const ChatHandler = new sb.ChannelHandler();

function getPatticipants(channel) {
  const participantListQuery = channel.createParticipantListQuery();
  participantListQuery.next((participantList, err) => {
    if (err) {
      store.store.dispatch(getParticipantsFailed(err));
    }
    store.store.dispatch(getParticipantsSuccessed(participantList));
  });
}
/* eslint-disable */

ChannelHandler.onChannelChanged = function(channel) {
  if (channel.channelType === 'open') {
    store.store.dispatch(channelUpdated(channel));
  } else {
    store.store.dispatch(groupUpdated(channel));
  }
};
ChannelHandler.onUserEntered = function(channel, user) {
  store.store.dispatch(userEntered({ channel, user }));
  getPatticipants(channel);
};
ChannelHandler.onUserExited = function(channel, user) {
  store.store.dispatch(userExited({ channel, user }));
  getPatticipants(channel);
};
ChannelHandler.onMetaDataUpdated = function(channel, metaData) {
  store.store.dispatch(userTyping(metaData));
};

ChatHandler.onMessageReceived = function(channel, message) {
  store.store.dispatch(messageReceived(channel, message));
};
ChatHandler.onMessageUpdated = function(channel, message) {
  store.store.dispatch(messageUpdated(channel, message));
};
ChatHandler.onMessageDeleted = function(channel, messageId) {
  store.store.dispatch(messageDeleted(channel, messageId));
};
ChatHandler.onTypingStatusUpdated = function(groupChannel) {
  const typingMembers = groupChannel.getTypingMembers();
  store.store.dispatch(onUserTyping(groupChannel, typingMembers));
};
ChatHandler.onReadReceiptUpdated = function(channel) {
  const receipt = Object.values(channel.cachedReadReceiptStatus).sort(
    (a, b) => a > b
  )[0];
  store.store.dispatch(readReceipt(receipt, channel.url));
};

GroupChannelHandler.onChannelChanged = function(channel) {
  store.store.dispatch(groupUpdated(channel));
};
GroupChannelHandler.onUserJoined = function(groupChannel, user) {
  store.store.dispatch(onUserJoined({ groupChannel, user }));
};
GroupChannelHandler.onUserLeft = function(groupChannel, user) {
  store.store.dispatch(onUserLeft({ groupChannel, user }));
};

/* eslint-disable */

sb.addChannelHandler('HANDLER', ChannelHandler);
sb.addChannelHandler('GROUP_HANDLER', GroupChannelHandler);
sb.addChannelHandler('CHAT_HANDLER', ChatHandler);

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

export function createOpenChannel(channelName, coverUrl, coverFile) {
  return new Promise((resolve, reject) => {
    sb.OpenChannel.createChannel(
      channelName,
      coverUrl,
      coverFile,
      (channel, error) => {
        if (error) {
          reject(error);
        }
        channel.createMetaData({ userTyping: '' }, (response, err) => {
          if (err) {
            reject(err);
          }
          resolve(channel);
        });
      }
    );
  });
}

export function createGroupChannel(userIds, channelName, coverUrl, coverFile) {
  return new Promise((resolve, reject) => {
    sb.GroupChannel.createChannelWithUserIds(
      userIds,
      false,
      channelName,
      coverUrl,
      coverFile,
      function(createdChannel, error) {
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
      groupChannelListQuery.next(function(channelList, error) {
        if (error) {
          reject(error);
        }
        resolve(channelList);
      });
    }
  });
}

export function getChannel(channelUrl, channelType) {
  return new Promise((resolve, reject) => {
    if (channelType === 'group') {
      sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
        if (error) {
          reject(error);
        }
        resolve(channel);
      });
    } else {
      sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
        if (error) {
          reject(error);
        }
        resolve(channel);
      });
    }
  });
}

export function inviteToGroup(channelUrl, userIds) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, 'group').then(groupChannel => {
      groupChannel.inviteWithUserIds([userIds], function(response, error) {
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
      groupChannel.leave(function(response, error) {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
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

export function refreshGroupMembers(channel) {
  return new Promise((resolve, reject) => {
    channel.refresh((response, error) => {
      if (error) {
        reject(error);
      }
      resolve(response);
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

export function getRecentlyMessages(channelUrl, quantity) {
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
      channel.sendUserMessage(message, data, customType, (messages, err) => {
        if (err) {
          reject(err);
        }
        resolve({ channel, messages });
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
        (fileMessage, error) => {
          if (error) {
            reject(error);
          }
          resolve({ channel, fileMessage });
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
        resolve(message);
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

export function editFileMessage(
  channelUrl,
  channelType,
  messageType,
  messageId,
  user,
  file,
  name,
  type,
  size,
  data,
  customType
) {
  return new Promise((resolve, reject) => {
    getChannel(channelUrl, channelType).then(channel => {});
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

export function markAsReadSb(channel) {
  channel.markAsRead();
}
