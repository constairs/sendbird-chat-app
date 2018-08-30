import SendBird from 'sendbird';
import { APP_ID, TOKEN } from '../constants';
import { store } from '../application';
import {
  messageReceived,
  messageDeleted,
  messageUpdated,
  userTyping,
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
} from '../redux/groupChannels/actions';

export const sb = new SendBird({ appId: APP_ID });

const ChannelHandler = new sb.ChannelHandler();
const GroupChannelHandler = new sb.ChannelHandler();

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
ChannelHandler.onMessageReceived = function(channel, message) {
  store.store.dispatch(messageReceived(channel, message));
};

ChannelHandler.onMessageUpdated = function(channel, message) {
  store.store.dispatch(messageUpdated(channel, message));
};

ChannelHandler.onMessageDeleted = function(channel, messageId) {
  store.store.dispatch(messageDeleted(channel, messageId));
};

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

GroupChannelHandler.onUserJoined = function(groupChannel, user) {
  store.store.dispatch(onUserJoined({ groupChannel, user }));
};
GroupChannelHandler.onUserLeft = function(groupChannel, user) {
  store.store.dispatch(onUserLeft({ groupChannel, user }));
};
GroupChannelHandler.onReadReceiptUpdated = function(channel) {
  // console.log(channel);
};
/* eslint-disable */

sb.addChannelHandler('HANDLER', ChannelHandler);
sb.addChannelHandler('GROUP_HANDLER', GroupChannelHandler);

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
    if (channelType === 'open') {
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
    } else {
      getChannel(channelUrl, channelType).then(groupChannel => {
        const messageListQuery = groupChannel.createPreviousMessageListQuery();
        messageListQuery.load(10, true, (messageList, error) => {
          if (error) {
            reject(error);
          }
          resolve(messageList.reverse());
        });
      });
    }
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
        resolve(messageList.reverse());
      });
    });
  });
}

export function sendMessage(channelUrl, channelType, mType, user, message) {
  return new Promise((resolve, reject) => {
    if (channelType === 'open') {
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
    } else {
      getChannel(channelUrl, channelType).then(groupChannel => {
        groupChannel.sendUserMessage(mType, user, message, (response, err) => {
          if (err) {
            reject(err);
          }
          const messageListQuery = groupChannel.createPreviousMessageListQuery();
          messageListQuery.load(10, true, (messageList, e) => {
            if (e) {
              reject(e);
            }
            resolve(messageList.reverse());
          });
        });
      });
    }
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
    getChannel(channelUrl, channelType).then(groupChannel => {
      groupChannel.sendFileMessage(
        file,
        name,
        type,
        size,
        data,
        customType,
        event => {
          console.log(
            parseInt(Math.floor((event.loaded / event.total) * 100)) + '%'
          );
        },
        (fileMessage, error) => {
          if (error) {
            reject(error);
          }
          const messageListQuery = groupChannel.createPreviousMessageListQuery();
          messageListQuery.load(10, true, (messageList, e) => {
            if (e) {
              reject(e);
            }
            resolve(messageList.reverse());
          });
        }
      );
    });
  });
}

export function deleteMessage(channelUrl, channelType, message) {
  return new Promise((resolve, reject) => {
    if (channelType === 'open') {
      sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
        if (error) {
          reject(error);
        }
        channel.deleteMessage(message, (response, err) => {
          if (err) {
            reject(err);
          }
          resolve(message);
        });
      });
    } else {
      getChannel(channelUrl, channelType).then(groupChannel => {
        groupChannel.deleteMessage(message, (response, err) => {
          if (err) {
            reject(err);
          }
          resolve(message);
        });
      });
    }
  });
}

export function editMessage(
  channelUrl,
  channelType,
  messageId,
  message,
  data,
  customType
) {
  return new Promise((resolve, reject) => {
    if (channelType === 'open') {
      sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
        if (error) {
          reject(error);
        }
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
      });
    } else {
      getChannel(channelUrl, channelType).then(groupChannel => {
        groupChannel.updateUserMessage(
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
      });
    }
  });
}

export function onMessageTyping(channelUrl, channelType, userNickname) {
  return new Promise((resolve, reject) => {
    if (channelType === 'open') {
      sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
        if (error) {
          reject(error);
        }

        channel.updateMetaData(
          { userTyping: userNickname },
          (response, err) => {
            if (err) {
              reject(err);
            }
            resolve(response);
          }
        );
      });
    } else {
      getChannel(channelUrl, channelType).then(groupChannel => {
        groupChannel.updateMetaData(
          { userTyping: userNickname },
          (response, err) => {
            if (err) {
              reject(err);
            }
            resolve(response);
          }
        );
      });
    }
  });
}
