import { setIngredientsRequest, setIngredientsSuccess, setIngredientsError } from "../../services/slices/ingredients";
import { AppDispatch, RootState } from "../../services/store";
import { getIngredientsApi, setOrderApi } from "../api";
import { getOrderSuccess, setOrderError, setOrderRequest } from "../../services/slices/order";
import { getAccessToken } from "./tokenTools";

export const getCurrentIngredientFromStore = (store: RootState) => store.ingredient.current;
export const getSelectedOrderFromStore = (store: RootState) => store.selectedOrder.current;
export const getCartFromStore = (store: RootState) => store.cart;
export const getMenuStatusFromStore = (store: RootState) => store.menu.tab;
export const getIngredientsFromStore = (store: RootState) => store.ingredients.ingredients;
export const loadIngredientsStatus = (store: RootState) => store.ingredients.status;
export const getOrderNumberFromStore = (store: RootState) => store.order.current;
export const getAuthUser = (store: RootState)  => store.auth;
export const getUserOrdersFromStore = (store: RootState) => store.ws.orders.orders;
export const getAllOrdersFromStore = (store: RootState) => store.ws.feed;

export const loadIngredients = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setIngredientsRequest());
    getIngredientsApi()
    .then(
      (data) => {
        dispatch(setIngredientsSuccess(data.data));
      }
    )
    .catch((err) => {
      dispatch(setIngredientsError(err));
      console.log(`Ошибка: ${err}`);
    });
  }
};
export const createOrder = (orderItemsId: string[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(setOrderRequest());
    const token = getAccessToken();
    if (token) {
      setOrderApi(orderItemsId, token)
      .then(
        (data) => {
          dispatch(getOrderSuccess(data.order.number));
        }
      )
      .catch((err) => {
        dispatch(setOrderError());
        console.log(`Ошибка: ${err}`);
      });
    }
  }
};