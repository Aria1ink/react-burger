import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./Price.css";
import currencyIconMedium from '../../image/currency.svg';
export default function Price (props) {

  return (
    <div className="Price">
      <p className={"text text_type_digits-"+ (props.font || "default")}> {props.price} </p>
      {props.font === 'medium'? <img src={currencyIconMedium} alt="Иконка валюты" /> : <CurrencyIcon type={props.type || "primary"} />}
    </div>
  );
}