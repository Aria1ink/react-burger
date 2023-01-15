import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {getIngredientById} from "../../utils/tools";
import Price from "../Price/Price";
import style from "./BurgerConstructor.module.css";
import {selectedIngredient} from "../../variables/data";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

export default function BurgerConstructor (props) {
  const [modalState, setModalState] = useState(false);
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
    <>
      <div className={style.BurgerConstructor + " pt-25 pl-4"} >
        <ul>
        <li className={style.item+ " pr-4 pb-4"} > {
            cart.map( (ingredient) => 
              ingredient.type === "bun"&&
              <ConstructorElement
                key={"top" + ingredient._id}
                type="top"
                isLocked={true}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                className="pt-4"
              />
            )
          } </li>
          <div className={style.ConstructorContainer + " pr-2"}>
            {
              cart.map( (ingredient, index) => 
              ingredient.type !== "bun"&&
              <li className={style.item} key={ "li-" + index + ingredient._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  key={index + ingredient._id}
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            )
            }
          </div>
          <li className={style.item + " pr-4 pt-4"} > {
            cart.map( (ingredient) => 
            ingredient.type === "bun"&&
            <ConstructorElement
              key={"bottom" + ingredient._id}
              type="bottom"
              isLocked={true}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          )
          } </li>
        </ul>
        <div className={style.BurgerConstructorOrder + " pt-10 pr-4"}>
          <Price price={summ} font={"medium"} />
          <Button 
            htmlType="button" 
            type="primary" 
            size="large" 
            onClick={() => {setModalState(true)}}>
            Оформить заказ
          </Button>
        </div>
      </div>
      { modalState &&
          (<Modal title='' close={() => {setModalState(false)}}>
            <OrderDetails number="034536"/>
          </Modal>)
        }
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array,
  cart: PropTypes.object,
}; 