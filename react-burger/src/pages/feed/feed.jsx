import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersFromStore } from "../../utils/tools";
import OrderList from "../../components/OrderList/OrderList";
import { connectWS } from "../../services/actions/ws";

export default function FeedPage() {
  const dispatch = useDispatch();
  const {orders, total, today} = useSelector(getAllOrdersFromStore);

  useEffect( () => {
    dispatch(connectWS('feed'));
  }, []);

  return (
    <>
      <OrderList orders={orders} />
    </>
  );
}