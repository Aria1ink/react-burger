import React from "react";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './Price.css';
export default function Price (props) {

  return (
    <div className="Price">
      <p className={"text text_type_digits-"+ (props.font || "default")}> {props.price} </p>
      <CurrencyIcon type={props.type || "primary"} />
    </div>
  );
}