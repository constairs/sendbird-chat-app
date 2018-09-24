import { call, put, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { cloneableGenerator } from 'redux-saga/utils';
import { REHYDRATE } from 'redux-persist';

import {
  connectToSB,
  disconnectFromSB,
  changeProfile,
  exitChannel,
} from '../../../src/services/sendbird';
import * as sagas from '../../../src/redux/user/sagas';
import * as actions from '../../../src/redux/user/actions';
import * as TYPES from '../../../src/redux/user/types';
import { mockSendbird } from '../../mock';
import { leaveChannel, leaveChannelSuccessed, changeActiveChannel } from '../../../src/redux/channels/actions';

beforeAll(mockSendbird);

describe('loginUserSaga', () => {
  const action = {
    type: TYPES.USER_LOGIN_REQUEST,
    payload: 'userId'
  };

  const loginUserSaga = cloneableGenerator(sagas.loginUserSaga)(action);

  it('should login user', () => {
    const gen = loginUserSaga.clone();

    expect(gen.next().value).toEqual(race({
      user: call(connectToSB, action.payload.userId),
      timeout: call(delay, 10000),
    }));

    expect(gen.next({ user: { userId: 'userId' }, timeout: false }).value)
      .toEqual(put(actions.loginUserSuccessed({ userId: 'userId' })));
  });

  it('should call loginUserTimeout', () => {
    const gen = loginUserSaga.clone();
    expect(gen.next().value).toEqual(race({
      user: call(connectToSB, action.payload.userId),
      timeout: call(delay, 10000),
    }));
    expect(gen.next({ timeout: true }).value).toEqual(put(actions.loginUserTimeout('Login timeout')));
  });

  it('should call loginUserFailed', () => {
    const gen = loginUserSaga.clone();
    const error = Error('login user error');
    expect(gen.next().value).toEqual(race({
      user: call(connectToSB, action.payload.userId),
      timeout: call(delay, 10000),
    }));
    expect(gen.throw(error).value).toEqual(put(actions.loginUserFailed(error.message)));
  });
});

describe('userReconnectSaga', () => {
  const action = {
    type: REHYDRATE,
    payload: { userId: 'userId' }
  };
  const userReconnectSaga = cloneableGenerator(sagas.userReconnectSaga)(action);

  it('should reconnect user', () => {
    const gen = userReconnectSaga.clone();

    expect(gen.next().value).toEqual(put(actions.userReconnect()));
    expect(gen.next().value).toEqual(race({
      user: call(connectToSB, action.payload.userId),
      timeout: call(delay, 10000),
    }));
    expect(gen.next({ user: { userId: 'userId' }, timeout: false }).value)
      .toEqual(put(actions.userReconnectSuccessed({ userId: 'userId' })));
  });

  it('should call reconnect timeout', () => {
    const gen = userReconnectSaga.clone();
    expect(gen.next().value).toEqual(put(actions.userReconnect()));
    expect(gen.next().value).toEqual(race({
      user: call(connectToSB, action.payload.userId),
      timeout: call(delay, 10000),
    }));
    expect(gen.next({ timeout: true }).value).toEqual(put(actions.loginUserTimeout('Login timeout')));
  });

  it('should call reconnect error', () => {
    const gen = userReconnectSaga.clone();
    const error = Error('login user error');
    expect(gen.next().value).toEqual(put(actions.userReconnect()));
    expect(gen.next().value).toEqual(race({
      user: call(connectToSB, action.payload.userId),
      timeout: call(delay, 10000),
    }));
    expect(gen.throw(error).value).toEqual(put(actions.userReconnectFailed(error.message)));
  });
});

describe('logoutUserSaga', () => {
  const action = {
    type: TYPES.USER_LOGOUT_REQUEST,
    payload: { channelType: 'open', channelUrl: 'https://url.com/' }
  };
  const logoutUserSaga = cloneableGenerator(sagas.logoutUserSaga)(action);
  it('should logout open channel', () => {
    const gen = logoutUserSaga.clone();
    expect(gen.next().value).toEqual(put(leaveChannel(action.payload)));
    expect(gen.next().value).toEqual(call(exitChannel, action.payload.channelUrl));
    expect(gen.next().value).toEqual(put(leaveChannelSuccessed(action.payload)));
    expect(gen.next().value).toEqual(call(disconnectFromSB, action));
    expect(gen.next().value).toEqual(put(actions.logoutUserSuccessed()));
  });

  it('should call logoutUserFailed', () => {
    const gen = logoutUserSaga.clone();
    const error = Error('logout error');
    gen.next();
    expect(gen.throw(error).value).toEqual(put(actions.logoutUserFailed(error.message)));
  });

  const actionGroup = {
    type: TYPES.USER_LOGOUT_REQUEST,
    payload: { channelType: 'group', channelUrl: 'https://url.com/' }
  };
  const logoutUserSagaGroup = cloneableGenerator(sagas.logoutUserSaga)(actionGroup);

  it('should logout group channel', () => {
    const gen = logoutUserSagaGroup.clone();
    expect(gen.next().value).toEqual(put(changeActiveChannel()));
    expect(gen.next().value).toEqual(call(disconnectFromSB, actionGroup));
    expect(gen.next().value).toEqual(put(actions.logoutUserSuccessed()));
  });
});

describe('changeUserSaga', () => {
  const action = {
    type: TYPES.USER_CHANGE_REQUEST,
    newUserData: ['user']
  };
  const changeUserSaga = cloneableGenerator(sagas.changeUserSaga)(action);
  it('should change user', () => {
    const gen = changeUserSaga.clone();
    expect(gen.next().value).toEqual(call(changeProfile, ...action.newUserData));
    expect(gen.next().value).toEqual(put(actions.changeUserSuccessed()));
  });
  it('should call changeUserFailed', () => {
    const gen = changeUserSaga.clone();
    const error = Error('change user error');
    gen.next();
    expect(gen.throw(error).value).toEqual(put(actions.changeUserFailed(error.message)));
  });
});
