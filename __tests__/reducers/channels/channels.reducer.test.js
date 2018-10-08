import { channels as reducer, initState } from '../../../src/redux/channels/reducer';
import * as channelsActions from '../../../src/redux/channels/actions';
import * as openChannelsActions from '../../../src/redux/channels/openChannelsActions';
import * as groupChannelsActions from '../../../src/redux/channels/groupChannelsActions';
import { channelListFunc, getChannelFunc, updateChannelListItem } from '../../../src/redux/channels/helpers';
import {
  openChannel,
  groupChannel,
  newMembers,
  newChannel,
  channelsList,
  error,
  user,
  userData,
  participants
} from '../../fixtures';

describe('channels reducer tests', () => {
  it('getChannelList', () => {
    const state = reducer(initState, channelsActions.getChannelList());
    expect(state.channelsFetching).toBe(true);
  });
  it('getChannelListSuccessed', () => {
    const stateBefore = {
      ...initState,
      channelsFetching: true,
    };
    const state = reducer(stateBefore, channelsActions.getChannelListSuccessed(channelsList));
    expect(state.openChannelList).toEqual(channelListFunc(channelsList).openChannelList);
    expect(state.groupChannelList).toEqual(channelListFunc(channelsList).groupChannelList);
    expect(state.channelsFetching).toBe(false);
  });
  it('getChannelListFailed', () => {
    const stateBefore = {
      ...initState,
      channelsFetching: true,
    };
    const state = reducer(stateBefore, channelsActions.getChannelListFailed(error.message));
    expect(state.channelsFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
  it('createGroupChannel', () => {
    const state = reducer(initState, groupChannelsActions.createGroupChannel());
    expect(state.channelFetching).toBe(true);
  });
  it('createGroupChannelSuccessed', () => {
    const state = reducer(initState, groupChannelsActions.createGroupChannelSuccessed());
    expect(state.channelFetching).toBe(false);
  });
  it('createGroupChannelFailed', () => {
    const state = reducer(initState, groupChannelsActions.createGroupChannelFailed(error.message));
    expect(state.channelFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
  it('inviteUsersFailed', () => {
    const state = reducer(initState, groupChannelsActions.inviteUsersFailed(error.message));
    expect(state.error).toBe(error.message);
  });
  it('onUserJoined', () => {
    const state = reducer(initState, groupChannelsActions.onUserJoined(userData));
    expect(state).toEqual({
      ...initState,
      notificationShow: true,
      notification: {
        type: 'onUserJoined',
        channel: userData.groupChannel,
        user: userData.user,
      },
    });
  });
  it('onUserLeft', () => {
    const state = reducer(initState, groupChannelsActions.onUserLeft(userData));
    expect(state).toEqual({
      ...initState,
      notificationShow: true,
      notification: {
        type: 'userLeft',
        channel: userData.groupChannel,
        user: userData.user,
      },
    });
  });
  it('notificationOff', () => {
    const stateBefore = {
      ...initState,
      notificationShow: true,
      notification: {
        type: 'userLeft',
        channel: userData.groupChannel,
        user: userData.user,
      },
    };
    const state = reducer(stateBefore, groupChannelsActions.notificationOff());
    expect(state.notification).toEqual({
      type: '',
      channel: '',
      user: ''
    });
    expect(state.notificationShow).toBe(false);
  });
  it('refreshEnteredMember', () => {
    const stateBefore = {
      ...initState,
      channel: groupChannel,
    };
    const state = reducer(stateBefore, groupChannelsActions.onReadReceiptUpdated(newMembers));
    expect(state.channel).toEqual({ ...state.channel, members: newMembers });
  });
  it('refreshedMembers', () => {
    const stateBefore = {
      ...initState,
      channel: groupChannel,
    };
    const state = reducer(stateBefore, groupChannelsActions.refreshedMembers(newMembers));
    expect(state.channel).toEqual({ ...stateBefore.channel, members: newMembers });
  });
  it('refreshFailed', () => {
    const state = reducer(initState, groupChannelsActions.refreshFailed(error.message));
    expect(state.error).toBe(error.message);
  });
  it('changeActiveChannel', () => {
    const state = reducer(initState, channelsActions.changeActiveChannel());
    expect(state.channel).toBe(null);
  });
  it('createOpenChannel', () => {
    const state = reducer(initState, openChannelsActions.createOpenChannel());
    expect(state.channelFetching).toBe(true);
  });
  it('createOpenChannelSuccessed', () => {
    const state = reducer(initState, openChannelsActions.createOpenChannelSuccessed());
    expect(state.channelFetching).toBe(false);
  });
  it('createOpenChannelFailed', () => {
    const state = reducer(initState, openChannelsActions.createOpenChannelFailed(error.message));
    expect(state.channelFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
  it('enterChannel', () => {
    const state = reducer(initState, openChannelsActions.enterChannel());
    expect(state.channelFetching).toBe(true);
    expect(state.channel).toBe(null);
  });
  it('enterChannelSuccessed', () => {
    const state = reducer(initState, openChannelsActions.enterChannelSuccessed(openChannel));
    expect(state.channelFetching).toBe(false);
    expect(state.channel).toEqual(getChannelFunc(openChannel));
  });
  it('enterChannelFailed', () => {
    const state = reducer(initState, openChannelsActions.enterChannelFailed(error.message));
    expect(state.channelFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
  it('getParticipantsSuccessed', () => {
    const stateBefore = {
      initState,
      channel: openChannel
    };
    const state = reducer(stateBefore, openChannelsActions.getParticipantsSuccessed(participants));
    expect(state.channel.members).toEqual(participants);
  });
  it('getParticipantsFailed', () => {
    const state = reducer(initState, openChannelsActions.getParticipantsFailed(error.message));
    expect(state.error).toBe(error.message);
  });
  it('leaveChannel', () => {
    const state = reducer(initState, channelsActions.leaveChannel());
    expect(state.channelFetching).toBe(true);
  });
  it('leaveChannelSuccessed', () => {
    const stateBefore = {
      ...initState,
      channelFetching: true,
      groupChannelList: [groupChannel],
    };
    const state = reducer(stateBefore, channelsActions.leaveChannelSuccessed(groupChannel));
    expect(state.channel).toBe(null);
    expect(state.channelFetching).toBe(false);
    expect(state.groupChannelList).toEqual(stateBefore.groupChannelList.filter(chan =>
      chan.url === groupChannel.url));
  });
  it('leaveChannelFailed', () => {
    const state = reducer(initState, channelsActions.leaveChannelFailed(error.message));
    expect(state.channelFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
  it('channelUpdated', () => {
    const stateBefore = {
      channel: groupChannel,
      openChannelList: [openChannel],
      groupChannelList: [groupChannel],
    };
    const state = reducer(stateBefore, channelsActions.channelUpdated(newChannel));
    expect(state.channel).toEqual(getChannelFunc(newChannel));

    expect(state.openChannelList).toEqual(newChannel.channelType === 'open' ? [updateChannelListItem(newChannel, 'open')] : stateBefore.openChannelList);
    expect(state.groupChannelList).toEqual(newChannel.channelType === 'group' ? [updateChannelListItem(newChannel, 'group')] : stateBefore.groupChannelList);
  });
  it('userEntered', () => {
    const stateBefore = {
      channel: openChannel,
    };
    const state = reducer(stateBefore, openChannelsActions.userEntered(openChannel, user));
    expect(state.channel).toEqual(getChannelFunc(openChannel));
  });
  it('getSelectedChannel', () => {
    const state = reducer(initState, channelsActions.getSelectedChannel());
    expect(state.channelFetching).toBe(true);
  });
  it('getSelectedChannelSuccessed', () => {
    const stateBefore = {
      ...initState,
      channelFetching: true,
    };
    const state = reducer(stateBefore, channelsActions.getSelectedChannelSuccessed(openChannel));
    expect(state.channel).toEqual(getChannelFunc(openChannel));
    expect(state.channelFetching).toBe(false);
  });
  it('getSelectedChannelFailed', () => {
    const stateBefore = {
      ...initState,
      channelFetching: true,
    };
    const state = reducer(stateBefore, channelsActions.getSelectedChannelFailed(error.message));
    expect(state.channelFetching).toBe(false);
    expect(state.error).toBe(error.message);
  });
});
