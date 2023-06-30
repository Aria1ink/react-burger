import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/user';

export type AuthState  = {
  isAuthenticated: 'loading' | 'auth' | 'noauth';
  error: string | null;
  user: User;
};

const initialState: AuthState = {
  isAuthenticated: 'loading',
  error: null,
  user: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = 'auth'
    },
    logout: (state) => {
      state.isAuthenticated = 'noauth'
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})


export const { login, logout, setUser, setAuthError } = authSlice.actions

export default authSlice.reducer