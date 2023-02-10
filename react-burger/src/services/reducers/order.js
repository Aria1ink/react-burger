import { 
  SET_ORDER, 
  HIDE_ORDER, 
  ORDER_ERROR 
} from "../actions/order";

const defaultState = {
  number: 0,
  modalState: false
};

export default function orderReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_ORDER: {
      return { 
        number: action.number, 
        modalState: true };
    }
    case HIDE_ORDER: {
      return { 
        ...state, 
        modalState: false 
      };
    }
    case ORDER_ERROR: {
      console.log(action.err);
      return defaultState;
    }
    default:
      return state;
  }
};