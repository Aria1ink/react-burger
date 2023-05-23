import { 
  LOGIN,
  LOGOUT,
  SET_USER,
  AUTH_ERROR
} from '../actions/auth';

const defaultState = {
  isAuthenticated: 'loading',
  error: null,
  user: {}
}; 

export default function authReducer (state = defaultState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, isAuthenticated: 'auth' };
    }
    case LOGOUT: {
      return { ...state, isAuthenticated: 'noauth' };
    }
    case SET_USER: {
      return { ...state, user: action.user };
    }
    case AUTH_ERROR: {
      return { ...state, error: action.error };
    }
    /*
    case RESET_AUTH_ERROR: {
      return { ...state, error: null };
    }
    */
    default:
      return state;
  }
};