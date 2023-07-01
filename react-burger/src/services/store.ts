import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware';
import { rootReducer } from "./slices/rootSlice";
import { URL_WSS } from '../variables/connection';
import { userOrdersActions, allOrdersActions } from './slices/ws';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    thunk, 
    socketMiddleware(URL_WSS, userOrdersActions),
    socketMiddleware(URL_WSS + '/all', allOrdersActions)
  ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;