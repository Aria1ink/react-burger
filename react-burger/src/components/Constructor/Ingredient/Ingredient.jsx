import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../Price/Price";
import style from "./Ingredient.module.css";
import { setIngredient } from "../../../services/slices/ingredient";
import { setSelectedIngredient } from '../../../services/actions/ingredient';
import { getCartFromStore } from "../../../utils/tools/storeTools";

export default function Ingredient (props) {
  const ingredient = props.ingredient; 
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let tempCount = 0;
  const cart = useSelector(getCartFromStore);
  const openIngredientDetails = (ingredient) => {
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
    if (cart.others?.length > 0 && cart.bun !== null) {
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
      key={ingredient._id} 
      id= {ingredient._id} 
      onClick={() => {openIngredientDetails(ingredient)}}
      style={ !isDrag ? {opacity: "1"} : {opacity: "0.4", cursor: "grab"} }
    >
      {count > 0 && <Counter className="IngredientCounter" count={count} size="default" extraClass="m-1" />}
      <img className={style.OrderIngredientImage} src={ingredient.image} alt={ingredient.name} />
      <p className={style.IngredientTitle + " text text_type_main-default"}>{ingredient.name}</p>
      <Price price={ingredient.price}/>
    </li>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired
}; 