import { combineReducers } from 'redux';
import constructorReducer from "./cart";
import orderReducer from "./order";
import ingredientReducer from "./ingredient";
import ingredientsReducer from "./ingredients";
import menuReducer from "./menu";
import authReducer from "./auth";
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
  cart: constructorReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  menu: menuReducer,
  auth: authReducer,
  ws: wsReducer
})