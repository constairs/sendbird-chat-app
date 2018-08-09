export const loginUserRequest = (data) => {
  return { type: 'USER_LOGIN_REQUEST', payload: data };
};

export const loginUserSuccess = (data) => {
  return { type: 'REQUESTED_DOG_SUCCEEDED', payload: data };
};

export const loginUserError = (error) => {
  return { type: 'REQUESTED_DOG_FAILED', payload: error };
};

export const loggedUser = () => {
  return { type: 'LOGGED_USER' };
};
