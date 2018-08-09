export const loginUserRequest = (data) => {
  return { type: 'USER_LOGIN_REQUEST', payload: data };
};

export const loginUserSuccess = (data) => {
  return { type: 'USER_LOGIN_SUCCESSED', payload: data };
};

export const loginUserError = (error) => {
  return { type: 'USER_LOGIN_FAILED', payload: error };
};

export const loggedUser = (data) => {
  return { type: 'LOGGED_USER', payload: data };
};
