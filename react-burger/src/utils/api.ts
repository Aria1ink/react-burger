import { urlHttps as url } from "../variables/connection";

type UrlRequest = (
  urlParams: string,
  method: string,
  headers: {
    [name: string]: string;
  } | null,
  body: Body | null) => Promise<any>;
type Token = string;
type Email = string;
type Name = string;
type Password = string;
type OrderItemsId = string[];
type Body = {
  [name: string]: string | OrderItemsId;
};

export const getIngredientsApi = () => {
  return makeRequest('/ingredients','GET', null, null);
};

export const setOrderApi = (orderItemsId: OrderItemsId, token: Token) => {
  return makeRequest('/orders','POST', {'authorization': 'Bearer ' + token}, {"ingredients": orderItemsId});
};

export const registerUserApi = async (email: Email, password: Password, name: Name) => {
  return makeRequest('/auth/register','POST', null, {"email": email, "password": password, "name": name });
};

export const loginUserApi = (email: Email, password: Password) => {
  return makeRequest('/auth/login','POST', null, {"email": email, "password": password});
};

export const refreshTokenApi = (token: Token)=> {
  return makeRequest('/auth/token','POST', null, {"token": token});
};

export const getUserProfileApi = (token: Token) => {
  return makeRequest('/auth/user', 'GET', {'authorization': 'Bearer ' + token}, null);
};

export const setUserProfileApi = (token: Token, data: Body) => {
  return makeRequest('/auth/user', 'PATCH', {'authorization': 'Bearer ' + token}, data);
};

export const resetPasswordApi = (email: Email) => {
  return makeRequest('/password-reset', 'POST', null, {"email": email});
};

export const saveResetPasswordApi = async (password: Password, token: Token) => {
  return makeRequest('/password-reset/reset', 'POST', null, {"password": password, "token": token});
};

export const logoutUserApi = (token: Token) => {
  return makeRequest('/auth/logout','POST', null, {"token": token});
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

  return fetch(url + urlParams, params)
    .then(checkPromiseResult)
};

async function checkPromiseResult (res: Response): Promise<any> {
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