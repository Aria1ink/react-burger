import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware.js';
import { rootReducer } from "./slices/rootSlice";
import { urlWss } from '../variables/connection';
import { userOrdersActions, allOrdersActions } from './slices/ws';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    thunk, 
    socketMiddleware(urlWss, userOrdersActions),
    socketMiddleware( urlWss + '/all', allOrdersActions)
  ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;