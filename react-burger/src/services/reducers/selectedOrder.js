import {
  SET_SELECTED_ORDER,
  CLEAR_SELECTED_ORDER
} from "../actions/selectedOrder";

const defaultState = null;

export default function ingredientReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_SELECTED_ORDER: {
      return { ...action.order };
    }
    case CLEAR_SELECTED_ORDER: {
      return null;
    }
    default:
      return state;
  }
};