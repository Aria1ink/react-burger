import React from "react";
import PropTypes from 'prop-types';
import style from "./OrderDetails.module.css";
import imgDone from "../../image/done.svg";

export default function OrderDetails (props) {

  return (
    <div className={style.OrderDetails}>
      <p className={style.OrderDetailsNumber + " text text_type_digits-large pt-4"}> { props.number } </p>
      <p className="text text_type_main-small pt-8">идентификатор заказа</p>
      <img className="pt-15 pb-15" src={imgDone} alt="Галочка" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className=" =text text_type_main-default text_color_inactive pt-2 pb-15">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

OrderDetails.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number])
}; 