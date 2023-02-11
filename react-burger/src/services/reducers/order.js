import { 
  GET_ORDER_SUCCESS, 
  HIDE_ORDER, 
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST 
} from "../actions/order";

const defaultState = 0;

export default function orderReducer (state = defaultState, action) {
  switch (action.type) {
    case GET_ORDER_SUCCESS: {
      return action.number;
    }
    case GET_ORDER_REQUEST: {
      return '';
    }
    case GET_ORDER_ERROR: {
      return 'ошибка';
    }
    case HIDE_ORDER: {
      return defaultState;
    }
    default:
      return state;
  }
};