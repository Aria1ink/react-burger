import {
  WS_ORDERS_SUCCESS,
  WS_FEED_SUCCESS,
  WS_ORDERS_DISCONNECT,
  WS_FEED_DISCONNECT,
  WS_ORDERS_GET_MESSAGE,
  WS_FEED_GET_MESSAGE
} from '../actions/ws.js';

const initialState = {
  orders: {
    orders: []
  },
  feed: {
    orders: [], total: null, today: null
  },
  statusOrders: false,
  statusFeed: false
};

export default function wsReducer(state = initialState, action) {
  switch (action.type) {
    case WS_ORDERS_SUCCESS:
      return {
        ...state,
        statusOrders: true
      };
    case WS_FEED_SUCCESS:
      return {
        ...state,
        statusFeed: true
      };
    case WS_FEED_DISCONNECT:
      return {
        ...state,
        statusFeed: false
      };
    case WS_ORDERS_DISCONNECT:
      return {
        ...state,
        statusOrders: false
      };
    case WS_ORDERS_GET_MESSAGE:
      return {
        ...state,
        orders: {orders: action.payload.orders}
      };
    case WS_FEED_GET_MESSAGE:
      return {
        ...state,
        feed: {orders: action.payload.orders, total: action.payload.total, today: action.payload.totalToday}
      };
    default:
      return state;
  }
}; 