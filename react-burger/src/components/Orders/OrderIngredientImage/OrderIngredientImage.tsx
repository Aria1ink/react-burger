import React from "react";
import style from "./OrderIngredientImage.module.css";

type Props = {
  url: string;
};

export default function OrderIngredientImage({url}: Props) {

  return(
    <div className={style.imageContainer } >
      <img src={url} className={style.image} alt="Ингредиент бургера"/>
    </div>
  );
}