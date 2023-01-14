import React, {useEffect, useState} from 'react';
import ConstructorItem from '../ConstructorItem/ConstructorItem';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {getIngredientById} from '../../utils/tools';
import './BurgerConstructor.css'

export default function BurgerConstructor (props) {
  const selectedBun = "60d3b41abdacab0026a733c6";
  const selectedIngredient = [
    "60d3b41abdacab0026a733c6",
    "60d3b41abdacab0026a733ce",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733d1",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733ca",
    "60d3b41abdacab0026a733ca"
  ];
  const cart = props.cart.cart;
  const setCart = props.cart.setCart;
  let tempCart = [];

  useEffect(() => {
    selectedIngredient.forEach((id) => {
      tempCart.push(getIngredientById(id, props.ingredients));
    });
    setCart(tempCart);
    tempCart = [];
  }, []);

  return (
    <div className="BurgerConstructor" >
      {
        cart.map( (ingredient, index) => 
          ingredient.type === 'bun'&&
          <ConstructorElement
            key={'top' + ingredient._id}
            type="top"
            isLocked={true}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        )
      }
      {
        cart.map( (ingredient, index) => 
        ingredient.type !== 'bun'&&
        <ConstructorElement
          key={index + ingredient._id}
          isLocked={false}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      )
      }
      {
        cart.map( (ingredient, index) => 
        ingredient.type === 'bun'&&
        <ConstructorElement
          key={'bottom' + ingredient._id}
          type="bottom"
          isLocked={true}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      )
      }
    </div>
  );
/*
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
  */
};