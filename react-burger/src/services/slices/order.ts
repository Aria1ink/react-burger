import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setOrderApi } from '../../utils/api';
import { getAccessToken } from '../../utils/tools/tokenTools';
import { AppDispatch } from '../store';

export type OrderState = {
  current: number
};

const initialState: OrderState = {
  current: 0
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrderSuccess: (state: OrderState, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    setOrderRequest: (state: OrderState) => {
      state.current = 0;
    },
    setOrderError: (state: OrderState) => {
      state.current = 0;
    },
    hideOrder: (state: OrderState) => {
      state.current = 0;
    },
  },
});
/*
export const createOrder = (orderItemsId: string[]) => {
  return (dispatch: AppDispatch) => {
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
*/
export const { getOrderSuccess, setOrderRequest, setOrderError, hideOrder } = orderSlice.actions;

export default orderSlice.reducer;