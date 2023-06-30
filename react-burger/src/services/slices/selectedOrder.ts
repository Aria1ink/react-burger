import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types/store';

export type SelectedOrderState  = {
  current: Order | null
};

const initialState: SelectedOrderState = {
  current: null
};

export const selectedOrderSlice = createSlice({
  name: 'selectedOrder',
  initialState,
  reducers: {
    setSelectedOrder: (state: SelectedOrderState, action: PayloadAction<Order>) => {
      state.current = action.payload;
    },
    clearSelectedOrder: (state: SelectedOrderState) => {
      state.current = null;
    },
  },
})

export const { setSelectedOrder, clearSelectedOrder } = selectedOrderSlice.actions;
export default selectedOrderSlice.reducer;