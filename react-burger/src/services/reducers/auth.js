import { 
  LOGIN,
  LOGOUT,
  SET_USER,
  AUTH_ERROR
} from '../actions/auth';

const defaultState = {
  isAuthenticated: false,
  error: null,
  user: {}
}; 

export default function authReducer (state = defaultState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, isAuthenticated: true };
    }
    case LOGOUT: {
      return { ...state, isAuthenticated: false };
    }
    case SET_USER: {
      return { ...state, user: action.user };
    }
    case AUTH_ERROR: {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
};