import * as TYPES from './types';

// export const openChannelsList = () => ({ type: TYPES.OPEN_CHANNELS_LIST });
// export const openChannelsListSuccessed = channelsList => ({
//   type: TYPES.OPEN_CHANNELS_LIST_SUCCESSED,
//   payload: channelsList,
// });
// export const openChannelsListFailed = error => ({
//   type: TYPES.OPEN_CHANNELS_LIST_FAILED,
//   payload: error,
// });

// export const groupChannelsList = () => ({ type: TYPES.GROUP_CHANNEL_LIST });
// export const groupChannelsListSuccessed = groupList => ({
//   type: TYPES.GROUP_CHANNELS_LIST_SUCCESSED,
//   payload: groupList,
// });
// export const groupChannelsListFailed = error => ({
//   type: TYPES.GROUP_CHANNELS_LIST_FAILED,
//   payload: error,
// });


export const getChannelsList = () => ({ type: TYPES.GET_CHANNELS_LIST });
export const getChannelsListSuccessed = channelsList => ({
  type: TYPES.GET_CHANNELS_LIST_SUCCESSED,
  payload: channelsList,
});
export const getChannelsListFailed = error => ({
  type: TYPES.GET_CHANNELS_LIST_FAILED,
  payload: error,
});
