import React from "react";
import PropTypes from "prop-types";
import style from "./OrderStatusList.module.css";

export default function OrderStatusList({title, numbers}) {

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

OrderStatusList.propTypes = {
  title: PropTypes.string.isRequired,
  numbers: PropTypes.array.isRequired
}; 