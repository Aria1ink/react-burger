import React, {useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredientById } from "../../utils/tools";
import Price from "../Price/Price";
import CartElement from "../CartElement/CartElement";
import style from "./BurgerConstructor.module.css";
import { selectedIngredient } from "../../variables/data";
import { createOrder } from "../../services/actions/order";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { setCartDefault, setCartBun, addCartIngredient } from "../../services/actions/cart";
import { hideOrderModal } from "../../services/actions/order";

export default function BurgerConstructor () {
  const [summ, setSumm] = useState(0);
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const orderNumber =  useSelector(store => store.order);
  const cart = useSelector(store => store.cart);
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });
  const onDropHandler = (item) => {
    if (item.cartId) {

    }
    else {
      item.type === "bun" ?
      dispatch(setCartBun(item)) :
      dispatch(addCartIngredient(item));
    }
  };

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
        <ul ref={dropTarget} style={isHover ? {opacity: "0.5"} : {opacity: "1"}}>
          <CartElement 
            className="pr-4 pb-4"
            key={ uuidv4() }
            type="top"
            isLocked={true}
            item={cart.bun}
            style="pt-4"
          />
          <div className={style.ConstructorContainer + " pr-2"}>
            {
              cart.others.map( (ingredient) => 
                ingredient.type !== "bun"&&
                <CartElement 
                  key={ uuidv4() }
                  type="undefined"
                  isLocked={false}
                  item={ingredient.ingredient}
                  id={ingredient.cartId}
                />
            )
            }
          </div>
          <CartElement 
            className="pr-4 pt-4"
            key={ uuidv4() }
            type="bottom"
            isLocked={true}
            item={cart.bun}
          />
        </ul>
        <div className={style.BurgerConstructorOrder + " pt-10 pr-4"} >
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