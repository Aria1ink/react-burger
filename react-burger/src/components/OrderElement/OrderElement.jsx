import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredientById, getIngredientsFromStore } from "../../utils/tools";
import Price from "../Price/Price";
import OrderImages from "../OrderImages/OrderImages";
import style from "./OrderElement.module.css";

export default function OrderElement({ order }) {
  const [ price, setPrice ] = useState(0);
  const [ images, setimages ] = useState([]);
  const ingredients = useSelector(getIngredientsFromStore);
  const location = useLocation();

  useEffect( () => {
    let tempPrice = 0;
    let tempImages = [];
    order.ingredients.map( (id, index) => {
      const ingredient = getIngredientById(id, ingredients);
      if (ingredient) {
        tempPrice += ingredient.price;
        tempImages.push(ingredient.image);
        if (index === order.ingredients.length && ingredient.type === "bun") {
          tempImages.pop();
        }
      }
    });
    setPrice(tempPrice);
    setimages(tempImages);
  },[]);

  return(
    <div className={style.OrderElementContainer}>
      <div className={style.OrderElementLine}>
        <p className={style.paragraph + " text text_type_digits-default"}>#{order.number}</p>
        <p className={style.paragraph + " text text_type_main-default text_color_inactive"}>
          <FormattedDate date={new Date(order.createdAt)} />
          &nbsp; i-GMT+3
        </p>
      </div>
      <p className="text text_type_main-medium"> {order.name} </p>
      {location.pathname === "/profile/orders" && <p className="text text_type_main-default">{
        order.status === "done" && "Выполнен" ||
        order.status === "created" && "Создан" ||
        order.status === "pending" && "Готовится"
      }</p>}
      <div className={style.OrderElementLine}>
        <OrderImages images={images} />
        <Price price={price}/>
      </div>
    </div>
  );
}