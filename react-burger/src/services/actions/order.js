import { setOrderApi } from '../../utils/api';
import { getAccessToken } from '../../utils/tools/tokenTools';
import { getOrderSuccess, setOrderError, setOrderRequest } from '../slices/order';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const HIDE_ORDER = 'HIDE_ORDER';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';

export const setOrderId = (id) => ({ type: GET_ORDER_SUCCESS, number: id });
export const hideOrderModal = () => ({ type: HIDE_ORDER} );
export const returnOrderError = () => ({ type: GET_ORDER_ERROR });
export const uploadOrder = () => ({ type: GET_ORDER_REQUEST });

export const createOrder = (orderItemsId) => {
  return (dispatch) => {
    dispatch(setOrderRequest());
    setOrderApi(orderItemsId, getAccessToken())
    .then(
      (data) => {
        dispatch(getOrderSuccess(data.order.number));
      }
    )
    .catch((err) => {
      dispatch(setOrderError());
      console.log(`Ошибка: ${err}`);
    });
  }
};