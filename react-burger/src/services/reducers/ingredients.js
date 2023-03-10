import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST
} from "../actions/ingredients";

const defaultState = {
  status: "loading",
  ingredients: [],
};

export default function ingredientsReducer (state = defaultState, action) {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS: {
      return { 
        ...state, 
        status: "loaded", 
        ingredients: action.ingredients 
      };
    }
    case GET_INGREDIENTS_ERROR: {
      console.log(action.err);
      return {  
        status: "failed",
        ingredients: []
      };
    }
    case GET_INGREDIENTS_REQUEST: {
      return { 
        status: "loading",
        ingredients: []
      };
    }
    default:
      return state;
  }
};
