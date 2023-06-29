import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../types/ingredients';

export type IngredientsState  = {
  status: 'loading' | 'failed' | 'loaded';
  ingredients: Ingredient[] | null;
};

const initialState: IngredientsState = {
  status: "loading",
  ingredients: [],
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientsSuccess: (state, action: PayloadAction<Ingredient[]>) => {
      state.status = 'loaded';
      state.ingredients = action.payload;
    },
    setIngredientsError: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.status = 'failed';
      state.ingredients = [];
    },
    setIngredientsRequest: (state) => {
      state.status = 'loading';
    },
  },
})

export const { setIngredientsSuccess, setIngredientsError, setIngredientsRequest } = ingredientsSlice.actions

export default ingredientsSlice.reducer