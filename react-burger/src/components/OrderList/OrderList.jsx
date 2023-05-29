import React, { useEffect, useState} from "react";
import OrderElement from "../OrderElement/OrderElement";
import style from "./OrderList.module.css";

export default function OrderList({orders}) {

  return(
    <div className={style.OrderListContainer}>
      {
        orders.length > 0 && orders.map((order) => {
          return( <OrderElement order={order} key= {order._id} />)
        })
      }
    </div>
  )
}