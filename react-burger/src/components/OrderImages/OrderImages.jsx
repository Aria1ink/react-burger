import React from "react";
import IngredientImage from "../IngredientImage/IngredientImage";
import { v4 as uuidv4 } from "uuid";
import style from "./OrderImages.module.css";

export default function OrderImages({ images }) {

  return(
    <div className={style.imagesContainer}>
      {
        images.map( (image, index) => {
          if (index < 6 || images.length < 6) {
            return(
              <IngredientImage url={image} custom={{zIndex: images.length - index, left: index * 50}} key={uuidv4()}/>
            )
          } else if (index = 5) {
            return(
              <div key={uuidv4()}>
                <IngredientImage url={image} custom={{zIndex: images.length - index -1, left: index * 50}}/>
                <div className={style.overlay + " text text_type_main-default"} style={{zIndex: images.length - index, left: index * 50 + 2}}>
                  +{images.length - 5}
                </div>
              </div>
            )
          }
        })
      }
    </div>
  );
}