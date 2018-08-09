const initialState = {
  user: {
    userId: '',
    userNick: ''
  },
  fetching: false,
  error: ''
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return {
        userId: action.payload,
        fetching: true,
        error: ''
      };
    case 'USER_LOGIN_SUCCESSED':
      return {
        user: action.payload,
        fetching: false,
        error: ''
      };
    case 'USER_LOGIN_FAILED':
      return {
        user: {
          userId: '',
          userNick: ''
        },
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}
