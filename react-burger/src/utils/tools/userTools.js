import { 
  registerUserApi, 
  loginUserApi, 
  refreshTokenApi, 
  getUserProfileApi, 
  resetPasswordApi, 
  saveResetPasswordApi, 
  setUserProfileApi,
  logoutUserApi } from '../api';
import {  
  getAccessToken, 
  setAccessToken, 
  setRefreshToken, 
  getRefreshToken,
  removeTokens } from './tokenTools';

import {
  loginUser,
  logoutUser,
  setUser,
  setAuthError } from '../../services/actions/auth';

export const signUp = async (form, dispatch) => {
  const result = await registerUserApi(form.email, form.password, form.name)
    .then( (data) => {
      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        if (data.success) {
          dispatch(setUser(data.user));
          dispatch(loginUser());
          return true;
        };
      };
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      if (err === 403) {
        dispatch(setAuthError('Пользователь с там email возможно уже существует. Проверьте введенные данные.'));
      };
      return false;
    });
  return result;
};
export const signIn = async (form, dispatch) => {
  const result = await loginUserApi(form.email, form.password)
    .then( (data) => {
      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        if (data.success) {
          dispatch(setUser(data.user));
          dispatch(loginUser());
          return true;
        };
      };
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      if (err === 401) {
        dispatch(setAuthError('Ошибка авторизации. Проверьте введенные данные.'));
      }
      return false;
    });
  return result;
};
export const signOut = async (dispatch) => {
  logoutUserApi(getRefreshToken());
  dispatch(logoutUser());
  removeTokens();
};
export const refreshUserToken = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    const status = await refreshTokenApi(refreshToken)
      .then( (data) => {
        if (data.success) {
          removeTokens();
          setAccessToken(data.accessToken)
          setRefreshToken(data.refreshToken);
          return true;
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        return false;
      })
    return status;
  } else {
    return false;
  }
};
export const resetUserPassword = async (email) => {
  const status =await resetPasswordApi(email)
    .then((data) => {
      return data && data.success === true;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      return false;
    })
    return status;
};
export const saveResetUserPassword = async (password, emailToken) => {
  emailToken = emailToken.replaceAll(' ','');
  const status = await saveResetPasswordApi(password, emailToken)
    .then((data) => {
      return data && data.success === true;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      return false;
    })
    return status;
};
export const getUserProfile = async (dispatch) => {
  const token = getAccessToken();
  const result = await getUserProfileApi(token)
    .then( (data) => {
      dispatch(setUser(data.user));
      return true;
    })
    .catch( (err) => {
      console.log(`Ошибка: ${err}`);
      return false;
    });
  return result;
};
export const checkRequestToken = async (callback, dispatch, params) => {
  let result = await callback(dispatch, params);
  if (result) {
    return true;
  } else {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshStatus = await refreshUserToken();
      if (refreshStatus) {
        result = await callback(dispatch, params);
        if (result) {
          return true;
        } else {
          signOut(dispatch);
          return false;
        }
      } else {
        signOut(dispatch);
        return false;
      }
    } else {
      signOut(dispatch);
      return false;
    }
  }
}
export const setUserProfile = async (dispatch, userData) => {
  setUserProfileApi(getAccessToken(), userData)
    .then((data) => {
      dispatch(setUser(data.user));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
};