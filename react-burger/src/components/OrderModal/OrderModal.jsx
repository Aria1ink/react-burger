import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "../IngredientImage/IngredientImage";
import { getIngredientsFromStore, getSelectedOrderFromStore, parseIngredients, getIngredientById } from "../../utils/tools";
import Price from "../Price/Price";

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
    <div>
      <p className="text text_type_digits-default"> { order.number } </p>
      <h1> { order.name } </h1>
      <p> { order.status } </p>
      <p> Состав: </p>
      <div>
        {
          sortedIngredients.map( (ingredient, index) => {
            return(
              <div key={ingredient.element._id}>
                <IngredientImage url={ingredient.element.image} />
                <p> {ingredient.element.name} </p>
                <div>
                  <p> {ingredient.count} x </p>
                  <Price price={ingredient.element.price} />
                </div>

              </div>
            )
          })
        }
      </div>
      <div>
        <FormattedDate date={new Date(order.createdAt)} />
        <Price price={summPrice} />
      </div>
    </div>
  );
}