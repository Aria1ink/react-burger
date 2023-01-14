import React, { useEffect, useState } from "react";
import './ConstructorItem.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {getIngredientById} from '../../utils/tools';

export default function ConstructorItem (props) {

  const [ingredient, setIngredient]= useState({});

  useEffect(() => {
    setIngredient(getIngredientById(props.currentId, props.ingredients));
  }, []);

  if (!ingredient) return <div>Loading...</div>;

  return (
      <ConstructorElement
        type="top"
        isLocked={props.isLocked}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
  )
};