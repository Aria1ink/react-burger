import React from "react";
import PropTypes from "prop-types";
import OrderIngredientImage from "../OrderIngredientImage/OrderIngredientImage";
import { v4 as uuidv4 } from "uuid";
import style from "./OrderImages.module.css";

export default function OrderImages({ images }) {

  return(
    <div className={style.imagesContainer}>
      {
        images.map( (image, index) => {
          if (index <= 5) {
            if (index < 5 ) {
              return(
                <OrderIngredientImage url={image} key={uuidv4()}/>
              )
            } else  {
              return(
                <div key={uuidv4()}>
                  <OrderIngredientImage url={image} />
                  <div className={style.overlay + " text text_type_main-default"}>
                    +{images.length - 5}
                  </div>
                </div>
              )
            }
          }
          return('');
        })
      }
    </div>
  );
}

OrderImages.propTypes = {
  images: PropTypes.array.isRequired
}; 