import React from "react";
import PropTypes from 'prop-types';
import style from "./OrderIngredientImage.module.css";

export default function OrderIngredientImage({url}) {

  return(
    <div className={style.imageContainer } >
      <img src={url} className={style.image} alt="Ингредиент бургера"/>
    </div>
  );
}

OrderIngredientImage.propTypes = {
  url: PropTypes.string.isRequired,
}; 