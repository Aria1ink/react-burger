import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersFromStore } from "../../utils/tools";
import { connectWS } from "../../services/actions/ws";
import OrderList from '../../components/OrderList/OrderList';
import style from "./orders.module.css";

export default function OrdersPage(){
  const dispatch = useDispatch();
  const orders = useSelector(getUserOrdersFromStore);

  useEffect( () => {
    dispatch(connectWS('orders'));
  }, []);

  return (
    <div className={style.container}>
      <OrderList orders={orders} />
    </div>
  );
}