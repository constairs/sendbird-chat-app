import { createReducer } from '../../utils/reducerUtils';

import * as TYPES from './types';

const initState = {
  fetching: false,
  error: ''
};

const createOpenChannel = (state, channelData) => ({
  channelData,
  fetching: true,
});


const handlers = {
  [TYPES.CREATE_OPEN_CHANNEL]: createOpenChannel,
};

export const reducer = createReducer(initState, handlers);
