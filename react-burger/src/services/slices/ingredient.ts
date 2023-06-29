import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../types/ingredients';

export type IngredientState = {
  current: Ingredient | null
};

const initialState: IngredientState = {
  current: null
};

export const IngredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setIngredient: (state: IngredientState, action: PayloadAction<Ingredient>) => {
      state.current = action.payload
    },
    clearIngredient: (state: IngredientState) => {
      state.current = null
    },
  },
})


export const { setIngredient, clearIngredient} = IngredientSlice.actions

export default IngredientSlice.reducer