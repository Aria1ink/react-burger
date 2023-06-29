import { getIngredientsApi } from '../../utils/api';
import { setIngredientsSuccess, setIngredientsRequest, setIngredientsError } from '../slices/ingredients';

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';

export const setIngredientsStatusLoaded = (ingredients) => ({ type: GET_INGREDIENTS_SUCCESS, ingredients: ingredients });
export const setIngredientsStatusLoading = () => ({ type: GET_INGREDIENTS_REQUEST});
export const setIngredientsStatusFail = () => ({ type: GET_INGREDIENTS_REQUEST});

export const loadIngredients = () => {
  return (dispatch) => {
    dispatch(setIngredientsRequest());
    getIngredientsApi()
    .then(
      (data) => {
        dispatch(setIngredientsSuccess(data.data));
      }
    )
    .catch((err) => {
      dispatch(setIngredientsError());
      console.log(`Ошибка: ${err}`);
    });
  }
};