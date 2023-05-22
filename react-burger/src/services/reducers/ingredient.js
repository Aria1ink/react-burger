import {
  SET_INGREDIENT,
  CLEAR_INGREDIENT
} from "../actions/ingredient";

const defaultState = null;

export default function ingredientReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_INGREDIENT: {
      return { ...action.ingredient };
    }
    case CLEAR_INGREDIENT: {
      return null;
    }
    default:
      return state;
  }
};