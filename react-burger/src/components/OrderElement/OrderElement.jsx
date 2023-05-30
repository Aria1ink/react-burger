import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getItemById, getIngredientsFromStore } from "../../utils/tools";
import { setSelectedOrder } from "../../services/actions/selectedOrder";
import Price from "../Price/Price";
import OrderStatus from "../OrderStatus/OrderStatus";
import OrderImages from "../OrderImages/OrderImages";
import style from "./OrderElement.module.css";

export default function OrderElement({ order }) {
  const dispatch = useDispatch();
  const [ price, setPrice ] = useState(0);
  const [ images, setimages ] = useState([]);
  const ingredients = useSelector(getIngredientsFromStore);
  const location = useLocation();
  const navigate = useNavigate();

  const openModal = () => {
    dispatch(setSelectedOrder(order));
    navigate(location.pathname+"/"+order._id, {replace: false, state: {from: location.pathname}});
  };

  useEffect( () => {
    let tempPrice = 0;
    let tempImages = [];
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

OrderElement.propTypes = {
  order: PropTypes.object.isRequired
}; 