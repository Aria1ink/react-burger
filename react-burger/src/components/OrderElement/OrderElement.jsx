import React from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./OrderElement.module.css";

export default function OrderElement({ order }) {
  return(
    <div className={style.OrderElementContainer}>
      <div>
        
      </div>
      <p> {order.name} </p>
      <p></p>
      <div>
        <div>

        </div>

      </div>
    </div>
  );
}