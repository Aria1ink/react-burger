import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connectWS } from "../../services/actions/ws";

export default function OrdersPage(){
  const dispatch = useDispatch();
  dispatch(connectWS('orders'));


  return (
    'Orders'
  );
}