import React, {useEffect, useState, useContext } from "react";
import { IngredientsContext, CartContext } from "../../services/context";
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredientById } from "../../utils/tools";
import Price from "../Price/Price";
import style from "./BurgerConstructor.module.css";
import { selectedIngredient } from "../../variables/data";
import { setOrderApi }from "../../utils/api";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

export default function BurgerConstructor () {
  const [modalState, setModalState] = useState(false);
  const [summ, setSumm] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const cartState = useContext(CartContext);
  const cart = cartState.cart;
  const setCart = cartState.setCart;
  const ingredientsState = useContext(IngredientsContext);
  const ingredients = ingredientsState.ingredients;

  const openOrderModal = () => {
    let orderItemsId = [];
    orderItemsId.push(cart.bun._id);
    cart.others.forEach( (ingredient) => {
      orderItemsId.push(ingredient._id);
    });
    orderItemsId.push(cart.bun._id);
    setOrderApi(orderItemsId)
      .then(
        (data) => {
          setOrderNumber(data.order.number);
          setModalState(true);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect( () => {
    let tempCart = { 
      bun: {},
      others: []
    };
    selectedIngredient.forEach((id) => {
      const ingredient = getIngredientById(id, ingredients);
      if (ingredient.type === "bun") {
        tempCart.bun = ingredient;
      } else {
        tempCart.others.push(ingredient);
      };
    });
    setCart(tempCart);
  }, []);

  useEffect( () => {
    let priceSumm = 0;
    cart.others.forEach( (ingredient) => {
      priceSumm = priceSumm + ingredient.price;
      ingredient.type === "bun" && (priceSumm = priceSumm + ingredient.price);
    })
    priceSumm = priceSumm + cart.bun.price * 2;
    setSumm(priceSumm);
  },
    [cart]
  );

  return (
    <>
      <div className={style.BurgerConstructor + " pt-25 pl-4"} >
        <ul>
          <li className={style.item+ " pr-4 pb-4"} >
            <ConstructorElement
              key={"top" + cart.bun._id}
              type="top"
              isLocked={true}
              text={cart.bun.name}
              price={cart.bun.price}
              thumbnail={cart.bun.image}
              className="pt-4"
            />
          </li>
          <div className={style.ConstructorContainer + " pr-2"}>
            {
              cart.others.map( (ingredient, index) => 
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
          <li className={style.item + " pr-4 pt-4"} > 
            <ConstructorElement
              key={"bottom" + cart.bun._id}
              type="bottom"
              isLocked={true}
              text={cart.bun.name}
              price={cart.bun.price}
              thumbnail={cart.bun.image}
            />
          </li>
        </ul>
        <div className={style.BurgerConstructorOrder + " pt-10 pr-4"}>
          <Price price={summ} font={"medium"} />
          <Button 
            htmlType="button" 
            type="primary" 
            size="large" 
            onClick={openOrderModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
      { modalState &&
          (<Modal title='' close={() => {setModalState(false)}}>
            <OrderDetails number={orderNumber} />
          </Modal>)
        }
    </>
  );
};