import {
  GET_INGREDIENTS_LOADED,
  GET_INGREDIENTS_FAIL,
  GET_INGREDIENTS_LOADING
} from "../actions/ingredients";

const defaultState = {
  status: "loading",
  ingredients: [],
};

export default function ingredientsReducer (state = defaultState, action) {
  switch (action.type) {
    case GET_INGREDIENTS_LOADED: {
      return { 
        ...state, 
        status: "loaded", 
        ingredients: action.ingredients 
      };
    }
    case GET_INGREDIENTS_FAIL: {
      console.log(action.err);
      return { 
        ...state, 
        status: "failed" 
      };
    }
    case GET_INGREDIENTS_LOADING: {
      return { 
        ...state, 
        status: "loading" 
      };
    }
    default:
      return state;
  }
};
