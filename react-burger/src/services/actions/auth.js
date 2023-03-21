import { registerUserApi, loginUserApi, refreshTokenApi, getUserProfileApi } from '../../utils/api';
import { setCookie, getCookie, setToken, setRefreshToken , getRefreshToken} from '../../utils/tools';

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
        setToken(data.accessToken);
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
        setToken(data.accessToken);
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
      console.log(err);
      dispatch(setAuthError('Ошибка авторизации. Попробуйте еще раз.'));
    });
};
export const signOut = async (dispatch) => {
  dispatch(logoutUser(getRefreshToken()));
  setToken('');
  setRefreshToken('');
};
export const refreshUserToken = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    await refreshTokenApi(refreshToken)
      .then( (data) => {
        if (data.success) {
          setToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
  }
};
export const getUserProfile = async (token, dispatch) => {
  await getUserProfileApi(token)
    .then( (data) => {
      dispatch(setUser(data.user));
    })
    .catch( (err) => {
      console.log(err);
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        if (refreshUserToken()) {
          getUserProfile(token, dispatch);
        } else {
          dispatch(setAuthError('Ошибка загрузки данных. Проверьте подключение к интернет и перезагрузите страницу.'));
        };
      };
    });
};