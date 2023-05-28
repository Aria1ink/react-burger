import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import OrderElement from '../../components/OrderElement/OrderElement';
import { getUserOrdersFromStore } from "../../utils/tools";
import { connectWS } from "../../services/actions/ws";

export default function OrdersPage(){
  const dispatch = useDispatch();
  const orders = useSelector(getUserOrdersFromStore);

  useEffect( () => {
    dispatch(connectWS('orders'));
  }, []);

  return (
    <>
      {
        orders.length > 0 && orders.map((order) => {
          return( <OrderElement order={order} key= {order._id} />)
        })
      }
    </>
  );
}