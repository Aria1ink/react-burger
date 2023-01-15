import React from "react";
import PropTypes from 'prop-types';
import style from './FoodEnergy.module.css';

export default function FoodEnergy (props) {

  return ( 
    <div className={style.FoodEnergy} >
      <p className="text text_type_main-default text_color_inactive"> {props.title} </p>
      <p className="text text_type_digits-default text_color_inactive"> {props.value} </p>
    </div>
  );
};

FoodEnergy.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string
}; 