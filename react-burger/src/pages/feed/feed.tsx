import React, { useEffect, useState } from "react";
import { getItemById } from "../../utils/tools/dataTools";
import { getAllOrdersFromStore } from "../../utils/tools/storeTools";
import OrderList from "../../components/Orders/OrderList/OrderList";
import OrderCounter from "../../components/Orders/OrderCounter/OrderCounter";
import OrderStatusList from "../../components/Orders/OrderStatusList/OrderStatusList";
import { sortByDate } from "../../utils/tools/dataTools";
import { setSelectedOrder } from "../../services/slices/selectedOrder";
import Preloader from "../../components/Preloader/Preloader";
import { wsFeedConnect, wsFeedDisconnect } from "../../services/slices/ws";
import style from "./feed.module.css";
import { Orders } from "../../services/types/store";
import { useAppDispatch, useAppLocation, useAppNavigate, useAppParams, useAppSelector } from "../../utils/tools/hooks";

export default function FeedPage() {
  const dispatch = useAppDispatch();
  const { id } = useAppParams();
  const location = useAppLocation();
  const navigate = useAppNavigate();
  const {orders, total, totalToday} = useAppSelector(getAllOrdersFromStore);
  const [doneOrders, setDoneOrders] = useState<number[]>([]);
  const [inWorkOrders, setInWorkOrders] = useState<number[]>([]);
  const [sortedOrders, setSortedOrders] = useState<Orders>([]);

  useEffect( () => {
    dispatch(wsFeedConnect());

    return () => {
      dispatch(wsFeedDisconnect());
    };
  }, []);

  useEffect( () => {
    let tempDoneOrders: number[] = [];
    let tempInWorkOrders: number[] = [];
    if (location.pathname.startsWith("/feed") && id && orders.length > 0) {
      const tempOrder = getItemById(id, orders);
      if (tempOrder) {
        dispatch(setSelectedOrder(tempOrder));
      } else {
        navigate("/feed");
      }
    };
    if (orders && orders?.length > 0) {
      setSortedOrders(sortByDate(orders));
      orders.forEach( (order) => {
        if (order.status === "done") {
          tempDoneOrders.push(order.number);
        } else {
          tempInWorkOrders.push(order.number);
        }
      });
      setDoneOrders(tempDoneOrders);
      setInWorkOrders(tempInWorkOrders);
      tempDoneOrders = [];
      tempInWorkOrders = [];
    }
  }, [orders]);

  if (sortedOrders.length === 0) {
    return(
      <Preloader />
    )
  }
  return (
    <div className={style.FeedPageContainer}>
      <div className={style.feedContainer}>
        <h1 className={style.header + " text text_type_main-large pb-5"}>Лента заказов</h1>
        <OrderList orders={sortedOrders} />
      </div>
      <div className={style.counterContainer}>
        <div className={style.FeedPageStatusLists}>
          <OrderStatusList title="Готовы:" numbers={ doneOrders } />
          <OrderStatusList title="В работе:" numbers={ inWorkOrders } />
        </div>
        <OrderCounter title="Выполнено за все время:" number={total} />
        <OrderCounter title="Выполнено за сегодня:" number={totalToday} />
      </div>
    </div>
  );
}