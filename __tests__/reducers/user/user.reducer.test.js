import { user as reducer, initState } from '../../../src/redux/user/reducer';
import * as actions from '../../../src/redux/user/actions';
import { user as userData } from '../../fixtures';

describe('user reducer', () => {
  it('userLoginRequest', () => {
    const state = reducer(initState, actions.loginUserRequest());
    expect(state.userFetching).toBe(true);
  });
  it('userLoginSuccessed', () => {
    const state = reducer(initState, actions.loginUserSuccessed(userData));
    expect(state.userFetching).toBe(false);
    expect(state.userId).toBe(userData.userId);
    expect(state.userName).toBe(userData.nickname);
    expect(state.userImg).toBe(userData.profileUrl);
    expect(state.logged).toBe(true);
  });
  it('userLoginFailed', () => {
    const state = reducer(initState, actions.loginUserFailed(Error));
    expect(state.userFetching).toBe(false);
    expect(state.error).toBe(Error);
  });
  it('userLoginTimeout', () => {
    const state = reducer(initState, actions.loginUserTimeout(Error));
    expect(state.userFetching).toBe(false);
    expect(state.error).toBe(Error);
  });
  it('clearLoginError', () => {
    const state = reducer(initState, actions.clearLoginError());
    expect(state.error).toBe('');
  });
  it('userReconnect', () => {
    const state = reducer(initState, actions.userReconnect());
    expect(state.userFetching).toBe(true);
  });
  it('userReconnectSuccessed', () => {
    const state = reducer(initState, actions.userReconnectSuccessed());
    expect(state.userFetching).toBe(false);
  });
  it('userReconnectFailed', () => {
    const state = reducer(initState, actions.userReconnectFailed(Error));
    expect(state.userFetching).toBe(false);
    expect(state.error).toBe(Error);
  });
  it('userLogoutSuccessed', () => {
    const state = reducer(initState, actions.logoutUserSuccessed());
    expect(state.logged).toBe(false);
  });
  it('userLogoutFailed', () => {
    const state = reducer(initState, actions.logoutUserFailed(Error));
    expect(state.error).toBe(Error);
  });
  it('changeUserRequest', () => {
    const state = reducer(initState, actions.changeUserRequest());
    expect(state.userFetching).toBe(true);
  });
  it('changeUserSuccessed', () => {
    const state = reducer(initState, actions.changeUserSuccessed(userData));
    expect(state.userFetching).toBe(false);
    expect(state.userName).toBe(userData.nickname);
    expect(state.userImg).toBe(userData.profileUrl);
  });
  it('changeUserFailed', () => {
    const state = reducer(initState, actions.changeUserFailed(Error));
    expect(state.userFetching).toBe(false);
    expect(state.error).toBe(Error);
  });
});
