import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { createOpenChannel } from '../../../src/services/sendbird';
import * as sagas from '../../../src/redux/channels/sagas';
import * as actions from '../../../src/redux/channels/openChannelsActions';
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
      .toEqual(put(actions.createOpenChannelSuccessed(action.payload)));
  });

  it('should call createOpenChannelFailed', () => {
    const error = Error('create open channel error');
    const gen = createChannelSaga.clone();
    expect(gen.next().value).toEqual(call(createOpenChannel, action.payload));
    expect(gen.throw(error).value).toEqual(put(actions.createOpenChannelFailed(error.message)));
  });
});
