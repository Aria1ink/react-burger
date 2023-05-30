import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "../IngredientImage/IngredientImage";
import { getIngredientsFromStore, getSelectedOrderFromStore, parseIngredients, getIngredientById } from "../../utils/tools";
import Price from "../Price/Price";
import OrderStatus from "../OrderStatus/OrderStatus";
import style from "./OrderModal.module.css";

export default function OrderModal() {
  const ingredients = useSelector(getIngredientsFromStore);
  const order = useSelector(getSelectedOrderFromStore);
  const [sortedIngredients, setSortedIngredients] = useState([]);
  const [summPrice, setSummPrice] = useState(0);

  useEffect( () => {
    const [tempSortedIngredients, tempSumm] = parseIngredients(order.ingredients, ingredients);
    setSortedIngredients(tempSortedIngredients);
    setSummPrice(tempSumm);
    console.log(tempSortedIngredients)
  }, []);

  return(
    <div className={style.orderContainer}>
      <p className={style.orderNumber + " text text_type_digits-default pb-10"}> #{ order.number } </p>
      <h2 className="text text_type_main-medium pb-3"> { order.name } </h2>
      <OrderStatus status={order.status} />
      <p className="text text_type_main-medium pt-15 pb-6"> Состав: </p>
      <div className={style.ingredientsContainer + " pr-6"}>
        {
          sortedIngredients.map( (ingredient, index) => {
            return(
              <div className={style.ingredient} key={ingredient.element._id}>
                <IngredientImage url={ingredient.element.image} />
                <p className={style.paragraph + " text text_type_main-default"}> {ingredient.element.name} </p>
                <div className={style.ingredientPrice}>
                  <p className={style.paragraph + " text text_type_digits-default"}> {ingredient.count}&nbsp;x&nbsp;</p>
                  <Price price={ingredient.element.price} />
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={style.modalFooter + " pt-10"}>
        <p className={style.paragraph + " text text_type_main-default text_color_inactive"}>
          <FormattedDate date={new Date(order.createdAt)} />
          &nbsp; i-GMT+3
        </p>
        <Price price={summPrice} />
      </div>
    </div>
  );
}