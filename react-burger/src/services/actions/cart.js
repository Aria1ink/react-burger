export const DEFAULT_INGREDIENTS = 'DEFAULT_INGREDIENTS';
export const SET_BUN = 'SET_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const setCartBun = (ingredient) => ({
  type: SET_BUN,
  bun: ingredient
});

export const setCartDefault = (ingredients) => ({
  type: DEFAULT_INGREDIENTS,
  default: ingredients
});

export const addCartIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  ingredient: ingredient
});

export const delCartIngredient = (cartId) => ({
  type: REMOVE_INGREDIENT,
  cartId: cartId
});

export const moveCartIngredient = (from, to, ingredient) => ({
  type: MOVE_INGREDIENT,
  from: from,
  to: to,
  ingredient: ingredient
});