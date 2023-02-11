import { getIngredientsApi } from '../../utils/api';

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';

export const setIngredientsStatusLoaded = (ingredients) => ({ type: GET_INGREDIENTS_SUCCESS, ingredients: ingredients });
export const setIngredientsStatusLoading = () => ({ type: GET_INGREDIENTS_REQUEST});
export const setIngredientsStatusFail = () => ({ type: GET_INGREDIENTS_REQUEST});

export const loadIngredients = () => {
  return (dispatch) => {
    dispatch(setIngredientsStatusLoading());
    getIngredientsApi()
    .then(
      (data) => {
        dispatch(setIngredientsStatusLoaded(data.data));
      }
    )
    .catch((err) => {
      dispatch(setIngredientsStatusFail());
      console.log(err);
    });
  }
};