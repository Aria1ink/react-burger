import { setIngredientsRequest, setIngredientsSuccess, setIngredientsError } from "../../services/slices/ingredients";
import { getIngredientsApi } from "../api";
//import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
//import type { RootState, AppDispatch } from '../../services/store';
export const getCurrentIngredientFromStore = store => store.ingredient.current;
export const getSelectedOrderFromStore = store => store.selectedOrder.current;
export const getCartFromStore = store => store.cart;
export const getMenuStatusFromStore = store => store.menu.tab;
export const getIngredientsFromStore = store => store.ingredients.ingredients;
export const loadIngredientsStatus = store => store.ingredients.status;
export const getOrderNumberFromStore = store => store.order.current;
export const getAuthUser = store => store.auth;
export const getUserOrdersFromStore = store => store.ws.orders.orders;
export const getAllOrdersFromStore = store => store.ws.feed;
export const getWSStatusFromStore = store => store.ws.status;

//export const dispatch: () => AppDispatch = useDispatch;
//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const loadIngredients = () => {
  return (dispatch) => {
    dispatch(setIngredientsRequest());
    getIngredientsApi()
    .then(
      (data) => {
        dispatch(setIngredientsSuccess(data.data));
      }
    )
    .catch((err) => {
      dispatch(setIngredientsError());
      console.log(`Ошибка: ${err}`);
    });
  }
};