import React, { useEffect, useState } from 'react';
import { getUserOrdersFromStore } from "../../utils/tools/storeTools";
import OrderList from '../../components/Orders/OrderList/OrderList';
import { sortByDate, getItemById } from '../../utils/tools/dataTools';
import { setSelectedOrder } from '../../services/slices/selectedOrder';
import Preloader from '../../components/Preloader/Preloader';
import { wsOrdersConnect, wsOrdersDisconnect } from '../../services/slices/ws';
import style from "./orders.module.css";
import { Orders } from '../../services/types/store';
import { useAppDispatch, useAppLocation, useAppNavigate, useAppParams, useAppSelector } from '../../utils/tools/hooks';

export default function OrdersPage(){
  const dispatch = useAppDispatch();
  const { id } = useAppParams();
  const location = useAppLocation();
  const navigate = useAppNavigate();
  const orders = useAppSelector(getUserOrdersFromStore);
  const [sortedOrders, setSortedOrders] = useState<Orders>([]);

  useEffect( () => {
    dispatch(wsOrdersConnect());

    return () => {
      dispatch(wsOrdersDisconnect());
    };
    // Запуск только при монтировании элемента
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect( () => {
    if (orders && orders?.length > 0) {
      setSortedOrders(sortByDate(orders));
    }
    if (location.pathname.startsWith("/profile/orders") && id && orders.length > 0) {
      const tempOrder = getItemById(id, orders);
      if (tempOrder) {
        dispatch(setSelectedOrder(tempOrder));
      } else {
        navigate("/profile/orders");
      }
    };
    // сортировка массива заказов при изменении массива
    // eslint-disable-next-line react-hooks/exhaustive-deps
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