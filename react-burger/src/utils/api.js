import { urlHttps as url } from "../variables/connection";

export const getIngredientsApi = () => {
  return makeRequest('/ingredients','GET', null, null);
};

export const setOrderApi = (orderItemsId, token) => {
  return makeRequest('/orders','POST', {'authorization': 'Bearer ' + token}, {"ingredients": orderItemsId});
};

export const registerUserApi = async (email, password, name) => {
  return makeRequest('/auth/register','POST', null, {"email": email, "password": password, "name": name });
};

export const loginUserApi = (email, password) => {
  return makeRequest('/auth/login','POST', null, {"email": email, "password": password});
};

export const refreshTokenApi = (token) => {
  return makeRequest('/auth/token','POST', null, {"token": token});
};

export const getUserProfileApi = (token) => {
  return makeRequest('/auth/user', 'GET', {'authorization': 'Bearer ' + token}, null);
};

export const setUserProfileApi = (token, data) => {
  return makeRequest('/auth/user', 'PATCH', {'authorization': 'Bearer ' + token}, data);
};

export const resetPasswordApi = (email) => {
  return makeRequest('/password-reset', 'POST', null, {"email": email});
};

export const saveResetPasswordApi = async (password, token) => {
  return makeRequest('/password-reset/reset', 'POST', null, {"password": password, "token": token});
};

export const logoutUserApi = (token) => {
  return makeRequest('/auth/logout','POST', null, {"token": token});
};

const makeRequest = async (urlParams, method, headers, body) => {
  let params = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (headers) {
    params.headers = {...params.headers, ...headers}
  }
  if (body) {
    params.body = JSON.stringify(body);
    };

  return fetch(url + urlParams, params)
  .then(checkPromiseResult)
};

async function checkPromiseResult (res) {
  if (res.ok) {
    if (res.status === 200) {
      return res.json();
    } else {
        return Promise.reject(res.status);
      }
  } else {
    return Promise.reject(res.status);
  }
};