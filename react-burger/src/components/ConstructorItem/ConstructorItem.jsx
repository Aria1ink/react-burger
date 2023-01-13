import React from "react";
import './ConstructorItem.css';
import { DragIcon, DeleteIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from "../Price/Price";
import {getIngredientById} from '../../utils/tools';

export default function ConstructorItem (props) {
  const ingredient = props.ingredient;
  const currentId = props.currentId;
  //const ingredient = getIngredientById(currentId, ingredients);
  return (
    <div className="ConstructorItem">
      {props.isLocked === "false" ? <DragIcon /> : ''}
      <img className='ConstructorImage' src={props.ingredient.image} alt={props.ingredient.name} />
      <p className='ConstructorTitle text text_type_main-default'>{props.ingredient.name}</p>
      <Price price={props.ingredient.price} />
      {props.isLocked === "false" ? <DeleteIcon type="primary"/> : <LockIcon type="secondary" /> }
    </div>
  )
};