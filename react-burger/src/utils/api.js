const url = 'https://norma.nomoreparties.space/api';

export const getIngredientsApi = () => {
  return fetch(url + '/ingredients', {
    headers: {'Content-Type': 'application/json'}
  })
  .then(checkPromiseResult)
};

export const setOrderApi = (orderItemsId, token) => {
  return fetch(url + '/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      "ingredients": orderItemsId
    })
  })
  .then(checkPromiseResult)
};

export const registerUserApi = async (email, password, name) => {
  return await fetch(url + '/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name 
    })
  })
  .then(await checkPromiseResult)
};

export const loginUserApi = (email, password) => {
  return fetch(url + '/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": email, 
      "password": password
    })
  })
  .then(checkPromiseResult)
};

export const refreshTokenApi = (token) => {
  return fetch(url + '/auth/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "token": token
    })
  })
  .then(checkPromiseResult)
};

export const getUserProfileApi = (token) => {
  return fetch(url + '/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    }
  })
  .then(checkPromiseResult)
};

export const setUserProfileApi = (token, data) => {
  return fetch(url + '/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(data)
  })
  .then(checkPromiseResult)
};

export const resetPasswordApi = (email) => {
  return fetch(url + '/password-reset', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": email
    })
  })
  .then(checkPromiseResult)
};

export const saveResetPasswordApi = async (password, token) => {
  return fetch(url + '/password-reset/reset', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
  .then(checkPromiseResult)
};

export const logoutUserApi = (token) => {
  return fetch(url + '/auth/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "token": token
    })
  })
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