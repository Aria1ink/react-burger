import React, { useEffect, useState } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../Price/Price'
import './Ingredient.css'

export default function Ingredient (props) {
  const ingredient = props.ingredient; 
  const [count, setCount] = useState(0);
  let tempCount = 0;
  const cart = props.cart.cart;
  const setCart = props.cart.setCart;
  const modalState = props.modal.modalState;
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
      className='Ingredient pl-4 pb-4 pr-4' 
      key={ingredient.id} 
      id= {ingredient.id} 
      onClick={() => {setModalState({
        display: 'flex',
        type: 'ingredient',
        title: 'dddddd',
        data: ingredient
      })}}
    >
      {count > 0 && <Counter className='IngredientCounter' count={count} size="default" extraClass="m-1" />}
      <img className='IngredientImage' src={ingredient.image} alt={ingredient.name} />
      <p className='IngredientTitle text text_type_main-default'>{ingredient.name}</p>
      <Price price= {ingredient.price}/>
    </li>
  );
};