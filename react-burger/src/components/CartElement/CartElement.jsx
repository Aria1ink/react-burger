import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import style from "./CartElement.module.css";

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
export default function CartElement(props) {
const ingredient = props.item;
const [{isDrag}, dragRef] = useDrag({
  type: "ingredient",
  item: {cartId: props.id, ingredient: ingredient},
  collect: monitor => ({
      isDrag: monitor.isDragging()
  })
});

return (              
  <li ref={dragRef} className={style.item + " " + props.className} style={ !isDrag ? {opacity: "1"} : {opacity: "0.4", cursor: "grab"} }>
    { ingredient.type !== "bun" && 
      <DragIcon type={"primary"} />
    }
    <ConstructorElement
      type={props.type}
      isLocked={props.isLocked}
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      className={props.style}
    />
  </li>
);

};