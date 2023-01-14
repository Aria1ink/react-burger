import React, { useEffect, useState } from "react";
import './ConstructorItem.css';
import { DragIcon, DeleteIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from "../Price/Price";
import {getIngredientById} from '../../utils/tools';

export default function ConstructorItem (props) {

  const [ingredient, setIngredient]= useState({});

  useEffect(() => {
    setIngredient(getIngredientById(props.currentId, props.ingredients));
  }, []);

  if (!ingredient) return <div>Loading...</div>;

  return (
    <div className="ConstructorItem">
      {props.isLocked === "false" ? <DragIcon /> : ''}
      <div className="ConstructorBackground">
        <img className='ConstructorImage' src={ingredient.image} alt={ingredient.name} />
        <p className='ConstructorTitle text text_type_main-default'>{ingredient.name}</p>
        <Price price={ingredient.price} />
        {props.isLocked === "false" ? <DeleteIcon type="primary"/> : <LockIcon type="secondary" /> }
      </div>
    </div>
  )
};