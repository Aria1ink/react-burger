export const GET_INGREDIENTS_LOADED = 'GET_INGREDIENTS_LOADED';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';
export const GET_INGREDIENTS_LOADING = 'GET_INGREDIENTS_LOADING';

export const setIngredientsStatusLoaded = (ingredients) => ({ type: GET_INGREDIENTS_LOADED, ingredients: ingredients });
export const setIngredientsStatusLoading = () => ({ type: GET_INGREDIENTS_LOADING});
export const setIngredientsStatusFail = () => ({ type: GET_INGREDIENTS_LOADING});