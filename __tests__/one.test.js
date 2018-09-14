import { user as reducer, initState } from '../src/redux/user/reducer';
import * as actions from '../src/redux/user/actions';

describe('user reducer', () => {
  it('userLoginRequest', () => {
    const state = reducer(initState, actions.loginUserRequest());
    expect(state.userFetching).toBe(true);
  });
});

