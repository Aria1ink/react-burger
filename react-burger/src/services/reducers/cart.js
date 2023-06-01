import { 
  DEFAULT_INGREDIENTS, 
  SET_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT
} from '../actions/cart';

const defaultState = {
  bun: null,
  others: []
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
      return {
        ...state,
        others: [
          ...state.others,
          { cartId: action.uuidv4,
            ingredient: action.ingredient
          }]
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        others: state.others.filter(item => item.cartId !== action.cartId)
      };
    }
    case MOVE_INGREDIENT: {
      let from = 0;
      let to = 0;
      const tempArr= state.others;
      from = state.others.findIndex(item => item.cartId === action.from);
      from >= 0 && tempArr.splice(from, 1);
      to = state.others.findIndex(item => item.cartId === action.to);
      to >= 0 && tempArr.splice(to, 0, action.ingredient);

      return {
        ...state,
        others: tempArr
      };
    }

    default:
      return state;
  }
}