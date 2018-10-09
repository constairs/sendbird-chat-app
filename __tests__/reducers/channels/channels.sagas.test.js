import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { cloneableGenerator } from 'redux-saga/utils';

import {
  createOpenChannel,
  createGroupChannel,
  getChannelListFromSB,
  selectChannel,
  exitChannel,
  leaveGroup,
  inviteToGroup,
  refreshGroupMembers,
  getParticipantsSb
} from '../../../src/services/sendbird';
import * as sagas from '../../../src/redux/channels/sagas';
import * as openChannelsActions from '../../../src/redux/channels/openChannelsActions';
import * as groupChannelsActions from '../../../src/redux/channels/groupChannelsActions';
import * as actions from '../../../src/redux/channels/actions';
import { cleanChat } from '../../../src/redux/chat/actions';
import * as TYPES from '../../../src/redux/channels/types';
import { mockSendbird } from '../../mock';

beforeAll(mockSendbird);

describe('createChannelSaga', () => {
  const action = {
    type: TYPES.CREATE_OPEN_CHANNEL,
    payload: { id: 1 },
  };
  const createChannelSaga = cloneableGenerator(sagas.createChannelSaga)(action);

  it('should create new open channel', () => {
    const gen = createChannelSaga.clone();
    expect(gen.next().value).toEqual(call(createOpenChannel, action.payload));
    expect(gen.next(action.payload).value)
      .toEqual(put(openChannelsActions.createOpenChannelSuccessed(action.payload)));
  });

  it('should call createOpenChannelFailed', () => {
    const error = Error('create open channel error');
    const gen = createChannelSaga.clone();
    expect(gen.next().value).toEqual(call(createOpenChannel, action.payload));
    expect(gen.throw(error).value).toEqual(
      put(openChannelsActions.createOpenChannelFailed(error.message))
    );
  });
});

describe('createChannelSagaGroup', () => {
  const action = {
    type: TYPES.CREATE_GROUP_CHANNEL,
    payload: { id: 1 }
  };
  const createChannelSaga = cloneableGenerator(sagas.createChannelSaga)(action);

  it('should create new group channel', () => {
    const gen = createChannelSaga.clone();
    expect(gen.next().value).toEqual(call(createGroupChannel, action.payload));
    expect(gen.next(action.payload).value)
      .toEqual(put(groupChannelsActions.createGroupChannelSuccessed(action.payload)));
  });

  it('should call createGroupChannelFailed', () => {
    const error = Error('create group channel error');
    const gen = createChannelSaga.clone();
    expect(gen.next().value).toEqual(call(createGroupChannel, action.payload));
    expect(gen.throw(error).value).toEqual(
      put(groupChannelsActions.createGroupChannelFailed(error.message))
    );
  });
});

describe('getChannelsListSaga', () => {
  const action = {
    type: TYPES.GET_CHANNEL_LIST
  };
  const getChannelsListSaga = cloneableGenerator(sagas.getChannelsListSaga)(action);

  it('should get channel lists', () => {
    const gen = getChannelsListSaga.clone();
    gen.next();
    expect(gen.next().value).toEqual(call(getChannelListFromSB));
    expect(gen.next(action).value).toEqual(
      put(actions.getChannelListSuccessed(action))
    );
  });

  it('should call getChannelListFailed', () => {
    const error = Error('get channel list error');
    const gen = getChannelsListSaga.clone();
    gen.next();
    expect(gen.next().value).toEqual(call(getChannelListFromSB));
    expect(gen.throw(error).value).toEqual(
      put(actions.getChannelListFailed(error.message))
    );
  });
});

describe('getSelectedChannelSaga', () => {
  const action = {
    type: TYPES.GET_SELECTED_CHANNEL,
    payload: { channelUrl: 'https://url.com/', channelType: 'open' },
  };
  const getSelectedChannelSaga = cloneableGenerator(sagas.getSelectedChannelSaga)(action);

  it('should get selected channel & enter', () => {
    const gen = getSelectedChannelSaga.clone();
    expect(gen.next(action).value).toEqual(put(cleanChat()));
    expect(gen.next().value).toEqual(call(selectChannel, action.payload));
    expect(gen.next().value).toEqual(
      put(openChannelsActions.enterChannel(action.payload.channelUrl))
    );
    expect(gen.next().value).toEqual(
      put(openChannelsActions.enterChannelSuccessed())
    );
  });
  it('should call enterChannelFailed', () => {
    const gen = getSelectedChannelSaga.clone();
    const error = Error('enter channel error');
    expect(gen.next(action).value).toEqual(put(cleanChat()));
    expect(gen.next().value).toEqual(call(selectChannel, action.payload));
    expect(gen.throw(error).value).toEqual(
      put(openChannelsActions.enterChannelFailed(error.message))
    );
  });

  const actionGroup = {
    type: TYPES.GET_SELECTED_CHANNEL,
    payload: { channelUrl: 'https://url.com/', channelType: 'group' }
  };
  const getSelectedChannelGroupSaga = cloneableGenerator(sagas.getSelectedChannelSaga)(actionGroup);

  it('should get selected group channel', () => {
    const gen = getSelectedChannelGroupSaga.clone();
    expect(gen.next(actionGroup).value).toEqual(put(cleanChat()));
    expect(gen.next().value).toEqual(call(selectChannel, actionGroup.payload));
    expect(gen.next(actionGroup).value).toEqual(
      put(actions.getSelectedChannelSuccessed(actionGroup))
    );
  });
  it('should call getSelectedChannelFailed', () => {
    const gen = getSelectedChannelGroupSaga.clone();
    const error = Error('get selected channel error');
    expect(gen.next(actionGroup).value).toEqual(put(cleanChat()));
    expect(gen.next().value).toEqual(call(selectChannel, actionGroup.payload));
    expect(gen.throw(error).value).toEqual(put(actions.getSelectedChannelFailed(error.message)));
  });
});

