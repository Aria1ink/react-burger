import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from './middleware/socketMiddleware';
import thunk from 'redux-thunk';

export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(
    thunk, 
    socketMiddleware('wss://norma.nomoreparties.space/orders')
    ))
  );