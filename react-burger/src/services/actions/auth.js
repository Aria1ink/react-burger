import { registerUserApi, loginUserApi } from '../../utils/api';
import { setCookie, getCookie } from '../../utils/tools';

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

export const signUp = async (form, dispatch) => {
  console.log(form);
  await registerUserApi(form.email, form.password, form.name)
    .then( (data) => {
      console.log(data)
      if (data) {
        let authToken;
        if (data.accessToken) {
          if (data.accessToken.indexOf('Bearer') === 0) {
            authToken = data.accessToken.split('Bearer ')[1];
          }
        }
        if (authToken) {
          setCookie('token', authToken);
        };
        sessionStorage.setItem("refreshToken", data.refreshToken);
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
      console.log(err);
      dispatch(setAuthError('Сетевая ошибка. Попробуйте еще раз.'));
    });
};
export const signIn = async (form, dispatch) => {
  console.log(form);
  await loginUserApi(form.email, form.password)
    .then( (data) => {
      console.log(data)
      if (data) {
        let authToken;
        if (data.accessToken) {
          if (data.accessToken.indexOf('Bearer') === 0) {
            authToken = data.accessToken.split('Bearer ')[1];
          }
        }
        if (authToken) {
          setCookie('token', authToken);
        };
        sessionStorage.setItem("refreshToken", data.refreshToken);
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
      console.log(err);
      dispatch(setAuthError('Ошибка авторизации. Попробуйте еще раз.'));
    });
};