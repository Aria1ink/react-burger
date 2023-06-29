import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartIngredient, Ingredient } from '../types/ingredients';

export type CartState  = {
  bun: Ingredient | null;
  others: CartIngredient[] | null | undefined;
};
type moveIngredient = {
  from: string;
  to: string;
  ingredient: CartIngredient
}

const initialState: CartState = {
  bun: null,
  others: null,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    defaultIngredients: (state, action: PayloadAction<CartIngredient[]>) => {
      state.others = action.payload
    },
    setBun: (state, action: PayloadAction<Ingredient>) => {
      state.bun = action.payload
    },
    addIngredient: (state, action: PayloadAction<CartIngredient>) => {
      state.others?.push(action.payload)
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.others = state.others?.filter(item => item.cartId !== action.payload)
    },
    moveIngredient: (state, action: PayloadAction<moveIngredient>) => {
      let from: number;
      let to: number;
      const tempArr= state.others;
      from = state.others?.findIndex(item => item.cartId === action.payload.from) || 0;
      from >= 0 && tempArr?.splice(from, 1);
      to = state.others?.findIndex(item => item.cartId === action.payload.to) || 0;
      to >= 0 && tempArr?.splice(to, 0, action.payload.ingredient);
      state.others = tempArr;
    },
  },
})

export const { defaultIngredients, setBun, addIngredient, removeIngredient, moveIngredient } = cartSlice.actions

export default cartSlice.reducer
