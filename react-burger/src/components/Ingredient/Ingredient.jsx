import React from 'react';
import Price from '../Price/Price'
import './Ingredient.css'

export default function Ingredient (props) {
  const ingredient = props.ingredient; 

  return (
    <li className='Ingredient pl-4 pb-4 pr-4' key={ingredient.id} id= {ingredient.id}>
      <img className='IngredientImage' src={ingredient.image} alt={ingredient.name} />
      <p className='IngredientTitle text text_type_main-default'>{ingredient.name}</p>
      <Price price= {ingredient.price}/>
    </li>
  );
};