import React from "react";
import PropTypes from "prop-types";
import style from "./OrderStatus.module.css";

export default function OrderStatus({status}) {

  if (status === "done"){
    return(
      <p className={style.done + " text text_type_main-default"}> Выполнен </p>
    );
  }

  if (status === "created"){
    return(
      <p className={style.paragraph + " text text_type_main-default"}> Создан </p>
    );
  }

  return(
    <p className={style.paragraph + " text text_type_main-default"}> Готовится </p>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.string.isRequired
}; 