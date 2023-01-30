const url = 'https://norma.nomoreparties.space/api';

export const getIngredientsApi = () => {
  return fetch(url + '/ingredients', {
    headers: {'Content-Type': 'application/json'}
  })
  .then(checkPromiseResult)
};

export const setOrderApi = (orderItemsId) => {
  return fetch(url + '/orders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "ingredients": orderItemsId
    })
  })
  .then(checkPromiseResult)
};

function checkPromiseResult (res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  };
};