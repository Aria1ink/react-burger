import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../Price/Price";
import style from "./IngredientElement.module.css";
import { setIngredient } from "../../../services/slices/ingredient";
import { getCartFromStore } from "../../../utils/tools/storeTools";
import { Ingredient } from "../../../services/types/ingredients";
import { useAppDispatch, useAppNavigate, useAppSelector } from "../../../utils/tools/hooks";

type Props = {
  ingredient: Ingredient;
};

export default function IngredientElement (props: Props) {
  const ingredient = props.ingredient; 
  const [count, setCount] = useState<number>(0);
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  let tempCount = 0;
  const cart = useAppSelector(getCartFromStore);

  const openIngredientDetails = (ingredient: Ingredient) => {
    dispatch(setIngredient(ingredient));
    navigate("/ingredients/"+ingredient._id, {replace: false, state: {from: "/"}});
  };
  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });

  useEffect(() => {
    if (cart.others && cart.others?.length > 0 && cart.bun) {
      if (cart.bun._id === ingredient._id) {
        ++tempCount;
      } else {
        cart.others.forEach(element => {
          if( element.ingredient._id === ingredient._id) {
            ++tempCount;
          }
        });
      };
      setCount(tempCount);
      tempCount = 0;
    };
  }, [cart]);

  return (
    <li 
      ref={dragRef}
      className={style.Ingredient + " pl-4 pb-4 pr-4"} 
      id= {ingredient._id} 
      onClick={() => {openIngredientDetails(ingredient)}}
      style={ !isDrag ? {opacity: "1"} : {opacity: "0.4", cursor: "grab"} }
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img className={style.OrderIngredientImage} src={ingredient.image} alt={ingredient.name} />
      <p className={style.IngredientTitle + " text text_type_main-default"}>{ingredient.name}</p>
      <Price price={ingredient.price}/>
    </li>
  );
};