const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
  user: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
