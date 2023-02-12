import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { delCartIngredient, moveCartIngredient } from "../../services/actions/cart";
import style from "./CartElement.module.css";

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
export default function CartElement(props) {
const ingredient = props.item;
const cartId = props.id;
const dispatch = useDispatch();
const cart = useSelector(store => store.cart.others)
const [{isDrag}, dragRef] = useDrag({
  type: "cartItem",
  item: {cartId: cartId, ingredient: ingredient},
  collect: monitor => ({
      isDrag: monitor.isDragging()
  })
});
const [, dropTarget] = useDrop({
  accept: "cartItem",
  drop(item) {
    onDropHandler(item);
  },
});
const onDropHandler = (item) => {
  dispatch(moveCartIngredient(item.cartId, cartId, item));
};
const removeCartItem = (cartId) => {
  dispatch(delCartIngredient(cartId));
  console.log(cart)
};

return (              
  <li ref={(el)=> {dragRef(el); dropTarget(el);}} className={style.item + " " + props.className} style={ !isDrag ? {opacity: "1"} : {opacity: "0.4", cursor: "grab"} }>
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
      handleClose=
      { ingredient.type !== "bun" && (() => {removeCartItem(cartId, ingredient._id)})}
    />
  </li>
);

};