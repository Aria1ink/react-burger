import React, {useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredientById } from "../../utils/tools";
import Price from "../Price/Price";
import style from "./BurgerConstructor.module.css";
import { selectedIngredient } from "../../variables/data";
import { createOrder } from "../../services/actions/order";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { setCartDefault, setCartBun } from "../../services/actions/cart";
import { hideOrderModal } from "../../services/actions/order";

export default function BurgerConstructor () {
  const [summ, setSumm] = useState(0);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const orderNumber =  useSelector(store => store.order);
  const cart = useSelector(store => store.cart);

  const openOrderModal = () => {
    let orderItemsId = [];
    orderItemsId.push(cart.bun._id);
    cart.others.forEach( (ingredient) => {
      orderItemsId.push(ingredient._id);
    });
    orderItemsId.push(cart.bun._id);
    dispatch(createOrder(orderItemsId));
  };

  useEffect( () => {
    let tempCart = { 
      bun: {},
      others: []
    };
    selectedIngredient.forEach((id) => {
      const ingredient = getIngredientById(id, ingredients);
      if (ingredient.type === "bun") {
        dispatch(setCartBun(ingredient));
      } else {
        tempCart.others.push({cartId: tempCart.others.length, ingredient: ingredient});
      };
    });
    dispatch(setCartDefault(tempCart.others));
  }, []);

  useEffect( () => {
    let priceSumm = 0;
    cart.others.forEach( (ingredient) => {
      priceSumm = priceSumm + ingredient.ingredient.price;
      ingredient.type === "bun" && (priceSumm = priceSumm + ingredient.ingredient.price);
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
              <li className={style.item} key={ "li-" + index + ingredient.ingredient._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  key={index + ingredient.ingredient._id}
                  isLocked={false}
                  text={ingredient.ingredient.name}
                  price={ingredient.ingredient.price}
                  thumbnail={ingredient.ingredient.image}
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
      { orderNumber !== 0 && orderNumber !== 'error' &&
          (<Modal title='' close={() => {dispatch(hideOrderModal())}}>
            <OrderDetails number={orderNumber} />
          </Modal>)
        }
    </>
  );
};