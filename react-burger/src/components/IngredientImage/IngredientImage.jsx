import React from "react";
import PropTypes from 'prop-types';
import style from "./IngredientImage.module.css";

export default function IngredientImage({url}) {

  return(
    <div className={style.imageContainer } >
      <img src={url} className={style.image} alt="Ингредиент бургера"/>
    </div>
  );
}

IngredientImage.propTypes = {
  url: PropTypes.string.isRequired,
}; 