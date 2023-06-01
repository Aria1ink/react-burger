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