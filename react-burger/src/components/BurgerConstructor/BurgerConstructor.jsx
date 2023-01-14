import React, {useEffect, useState} from 'react';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {getIngredientById} from '../../utils/tools';
import Price from '../Price/Price';
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
  const modalState = props.modal.modalState;
  const setModalState = props.modal.setModalState;
  const [summ, setSumm] = useState(0);
  const cart = props.cart.cart;
  const setCart = props.cart.setCart;
  let tempCart = [];
  let priceSumm = 0;

  useEffect( () => {
    selectedIngredient.forEach((id) => {
      tempCart.push(getIngredientById(id, props.ingredients));
    });
    setCart(tempCart);
    tempCart = [];
  }, []);

  useEffect( () => {
    cart.map( (ingredient) => {
      priceSumm = priceSumm + ingredient.price;
    })
    setSumm(priceSumm);
  },
    [cart]
  );
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
      <div className='BurgerConstructorOrder'>
        <Price price={summ} type={'medium'} />
        <Button 
          htmlType="button" 
          type="primary" 
          size="large" 
          onClick={() => {setModalState({
            display: 'flex',
            type: 'order',
            title: '',
            data: ''
      })}}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );

};