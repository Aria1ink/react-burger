const url = "https://norma.nomoreparties.space/api/ingredients";
export const getIngredientsApi = () => {
  return fetch(url, {
    headers: {'Content-Type': 'application/json'}
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