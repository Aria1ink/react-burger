type Props = {
  path?: string;
  expires?: number | string | Date;
  [name: string]: any;
};
export function setCookie(name: string, value: string, props: Props = {}) {
  props = props || {};
  props.path = '/';
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
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

export function getCookie(name: string) {
  // eslint-disable-next-line
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : false;
};
export function getAccessToken () {
  return getCookie('token');
}
export function setAccessToken (accessToken: string) {
  let authToken: string | undefined;
  if (accessToken) {
    if (accessToken.indexOf('Bearer') === 0) {
      authToken = accessToken.split('Bearer ')[1];
    }
  }
  if (authToken) {
    setCookie('token', authToken, {expires: 20*60});
  };
}
export function setRefreshToken (refreshToken: string) {
  setCookie('refreshtoken', refreshToken);
}
export function getRefreshToken () {
  return getCookie('refreshtoken');
}
export function removeTokens () {
  setCookie('token', '', {expires: -1});
  setCookie('refreshtoken', '', {expires: -1});
}