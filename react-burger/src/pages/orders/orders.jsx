import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserOrdersFromStore } from "../../utils/tools/storeTools";
import { connectWS, disconnectWS } from "../../services/actions/ws";
import OrderList from '../../components/Orders/OrderList/OrderList';
import { sortByDate, getItemById } from '../../utils/tools/dataTools';
import { setSelectedOrder } from '../../services/actions/selectedOrder';
import Preloader from '../../components/Preloader/Preloader';
import style from "./orders.module.css";

export default function OrdersPage(){
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orders = useSelector(getUserOrdersFromStore);
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect( () => {
    dispatch(connectWS('orders'));

    return () => {
      dispatch(disconnectWS('feed'));
    };
  }, []);

  useEffect( () => {
    setSortedOrders(sortByDate(orders));
    if (location.pathname.startsWith("/profile/orders") && id && orders.length > 0) {
      const tempOrder = getItemById(id, orders);
      if (tempOrder) {
        dispatch(setSelectedOrder(tempOrder));
      } else {
        navigate("/profile/orders");
      }
    };
  }, [orders]);

  if (sortedOrders.length === 0) {
    return(
      <Preloader />
    )
  }
  return (
    <div className={style.container}>
      <OrderList orders={sortedOrders} />
    </div>
  );
}