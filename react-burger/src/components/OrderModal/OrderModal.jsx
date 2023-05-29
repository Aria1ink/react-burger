import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "../IngredientImage/IngredientImage";
import { getIngredientsFromStore, getSelectedOrderFromStore, sortByID, getIngredientById } from "../../utils/tools";
import Price from "../Price/Price";

export default function OrderModal() {
  const infredients = useSelector(getIngredientsFromStore);
  const order = useSelector(getSelectedOrderFromStore);
  const [sortedIngredients, setSortedIngredients] = useState([]);
  const [summPrice, setSummPrice] = useState(0);

  useEffect( () => {
    const tempIngredients = [];
    const result = sortByID(order.ingredients);
    console.log(result)
    //setSortedIngredients(sortByType(tempIngredients));
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
              <div>
                <IngredientImage url={ingredient.image} />
                <p> {ingredient.name} </p>
                <div>
                  <p> x </p>
                  <Price price={ingredient.price} />
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