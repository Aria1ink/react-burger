import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./Price.module.css";
import currencyIconMedium from '../../image/currency.svg';

type Props = {
  price: number;
  type?: 'secondary' | 'primary' | 'error' | 'success';
  font?: string;
};

export default function Price (props: Props) {

  return (
    <div className={style.Price}>
      <p className={"text text_type_digits-"+ (props.font || "default")}> {props.price} </p>
      {props.font === 'medium'? <img src={currencyIconMedium} alt="Иконка валюты" /> : <CurrencyIcon type={props.type || "primary"} />}
    </div>
  );
}