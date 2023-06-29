import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type SelectedOrderState  = {
  current: string[] | null
};

const initialState: SelectedOrderState = {
  current: null
};

export const selectedOrderSlice = createSlice({
  name: 'selectedOrder',
  initialState,
  reducers: {
    setSelectedOrder: (state: SelectedOrderState, action: PayloadAction<string[]>) => {
      state.current = action.payload;
    },
    clearSelectedOrder: (state: SelectedOrderState) => {
      state.current = null;
    },
  },
})

export const { setSelectedOrder, clearSelectedOrder } = selectedOrderSlice.actions;
export default selectedOrderSlice.reducer;