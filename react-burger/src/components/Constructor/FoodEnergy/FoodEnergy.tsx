import React from "react";
import style from './FoodEnergy.module.css';

type Props = {
  title: string;
  value: number;
};

export default function FoodEnergy (props: Props) {

  return ( 
    <div className={style.FoodEnergy} >
      <p className="text text_type_main-default text_color_inactive"> {props.title} </p>
      <p className="text text_type_digits-default text_color_inactive"> {props.value} </p>
    </div>
  );
};