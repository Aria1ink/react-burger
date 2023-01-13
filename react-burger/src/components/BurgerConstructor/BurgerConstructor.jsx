import React from 'react';
import ConstructorItem from '../ConstructorItem/ConstructorItem';
import {getIngredientById} from '../../utils/tools'

export default function BurgerConstructor (props) {
  const selectedBun = "60666c42cc7b410027a1a9b1";
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
        ingredient={ getIngredientById(selectedBun, props.ingredients)} 
        isLocked="true"
      />
    <div className='ConstructorContainer'>
        {
          selectedIngredient.map( (id, index) => 
          <ConstructorItem 
            key={index + id} 
            currentId={id} 
            ingredient={getIngredientById(id, props.ingredients)} 
            isLocked="false"
          />
          )
        }
      </div>
      <ConstructorItem 
        currentId={selectedBun} 
        ingredient={getIngredientById(selectedBun, props.ingredients)} 
        isLocked="true"
      />
    </div>
  );
};