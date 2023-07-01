import React from "react";
import style from "./OrderStatusList.module.css";

type Props = {
  title: string;
  numbers: number[];
};

export default function OrderStatusList({title, numbers}: Props) {

  return(
    <div>
      <h2 className="text text_type_main-medium pb-6"> { title } </h2>
      <div className={style.numbersContainer}>
        { numbers.map( (number) => {
          return(
            <p className={style.number + " text text_type_digits-default"} key={number}> { number } </p>
          );
        })}
      </div>
    </div>
  );
}