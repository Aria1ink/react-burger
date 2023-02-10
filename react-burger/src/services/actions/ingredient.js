export const SET_INGREDIENT = 'SET_INGREDIENT';
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT';

export const setSelectedIngredient = (ingredient) => {
  return ({ type: SET_INGREDIENT, ingredient: ingredient })
};
export const delSelectedIngredient = () => {
  return ({ type: CLEAR_INGREDIENT })
};