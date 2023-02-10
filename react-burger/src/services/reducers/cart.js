import { 
  DEFAULT_INGREDIENTS, 
  SET_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT
} from '../actions/cart';

const defaultState = {
  bun: {},
  others: [
    { cartId: '',
      ingredient: {}
    }]
};

export default function constructorReducer (state = defaultState, action) {
  switch (action.type) {
    case DEFAULT_INGREDIENTS: {
      return {
        ...state,
        others: action.default
      };
    }
    case SET_BUN: {
      return {
        ...state,
        bun: action.bun
      };
    }
    case ADD_INGREDIENT: {
      return {};
    }
    case REMOVE_INGREDIENT: {
      return {};
    }
    default:
      return state;
  }
}