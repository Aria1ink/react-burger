import React, { useEffect } from "react";
import { getItemById } from "../../utils/tools/dataTools";
import { getSelectedOrderFromStore, getUserOrdersFromStore, getAllOrdersFromStore } from "../../utils/tools/storeTools";
import { setSelectedOrder } from "../../services/slices/selectedOrder";
import OrderModal from "../../components/Orders/OrderModal/OrderModal";
import Preloader from "../../components/Preloader/Preloader";
import { wsFeedConnect, wsFeedDisconnect, wsOrdersConnect, wsOrdersDisconnect } from "../../services/slices/ws";
import style from "./order.module.css";
import { Order } from "../../services/types/store";
import { useAppDispatch, useAppLocation, useAppNavigate, useAppParams, useAppSelector } from "../../utils/tools/hooks";

export default function OrderPage() {
  const location = useAppLocation();
  const dispatch = useAppDispatch();
  const { id } = useAppParams();
  const navigate = useAppNavigate();
  const order = useAppSelector(getSelectedOrderFromStore);
  const userOrders = useAppSelector(getUserOrdersFromStore);
  const { orders, } = useAppSelector(getAllOrdersFromStore);
  let tempOrder: Order | boolean = false;

  useEffect( () => {
    if (location.pathname.startsWith("/feed")) {
      dispatch(wsFeedConnect());
    } else if (location.pathname.startsWith("/profile/orders")) {
      dispatch(wsOrdersConnect());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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