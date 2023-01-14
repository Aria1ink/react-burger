import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../Price/Price'
import './Ingredient.css'

export default function Ingredient (props) {
  const ingredient = props.ingredient; 

  return (
    <li className='Ingredient pl-4 pb-4 pr-4' key={ingredient.id} id= {ingredient.id}>
      <Counter className='IngredientCounter' count={1} size="default" extraClass="m-1" />
      <img className='IngredientImage' src={ingredient.image} alt={ingredient.name} />
      <p className='IngredientTitle text text_type_main-default'>{ingredient.name}</p>
      <Price price= {ingredient.price}/>
    </li>
  );
};