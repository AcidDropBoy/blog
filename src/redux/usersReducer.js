const defaultState = {
  user: {},
  loginUser: false,
};

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return { ...state, user: action.user };
    case 'LOGIN':
      return { ...state, loginUser: true };
    case 'LOGOUT':
      return { ...state, loginUser: false };
    default:
      return state;
  }
};

export default usersReducer;
