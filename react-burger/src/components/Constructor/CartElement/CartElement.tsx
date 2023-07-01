import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { removeIngredient, moveIngredient } from "../../../services/slices/cart";
import style from "./CartElement.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CartIngredient, Ingredient } from "../../../services/types/ingredients";
import { useAppDispatch } from "../../../utils/tools/hooks";
type props = {
  className?: string;
  key: string;
  type?: "top" | "bottom";
  isLocked: boolean;
  item: Ingredient;
  addStyle?: string;
  id?: string;
};

export default function CartElement(props: props) {
  const ingredient = props.item;
  const cartId = props.id;
  const dispatch = useAppDispatch();
  const [{isDrag}, dragRef] = useDrag({
    type: "cartItem",
    item: {cartId: cartId, ingredient: ingredient},
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });
  const [, dropTarget] = useDrop({
    accept: "cartItem",
    drop(item: CartIngredient) {
      onDropHandler(item);
    },
  });
  const onDropHandler = (item: CartIngredient) => {
    if (cartId) {
      dispatch(moveIngredient({from: item.cartId, to: cartId, ingredient: item}));
    };
  };
  const removeCartItem = (cartId: string) => {
    dispatch(removeIngredient(cartId));
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
        //className={props.addStyle || undefined}   ???????
        handleClose= {(() => {
          if (cartId) {
          removeCartItem(cartId);
          }
        })}
      />
    </li>
  );
};