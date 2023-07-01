import React, {useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredientByName } from "../../../utils/tools/dataTools";
import Price from "../../Price/Price";
import CartElement from "../CartElement/CartElement";
import style from "./BurgerConstructor.module.css";
import { selectedIngredient } from "../../../variables/data";
import { createOrder } from "../../../utils/tools/storeTools";
import Modal from "../../Modal/Modal";
import OrderDetails from "../../Orders/OrderDetails/OrderDetails";
import Preloader from "../../Preloader/Preloader";
import { setBun, defaultIngredients, addIngredient } from "../../../services/slices/cart";
import { hideOrder } from "../../../services/slices/order";
import { getCartFromStore, getIngredientsFromStore, getOrderNumberFromStore } from "../../../utils/tools/storeTools";
import { CartIngredient, Ingredient } from "../../../services/types/ingredients";
import { useAppDispatch, useAppSelector } from "../../../utils/tools/hooks";

type collectedProps = {
  canDrop: boolean; 
  dragItem: Ingredient; 
  isHover: boolean
};
type tempCart = CartIngredient[];

export default function BurgerConstructor () {
  const [summ, setSumm] = useState<number>(0);
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredientsFromStore);
  const orderNumber =  useAppSelector(getOrderNumberFromStore);
  const cart = useAppSelector(getCartFromStore);
  const [{isHover}, dropTarget] = useDrop<Ingredient, unknown, collectedProps>({
    accept: "ingredient",
    drop: (item) => {
      onDropHandler(item);
    },
  });

  const onDropHandler = (item: Ingredient) => {
      item.type === "bun" ?
      dispatch(setBun(item)) :
      dispatch(addIngredient({cartId: uuidv4(), ingredient: item}));
  };

  const openOrderModal = () => {
    let orderItemsId: string[] = [];
    if (cart.bun && cart.others && cart.others?.length > 0) {
      orderItemsId.push(cart.bun._id);
      cart.others.forEach( (ingredient: CartIngredient) => {
        orderItemsId.push(ingredient.ingredient._id);
      });
      orderItemsId.push(cart.bun._id);
      dispatch(createOrder(orderItemsId));
    }
  };

  useEffect( () => {
    let tempCart: tempCart = [];
    if (ingredients) {
      selectedIngredient.forEach((name) => {
        const ingredient = getIngredientByName(name, ingredients);
        if (ingredient) {
          if (ingredient.type === "bun") {
            dispatch(setBun(ingredient));
          } else {
            tempCart.push({cartId: uuidv4(), ingredient: ingredient});
          };
        };
      });
      dispatch(defaultIngredients(tempCart));
    }
    // Запуск только при монтировании элемента
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect( () => {
    let priceSumm = 0;
    if (cart.bun && cart.others && cart.others?.length > 0 ) {
      cart.others.forEach( (ingredient: CartIngredient) => {
        priceSumm = priceSumm + ingredient.ingredient.price;
        ingredient.ingredient.type === "bun" && (priceSumm = priceSumm + ingredient.ingredient.price);
      })
      priceSumm = priceSumm + cart.bun.price * 2;
      setSumm(priceSumm);
    };
  },
  // Пересчет суммы при изменении корзины, нужно следить только за корзиной
  // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );
  if (!cart.others || cart.others?.length <= 0 || !cart.bun) {
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
            key={ cart.bun + "top" }
            type="top"
            isLocked={true}
            item={cart.bun}
            addStyle="pt-4"
          />
          <div className={style.ConstructorContainer + " pr-2"}>
            {
              cart.others.map( (ingredient: CartIngredient) => 
                ingredient.ingredient.type !== "bun"&&
                <CartElement 
                  key={ ingredient.cartId }
                  type={ undefined }
                  isLocked={false}
                  item={ingredient.ingredient}
                  id={ingredient.cartId}
                />
            )
            }
          </div>
          <CartElement 
            className="pr-4 pt-4"
            key={ cart.bun + "bottom" }
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
      { orderNumber !== 0 &&
          (<Modal title='' close={() => {dispatch(hideOrder())}}>
            <OrderDetails number={orderNumber} />
          </Modal>)
        }
    </>
  );
};