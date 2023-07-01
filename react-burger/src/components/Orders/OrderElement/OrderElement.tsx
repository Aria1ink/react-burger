import React, { useState, useEffect } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getItemById } from "../../../utils/tools/dataTools";
import { getIngredientsFromStore } from "../../../utils/tools/storeTools";
import { setSelectedOrder } from "../../../services/slices/selectedOrder";
import Price from "../../Price/Price";
import OrderStatus from "../OrderStatus/OrderStatus";
import OrderImages from "../OrderImages/OrderImages";
import style from "./OrderElement.module.css";
import { Order } from "../../../services/types/store";
import { useAppDispatch, useAppLocation, useAppNavigate, useAppSelector } from "../../../utils/tools/hooks";

type Props = {
  order: Order
};

export default function OrderElement({ order }: Props) {
  const dispatch = useAppDispatch();
  const [ price, setPrice ] = useState<number>(0);
  const [ images, setimages ] = useState<string[]>([]);
  const ingredients = useAppSelector(getIngredientsFromStore);
  const location = useAppLocation();
  const navigate = useAppNavigate();

  const openModal = () => {
    dispatch(setSelectedOrder(order));
    navigate(location.pathname+"/"+order._id, {replace: false, state: {from: location.pathname}});
  };

  useEffect( () => {
    let tempPrice = 0;
    let tempImages: string[] = [];
    if (ingredients) {
      order.ingredients.forEach( (id, index) => {
        const ingredient = getItemById(id, ingredients);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return(
    <div className={style.OrderElementContainer} onClick={openModal}>
      <div className={style.OrderElementLine}>
        <p className={style.paragraph + " text text_type_digits-default"}>#{order.number}</p>
        <p className={style.paragraph + " text text_type_main-default text_color_inactive"}>
          <FormattedDate date={new Date(order.createdAt)} />
          &nbsp; i-GMT+3
        </p>
      </div>
      <p className="text text_type_main-medium"> {order.name} </p>
      {location.pathname === "/profile/orders" && <OrderStatus status={order.status} />}
      <div className={style.OrderElementLine}>
        <OrderImages images={images} />
        <Price price={price}/>
      </div>
    </div>
  );
}
