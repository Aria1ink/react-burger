import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from "../AppHeader/AppHeader";
import { loadIngredients } from "../../services/actions/ingredients";
import { getItemById, getIngredientsFromStore, getUserOrdersFromStore, getAllOrdersFromStore } from "../../utils/tools";
import { setSelectedIngredient } from "../../services/actions/ingredient";
import { loginUser } from "../../services/actions/auth";
import style from "./Layout.module.css";
import { getUserProfileWithCheck } from "../../utils/user";
import { setSelectedOrder } from "../../services/actions/selectedOrder";

export default function Layout() {
  const dispatch = useDispatch();
  const infredients = useSelector(getIngredientsFromStore);
  const { orders, } = useSelector(getAllOrdersFromStore);
  const userOrders = useSelector(getUserOrdersFromStore);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadIngredients());
    getUserProfileWithCheck(dispatch)
      .then( (result) => {
        if (result) {
          dispatch(loginUser());
        }
      })
      .catch( (err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/ingredients") && id && infredients.length > 0) {
      const tempIngredient = getItemById(id, infredients);
      if (tempIngredient) {
        dispatch(setSelectedIngredient(tempIngredient));
      } else {
        navigate("/");
      }
    };
  }, [infredients]);

  useEffect(() => {
    if (location.pathname.startsWith("/feed") && id && orders.length > 0) {
      const tempOrder = getItemById(id, orders);
      if (tempOrder) {
        dispatch(setSelectedOrder(tempOrder));
      } else {
        navigate("/feed");
      }
    };
  }, [orders]);

  useEffect(() => {
    if (location.pathname.startsWith("/profile/orders") && id && userOrders.length > 0) {
      const tempOrder = getItemById(id, userOrders);
      if (tempOrder) {
        dispatch(setSelectedOrder(tempOrder));
      } else {
        navigate("/profile/orders");
      }
    };
  }, [userOrders]);

  return (
    <>
      <AppHeader />
      <main className={style.AppMain + " pb-10"}>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}