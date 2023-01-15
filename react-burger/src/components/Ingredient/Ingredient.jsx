import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../Price/Price"
import style from "./Ingredient.module.css"

export default function Ingredient (props) {
  const ingredient = props.ingredient; 
  const [count, setCount] = useState(0);
  let tempCount = 0;
  const cart = props.cart.cart;
  const setModalState = props.modal.setModalState;

  useEffect(() => {
    cart.forEach(element => {
      if( element._id === ingredient._id) {
        ++tempCount;
      }
    });;
    setCount(tempCount);
    tempCount = 0;
  }, [cart]);

  return (
    <li 
      className={style.Ingredient + " pl-4 pb-4 pr-4"} 
      key={ingredient.id} 
      id= {ingredient.id} 
      onClick={() => {setModalState({
        display: "flex",
        type: "ingredient",
        title: "Детали ингредиента",
        data: ingredient
      })}}
    >
      {count > 0 && <Counter className="IngredientCounter" count={count} size="default" extraClass="m-1" />}
      <img className={style.IngredientImage} src={ingredient.image} alt={ingredient.name} />
      <p className={style.IngredientTitle + " text text_type_main-default"}>{ingredient.name}</p>
      <Price price= {ingredient.price}/>
    </li>
  );
};

Ingredient.propTypes = {
  cart: PropTypes.object,
  modal: PropTypes.object,
  ingredient: PropTypes.object
}; 