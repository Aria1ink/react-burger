import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getItemById } from "../../utils/tools/dataTools";
import { getSelectedOrderFromStore, getUserOrdersFromStore, getAllOrdersFromStore } from "../../utils/tools/storeTools";
import { setSelectedOrder } from "../../services/slices/selectedOrder";
import OrderModal from "../../components/Orders/OrderModal/OrderModal";
import Preloader from "../../components/Preloader/Preloader";
import { wsFeedConnect, wsFeedDisconnect, wsOrdersConnect, wsOrdersDisconnect } from "../../services/slices/ws";
import style from "./order.module.css";
import { Order } from "../../services/types/store";

export default function OrderPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const order = useSelector(getSelectedOrderFromStore);
  const userOrders = useSelector(getUserOrdersFromStore);
  const { orders, } = useSelector(getAllOrdersFromStore);
  let tempOrder: Order | boolean = false;

  useEffect( () => {
    if (location.pathname.startsWith("/feed")) {
      dispatch(wsFeedConnect());
    } else if (location.pathname.startsWith("/profile/orders")) {
      dispatch(wsOrdersConnect());
    }
  }, []);

  useEffect( () => {
    if (id && orders && orders.length > 0) {
      tempOrder = getItemById(id, orders);
      if (!tempOrder) {
        navigate("/feed");
      } else {
        dispatch(setSelectedOrder(tempOrder));
      }
      dispatch(wsFeedDisconnect());
    }
  }, [orders]);
  
  useEffect( () => {
    if (id && userOrders && userOrders.length > 0) {
      tempOrder = getItemById(id, userOrders);
      if (!tempOrder) {
        navigate("/profile/orders");
      } else {
        dispatch(setSelectedOrder(tempOrder));
      }
      dispatch(wsOrdersDisconnect());
    }
  }, [userOrders]);

  if (order) {
    return(
      <div className={style.orderContainer}>
        <OrderModal />
      </div>
    );
  }

  return(
    <Preloader />
  )
}