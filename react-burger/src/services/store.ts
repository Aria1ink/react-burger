import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware.js';
import { rootReducer } from "./slices/rootSlice";
import { urlWss } from '../variables/connection';
import { userOrdersActions, allOrdersActions } from './slices/ws';
//import { listenerOrdersMiddleware, listenerFeedMiddleware } from "./middleware/failsocketMiddleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    thunk, 
    socketMiddleware(urlWss, userOrdersActions),
    socketMiddleware( urlWss + '/all', allOrdersActions)
    //listenerOrdersMiddleware.middleware,
    //listenerFeedMiddleware.middleware
  ])
});
/*
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from './middleware/socketMiddleware';
import thunk from 'redux-thunk';
import { urlWss } from '../variables/connection';
import { userOrdersActions, allOrdersActions } from './actions/ws';

export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(
    thunk, 
    socketMiddleware(urlWss, userOrdersActions),
    socketMiddleware( urlWss + '/all', allOrdersActions)
    ))
  );
*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;