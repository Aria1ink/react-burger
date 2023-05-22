export const getIngredientById = (id, data) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i]._id === id) {
      return data[i];
    };
  };
  return false;
};
export const getIngredientByName = (name, data) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i].name === name) {
      return data[i];
    };
  };
};
export const getCurrentIngredientFromStore = store => store.ingredient;
export const getCartFromStore = store => store.cart;
export const getMenuStatusFromStore = store => store.menu;
export const getIngredientsFromStore = store => store.ingredients.ingredients;
export const loadIngredientsStatus = store => store.ingredients.status;
export const getOrderNumberFromStore = store => store.order;
export const getAuthUser = store => store.auth;

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export function getCookie(name) {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function setToken (accessToken) {
  let authToken;
  if (accessToken) {
    if (accessToken.indexOf('Bearer') === 0) {
      authToken = accessToken.split('Bearer ')[1];
    }
  }
  if (authToken) {
    setCookie('token', authToken);
  };
}
export function setRefreshToken (refreshToken) {
  setCookie('refreshtoken', refreshToken);
  //sessionStorage.setItem("refreshToken", refreshToken);
}
export function getRefreshToken () {
  return getCookie('refreshtoken');
  //return sessionStorage.getItem("refreshToken", refreshToken);
}