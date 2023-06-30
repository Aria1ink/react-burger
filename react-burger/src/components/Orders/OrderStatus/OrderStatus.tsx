import React from "react";
import style from "./OrderStatus.module.css";

type Props = {
  status: string;
};

export default function OrderStatus({status}: Props) {

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