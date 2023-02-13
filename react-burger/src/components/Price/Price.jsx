import React from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./Price.module.css";
import currencyIconMedium from '../../image/currency.svg';
export default function Price (props) {

  return (
    <div className={style.Price}>
      <p className={"text text_type_digits-"+ (props.font || "default")}> {props.price} </p>
      {props.font === 'medium'? <img src={currencyIconMedium} alt="Иконка валюты" /> : <CurrencyIcon type={props.type || "primary"} />}
    </div>
  );
}

Price.propTypes = {
  price: PropTypes.number.isRequired,
  type: PropTypes.string,
  font: PropTypes.string
}; 