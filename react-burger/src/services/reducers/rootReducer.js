import { combineReducers } from 'redux';
import constructorReducer from "./cart";
import orderReducer from "./order";
import ingredientReducer from "./ingredient";
import ingredientsReducer from "./ingredients";
import menuReducer from "./menu";

export const rootReducer = combineReducers({
  cart: constructorReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  menu: menuReducer
})