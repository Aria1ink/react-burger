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
import { login, logout, setUser, setAuthError } from '../../services/slices/auth';
import { AppDispatch } from '../../services/store';
import { User } from '../../services/types/user';
import { Callback } from '../../services/types/data';

export const signUp = async (form: User, dispatch: AppDispatch) => {
  let result: boolean = false;
  if (form.email && form.password && form.name) {
    await registerUserApi(form.email, form.password, form.name)
      .then( (data) => {
        if (data) {
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          if (data.success) {
            dispatch(setUser(data.user));
            dispatch(login());
            result = true;
          };
        };
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        if (err === 403) {
          dispatch(setAuthError('Пользователь с там email возможно уже существует. Проверьте введенные данные.'));
        };
      });
  }
  return result;
};
export const signIn = async (form: User, dispatch: AppDispatch) => {
  if (form.email && form.password) {
    const result = await loginUserApi(form.email, form.password)
      .then( (data) => {
        if (data) {
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          if (data.success) {
            dispatch(setUser(data.user));
            dispatch(login());
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
  }
};
export const signOut = async (dispatch: AppDispatch) => {
  const token = getRefreshToken();
  if (token) {
    logoutUserApi(token);
  }
  removeTokens();
  dispatch(logout());
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
export const resetUserPassword = async (email: string) => {
  const status = await resetPasswordApi(email)
    .then((data) => {
      return data && data.success === true;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      return false;
    })
    return status;
};
export const saveResetUserPassword = async (password: string, emailToken: string) => {
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
export const getUserProfile = async (dispatch: AppDispatch) => {
  let result: boolean = false;
  const token = getAccessToken();
  if (token) {
    await getUserProfileApi(token)
      .then( (data) => {
        dispatch(setUser(data.user));
        result = true;
      })
      .catch( (err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  return result;
};
export const checkRequestToken = async (callback: Callback, dispatch: AppDispatch, params?: any) => {
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
export const setUserProfile = async (dispatch: AppDispatch, userData: User) => {
  let result: boolean = false;
  const token = getAccessToken();
  if (token) {
    await setUserProfileApi(token, userData)
      .then((data) => {
        dispatch(setUser(data.user));
        result = true;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
  return result;
};