export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export const loginUser = () => ({
  type: LOGIN
});
export const logoutUser = () => ({
  type: LOGOUT
});
export const setUser = (user) => ({
  type: SET_USER,
  user: user
});
export const setAuthError = (error) => ({
  type: AUTH_ERROR,
  error: error
});