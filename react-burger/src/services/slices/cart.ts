import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Ingredient } from '../types/ingredients';

export type CartState  = {
  bun: Ingredient | null;
  others: Ingredient[] | null;
};

const initialState: CartState = {
  bun: null,
  others: null,
}

export const cartSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    defaultIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.others = action.payload
    },
    setBun: (state, action: PayloadAction<Ingredient>) => {
      state.bun = action.payload
    },
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.others?.push(action.payload)
    },
    removeIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.error = action.payload
    },
  },
})
others: [
  ...state.others,
  { cartId: action.uuidv4,
    ingredient: action.ingredient
  }]

export const { login, logout, setUser, authError } = authSlice.actions

export default authSlice.reducer