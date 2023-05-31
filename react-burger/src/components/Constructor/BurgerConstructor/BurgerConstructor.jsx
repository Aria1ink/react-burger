import React, {useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredientByName } from "../../../utils/tools";
import Price from "../../Price/Price";
import CartElement from "../CartElement/CartElement";
import style from "./BurgerConstructor.module.css";
import { selectedIngredient } from "../../../variables/data";
import { createOrder } from "../../../services/actions/order";
import Modal from "../../Modal/Modal";
import OrderDetails from "../../Orders/OrderDetails/OrderDetails";
import Preloader from "../../Preloader/Preloader";
import { setCartDefault, setCartBun, addCartIngredient } from "../../../services/actions/cart";
import { hideOrderModal } from "../../../services/actions/order";
import { getIngredientsFromStore } from "../../../utils/tools";
import { getOrderNumberFromStore } from "../../../utils/tools";
import { getCartFromStore } from "../../../utils/tools";

export default function BurgerConstructor () {
  const [summ, setSumm] = useState(0);
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredientsFromStore);
  const orderNumber =  useSelector(getOrderNumberFromStore);
  const cart = useSelector(getCartFromStore);
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });
  const onDropHandler = (item) => {
      item.type === "bun" ?
      dispatch(setCartBun(item)) :
      dispatch(addCartIngredient(item, uuidv4()));
  };

  const openOrderModal = () => {
    let orderItemsId = [];
    orderItemsId.push(cart.bun._id);
    cart.others.forEach( (ingredient) => {
      orderItemsId.push(ingredient.ingredient._id);
    });
    orderItemsId.push(cart.bun._id);
    dispatch(createOrder(orderItemsId));
  };

  useEffect( () => {
    let tempCart = { 
      bun: {},
      others: []
    };
    selectedIngredient.forEach((name) => {
      const ingredient = getIngredientByName(name, ingredients);
      if (ingredient) {
        if (ingredient.type === "bun") {
          dispatch(setCartBun(ingredient));
        } else {
          tempCart.others.push({cartId: uuidv4(), ingredient: ingredient});
        };
      };
    });
    dispatch(setCartDefault(tempCart.others));
  }, []);

  useEffect( () => {
    let priceSumm = 0;
    if (cart.others.length > 0 || cart.bun !== null) {
      cart.others.forEach( (ingredient) => {
        priceSumm = priceSumm + ingredient.ingredient.price;
        ingredient.type === "bun" && (priceSumm = priceSumm + ingredient.ingredient.price);
      })
      priceSumm = priceSumm + cart.bun.price * 2;
      setSumm(priceSumm);
    };
  },
    [cart]
  );
  if (cart.others.length <= 0 || !cart.bun) {
    return (
      <Preloader />
    );
  }

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
            addSstyle="pt-4"
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