import React from "react";
import style from "./IngredientImage.module.css";

export default function IngredientImage({url, custom}) {

  return(
    <div className={style.imageContainer } >
      <img src={url} className={style.image}/>
    </div>
  );
}