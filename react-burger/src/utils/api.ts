import type { Email, 
  Body, 
  IngredientsResponse, 
  LoginResponse, 
  Name, 
  NoLoginResponse, 
  OrderItemsId, 
  OrderResponse, 
  Password, 
  RefreshResponse, 
  Token, UrlRequest, 
  UserResponse } from "../services/types/api";
import { URL_HTTPS as url } from "../variables/connection";

export const getIngredientsApi = () => {
  return makeRequest('/ingredients','GET', null, null)
    .then(checkPromiseResult<IngredientsResponse>);
};

export const setOrderApi = (orderItemsId: OrderItemsId, token: Token) => {
  return makeRequest('/orders','POST', {'authorization': 'Bearer ' + token}, {"ingredients": orderItemsId})
    .then(checkPromiseResult<OrderResponse>);
};

export const registerUserApi = async (email: Email, password: Password, name: Name) => {
  return makeRequest('/auth/register','POST', null, {"email": email, "password": password, "name": name })
    .then(checkPromiseResult<LoginResponse>);
};

export const loginUserApi = (email: Email, password: Password) => {
  return makeRequest('/auth/login','POST', null, {"email": email, "password": password})
    .then(checkPromiseResult<LoginResponse>);
};

export const refreshTokenApi = (token: Token)=> {
  return makeRequest('/auth/token','POST', null, {"token": token})
    .then(checkPromiseResult<RefreshResponse>);
};

export const getUserProfileApi = (token: Token) => {
  return makeRequest('/auth/user', 'GET', {'authorization': 'Bearer ' + token}, null)
    .then(checkPromiseResult<UserResponse>);
};

export const setUserProfileApi = (token: Token, data: Body) => {
  return makeRequest('/auth/user', 'PATCH', {'authorization': 'Bearer ' + token}, data)
    .then(checkPromiseResult<UserResponse>);
};

export const resetPasswordApi = (email: Email) => {
  return makeRequest('/password-reset', 'POST', null, {"email": email})
    .then(checkPromiseResult<NoLoginResponse>);
};

export const saveResetPasswordApi = async (password: Password, token: Token) => {
  return makeRequest('/password-reset/reset', 'POST', null, {"password": password, "token": token})
    .then(checkPromiseResult<NoLoginResponse>);
};

export const logoutUserApi = (token: Token) => {
  return makeRequest('/auth/logout','POST', null, {"token": token})
    .then(checkPromiseResult<NoLoginResponse>);
};

const makeRequest: UrlRequest = async (urlParams, method, headers, body) => {
  let params: {
    method: string;
    headers: {
      "Content-Type": string;
      "authorization"?: string;
    };
    body?: string
  } = {
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

  return fetch(url + urlParams, params);
};

async function checkPromiseResult<T> (res: Response): Promise<T> {
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