import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Orders, Feed, socketData } from '../types/store';

export type WSState  = {
  orders: {
    orders: Orders[];
  };
  feed: Feed;
  statusOrders: boolean;
  statusFeed: boolean;
};

const initialState: WSState = {
  orders: {
    orders: []
  },
  feed: {
    orders: [], total: 0, totalToday: 0
  },
  statusOrders: false,
  statusFeed: false
};

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsOrdersConnect: (state: WSState) => {
    },
    wsFeedConnect: (state: WSState) => {
    },
    wsOrdersSuccess: (state: WSState) => {
      state.statusOrders = true;
    },
    wsFeedSuccess: (state: WSState) => {
      state.statusFeed = true;
    },
    wsOrdersDisconnect: (state: WSState) => {
      state.statusOrders = false;
    },
    wsFeedDisconnect: (state: WSState) => {
      state.statusFeed = false;
    },
    wsOrdersGetMessage: (state: WSState, action:PayloadAction<socketData>) => {
      state.orders.orders = action.payload.orders;
    },
    wsFeedGetMessage: (state: WSState, action:PayloadAction<socketData>) => {
      state.feed.orders = action.payload.orders;
      if (action.payload.totalToday) {
        state.feed.totalToday = action.payload.totalToday;
      }
      if (action.payload.total) {
        state.feed.total = action.payload.total;
      }
    },
  },
})

export const { 
  wsOrdersConnect,
  wsFeedConnect,
  wsOrdersSuccess, 
  wsFeedSuccess, 
  wsOrdersDisconnect, 
  wsFeedDisconnect, 
  wsOrdersGetMessage, 
  wsFeedGetMessage } = wsSlice.actions;
export const userOrdersActions = {
  wsInit: wsOrdersConnect,
  onOpen: wsOrdersSuccess, 
  onClose: wsOrdersDisconnect, 
  onMessage: wsOrdersGetMessage, 
};
export const allOrdersActions = {
  wsInit: wsFeedConnect,
  onOpen: wsFeedSuccess, 
  onClose: wsFeedDisconnect, 
  onMessage: wsFeedGetMessage, 
};
export default wsSlice.reducer;