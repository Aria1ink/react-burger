import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import { CartContext } from "../../variables/context";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../Price/Price";
import style from "./Ingredient.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

export default function Ingredient (props) {
  const ingredient = props.ingredient; 
  const [count, setCount] = useState(0);
  let tempCount = 0;
  const [cart] = useContext(CartContext); 
  const [modalState, setModalState] = useState(false);

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
    <>
      <li 
        className={style.Ingredient + " pl-4 pb-4 pr-4"} 
        key={ingredient.id} 
        id= {ingredient.id} 
        onClick={() => {setModalState(true)}}
      >
        {count > 0 && <Counter className="IngredientCounter" count={count} size="default" extraClass="m-1" />}
        <img className={style.IngredientImage} src={ingredient.image} alt={ingredient.name} />
        <p className={style.IngredientTitle + " text text_type_main-default"}>{ingredient.name}</p>
        <Price price= {ingredient.price}/>
      </li>
      { modalState &&
          (<Modal title="Детали ингредиента" close={() => {setModalState(false)}}>
            <IngredientDetails ingredient={ingredient} />
          </Modal>)
        }
    </>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.object
}; 