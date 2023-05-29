import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersFromStore } from "../../utils/tools";
import OrderList from "../../components/OrderList/OrderList";
import OrderCounter from "../../components/OrderCounter/OrderCounter";
import OrderStatusList from "../../components/OrderStatusList/OrderStatusList";
import { connectWS, disconnectWS } from "../../services/actions/ws";
import { sortByDate } from "../../utils/tools";
import Preloader from "../../components/Preloader/Preloader";
import style from "./feed.module.css";

export default function FeedPage() {
  const dispatch = useDispatch();
  const {orders, total, today} = useSelector(getAllOrdersFromStore);
  const [doneOrders, setDoneOrders] = useState([]);
  const [inWorkOrders, setInWorkOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect( () => {
    dispatch(connectWS('feed'));

    return () => {
      dispatch(disconnectWS('feed'));
    };
  }, []);

  useEffect( () => {
    let tempDoneOrders = [];
    let tempInWorkOrders = [];
    setSortedOrders(sortByDate(orders));
    orders.map( (order) => {
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
        <OrderCounter title="Выполнено за сегодня:" number={today} />
      </div>
    </div>
  );
}