describe('leaveChannelSaga', () => {
  const action = { type: TYPES.LEAVE_CHANNEL, payload: { channelUrl: 'https://url.com/', channelType: 'open' } };
  const leaveChannelSaga = cloneableGenerator(sagas.leaveChannelSaga)(action);
  it('should leave open channel', () => {
    const gen = leaveChannelSaga.clone();
    expect(gen.next().value).toEqual(call(exitChannel, action.payload.channelUrl));
    expect(gen.next().value).toEqual(put(actions.leaveChannelSuccessed(action.payload)));
  });

  it('should call leaveChannelFailed', () => {
    const gen = leaveChannelSaga.clone();
    const error = Error('leave channel error');
    gen.next();
    expect(gen.throw(error).value).toEqual(put(actions.leaveChannelFailed(error.message)));
  });

  const actionGroup = { type: TYPES.LEAVE_CHANNEL, payload: { channelUrl: 'https://url.com/', channelType: 'group' } };
  const leaveChannelGroupSaga = cloneableGenerator(sagas.leaveChannelSaga)(actionGroup);
  it('should leave group channel', () => {
    const gen = leaveChannelGroupSaga.clone();
    expect(gen.next().value).toEqual(call(leaveGroup, actionGroup.payload.channelUrl));
    expect(gen.next().value).toEqual(put(actions.leaveChannelSuccessed(actionGroup.payload)));
  });
});

describe('inviteUserSaga', () => {
  const action = {
    type: TYPES.ON_USER_JOINED,
    payload: ['jj', 's'],
  };
  const inviteUserSaga = cloneableGenerator(sagas.inviteUserSaga)(action);

  it('should invite user', () => {
    const gen = inviteUserSaga.clone();
    expect(gen.next().value).toEqual(call(inviteToGroup, ...action.payload));
    expect(gen.next().value).toEqual(
      put(groupChannelsActions.inviteUsersSuccessed())
    );
  });

  it('should call inviteUsersFailed', () => {
    const gen = inviteUserSaga.clone();
    const error = Error('invite user error');
    expect(gen.next().value).toEqual(call(inviteToGroup, ...action.payload));
    expect(gen.throw(error).value).toEqual(
      put(groupChannelsActions.inviteUsersFailed(error.message))
    );
  });
});

describe('membersUpdatedSaga', () => {
  it('should hide notifiaction on members udpated', () => {
    const gen = sagas.membersUpdatedSaga();
    expect(gen.next().value).toEqual(call(delay, 5000));
    expect(gen.next().value).toEqual(put(groupChannelsActions.notificationOff()));
  });
});

describe('refreshMembersSaga', () => {
  const action = {
    type: TYPES.ON_USER_JOINED,
    payload: { userName: 'user', channelUrl: 'https://url.com/', myMemberState: 'joined' }
  };
  const refreshMembersSaga = cloneableGenerator(sagas.refreshMembersSaga)(action);

  it('should refresh members', () => {
    const gen = refreshMembersSaga.clone();
    expect(gen.next().value).toEqual(call(refreshGroupMembers, action.payload));
    expect(gen.next().value).toEqual(put(groupChannelsActions.refreshedMembers()));
  });

  it('should call refreshFailed', () => {
    const error = Error('refresh members error');
    const gen = refreshMembersSaga.clone();
    expect(gen.next().value).toEqual(call(refreshGroupMembers, action.payload));
    expect(gen.throw(error).value).toEqual(
      put(groupChannelsActions.refreshFailed(error.message))
    );
  });

  const actionGroup = {
    type: TYPES.GET_SELECTED_CHANNEL_SUCCESSED,
    payload: { userName: 'user', channelUrl: 'https://url.com/' }
  };
  const refreshMembersSaga2 = cloneableGenerator(sagas.refreshMembersSaga)(actionGroup);
  const gen = refreshMembersSaga2.clone();
  it('should refresh', () => {
    expect(gen.next().value).toEqual(call(refreshGroupMembers, actionGroup.payload));
    expect(gen.next().value).toEqual(put(groupChannelsActions.refreshedMembers()));
  });
});

// describe('membersRefresher', () => {
//   const action = {
//     type: TYPES.GET_SELECTED_CHANNEL_SUCCESSED,
//     payload: { url: 'https://url.com/' },
//   };
//   const gen = sagas.membersRefresher(action);
//   it('should members refresh', () => {
//     expect(gen.next().value).toEqual(call(delay, 20000));
//     expect(gen.next().value).toEqual(sagas.refreshMembersSaga(action));
//   });
// });

describe('getParticipantsSaga', () => {
  const action = {
    type: TYPES.GET_PARTICIPANTS,
    payload: { channel: { url: 'https://url.com/' } }
  };
  const getParticipantsSaga = cloneableGenerator(sagas.getParticipantsSaga)(action);

  it('should get participants', () => {
    const gen = getParticipantsSaga.clone();
    expect(gen.next().value).toEqual(put(openChannelsActions.getParticipants()));
    expect(gen.next().value).toEqual(call(getParticipantsSb, action.payload.channel));
    expect(gen.next().value).toEqual(
      put(openChannelsActions.getParticipantsSuccessed())
    );
  });

  it('should call getParticipantsFailed', () => {
    const gen = getParticipantsSaga.clone();
    const error = Error('get participants error');
    expect(gen.next().value).toEqual(put(openChannelsActions.getParticipants()));
    expect(gen.next().value).toEqual(call(getParticipantsSb, action.payload.channel));
    expect(gen.throw(error).value).toEqual(
      put(openChannelsActions.getParticipantsFailed(error.message))
    );
  });
});
