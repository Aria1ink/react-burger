import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type MenuState  = 'bun' | 'sauce' | 'main';

const initialState: {tab: MenuState} = {
  tab: 'bun'
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveTabMenu: (state: {tab: MenuState}, action: PayloadAction<MenuState>) => {
      state.tab = action.payload
    },
  },
})

export const { setActiveTabMenu } = menuSlice.actions

export default menuSlice.reducer