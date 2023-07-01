import cartReducer from "./cart";
import orderReducer from "./order";
import ingredientReducer from "./ingredient";
import ingredientsReducer from "./ingredients";
import menuReducer from "./menu";
import authReducer from "./auth";
import wsReducer from "./ws";
import selectedOrder from "./selectedOrder";

export const rootReducer = {
  cart: cartReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  menu: menuReducer,
  auth: authReducer,
  ws: wsReducer,
  selectedOrder: selectedOrder,
};