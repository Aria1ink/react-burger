import React, {useEffect, useState} from 'react';
import ConstructorItem from '../ConstructorItem/ConstructorItem';
//import {getIngredientById} from '../../utils/tools'
import './BurgerConstructor.css'

export default function BurgerConstructor (props) {
  const selectedBun = "60d3b41abdacab0026a733c6";
  const selectedIngredient = [
    "60666c42cc7b410027a1a9b9",
    "60666c42cc7b410027a1a9b4",
    "60666c42cc7b410027a1a9bc",
    "60666c42cc7b410027a1a9bb",
    "60666c42cc7b410027a1a9bb"
  ]

  return (
    <div className="BurgerConstructor" >
      <ConstructorItem 
        currentId={selectedBun} 
        ingredients={props.ingredients} 
        isLocked="true"
      />
    <div className='ConstructorContainer'>
        {
          selectedIngredient.map( (id, index) => 
          <ConstructorItem 
            key={index + id} 
            currentId={id} 
            ingredients={props.ingredients} 
            isLocked="false"
          />
          )
        }
      </div>
      <ConstructorItem 
        currentId={selectedBun} 
        ingredients={props.ingredients} 
        isLocked="true"
      />
      </div>
  );
};