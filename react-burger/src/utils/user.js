import { 
  registerUserApi, 
  loginUserApi, 
  refreshTokenApi, 
  getUserProfileApi, 
  resetPasswordApi, 
  saveResetPasswordApi, 
  setUserProfileApi } from './api';
import { 
  setCookie, 
  getAccessToken, 
  setAccessToken, 
  setRefreshToken, 
  getRefreshToken } from './tools';

import {
  loginUser,
  logoutUser,
  setUser,
  setAuthError } from '../services/actions/auth';

export const signUp = async (form, dispatch) => {
  console.log(form);
  await registerUserApi(form.email, form.password, form.name)
    .then( (data) => {
      console.log(data)
      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        if (data.success) {
          console.log(data.user)
          dispatch(setUser(data.user));
          dispatch(loginUser());
        };
      } else {
        dispatch(setAuthError('Пользователь с там email возможно уже существует. Проверьте введенные данные.'));
      };
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      dispatch(setAuthError('Сетевая ошибка. Попробуйте еще раз.'));
    });
};
export const signIn = async (form, dispatch) => {
  console.log(form);
  await loginUserApi(form.email, form.password)
    .then( (data) => {
      console.log(data)
      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        if (data.success) {
          console.log(data.user)
          dispatch(setUser(data.user));
          dispatch(loginUser());
        };
      } else {
        dispatch(setAuthError('Ошибка авторизации. Проверьте введенные данные.'));
      };
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      dispatch(setAuthError('Ошибка авторизации. Попробуйте еще раз.'));
    });
};
export const signOut = async (dispatch) => {
  dispatch(logoutUser(getRefreshToken()));
  setAccessToken('');
  setRefreshToken('');
};
export const refreshUserToken = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    const status = await refreshTokenApi(refreshToken)
      .then( (data) => {
        if (data.success) {
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          return true;
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        return false;
      })
    return status;
  }
  return false;
};
export const resetUserPassword = async (email) => {
  console.log(email)
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
export const saveResetUserPassword = async (password, token) => {
  token = token.replaceAll(' ','');
  const status = await saveResetPasswordApi(password, token)
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
  console.log(token)
  const user = await getUserProfileApi(token)
    .then( (data) => {
      console.log(data)
      dispatch(setUser(data.user));
      dispatch(loginUser());
    })
    .catch( (err) => {
      console.log(`Ошибка: ${err}`);
      if (err === 401) {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          if (refreshUserToken()) {
            getUserProfile(dispatch)
          } else {
            dispatch(setAuthError('Ошибка загрузки данных. Проверьте подключение к интернет и перезагрузите страницу.'));
          };
        };
      }
    });
};
export const setUserProfile = async (userData) => {
  const status = await setUserProfileApi(userData)
    .then((data) => {
      console.log('set: ' + data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
}